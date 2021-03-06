const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const bodyParser = require("body-parser");

const routersUrls = require("./routes/routes");
const routerUserUrls = require("./routes/users.js");
const groupsUrls = require("./routes/groups.js");
const eventUrls = require("./routes/events.js");
const activityUrls = require("./routes/activity.js");

dotenv.config();

let config = require("config");

mongoose.connect(config.DBHost, () => console.log("Database connected"));
// mongoose.connect(process.env.DB_URL, () => console.log("Database connected"));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(helmet());

app.use("/api/group", groupsUrls);
// nw czy git
app.use("/api/event", eventUrls);
app.use("/api/activity", activityUrls);
//
app.use("/api", routersUrls);
app.use("/api", routerUserUrls);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running");
});

module.exports = app;
