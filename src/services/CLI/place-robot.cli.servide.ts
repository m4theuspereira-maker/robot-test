import { InvalidCommandError } from "../../domain/cli/cli.erros";
import { handlerCLIException } from "../../domain/cli/cli.handlers";
import {
  allowedCommands,
  initialDirections,
  Robot
} from "../../domain/robot/robot";
import { DirectionError } from "../../domain/robot/robotErros";
import { allowedPositions, Table } from "../../domain/table/table";
import { TableService } from "../table-service/table.service";
import { IanswerDto } from "./inquirer.cli";

export class PlaceRobotCliServcie {
  constructor(
    private readonly table: Table,
    private readonly robot: Robot,
    private readonly tableService: TableService
  ) {}

  cliPlaceRobot(answer: any): any {
    try {
      const newAnswer = answer.position
        .match(/([A-Za-z]+)/gm)
        .map((word: string) => word.toUpperCase()) as string[];

      const positions: number[] = [];
      let direction: string = "";

      answer.position.toUpperCase();

      if (newAnswer.length !== 2) {
        throw new InvalidCommandError();
      }

      if (!initialDirections.includes(newAnswer[1])) {
        throw new DirectionError();
      }
      direction = newAnswer[1];

      Array.from(answer.position).forEach((pos: any) => {
        if (allowedPositions.includes(pos)) {
          positions.push(Number(pos));
        }
      });

      this.table.validateRobotPosition(positions);

      const robotPosition = this.robot.placeRobot(direction, positions);

      return robotPosition;
    } catch (error) {
      return handlerCLIException(error);
    }
  }

  movimentCliRobot(answer: IanswerDto): any {
    try {
      let direction = answer.initialDirection;
      let currentPlace = "";
      let currentPosition = answer.position;

      switch (answer.moviment) {
        case allowedCommands.RIGHT:
          direction = this.tableService.turnRobotToRight(direction);
          break;
        case allowedCommands.LEFT:
          direction = this.tableService.turnRobotToLeft(direction);
          break;
        case allowedCommands.MOVE:
          currentPosition = this.tableService.moveRobot(
            currentPosition,
            direction
          );
          break;
        case allowedCommands.REPORT:
          currentPlace = this.tableService.reportPosition(
            currentPosition,
            direction
          );
          console.log(currentPlace);
          break;
        default:
          break;
      }
    } catch (error) {
      return handlerCLIException(error);
    }
  }
}
