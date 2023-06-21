import express from "express";
import { see, edit, remove, upload } from "../Controller/videoController";

const videoRouter = express.Router();

videoRouter.get("/:id", see);
videoRouter.get("/:id/edit", edit);
videoRouter.get("/:id/delete", remove);
videoRouter.get("/upload", upload);

export default videoRouter;