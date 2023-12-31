const SubscriptionModel = require("../models/subscription-model");
const UserModel = require("../models/user-model");
const PublisherModel = require("../models/publisher-model");

const subscription_controller = {
  getAll: async (req, res) => {
    const subscriptions = await SubscriptionModel.find({});

    if (subscriptions.length === 0) {
      res.status(204).send({
        message: "Empty subscriptions data",
      });
    } else {
      res.status(200).send({
        message: "Successfully getted",
        data: subscriptions,
      });
    }
  },
  getOne: async (req, res) => {
    const { id } = req.params;
    const subscription = await SubscriptionModel.findById(id);

    if (subscription) {
      res.send({
        message: "Successfully getted subscription",
        data: subscription,
      });
    } else {
      res.status(404).send({
        message: "Subscription not found",
      });
    }
  },
  post: async (req, res) => {
    try {
      const newSubscription = new SubscriptionModel(req.body);
      const createdSubscription = await newSubscription.save();

      const findUser =
        (await UserModel.findById(createdSubscription.userId)) ||
        (await PublisherModel.findById(createdSubscription.userId));

      findUser.subscriptions.push(createdSubscription._id);

      // burada necəsə, tapılan accountun user yoxsa publisher olduğunu təyin etməliydim.
      if (findUser.isAdmin == false || findUser.isAdmin == true) {
        console.log("11");
        await UserModel.findByIdAndUpdate(findUser._id, findUser);
      } else {
        console.log("22");
        await PublisherModel.findByIdAndUpdate(findUser._id, findUser);
      }

      res.send({
        message: "Subscription is successfully created",
        data: newSubscription,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;

    const { userId } = req.body;

    try {
      const findUser =
        (await UserModel.findById(userId)) ||
        (await PublisherModel.findById(userId));

      if (!findUser) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      findUser.subscriptions = findUser.subscriptions.filter(
        (item) => item.toString() !== id
      );

      await findUser.save();

      const deletedData = await SubscriptionModel.findById(id);
      await SubscriptionModel.findByIdAndDelete(id);

      if (deletedData) {
        res.send({
          message: "Subscription successfully deleted",
          data: deletedData,
        });
      } else {
        res.status(404).send({
          message: "Subscription not found",
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  patch: async (req, res) => {
    const { id } = req.params;

    try {
      await SubscriptionModel.findByIdAndUpdate(id, req.body);
      const updatedData = await SubscriptionModel.findById(id);

      res.send({
        message: "Subscription updated successfully.",
        data: updatedData,
      });
    } catch (err) {
      console.error(err);
      res.status(500).send({
        message: "Internal server error",
      });
    }
  },
  getAllSubscribedPublishers: async (req, res) => {
    const { userId } = req.params;

    try {
      const user =
        (await UserModel.findById(userId).populate({
          path: "subscriptions",
          populate: {
            path: "publisherId",
          },
        })) ||
        (await PublisherModel.findById(userId).populate({
          path: "subscriptions",
          populate: {
            path: "publisherId",
          },
        }));

      const subscribedPublishers = await PublisherModel.find({
        _id: user.subscriptions.map((item) => item.publisherId._id),
      });

      return res.send({
        message: "successusus",
        data: subscribedPublishers,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).send({
        message: "Internal server error",
      });
    }
  },
};

module.exports = subscription_controller;
