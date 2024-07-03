const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

let Team = require("../models/team.model");
let User = require("../models/user.model");
let Event = require("../models/events.model");
let Competition = require("../models/competition.model");
exports.teamLogin = (req, res) => {
  res.json({ message: "Auth successful, Welcome" });
};

// this is for competition registration only
exports.teamRegister = async (req, res, next) => {
  let regErrors = {};
  const captain = req.body.ktjID; // captain ktj id(users creating the team)
  const title = req.body.title; //(title of the competition or event);
  const username = req.body.members; // (teammates);
  const eventId = req.body.eventId; // user registering for the event id ;
  const category = req.body.category?req.body.category:"";
  let ktjID =
    "24KTJ" +
    title.substr(0, 3).toUpperCase() +
    captain[5] +
    Math.floor(Math.random() * 899999 + 100000).toString(10); //team ktj id
  try {
    // checking if the created team id already exist or not
    let team_check = await Team.findOne({ ktjID: `${ktjID}` });
    while (team_check != null) {
      ktjID =
        "24KTJ" +
        title.substr(0, 3).toUpperCase() +
        captain[5] +
        Math.floor(Math.random() * 899999 + 100000).toString(10);
      team_check = await Team.findOne({ ktjID: `${ktjID}` });
    }
    let flag = true;
    let members = username;
    let event = title;
    const team = { ktjID, captain, members, event, eventId, category };
    const newTeam = new Team(team); // creating new team
    let user = new Array(username.length);
    // checking if the any member has already registered with the above event
    // on the basis of event id
    for (i in username) {
      // const query = { _id: `${username[i]}` };
      user[i] = await User.findById(username[i]);
      if (user[i].competitions.includes(`${eventId}`)) {
        eString =
          "User : " + user[i].ktjID + " has already registered for this event.";
        // regErrors.regError = eString;
        // return res.status(404).json(regErrors);
        const error = new Error(eString);
        error.statusCode = 422;
        // error.ktjId = username[i];
        throw error;
      }
    }
    if (flag) {
      let event_doc = await Competition.findById(eventId);
      const reg_team = await Team.findOne({
        members: members,
        eventId: eventId,
   
      });
      // checking if the team with same members is already registered within same event
      if (reg_team != null && reg_team.event == event) {
        const error = new Error(
          "Already registered with teamID : " + reg_team.ktjID
        );
        error.statusCode = 404;
        throw error;
      } else if (event_doc == null) {
        const error = new Error("Err : no such event !");
        error.statusCode = 404;
        throw error;
      } else {
        let captain_data;
        event_doc.teams.push(newTeam._id);
        await newTeam.save();
        await event_doc.save();
        for (i in username) {
          user[i].teams.push(newTeam._id); // pushing team ktj id in the users team info
          user[i].competitions.push(eventId); // event id in the users event info
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

// exports.teamAddMember = async (req, res, next) => {
//   try {
//     // member is basically user id of the member to be added
//     const { teamId, eventId, member } = req.body;
//     let team = await Team.findOne({ _id: teamId, eventId: eventId });
//     if (!team) {
//       const error = new Error("Team not found!!");
//       error.statusCode = 404;
//       throw error;
//     }
//     // verifying
//     let user = await User.findOne({ ktjID: member });
//     if (!user) {
//       const error = new Error("KTJ Id invalid");
//       error.statusCode = 400;
//       throw error;
//     }

//     // checking if event exists or not
//     let event = await Competition.findById(eventId);
//     if (!event) {
//       const error = new Error("Event Does not exist!!");
//       error.statusCode = 400;
//       throw error;
//     }
//     // checking if the user already a part of this team
//     if (team.members.includes(member)) {
//       const error = new Error("Member already registerd with this team!!");
//       error.statusCode = 404;
//       throw error;
//     }

//     // checking if the users is part of any other team in the same event
//     if (user.competitions.includes(eventId)) {
//       const error = new Error("User already registerd for this event!!");
//       error.statusCode = 404;
//       throw error;
//     }
//     user.teams.push(teamId);
//     user.competitions.push(eventId);
//     team.members.push(member);
//     await team.save();
//     await user.save();
//     return res
//       .status(201)
//       .json({ message: "Member added to the team successfully", team });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 400;
//     }
//     next(error);
//   }
// };

// exports.teamRemoveMember = async (req, res, next) => {
//   try {
//     // member is basically user id of the member to be added
//     const { teamId, eventId, member } = req.body;
//     let team = await Team.findOne({ _id: teamId, eventId: eventId });
//     if (!team) {
//       const error = new Error("Team not found!!");
//       error.statusCode = 404;
//       throw error;
//     }
//     // verifying
//     let user = await User.findOne({ ktjID: member });
//     if (!user) {
//       const error = new Error("KTJ Id invalid");
//       error.statusCode = 400;
//       throw error;
//     }

//     // checking if event exists or not
//     let event = await Competition.findById(eventId);
//     if (!event) {
//       const error = new Error("Event Does not exist!!");
//       error.statusCode = 400;
//       throw error;
//     }
//     // checking if the user already a part of this team
//     if (!team.members.includes(member)) {
//       const error = new Error("Member Not registerd with this team!!");
//       error.statusCode = 404;
//       throw error;
//     }
//     // removing this team from users info
//     user.competitions = user.competitions.filter(
//       (comp) => comp.toString() !== eventId.toString()
//     );
//     user.teams = user.teams.filter(
//       (team) => team.toString() !== teamId.toString()
//     );
//     await user.save();

//     team.members = team.members.filter((mem) => mem !== member);
//     await team.save();
//     return res
//       .status(201)
//       .json({ message: "Member deleted from the team successfully", team });
//   } catch (error) {
//     if (!error.statusCode) {
//       error.statusCode = 400;
//     }
//     next(error);
//   }
// };
exports.deleteTeam = async (req, res, next) => {
  try {
    const { teamId, eventId } = req.body;
    let captain = req.body.captain;
    // check if the event exist
    let event = await Competition.findById(eventId);
    if (!event) {
      const error = new Error("Event Does not exist!!");
      error.statusCode = 400;
      throw error;
    }
    // check if team exist
    let team = await Team.findOne({ _id: teamId, eventId: eventId });
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
      user.teams.pull(teamId);
      user.competitions.pull(eventId);
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
    const { teamId, eventId } = req.body;

    let event = await Competition.findById(eventId);
    if (!event) {
      const error = new Error("Event Does not exist!!");
      error.statusCode = 400;
      throw error;
    }

    let team = await Team.findOne({ _id: teamId, eventId: eventId }).populate(
      "members",
      ["ktjID", "username", "_id"]
    );

    if (!team) {
      const error = new Error("Team not found!!");
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
      const error = new Error("Team not found!!");
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
    const { teamId, eventId, members } = req.body;

    const category = req.body.category?req.body.category:""

    console.log(category)

    
    let team = await Team.findOne({ _id: teamId, eventId: eventId });
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
    let event = await Competition.findById(eventId, ["title"]);
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
        user.teams.pull(teamId);
        user.competitions.pull(eventId);
        await user.save();
      }
    }
    // adding new members to the team if they are not already registered for the above event
    let new_members = [...members];
    let users = new Array(new_members.length);
    for (let i in new_members) {
      users[i] = await User.findById(new_members[i]);
      if (users[i]) {
        if (users[i].competitions.includes(eventId)) {
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
      user.teams.push(teamId);
      user.competitions.push(eventId);
      await user.save();
    }
    team.members = members;
    team.category = category;
    await team.save();

    return res.status(201).json({ message: "Team Updated Successfully", team });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
