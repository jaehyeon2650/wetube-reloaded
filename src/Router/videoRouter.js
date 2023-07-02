import express from "express";
import { see, getedit, postedit, remove, upload, getupload, postupload } from "../Controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", see);
videoRouter.get("/upload", upload);
videoRouter.get("/:id([0-9a-f]{24})/edit", getedit);
videoRouter.post("/:id([0-9a-f]{24})/edit", postedit);
videoRouter.get("/:id([0-9a-f]{24})/delete", remove);
videoRouter.get("/uploadvideo", getupload);
videoRouter.post("/uploadvideo", postupload);

export default videoRouter;