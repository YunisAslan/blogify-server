const express = require("express");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

require("./config/db");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
// to serve static images
app.use(express.static("public"));

const router = require("./routers");

app.use("/api/users", router.user);
app.use("/api/publishers", router.publisher);
app.use("/api/news", router.news);
app.use("/api/tags", router.tag);
app.use("/api/subscriptions", router.subscription);

app.listen(process.env.PORT || 3030, () =>
  console.log(`Listening on port ${process.env.PORT}..`)
);
