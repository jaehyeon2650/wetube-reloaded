import express from "express";
import { edit, logout, getGithubStart, postGithubFinish } from "../Controller/userController";

const userRouter = express.Router();
userRouter.get("/edit", edit);
userRouter.get("/logout", logout)
userRouter.get("/github/start", getGithubStart);
userRouter.get("/github/finish", postGithubFinish);
export default userRouter;