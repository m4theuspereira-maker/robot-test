import { TableService } from "../services/table-service/table.service";
import { Request, Response } from "express";
import { responseError } from "../infrastructure/server.errors";

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
      throw responseError(res, error);
    }
  };

  moveRobot = (req: Request, res: Response) => {
    try {
      const { direction, position } = req.body as unknown as any;

      const robotMoved = this.tableService.moveRobot(position, direction);

      return res.json({ robotMoved });
    } catch (error) {
      throw responseError(res, error);
    }
  };

  turnRightRobot = (req: Request, res: Response) => {
    try {
      const { direction } = req.body as unknown as any;

      const robotTurned = this.tableService.turnRobotToRight(direction);

      return res.json({ robotTurned });
    } catch (error) {
      throw responseError(res, error);
    }
  };

  turnLeftRobot = (req: Request, res: Response) => {
    try {
      const { direction } = req.body as unknown as any;

      const robotTurned = this.tableService.turnRobotToLeft(direction);

      return res.json({ robotTurned });
    } catch (error) {
      throw responseError(res, error);
    }
  };
}
