import { PositionError, DirectionError } from "./robotErros";

export const initialDirections = ["NORTH", "SOUTH", "EAST", "WEST"];

export interface IMovimentDirection {
  RIGHT: "RIGHT";
  LEFT: "LEFT";
}

export interface IInitialPosition {
  initialDirection: string;
  position: number[];
}

export interface IRobot {
  direction: IMovimentDirection;
}

export class Robot {
  placeRobot(initialDirection: string, position: number[]): IInitialPosition {
    const isDirectionValid = initialDirections.includes(
      initialDirection.toUpperCase().trim()
    );

    if (!isDirectionValid) {
      throw new DirectionError();
    }

    if (position.length !== 2) {
      throw new PositionError();
    }

    return {
      initialDirection,
      position
    };
  }
}
