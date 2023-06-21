//과거 코드
// const express = require("express");
// const app = express();
//최신 문법
import express from "express";
import video from "./Router/videoRouter";
import user from "./Router/userRouter";
import grobal from "./Router/grobalRouter";
import morgan from "morgan";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.use("/", grobal);
app.use("/user", user);
app.use("/video", video);

const handleListening = () => console.log("Server listening on port 4000");
// function handleListening() {
//     console.log("sever begining");
// }
app.listen(4000, handleListening);
