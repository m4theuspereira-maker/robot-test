export class PositionError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "PositionError";
    this.message = "The robot position should have two indexes";
  }
}

export class DirectionError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "DirectionError";
    this.message = "Invalid Direction";
  }
}
