const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());
app.use(
  cors({
    origin:"https://socio-media-delta.vercel.app",
    credentials: true,
  })
);
app.use(morgan("common"));

// Routes Path
const userRoutes = require("./routes/userRoutes");
const postRoutes = require("./routes/postRoutes");

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", postRoutes);

// Demo Route
app.get("/", (req, res) => {
  res.send(
    "Social Media Server Running Perfectly || Local Host Added LL || Cloduinary Added || Product Cors Added || Search Functionality Added"
  );
  res.redirect("https://socio-media-delta.vercel.app")
});

module.exports = app;
