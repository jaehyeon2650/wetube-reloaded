import express from "express";
import { registerView, postComment, deleteComment } from "../Controller/videoController";
const apiRouter = express.Router();
apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerView);
apiRouter.post("/videos/:id([0-9a-f]{24})/comments", postComment);
apiRouter.delete("/videos/:id([0-9a-f]{24})/delete-comments", deleteComment);

export default apiRouter;