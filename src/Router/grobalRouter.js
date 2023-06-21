import express from "express";
import { trending, search } from "../Controller/videoController";
import { join, login } from "../Controller/userController";
const grobalRouter = express.Router();
grobalRouter.get("/", trending);
grobalRouter.get("/join", join);
grobalRouter.get("/login", login);
grobalRouter.get("/search", search);

export default grobalRouter;