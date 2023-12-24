const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3030;

// Schemas
const UserSchema = new mongoose.Schema({
  username: String,
  fullName: String,
  email: String,
  password: String,
  profileImage: String,
  isAdmin: Boolean,
});

const PublisherSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  backgroundImg: String,
  profileImg: String,
  name: String,
  description: String,
  joinedDate: String,
});

const NewsSchema = new mongoose.Schema({
  id: String,
  title: String,
  newsBody: String,
  linkURL: String,
  thumbnailImg: String,
  createdAt: String,
});

const TagSchema = new mongoose.Schema({
  name: String,
  newsId: String,
});

const SubscriptionSchema = new mongoose.Schema({
  userId: String,
  publisherId: String,
});

// Models
const UserModel = mongoose.model("users", UserSchema);
const PublisherModel = mongoose.model("publishers", PublisherSchema);
const NewsModel = mongoose.model("news", NewsSchema);
const TagModel = mongoose.model("tags", TagSchema);
const SubscriptionModel = mongoose.model("subscriptions", SubscriptionSchema);

//#region USERS API START
app.get("/api/users", async (req, res) => {
  const { name } = req.query;
  const users = await UserModel.find({});

  if (name) {
    const filteredUsers = users.filter((user) =>
      user.username.toLowerCase().trim().includes(name.toLowerCase().trim())
    );

    res.send(filteredUsers);
  } else {
    res.send({
      message: "Successfully getted data",
      data: users,
    });
  }
});

// get by ID
app.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.findById(id);

  if (user) {
    res.send({
      message: "Successfully getted user",
      data: user,
    });
  } else {
    res.status(404).send({
      message: "User not found",
    });
  }
});

app.post("/api/users", async (req, res) => {
  try {
    const newUser = new UserModel(req.body);
    await newUser.save();

    res.send({
      message: "User is successfully registered",
      data: newUser,
    });
  } catch (err) {
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.delete("/api/users/:id", async (req, res) => {
  const { id } = req.params;

  const deletedUser = await UserModel.findById(id);
  await UserModel.findByIdAndDelete(id);

  if (!deletedUser) {
    res.status(404).send({
      message: "User not found",
    });
  } else {
    res.send({
      message: "User successfully deleted",
      data: deletedUser,
    });
  }
});

app.patch("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  const updatedData = await UserModel.findByIdAndUpdate(id, updatedUser);

  res.send({
    message: "User updated successfully.",
    data: updatedData,
  });
});
//#endregion USERS API END

//#region PUBLISHERS API START
app.get("/api/publishers", async (req, res) => {
  const publishers = await PublisherModel.find({});

  if (publishers.length === 0) {
    res.status(204).send({
      message: "Empty publishers data",
    });
  } else {
    res.status(200).send({
      message: "Successfully getted",
      data: publishers,
    });
  }
});

app.get("/api/publishers/:id", async (req, res) => {
  const { id } = req.params;
  const publisher = await PublisherModel.findById(id);

  if (publisher) {
    res.send({
      message: "Successfully getted publisher data",
      data: publisher,
    });
  } else {
    res.status(404).send({
      message: "Publisher not found",
    });
  }
});

app.post("/api/publishers", async (req, res) => {
  try {
    const newPublisher = new PublisherModel(req.body);
    await newPublisher.save();

    res.send({
      message: "Publisher is successfully registered",
      data: newPublisher,
    });
  } catch (err) {
    console.error(err);

    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.delete("/api/publishers/:id", async (req, res) => {
  const { id } = req.params;

  const deletedData = await PublisherModel.findById(id);
  await PublisherModel.findByIdAndDelete(id);

  if (!deletedData) {
    res.status(404).send({
      message: "Publisher not found",
    });
  } else {
    res.send({
      message: "Publisher successfully deleted",
      data: deletedData,
    });
  }
});

app.patch("/api/publishers/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await PublisherModel.findByIdAndUpdate(id, req.body);
    const updatedPublisher = await PublisherModel.findById(id);

    res.send({
      message: "Publisher updated successfully.",
      data: updatedPublisher,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});
//#endregion PUBLISHERS API END

//#region NEWS API START
app.get("/api/news", async (req, res) => {
  const news = await NewsModel.find({});

  if (news.length === 0) {
    res.status(204).send({
      message: "Empty news data",
    });
  } else {
    res.status(200).send({
      message: "Successfully getted",
      data: news,
    });
  }
});

app.get("/api/news/:id", async (req, res) => {
  const { id } = req.params;
  const newsData = await NewsModel.findById(id);

  if (newsData) {
    res.send({
      message: "Successfully getted news",
      data: newsData,
    });
  } else {
    res.status(404).send({
      message: "News not found",
    });
  }
});

app.post("/api/news", async (req, res) => {
  const createdNews = new NewsModel(req.body);
  await createdNews.save();

  try {
    res.send({
      message: "News is successfully created",
      data: createdNews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.delete("/api/news/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedData = await NewsModel.findById(id);
    await NewsModel.findByIdAndDelete(id);

    if (deletedData) {
      res.send({
        message: "News successfully deleted",
        data: deletedData,
      });
    } else {
      res.status(404).send({
        message: "News not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.patch("/api/news/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await NewsModel.findByIdAndUpdate(id, req.body);
    const updatedNews = await NewsModel.findById(id);

    res.send({
      message: "News updated successfully.",
      data: updatedNews,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});
//#endregion NEWS API END

//#region TAGS API START
app.get("/api/tags", async (req, res) => {
  const tags = await TagModel.find({});

  if (tags.length === 0) {
    res.status(204).send({
      message: "Empty tags data",
    });
  } else {
    res.status(200).send({
      message: "Successfully getted",
      data: tags,
    });
  }
});

app.get("/api/tags/:id", async (req, res) => {
  const { id } = req.params;
  const tag = await TagModel.findById(id);

  if (tag) {
    res.send({
      message: "Successfully getted tag",
      data: tag,
    });
  } else {
    res.status(404).send({
      message: "Tag not found",
    });
  }
});

app.post("/api/tags", async (req, res) => {
  try {
    const newTag = new TagModel(req.body);
    await newTag.save();

    res.send({
      message: "Tag is successfully created",
      data: newTag,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.delete("/api/tags/:id", async (req, res) => {
  const { id } = req.params;

  const deletedData = await TagModel.findById(id);
  await TagModel.findByIdAndDelete(id);

  try {
    if (deletedData) {
      res.send({
        message: "Tag successfully deleted",
        data: deletedData,
      });
    } else {
      res.status(404).send({
        message: "Tag not found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});

app.patch("/api/tags/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await TagModel.findByIdAndUpdate(id, req.body);
    const updatedData = await TagModel.findById(id);

    res.send({
      message: "Tag updated successfully.",
      data: updatedData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({
      message: "Internal server error",
    });
  }
});
//#endregion TAGS API END

//#region SUBSCRIPTIONS API START
app.get("/api/subscriptions", async (req, res) => {
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
});

app.get("/api/subscriptions/:id", async (req, res) => {
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
});

app.post("/api/subscriptions", async (req, res) => {
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
});

app.delete("/api/subscriptions/:id", async (req, res) => {
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
});

app.patch("/api/subscriptions/:id", async (req, res) => {
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
});
//#endregion SUBSCRIPTIONS API END

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));

mongoose
  .connect(
    process.env.DB_CONNECTION_KEY.replace("<password>", process.env.DB_PASSWORD)
  )
  .then(() => console.log("Connected to MongoDB!"));
