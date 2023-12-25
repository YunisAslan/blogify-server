const SubscriptionModel = require("../models/subscription-model");

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
      await newSubscription.save();

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

    const deletedData = await SubscriptionModel.findById(id);
    await SubscriptionModel.findByIdAndDelete(id);

    try {
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
};

module.exports = subscription_controller;
