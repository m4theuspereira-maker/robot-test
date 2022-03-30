import express, { Router } from "express";
import { tableControllerFactory } from "./factories/table.factories";

const tableController = tableControllerFactory();

const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded({ extended: true }));

routes.post("/table/place-robot", tableController.placeRobot);
routes.post("/table/move-robot", tableController.moveRobot);
routes.post("/table/turn-left", tableController.turnLeftRobot);
routes.post("/table/turn-right", tableController.turnRightRobot);

export { routes };
