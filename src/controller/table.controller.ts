import { TableService } from "../services/table-service/table.service";
import { Request, Response } from "express";
import { serverError } from "../infrastructure/server.errors";

export class TableController {
  constructor(private readonly tableService: TableService) {}

  placeRobot = (req: Request, res: Response) => {
    try {
      const { direction, tablePosition } = req.body as unknown as any;
      const robotPosition = this.tableService.placeRobotInTable(
        direction,
        tablePosition
      );

      return res.json(robotPosition);
    } catch (error) {
      throw serverError(res, error);
    }
  };

  moveRobot = (req: Request, res: Response) => {
    try {
      const { direction, position } = req.body as unknown as any;

      const robotMoved = this.tableService.moveRobot(position, direction);

      return res.json({ robotMoved });
    } catch (error) {
      throw serverError(res, error);
    }
  };

  turnRightRobot = (req: Request, res: Response) => {
    try {
      const { direction } = req.body as unknown as any;

      const robotTurned = this.tableService.turnRobotToRight(direction);

      return res.json({ robotTurned });
    } catch (error) {
      throw serverError(res, error);
    }
  };

  turnLeftRobot = (req: Request, res: Response) => {
    try {
      const { direction } = req.body as unknown as any;

      const robotTurned = this.tableService.turnRobotToLeft(direction);

      return res.json({ robotTurned });
    } catch (error) {
      throw serverError(res, error);
    }
  };
}
