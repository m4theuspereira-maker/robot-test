import express, { Router } from "express";
import { tableControllerFactory } from "./config/table.factories";

const tableController = tableControllerFactory();

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded());

routes.post("/table/place-robot", tableController.placeRobot);

export { routes };
