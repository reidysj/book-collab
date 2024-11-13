const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

//Router uploads here
const authRouter = require("./auth/auth-router.js");
const userRouter = require("./users/users-router.js");

//Invoke utils
server.use(cors());
server.use(helmet());
server.use(express.json());

//Invoke routers
//TODO: API KEY
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
// app.use("/books", bookRoutes);
// app.use("/collaborators", collaboratorRoutes);
// app.use("/chapters", chapterRoutes);
// app.use("/versions", versionRoutes);
// app.use("/comments", commentRoutes);

//Status endpoint
server.get("/", (_req, res, _next) => {
  res.status(200).json({ status: "Server up and running" });
});

module.exports = server;
