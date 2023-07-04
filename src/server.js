//과거 코드
// const express = require("express");
// const app = express();
//최신 문법
// import "./db";
// import "./models/video"
import express from "express";
import video from "./Router/videoRouter";
import user from "./Router/userRouter";
import route from "./Router/routeRouter";
import session from "express-session";
import morgan from "morgan";
import { localsMiddleware } from "./middleware";

console.log(process.cwd());
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: "Hello!",
    resave: true,
    saveUninitialized: true,
}));
//모든 sessions 체크
// app.use((req, res, next) => {
//     req.sessionStore.all((error, sessions) => {
//         console.log(sessions);
//         next();
//     });
// });
app.use(localsMiddleware);
app.use("/", route);
app.use("/user", user);
app.use("/video", video);

export default app;

// const handleListening = () => console.log("Server listening on port 4000");
// function handleListening() {
//     console.log("sever begining");
// }
// app.listen(4000, handleListening);
