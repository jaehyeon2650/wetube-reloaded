import express from "express";
import { see, getedit, postedit, remove, upload, getupload, postupload } from "../Controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id(\\d+)", see);
videoRouter.get("/upload", upload);
videoRouter.get("/:id(\\d+)/edit", getedit);
videoRouter.post("/:id(\\d+)/edit", postedit);
videoRouter.get("/:id(\\d+)/delete", remove);
videoRouter.get("/uploadvideo", getupload);
videoRouter.post("/uploadvideo", postupload);

export default videoRouter;