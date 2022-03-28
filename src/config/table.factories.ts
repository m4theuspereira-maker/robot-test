import { TableController } from "../controller/table.controller";
import { Robot } from "../domain/robot/robot";
import { Table } from "../domain/table/table";
import { TableService } from "../services/table-service/table.service";

export function tableControllerFactory(): TableController {
  const table = new Table();
  const robot = new Robot();
  const tableService = new TableService(table, robot);
  const tableController = new TableController(tableService);
  return tableController;
}

export function tableServiceFactory(): TableService {
  const table = new Table();
  const robot = new Robot();
  const tableService = new TableService(table, robot);
  return tableService;
}
