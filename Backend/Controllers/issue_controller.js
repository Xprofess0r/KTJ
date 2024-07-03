const { response } = require("express");
const Issue = require("../models/issue.model");
const User = require("../models/user.model");

exports.getIssues = async (req, res, next) => {
  // later will change to get the userid from the session info outlineStyle:
  let userId = req.query.userId;
  try {
    let user = await User.findById(userId)
      .populate({
        path: "issues_Raised",
      })
      .populate({
        path: "issues_to_solve",
        populate: {
          path: "user",
          select: ["username", "email", "phone"],
        },
      });
    return res.status(200).json({
      message: "Issues fetched successfully",
      issues:
        user.userType == "normal" ? user.issues_Raised : user.issues_to_solve,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.createIssue = async (req, res, next) => {
  const { userId, headId, eventType, eventName, subject, description, status } =
    req.body;
  try {
    let issue = new Issue({
      user: userId,
      head: headId,
      eventType,
      eventName,
      subject,
      description,
      status,
    });

    await issue.save();
    let user = await User.findById(userId);
    user.issues_Raised.push(issue._id);
    await user.save();

    let head = await User.findById(headId);
    head.issues_to_solve.push(issue._id);
    await head.save();
    return res.json({
      message:
        "Issue created Successfully.You will soon recieve solution for it over mail",
      issue: issue,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.issueSolved = async (req, res, next) => {
  const { issueId } = req.body;
  try {
    let issue = await Issue.findById(issueId);
    issue.status = false;
    await issue.save();
    return res.json({ message: "Issue status updated Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
