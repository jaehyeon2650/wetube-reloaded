import express from "express";
import { getEdit, postEdit, logout, getGithubStart, postGithubFinish, getPasswordChange, postPasswordChange } from "../Controller/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middleware";

const userRouter = express.Router();
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadFiles.single("avatar"), postEdit);
userRouter.all(publicOnlyMiddleware).get("/logout", logout);
userRouter.get("/github/start", publicOnlyMiddleware, getGithubStart);
userRouter.get("/github/finish", publicOnlyMiddleware, postGithubFinish);
userRouter.route("/change-password").get(getPasswordChange).post(postPasswordChange);
export default userRouter;