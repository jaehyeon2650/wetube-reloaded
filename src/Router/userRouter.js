import express from "express";
import { getEdit, postEdit, logout, getGithubStart, postGithubFinish, getPasswordChange, postPasswordChange, see } from "../Controller/userController";
import { protectorMiddleware, publicOnlyMiddleware, uploadAvatar } from "../middleware";

const userRouter = express.Router();
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(uploadAvatar.single("avatar"), postEdit);
userRouter.all(publicOnlyMiddleware).get("/logout", logout);
userRouter.get("/github/start", publicOnlyMiddleware, getGithubStart);
userRouter.get("/github/finish", publicOnlyMiddleware, postGithubFinish);
userRouter.route("/change-password").get(getPasswordChange).post(postPasswordChange);
userRouter.get("/:id", see)
export default userRouter;