const express = require("express");
const { users, publishers, tags, news } = require("./db");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT;

//#region USERS API START
app.get("/api/users", (req, res) => {
  if (users.length === 0) {
    res.status(204).send({
      message: "Empty users data",
    });
  } else {
    res.status(200).send({
      message: "Successfully getted",
      data: users,
    });
  }
});

app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  const deletedDataIdx = users.findIndex((item) => item.id == id);
  const deletedData = users.splice(deletedDataIdx, 1);

  if (deletedDataIdx === -1) {
    res.status(404).send({
      message: "User not found",
    });
  } else {
    res.send({
      message: "User successfully deleted",
      data: deletedData,
    });
  }
});

app.post("/api/users", (req, res) => {
  const { username, fullName, email, password, profileImage, isAdmin } =
    req.body;

  const id = crypto.randomBytes(16).toString("hex");

  const newUser = {
    id,
    username,
    fullName,
    email,
    password,
    profileImage,
    isAdmin,
  };

  users.push(newUser);

  res.send({
    message: "User is successfully registered",
    data: newUser,
  });
});

app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, password, profileImage, isAdmin } =
    req.body;

  const data = users.find((item) => item.id == id);

  const updatedUser = {
    id: data.id,
    isAdmin: data.isAdmin,
  };

  if (username) {
    updatedUser.username = username;
  }

  if (fullName) {
    updatedUser.fullName = fullName;
  }

  if (email) {
    updatedUser.email = email;
  }

  if (password) {
    updatedUser.password = password;
  }

  if (profileImage) {
    updatedUser.profileImage = profileImage;
  }

  const updatedDataIdx = users.findIndex((item) => item.id == id);
  users.splice(updatedDataIdx, 1, updatedUser);

  if (!data) {
    res.status(404).send({
      message: "User not found!",
    });
  } else {
    res.send({
      message: "User edited successfully",
      data: updatedUser,
    });
  }
});

app.patch("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, password, profileImage } = req.body;

  const data = users.find((item) => item.id == id);

  if (username) {
    data.username = username;
  }

  if (fullName) {
    data.fullName = fullName;
  }

  if (email) {
    data.email = email;
  }

  if (password) {
    data.password = password;
  }

  if (profileImage) {
    data.profileImage = profileImage;
  }

  res.send({
    message: "User updated successfully.",
    data,
  });
});
//#endregion USERS API END

//#region PUBLISHERS API START
app.get("/api/publishers", (req, res) => {
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

app.delete("/api/publishers/:id", (req, res) => {
  const { id } = req.params;

  const deletedDataIdx = publishers.findIndex((item) => item.id == id);
  const deletedData = publishers.splice(deletedDataIdx, 1);

  if (deletedDataIdx === -1) {
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

app.post("/api/publishers", (req, res) => {
  const {
    username,
    email,
    password,
    backgroundImg,
    profileImg,
    description,
    name,
    joinedDate,
  } = req.body;

  const id = crypto.randomBytes(16).toString("hex");

  const newPublisher = {
    id,
    username,
    email,
    password,
    backgroundImg,
    profileImg,
    description,
    name,
    joinedDate,
  };

  publishers.push(newPublisher);

  res.send({
    message: "Publisher is successfully registered",
    data: newPublisher,
  });
});

app.put("/api/publishers/:id", (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    backgroundImg,
    profileImg,
    description,
    name,
    joinedDate,
  } = req.body;

  const data = publishers.find((item) => item.id == id);

  const updatedPublisher = {
    id: data.id,
  };

  if (username) {
    updatedPublisher.username = username;
  }

  if (email) {
    updatedPublisher.email = email;
  }

  if (password) {
    updatedPublisher.password = password;
  }

  if (backgroundImg) {
    updatedPublisher.backgroundImg = backgroundImg;
  }

  if (profileImg) {
    updatedPublisher.profileImg = profileImg;
  }

  if (description) {
    updatedPublisher.description = description;
  }

  if (name) {
    updatedPublisher.name = name;
  }

  if (joinedDate) {
    updatedPublisher.joinedDate = joinedDate;
  }

  const updatedDataIdx = publishers.findIndex((item) => item.id == id);
  publishers.splice(updatedDataIdx, 1, updatedPublisher);

  if (!data) {
    res.status(404).send({
      message: "Publisher not found!",
    });
  } else {
    res.send({
      message: "Publisher edited successfully",
      data: updatedPublisher,
    });
  }
});

app.patch("/api/publishers/:id", (req, res) => {
  const { id } = req.params;
  const {
    username,
    email,
    password,
    backgroundImg,
    profileImg,
    description,
    name,
    joinedDate,
  } = req.body;

  const data = publishers.find((item) => item.id == id);

  if (username) {
    data.username = username;
  }

  if (email) {
    data.email = email;
  }

  if (password) {
    data.password = password;
  }

  if (backgroundImg) {
    data.backgroundImg = backgroundImg;
  }

  if (profileImg) {
    data.profileImg = profileImg;
  }

  if (description) {
    data.description = description;
  }

  if (name) {
    data.name = name;
  }

  if (joinedDate) {
    data.joinedDate = joinedDate;
  }

  res.send({
    message: "Publisher updated successfully.",
    data,
  });
});
//#endregion PUBLISHERS API END

//#region NEWS API START
app.get("/api/news", (req, res) => {
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

app.delete("/api/news/:id", (req, res) => {
  const { id } = req.params;

  const deletedDataIdx = tags.findIndex((item) => item.id == id);
  const deletedData = tags.splice(deletedDataIdx, 1);

  if (deletedDataIdx === -1) {
    res.status(404).send({
      message: "Tag not found",
    });
  } else {
    res.send({
      message: "Tag successfully deleted",
      data: deletedData,
    });
  }
});

app.post("/api/news", (req, res) => {
  const { name } = req.body;

  const id = crypto.randomBytes(8).toString("hex");

  const newTag = {
    id,
    name,
  };

  tags.push(newTag);

  res.send({
    message: "Tag is successfully created",
    data: newTag,
  });
});

app.put("/api/news/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = tags.find((item) => item.id == id);

  const updatedTag = {
    id: data.id,
  };

  if (name) {
    updatedTag.name = name;
  }

  const updatedDataIdx = tags.findIndex((item) => item.id == id);
  tags.splice(updatedDataIdx, 1, updatedTag);

  if (!data) {
    res.status(404).send({
      message: "Tag not found!",
    });
  } else {
    res.send({
      message: "Tag edited successfully",
      data: updatedTag,
    });
  }
});

app.patch("/api/news/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = tags.find((item) => item.id == id);

  if (name) {
    data.name = name;
  }

  res.send({
    message: "Tag updated successfully.",
    data,
  });
});
//#endregion NEWS API END

//#region TAGS API START
app.get("/api/tags", (req, res) => {
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

app.delete("/api/tags/:id", (req, res) => {
  const { id } = req.params;

  const deletedDataIdx = tags.findIndex((item) => item.id == id);
  const deletedData = tags.splice(deletedDataIdx, 1);

  if (deletedDataIdx === -1) {
    res.status(404).send({
      message: "Tag not found",
    });
  } else {
    res.send({
      message: "Tag successfully deleted",
      data: deletedData,
    });
  }
});

app.post("/api/tags", (req, res) => {
  const { name } = req.body;

  const id = crypto.randomBytes(8).toString("hex");

  const newTag = {
    id,
    name,
  };

  tags.push(newTag);

  res.send({
    message: "Tag is successfully created",
    data: newTag,
  });
});

app.put("/api/tags/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = tags.find((item) => item.id == id);

  const updatedTag = {
    id: data.id,
  };

  if (name) {
    updatedTag.name = name;
  }

  const updatedDataIdx = tags.findIndex((item) => item.id == id);
  tags.splice(updatedDataIdx, 1, updatedTag);

  if (!data) {
    res.status(404).send({
      message: "Tag not found!",
    });
  } else {
    res.send({
      message: "Tag edited successfully",
      data: updatedTag,
    });
  }
});

app.patch("/api/tags/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const data = tags.find((item) => item.id == id);

  if (name) {
    data.name = name;
  }

  res.send({
    message: "Tag updated successfully.",
    data,
  });
});
//#endregion TAGS API END

app.listen(PORT, () => console.log(`Listening on port ${PORT}..`));
