const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

//Router uploads here
const authRouter = require("./auth/auth-router.js");
const userRouter = require("./users/users-router.js");
const bookRouter = require("./books/books-router.js");
const collaboratorRouter = require("./collaborators/collaborators-router.js");
const chapterRouter = require("./chapters/chapters-router.js");
const versionRouter = require("./versions/versions-router.js");

//Invoke utils
server.use(cors());
server.use(helmet());
server.use(express.json());

//BIG TODO: GO THROUGH EACH ENDPOINT. WHO SHOULD BE ABLE TO DO THESE THINGS?

//Invoke routers
//TODO: API KEY
server.use("/api/auth", authRouter);
server.use("/api/users", userRouter);
server.use("/api/collaborators", collaboratorRouter);
server.use("/api/chapters", chapterRouter);
server.use("/api/books", bookRouter);
server.use("/api/versions", versionRouter);
// server.use("/api/comments", commentRouter);

//Status endpoint
server.get("/", (_req, res, _next) => {
  res.status(200).json({ status: "Server up and running" });
});

module.exports = server;
