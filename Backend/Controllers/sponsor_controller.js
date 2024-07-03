const Sponsor = require("../models/sponsor.model");
const { getFilesPath } = require("../utils/utils");
const activityController = require("./activity_controller");

exports.getAllSponsors = async (req, res, next) => {
  try {
    let sponsors = await Sponsor.find();
    return res
      .status(200)
      .json({ message: "Successfully fetched sponsors", sponsors: sponsors });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.getSponsors = async (req, res, next) => {
  const { year: currentYear } = req.query;
  try {
    let sponsors = await Sponsor.find({ year: currentYear })
      .sort({
        order: 1,
      })
      .sort({ priority: 1 });
    return res
      .status(200)
      .json({ message: "Successfully fetched sponsors", sponsors: sponsors });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.updateSponsor = async (req, res, next) => {
  const { sponsorTypeId, sponsorId, sponsorName, sponsorImg, linktoWebsite } =
    req.body;
  let active = req.body.active;
  let registration = req.body.registration;
  try {
    const sponsorOfType = await Sponsor.findById(sponsorTypeId);
    if (!sponsorOfType) {
      let error = new Error("Sponsor not found ");
      error.statusCode = 404;
      throw error;
      //   return res.status(404).json({ message: "Sponsor not found" });
    }
    let sponsorIndex = sponsorOfType.sponsors.findIndex(
      (spon) => spon._id.toString() === sponsorId.toString()
    );
    sponsorOfType.sponsors[sponsorIndex] = {
      sponsorName,
      sponsorImg,
      linktoWebsite,
    };
    await sponsorOfType.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Sponsor :" + sponsorName,
      },
      next
    );
    return res.status(200).json({ message: "Sponsor updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
exports.editPriority = async (req, res, next) => {
  const { priority, year, sponsorType } = req.body;

  try {
    await Sponsor.updateOne(
      { sponsorType: sponsorType, year: year },
      { priority: priority }
    );
    return res.status(200).json({ message: "Priority updated successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.deleteSponsor = async (req, res, next) => {
  const { sponsorTypeId, sponsorId } = req.body;
  try {
    let sponsorOfType = await Sponsor.findById(sponsorTypeId);
    sponsorOfType.sponsors = sponsorOfType.sponsors.filter(
      (spon) => spon._id.toString() !== sponsorId.toString()
    );
    await sponsorOfType.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Sponsor",
      },
      next
    );
    return res.status(200).json({ message: "Sponsor deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const { sponsorTypeId } = req.body;
  try {
    let sponsorOfType = await Sponsor.findById(sponsorTypeId);

    await sponsorOfType.delete();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Deleted Sponsor",
      },
      next
    );
    return res.status(200).json({ message: "Sponsor deleted Successfully" });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.editSponsorCategory = async (req, res, next) => {
  const { sponsorType, sponsorTypeId, year, priority, order } = req.body;
  // const sponsorImg = getFilesPath([req.file]);
  try {
    const sponsorCategory = await Sponsor.findById(sponsorTypeId);
    if (!sponsorCategory) {
      let error = new Error("Sponsor not found ");
      error.statusCode = 404;
      throw error;
      //   return res.status(404).json({ message: "Sponsor not found" });
    }

    sponsorCategory.sponsorType = sponsorType;
    sponsorCategory.year = year;
    sponsorCategory.priority = priority;
    sponsorCategory.order = order;

    await sponsorCategory.save();

    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Sponsor category :" + sponsorType,
      },
      next
    );
    return res.status(200).json({
      message: sponsorType + " Sponsor category Updated Successfully",
      sponsors: sponsorCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.editSponsor = async (req, res, next) => {
  const {
    sponsorName,
    sponsorId,
    sponsorTypeId,
    sponsorType,
    year,
    linktoWebsite,
    sponsorImg,
  } = req.body;
  // const sponsorImg = getFilesPath([req.file]);
  try {
    const sponsorOfType = await Sponsor.findById(sponsorTypeId);
    if (!sponsorOfType) {
      let error = new Error("Sponsor not found ");
      error.statusCode = 404;
      throw error;
      //   return res.status(404).json({ message: "Sponsor not found" });
    }
    let sponsorIndex = sponsorOfType.sponsors.findIndex(
      (spon) => spon._id.toString() === sponsorId.toString()
    );
    sponsorOfType.sponsors[sponsorIndex] = {
      sponsorName,
      sponsorImg,
      linktoWebsite,
    };
    await sponsorOfType.save();

    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Updated Sponsor  :" + sponsorName,
      },
      next
    );
    return res.status(200).json({
      message: sponsorName + " Sponsor  Updated Successfully",
      sponsors: sponsorOfType,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.createSponsorCategory = async (req, res, next) => {
  const { sponsorType, year, priority, order } = req.body;
  // const sponsorImg = getFilesPath([req.file]);
  try {
    let sponsorCategory = new Sponsor({
      sponsorType,
      priority,
      order,
      year,
    });

    await sponsorCategory.save();

    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Created Sponsor category :" + sponsorType,
      },
      next
    );
    return res.status(200).json({
      message: sponsorType + " Sponsor category created Successfully",
      sponsors: sponsorCategory,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.createSponsor = async (req, res, next) => {
  const { sponsorName, sponsorType, year, linktoWebsite, sponsorImg } =
    req.body;
  // const sponsorImg = getFilesPath([req.file]);
  try {
    let sponsorsOfType = await Sponsor.findOne({
      sponsorType: sponsorType,
      year: year,
    });

    let newsponsor = {
      sponsorName,
      sponsorImg,
      linktoWebsite,
    };
    sponsorsOfType.sponsors = [...sponsorsOfType.sponsors, newsponsor];
    await sponsorsOfType.save();
    await activityController.createActivity(
      {
        userId: req.userIdForActivity,
        description: "Created Sponsor :" + sponsorName,
      },
      next
    );
    return res.status(200).json({
      message: sponsorName + " Sponsor created Successfully",
      sponsor: newsponsor,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};
