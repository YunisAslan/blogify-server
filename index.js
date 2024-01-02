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

const router = require("./routers");

app.use("/api/users", router.user);
app.use("/api/publishers", router.publisher);
app.use("/api/news", router.news);
app.use("/api/tags", router.tag);
app.use("/api/subscriptions", router.subscription);

// multer stuffs
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (_req, _file, done) => {
    done(null, path.join(__dirname, "uploads/"));
  },
  filename: (_req, file, done) => {
    done(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
});

app.use("/uploads", express.static("uploads"));
app.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    if (req.file) {
      const imageUrl = `${req.protocol}://${req.get("host")}/public/${
        req.file.filename
      }`;

      const dbJson = await fs.readFile("db.json", "utf-8");
      const data = JSON.parse(dbJson);

      data.images.push(imageUrl);

      await fs.writeFile("db.json", JSON.stringify(data, null, 2));

      res.json({ url: imageUrl });
    } else {
      res.status(400).json({ error: "No file uploaded." });
    }
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(process.env.PORT || 3030, () =>
  console.log(`Listening on port ${process.env.PORT}..`)
);
