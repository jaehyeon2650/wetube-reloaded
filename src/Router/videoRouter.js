import express from "express";
import { see, getedit, postedit, remove, upload, getupload, postupload } from "../Controller/videoController";
import { protectorMiddleware, uploadVideo } from "../middleware";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter.get("/upload", protectorMiddleware, upload);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getedit).post(postedit);
videoRouter.route("/uploadvideo").all(protectorMiddleware).get(getupload).post(uploadVideo.single("video"), postupload);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, remove);

export default videoRouter;