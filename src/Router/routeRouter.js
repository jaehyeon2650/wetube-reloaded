import express from "express";
import { home, search } from "../Controller/videoController";
import { getJoin, postJoin, getLogin, postLogin, postEdit } from "../Controller/userController";
import { publicOnlyMiddleware } from "../middleware";
const routeRouter = express.Router();
routeRouter.get("/", home);
routeRouter.route("/join").all(publicOnlyMiddleware).get(getJoin).post(postJoin);
routeRouter.route("/login").all(publicOnlyMiddleware).get(getLogin).post(postLogin);
routeRouter.get("/search", search);

export default routeRouter;