import express from "express";
import { home, search } from "../Controller/videoController";
import { join, login } from "../Controller/userController";
const grobalRouter = express.Router();
grobalRouter.get("/", home);
grobalRouter.get("/join", join);
grobalRouter.get("/login", login);
grobalRouter.get("/search", search);

export default grobalRouter;