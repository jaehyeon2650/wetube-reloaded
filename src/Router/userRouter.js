import express from "express";
import { getEdit, postEdit, logout, getGithubStart, postGithubFinish } from "../Controller/userController";
import { protectorMiddleware, publicOnlyMiddleware } from "../middleware";

const userRouter = express.Router();
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.all(publicOnlyMiddleware).get("/logout", logout);
userRouter.get("/github/start", publicOnlyMiddleware, getGithubStart);
userRouter.get("/github/finish", publicOnlyMiddleware, postGithubFinish);
export default userRouter;