import { Robot } from "../domain/robot/robot";
import { Table } from "../domain/table/table";
import { PlaceRobotCliServcie } from "../services/CLI/place-robot.cli.servide";
import { TableService } from "../services/table-service/table.service";

export function placeRobotCliServiceFactiory(): PlaceRobotCliServcie {
  const table = new Table();
  const robot = new Robot();
  const tableService = new TableService(table, robot);
  const placeRobotCliService = new PlaceRobotCliServcie(
    table,
    robot,
    tableService
  );

  return placeRobotCliService;
}
