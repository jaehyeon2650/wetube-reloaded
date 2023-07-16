import express from "express";
import { see, getedit, postedit, remove, getupload, postupload } from "../Controller/videoController";
import { protectorMiddleware, uploadVideo } from "../middleware";
const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(protectorMiddleware).get(getedit).post(postedit);
videoRouter.route("/uploadvideo").all(protectorMiddleware).get(getupload).post(uploadVideo.fields([{ name: "video" }, { name: "thumb" }]), postupload);
videoRouter.get("/:id([0-9a-f]{24})/delete", protectorMiddleware, remove);

export default videoRouter;