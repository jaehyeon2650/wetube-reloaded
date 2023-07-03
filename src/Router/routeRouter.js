import express from "express";
import { home, search } from "../Controller/videoController";
import { getJoin, postJoin, login } from "../Controller/userController";
const routeRouter = express.Router();
routeRouter.get("/", home);
routeRouter.get("/join", getJoin);
routeRouter.post("/join", postJoin);
routeRouter.get("/login", login);
routeRouter.get("/search", search);

export default routeRouter;