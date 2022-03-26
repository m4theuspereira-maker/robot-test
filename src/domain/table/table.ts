import { ForeignPositionError } from "./tableErros";

export const allowedPositions = ["0", "1", "2", "3", "4"];

export class Table {
  validateRobotPosition(position: number[]): boolean {
    const isForeignPosition = position.some((index) => {
      return index < 0 || index > 4;
    });

    if (isForeignPosition) {
      throw new ForeignPositionError();
    }

    return true;
  }
}
