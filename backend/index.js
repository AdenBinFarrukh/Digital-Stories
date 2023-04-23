const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
// const cors = require("cors");
const multer = require("multer");
const path = require("path");

const _dirname = path.dirname("");

dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("Connected to MongoDB");
    }
);

//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
// app.use(cors());

//* Store Image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "Public/Images");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(
            null,
            file.fieldname +
                "-" +
                uniqueSuffix +
                path.extname(file.originalname)
        );
    },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    try {
        res.status(200).json({ filename: req.file.filename });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error uploading file" });
    }
});

// define route to serve uploaded files
app.use("/Images", express.static(path.join(__dirname, "Public/Images")));

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);

//* Connect to front end
const buildPath = path.join(_dirname, "../frontend/build");
app.use(express.static(buildPath));
app.get("/*", function (req, res) {
    res.sendFile(
        path.join(__dirname, "../frontend/build/index.html"),
        function (err) {
            if (err) {
                res.status(500).send(err);
            }
        }
    );
});

app.listen(8800, () => {
    console.log("Backend server is running!");
});
