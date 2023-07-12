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
import api from "./Router/apiRouter";
import session from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import { localsMiddleware } from "./middleware";

console.log(process.cwd());
const app = express();
const logger = morgan("dev");
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
}));
//모든 sessions 체크
// app.use((req, res, next) => {
//     req.sessionStore.all((error, sessions) => {
//         console.log(sessions);
//         next();
//     });
// });
app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/", route);
app.use("/users", user);
app.use("/videos", video);
app.use("/api", api);
export default app;

// const handleListening = () => console.log("Server listening on port 4000");
// function handleListening() {
//     console.log("sever begining");
// }
// app.listen(4000, handleListening);
