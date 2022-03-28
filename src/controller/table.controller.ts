import { TableService } from "../services/table-service/table.service";
import { Request, Response } from "express";

export class TableController {
  constructor(private readonly tableService: TableService) {}

  placeRobot = (req: Request, res: Response) => {
    const { direction, tablePosition } = req.body as unknown as any;
    const robotPosition = this.tableService.placeRobotInTable(
      direction,
      tablePosition
    );

    return res.json(robotPosition);
  };
}
