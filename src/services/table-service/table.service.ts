import {
  directions,
  IInitialPosition,
  initialDirections,
  Robot
} from "../../domain/robot/robot";
import { DirectionError } from "../../domain/robot/robotErros";
import { Table } from "../../domain/table/table";
import { ForeignPositionError } from "../../domain/table/tableErros";

export class TableService {
  constructor(private readonly table: Table, private readonly robot: Robot) {}

  placeRobotInTable(
    direction: string,
    tablePosition: number[]
  ): IInitialPosition {
    try {
      const { initialDirection, position } = this.robot.placeRobot(
        direction,
        tablePosition
      );

      this.table.validateRobotPosition(position);

      return {
        initialDirection,
        position
      };
    } catch (error: any) {
      throw new ForeignPositionError();
    }
  }

  reportPosition(position: number[], direction: string): string {
    return `${position[0]},${position[1]},${direction}`.toUpperCase().trim();
  }

  turnRobotToRight(robotDirection: string): string {
    let direction = "";
    const robotDirectionUpperCase = robotDirection.toUpperCase().trim();

    const isInvalidDirection = !initialDirections.includes(
      robotDirectionUpperCase
    );

    if (isInvalidDirection) {
      throw new DirectionError();
    }

    switch (robotDirectionUpperCase) {
      case directions.NORTH:
        direction = directions.EAST;
        break;
      case directions.EAST:
        direction = directions.SOUTH;
        break;
      case directions.SOUTH:
        direction = directions.WEST;
        break;
      case directions.WEST:
        direction = directions.NORTH;
        break;
      default:
        break;
    }

    return direction;
  }

  turnRobotToLeft(robotDirection: string): string {
    const robotDirectionUpperCase = robotDirection.toUpperCase().trim();

    let direction = "";

    const isInvalidDirection = !initialDirections.includes(
      robotDirectionUpperCase
    );

    if (isInvalidDirection) {
      throw new DirectionError();
    }

    switch (robotDirectionUpperCase) {
      case directions.NORTH:
        direction = directions.WEST;
        break;
      case directions.WEST:
        direction = directions.SOUTH;
        break;
      case directions.SOUTH:
        direction = directions.EAST;
        break;
      case directions.EAST:
        direction = directions.NORTH;
        break;
      default:
        break;
    }
    return direction;
  }

  moveRobot(position: number[], direction: string): number[] {
    try {
      const robotDirectionUpperCase = direction.toUpperCase().trim();

      let positionX = position[0];
      let positionY = position[1];

      const isInvalidDirection = !initialDirections.includes(
        robotDirectionUpperCase
      );

      if (isInvalidDirection) {
        throw new DirectionError();
      }

      switch (robotDirectionUpperCase) {
        case directions.NORTH:
          positionX -= 1;
          break;
        case directions.WEST:
          positionY -= 1;
          break;
        case directions.SOUTH:
          positionX += 1;
          break;
        case directions.EAST:
          positionY += 1;
          break;
        default:
          break;
      }

      const newPosition = [positionX, positionY];

      this.table.validateRobotPosition(newPosition);

      return newPosition;
    } catch (error) {
      throw new ForeignPositionError();
    }
  }
}
