const mongoose = require("mongoose");
const webpush = require("web-push");
const SubscriptionModel = require("../models/NotificationSubscriber");
const q = require("q");
const activityController = require("./activity_controller");
const Notification = require("../models/Notification");
const vapidKeys = {
  publicKey:
    "BGAFZ9hQZDF4GhJ_NWZkZWbt3U8X6hzjp9Hm_rFig7DZTcaZFyNgLaHqV71_9OhkqC47PKGdnuWrqRjJ4pvPed8",
  privateKey: "Xw5p8pPxLAqTDZ5MLaK-R7YEAHerkIfO7Y0emWCLc4Q",
};

exports.pushNotification = async (req, res, next) => {
  const { title, message, imageurl, redirecturl } = req.body;

  const payload = {
    title,
    message,
    imageurl,
    redirecturl,
  };

  SubscriptionModel.find({}, (err, subscriptions) => {
    if (err) {
      console.error(`Error occurred while getting subscriptions`);

      res.status(500).json({
        error: " error occurred",
      });
    } else {
      let SubscriptionCalls = subscriptions.map((subscription) => {
        return new Promise((resolve, reject) => {
          const pushSubscription = {
            endpoint: subscription.endpoint,
            keys: {
              p256dh: subscription.keys.p256dh,
              auth: subscription.keys.auth,
            },
          };

          const pushPayload = JSON.stringify(payload);
          const pushOptions = {
            vapidDetails: {
              subject: "http://ktj.in/",
              privateKey: vapidKeys.privateKey,
              publicKey: vapidKeys.publicKey,
            },
            headers: {},
          };

          webpush
            .sendNotification(pushSubscription, pushPayload, pushOptions)
            .then((value) => { })
            .catch((err) => {
              reject({
                status: false,
                endpoint: subscription.endpoint,
                data: err,
              });
            });
        });
      });

      q.allSettled(SubscriptionCalls).then((pushResults) => {
        // console.info(pushResults);
      });
      res.json({
        message: "Notification sent Successfully",
      });
    }
  });
  const notification = new Notification({
    title,
    message,
    redirectUrl: redirecturl,
    imageUrl: imageurl,
  });

  await notification.save();

  await activityController.createActivity(
    {
      userId: req.userIdForActivity,
      description: "Send Notification",
    },
    next
  );
};

exports.getNotifications = async (req, res, next) => {
  try {
    let notifications = await Notification.find().limit(20);
    return res
      .status(200)
      .json({ message: "Notifications Fetched Successfully", notifications });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};

exports.testNotification = async (req, res, next) => {
  const { title, message, imageurl, redirecturl } = req.body;

  const subscription = JSON.parse(req.body.subscription);

  const payload = {
    title,
    message,
    imageurl,
    redirecturl,
  };

  const pushSubscription = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    },
  };

  const pushPayload = JSON.stringify(payload);
  const pushOptions = {
    vapidDetails: {
      subject: "http://ktj.in/",
      privateKey: vapidKeys.privateKey,
      publicKey: vapidKeys.publicKey,
    },
    headers: {},
  };

  webpush
    .sendNotification(pushSubscription, pushPayload, pushOptions)
    .then((value) => {
      return res.status(200).json({
        message: " Notification test Successfully",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });

  await activityController.createActivity(
    {
      userId: req.userIdForActivity,
      description: "Test Notification",
    },
    next
  );
};

exports.subscribeNotification = (req, res) => {
  const subscriptionModel = new SubscriptionModel(req.body);

  SubscriptionModel.find(
    { endpoint: subscriptionModel.endpoint },
    (err, doc) => {
      if (doc?.length) {
        res.json({
          data: "Subscription Already exit",
        });
      } else {
        subscriptionModel.save((err, subscription) => {
          if (err) {
            console.error(
              `Error occurred while saving subscription. Err: ${err}`
            );
            res.status(500).json({
              error: " error occurred",
            });
          } else {
            res.json({
              data: "Subscription saved.",
            });
          }
        });
      }
    }
  );
};
exports.getUserCount = async (req, res, next) => {
  try {
    let count = await SubscriptionModel.countDocuments();
    return res.status(200).json({
      success: true,
      message: " Notification Subscribed users Counts fetched",
      count,
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 400;
    }
    next(error);
  }
};