const User = require("../models/user.model");
const Competition = require("../models/competition.model");
const Team = require("../models/team.model");
const { clearImage } = require("../utils/utils");
const path = require("path");
const { getFilesPath } = require("../utils/utils");
const activityController = require("./activity_controller");

// delete a competition from the admin tool
exports.deleteCompetition = async (req, res, next) => {
  let CompetitionId = req.body._id;
  try {
    let competition = await Competition.findById(CompetitionId);
    if (!competition) {
      let error = new Error("Competition does not exists");
      error.statusCode = 404;
      throw error;
    }

   
    //delete competition from user 

  

  

    // for (let p of competition.imageUrl) {
    //   let filepath = path.join(__dirname, "..", p);
    //   clearImage(filepath);
    // }
    await competition.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Competition " + competition.title,
      },
      next
    );
    return res
      .status(200)
      .json({ message: "competition deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getCompetitionById = async (req, res, next) => {
  const competitionUrl = req.params.competitionUrl;
  // console.log(competitionUrl);
  const _id= req.params.competitionUrl;
  // console.log("we are at find compt by id",_id)
  try {
    let competition = await Competition.find({
      _id: _id,
    }).populate("headObjectId", ["username", "email", "phone"]);
    // console.log(competition)
    return res.status(200).json({ competition: competition });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getCompetitions = async (req, res, next) => {
  try {
    let competitions = await Competition.find({ active: true })
      .populate("users", [
        "email",
        "username",
        "ktjID",
        "phone",
        "gender",
        "college",
        "department",
        "city",
        "state",
      ])
      .select(["-teams"]);

    return res.status(200).json({ competitions: competitions });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.getCompetitionsAdmin = async (req, res, next) => {
  try {
    let competitions = await Competition.find()
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
    return res.status(200).json({ competitions: competitions });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.createCompetition = async (req, res, next) => {

  const {
    title,
    prize_money,
    deadline,
    content,
    problem_statement_link,
    posterUrl,
    sponsors,
    imageUrl,
    max,
    min,
    competitionUrl,
  } = req.body;
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;

  try {
    let headObjectId = null;
    if (headKtjId != null) {
      let Id = await User.findOne({ ktjID: headKtjId });
      if (Id == null) {
        let error = new Error("Ktj Id of Head ");
        error.statusCode = 400;
        throw error;
      } else {
        headObjectId = Id._id;
      }
    }
    let competition = await Competition.findOne({ title: `${title}` });
    if (competition == null) {
      const newCompetition = new Competition({
        title,
        prize_money,
        deadline,
        content,
        problem_statement_link,
        imageUrl,
        headKtjId,
        headObjectId,
        posterUrl,
        sponsors,
        max,
        min,
        competitionUrl,
      });
      // console.log(newCompetition);
      await newCompetition.save();
      await activityController.createActivity(
        {
          userId: req.userIdForActivity,
          description: "Created competition " + title,
        },
        next
      );
      return res.status(200).json({
        message: "Competition created Successfully",
        competition: newCompetition,
      });
    } else {
      // 409 for the conflict issues when resource we are
      // creating already present ;
      let error = new Error(
        "Competition with this title already exits ,Try using a different title "
      );
      error.statusCode = 409;
      throw error;
      // return res
      //   .status(409)
      //   .json(
      //     "Competition with this title already exits ,Try using a different title "
      //   );
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.updateCompetition = async (req, res, next) => {
  let active = req.body.active;
  let registration = req.body.registration;

  const {
    title,
    prize_money,
    content,
    deadline,
    sponsors,
    imageUrl,
    posterUrl,
    problem_statement_link,
    _id,
    max,
    min,
    competitionUrl,
  } = req.body;
  const headKtjId = req.body.headKtjId ? req.body.headKtjId : null;

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
    let competition = await Competition.findById(_id);
    if (!competition) {
      let error = new Error("Competition Not found !");
      error.statusCode = 404;
      throw error;
      // return res.status(404).json({ message: "Competition Not found" });
    }
    competition.title = title;
    competition.content = content;
    competition.prize_money = prize_money;
    competition.deadline = deadline;
    competition.problem_statement_link = problem_statement_link;
    competition.headKtjId = headKtjId;
    competition.headObjectId = headObjectId;
    if (active != null) competition.active = active;
    if (registration != null) competition.registration = registration;
    competition.imageUrl = imageUrl;
    competition.posterUrl = posterUrl;
    competition.max = max;
    competition.min = min;
    competition.competitionUrl = competitionUrl;
    competition.sponsors = sponsors;

    if (imageUrl !== competition.imageUrl) {
      clearImage(path.join(__dirname, "..", competition.imageUrl));
      competition.imageUrl = imageUrl;
    }
    await competition.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated competition ",
        title,
      },
      next
    );
    return res.status(200).json({
      message: "Competition details updated successfully",
      competition: competition,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
