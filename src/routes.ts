import express, { Router } from "express";
import { TableController } from "./controller/table.controller";
import { Robot } from "./domain/robot/robot";
import { Table } from "./domain/table/table";
import { TableService } from "./services/table-service/table.service";
const table = new Table();
const robot = new Robot();
const tableService = new TableService(table, robot);
const tableController = new TableController(tableService);
const routes = Router();

routes.use(express.json());
routes.use(express.urlencoded());

// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.post("/table/place-robot", tableController.placeRobot);

export { routes };
