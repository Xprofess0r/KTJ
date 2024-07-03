const User = require("../models/user.model");
const Game = require("../models/game.model");
// const { clearImage } = require("../utils/utils");
const path = require("path");
const { getFilesPath } = require("../utils/utils");
const activityController = require("./activity_controller");
// delete a competition from the admin tool
exports.deleteGame = async (req, res, next) => {
  let gameId = req.body._id;
  try {
    let game = await Game.findById(gameId);
    if (!game) {
      let error = new Error("Game does not exists!");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ message: "game does not exists" });
    }
    // for (let p of game.imageUrl) {
    //   let filepath = path.join(__dirname, "..", p);
    //   clearImage(filepath);
    // }
    await game.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Game :" + game.title,
      },
      next
    );
    return res.status(200).json({ message: "game deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getgameById = async (req, res, next) => {
  const gameId = req.query.gameId;
  console.log(gameId, "gameId");
  try {
    let game = await Game.findById(gameId);
    if (!game) {
      let error = new Error("Game with the given Id does not exists!");
      error.statusCode = 404;
      throw error;
    }
    console.log("here")
    return res.status(200).json({ game: game });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getGames = async (req, res, next) => {
  try {
    let games = await Game.find()
      .populate("users", ["email", "username", "ktjID"])
      .populate({
        path: "teams",
        populate: {
          path: "members",
          select: [
            "email",
            "username",
            "ktjID",
            "phone",
            "gender",
            "college",
            "department",
            "city",
            "state",
          ],
        },
      });
    return res.status(200).json({ games: games });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getUserGames = async (req, res, next) => {
  try {
    let games = await Game.find().select(["-teams", "-users"]);

    return res.status(200).json({ games: games });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.createGame = async (req, res, next) => {
  // console.log(req.body);
  const { title, content, prize_money, registration_link, deadline, imageUrl, max, min } =
    req.body;
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;
  //const imageUrl = getFilesPath([req.file])[0]; // returns an array;
  // console.log(imageUrl);
  try {
    let headObjectId = null;
    if (headKtjId != null) {
      let Id = await User.findOne({ ktjID: headKtjId });
      if (Id == null) {
        let error = new Error("Invalid Ktj Id of Head ");
        error.statusCode = 400;
        throw error;
      } else {
        headObjectId = Id._id;
      }
    }
    let game = await Game.findOne({ title: `${title}` });
    if (game == null) {
      const newgame = new Game({
        title,
        prize_money,
        content,
        registration_link,
        deadline,
        imageUrl,
        headKtjId,
        headObjectId,
        max,
        min

      });
      await newgame.save();
      await activityController.createActivity(
        {
          userId: req.userIdForActivity,
          description: "Created Game :" + newgame.title,
        },
        next
      );
      return res
        .status(200)
        .json({ message: "game created Successfully", game: newgame });
    } else {
      // 409 for the conflict issues when resource we are
      // creating already present ;
      let error = new Error(
        "Game with this title already exits,Try using a different title"
      );
      error.statusCode = 404;
      throw error;
      // return res
      //   .status(409)
      //   .json(
      //     "game with this title already exits ,Try using a different title "
      //   );
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.updategame = async (req, res, next) => {
  const {
    title,
    prize_money,
    content,
    registration_link,
    _id,
    imageUrl,
    deadline,
    min,
    max
  } = req.body;
  let active = req.body.active;
  let registration = req.body.registration;
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;
  // const imageUrl = getFilesPath([req.file])[0]; // returns an array;
  try {
    let headObjectId = null;
    if (headKtjId != null) {
      let Id = await User.findOne({ ktjID: headKtjId });
      if (Id == null) {
        let error = new Error("Invalid Ktj Id of Head ");
        error.statusCode = 400;
        throw error;
      } else {
        headObjectId = Id._id;
      }
    }
    let game = await Game.findById(_id);
    if (!game) {
      let error = new Error("Game Not found !");
      error.statusCode = 404;
      throw error;
      return res.status(404).json({ message: "game Not found" });
    }
    game.title = title;
    game.content = content;
    game.prize_money = prize_money;
    game.registration_link = registration_link;
    game.deadline = deadline;
    game.imageUrl = imageUrl;
    game.headKtjId = headKtjId;
    game.headObjectId = headObjectId;
    game.max = max;
    game.min = min
    game.active = active;
    game.registration = registration;
    // if (imageUrl !== game.imageUrl) {
    //   clearImage(path.join(__dirname, "..", game.imageUrl));
    //   game.imageUrl = imageUrl;
    // }
    await game.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Game :" + game.title,
      },
      next
    );
    return res.status(200).json({
      message: "game details updated successfully",
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
