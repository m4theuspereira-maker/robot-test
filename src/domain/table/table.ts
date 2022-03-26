import { ForeignPositionError } from "./tableErros";

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
