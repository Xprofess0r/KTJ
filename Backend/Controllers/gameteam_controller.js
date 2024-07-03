const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let Gameteam = require("../models/gameteam.model");
let User = require("../models/user.model");
let Event = require("../models/events.model");
let Game = require("../models/game.model");
exports.teamLogin = (req, res) => {
  res.json({ message: "Auth successful, Welcome" });
};

// this is for competition registration only
exports.teamRegister = async (req, res, next) => {
  let regErrors = {};
  const captain = req.body.ktjID; // captain ktj id(users creating the team)
  const totalteam = req.body.members; // (teammates);
  const title = req.body.title;
  const gameId = req.body.gameId; // user registering for the event id ;
  const game_type = req.body.game_type; // user registering for the event id ;
  const in_game_id = req.body.in_game_id; // user registering for the event id ;
  const ign = req.body.ign; // user registering for the event id ;
  const teamName = req.body.teamName; // user registering for the event id ;
  console.log(req.body);
  let ktjID =
    "24KTJ" +
    title.substr(0, 3).toUpperCase() +
    captain[5] +
    Math.floor(Math.random() * 899999 + 100000).toString(10); //team ktj id
  try {
    // checking if the created team id already exist or not
    let team_check = await Gameteam.findOne({ ktjID: `${ktjID}` });
    while (team_check != null) {
      ktjID =
        "24KTJ" +
        title.substr(0, 3).toUpperCase() +
        captain[5] +
        Math.floor(Math.random() * 899999 + 100000).toString(10);
      team_check = await Gameteam.findOne({ ktjID: `${ktjID}` });
    }
    let flag = true;
    let members = totalteam;
    const team = {
      ktjID,
      captain,
      members,
      gameId,
      game_type,
      in_game_id,
      ign,
      teamName,
    };
    const newTeam = new Gameteam(team); // creating new team
    let user = new Array(totalteam.length);
    // checking if the any member has already registered with the above event
    // on the basis of event id
    for (i in totalteam) {
      // const query = { _id: `${totalteam[i]}` };
      user[i] = await User.findById(totalteam[i]);
      if (user[i].games.includes(`${gameId}`)) {
        eString =
          "User : " + user[i].ktjID + " has already registered for this game.";
        // regErrors.regError = eString;
        // return res.status(404).json(regErrors);
        const error = new Error(eString);
        error.statusCode = 422;
        // error.ktjId = totalteam[i];
        throw error;
      }
    }
    if (flag) {
      let event_doc = await Game.findById(gameId);
      console.log(event_doc);
      const reg_team = await Gameteam.findOne({
        members,
        gameId,
      });
      // checking if the team with same members is already registered within same event
      if (reg_team != null) {
        const error = new Error(
          "Already registered with teamID : " + reg_team.ktjID
        );
        error.statusCode = 404;
        throw error;
      } else if (event_doc == null) {
        const error = new Error("Err : No such event !");
        error.statusCode = 404;
        throw error;
      } else {
        let captain_data;
        event_doc.teams.push(newTeam._id);
        await newTeam.save();
        await event_doc.save();
        for (i in totalteam) {
          user[i].gameteams.push(newTeam._id); // pushing team ktj id in the users team info
          user[i].games.push(gameId); // event id in the users event info
          if (user[i].ktjID == captain) captain_data = user[i];
          await user[i].save();
        }
        let userData = await User.findById(captain_data._id)
          .populate({
            path: "issues_Raised",
          })
          .populate({
            path: "issues_to_solve",
            populate: {
              path: "user",
              select: ["username", "email", "phone"],
            },
          })
          .populate("competitions", ["title"])
          .populate("games", ["title"]);

        const teamID = ktjID;
        res.status(200).json({ team, userData });
      }
    }
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.deleteTeam = async (req, res, next) => {
  try {
    const { teamId, gameId } = req.body;
    let captain = req.body.captain;
    // check if the event exist
    let event = await Game.findById(gameId);
    if (!event) {
      const error = new Error("Game Does not exist!!");
      error.statusCode = 400;
      throw error;
    }
    // check if team exist
    let team = await Gameteam.findOne({ _id: teamId, gameId: gameId });
    if (!team) {
      const error = new Error("Team not found!!");
      error.statusCode = 404;
      throw error;
    }

    // delete team from
    // event db
    event.teams.pull(teamId);
    await event.save();
    // every user db
    for (user of team.members) {
      user = await User.findById(user);
      user.gameteams.pull(teamId);
      user.games.pull(gameId);
      // sending updated user data to  update the user in the profile
      if (user.kjtID === captain) {
        captain = user;
      }
      await user.save();
    }
    // team db
    await team.delete();
    captain = await User.findById(captain._id)
      .populate({
        path: "issues_Raised",
      })
      .populate({
        path: "issues_to_solve",
        populate: {
          path: "user",
          select: ["username", "email", "phone"],
        },
      })
      .populate("competitions", ["title"])
      .populate("games", ["title"]);
    return res
      .status(200)
      .json({ message: "Team deleted successfully", userData: captain });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.eventTeamDetails = async (req, res, next) => {
  try {
    const {gameId, teamId } = req.body;
    console.log("we are finding gameId,teamId",gameId," now ",teamId);

    let event = await Game.findById(gameId);
    console.log("we get the event",event);
    if (!event) {
      const error = new Error("Event Does not exist!!");
      error.statusCode = 400;
      throw error;
    }
    let team = await Gameteam.findOne({ _id: teamId}).populate(
      "members",
      ["ktjID", "username", "_id"]
    );
    console.log("team are",team);
    console.log("Now let we check user",req.user);

    if (!team) {
      const error = new Error("Team not found 1!!");
      error.statusCode = 404;
      throw error;
    }
    if (
      !team.members
        .map((member) => {
          return member._id;
        })
        .includes(req.user._id)
    ) {
      const error = new Error("Team not found 2!!");
      error.statusCode = 422;
      throw error;
    }

    return res
      .status(200)
      .json({ message: "Team details fetched successfully", team });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.editTeam = async (req, res, next) => {
  try {
    // member is basically user id of the member to be added
    const { teamId, gameId, members, in_game_id, ign, teamName } = req.body;
    let team = await Gameteam.findOne({ _id: teamId});
    if (!team) {
      const error = new Error("Team not found!!");
      error.statusCode = 404;
      throw error;
    }
    // although we handle this in frontend stil a security check
    if (req.user.ktjID !== team.captain) {
      const error = new Error(
        "Not Authorized!! Only Captain Can edit the team"
      );
      error.statusCode = 404;
      throw error;
    }
    // checking if event exists or not
    let event = await Game.findById(gameId, ["title"]);
    if (!event) {
      const error = new Error("Event Does not exist!!");
      error.statusCode = 400;
      throw error;
    }
    // remove all the old members from team and user respective
    let old_members = [...team.members];
    for (let i of old_members) {
      let user = await User.findById(i);
      if (user) {
        user.gameteams.pull(teamId);
        user.games.pull(gameId);
        await user.save();
      }
    }
    // adding new members to the team if they are not already registered for the above event
    let new_members = [...members];
    let users = new Array(new_members.length);
    for (let i in new_members) {
      users[i] = await User.findById(new_members[i]);
      if (users[i]) {
        if (users[i].games.includes(gameId)) {
          const error = new Error(
            `${users[i].ktjID} is already registered for ${event.title} via another Team`
          );
          error.statusCode = 404;
          throw error;
        }
      }
    }
    // if now user was found already registerd then we are adding new members to the team
    for (let user of users) {
      user.gameteams.push(teamId);
      user.games.push(gameId);
      await user.save();
    }
    team.members = members;
    team.in_game_id = in_game_id;
    team.ign = ign;
    team.teamName = teamName;
    await team.save();

    return res.status(201).json({ message: "Team Updated Successfully", team });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
