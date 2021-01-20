import {Router, Request, Response} from "express";
import product from "./product";
import list from "./list";

const routes: Router = Router();

routes.use("/list", list);
routes.use("/product", product);

export default routes;
