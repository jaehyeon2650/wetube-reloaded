import express from "express";
import { home, search } from "../Controller/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../Controller/userController";
const routeRouter = express.Router();
routeRouter.get("/", home);
routeRouter.get("/join", getJoin);
routeRouter.post("/join", postJoin);
routeRouter.route("/login").get(getLogin).post(postLogin);
routeRouter.get("/search", search);

export default routeRouter;