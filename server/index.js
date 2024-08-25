require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoute = require("./routes/auth");
const youtubeRoute = require("./routes/youtube");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/youtube", youtubeRoute);

app.listen("5000", () => {
  console.log("Listening on port 5000");
});
