export class ForeignPositionError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "ForeignPositionError";
    this.message = "A foreign position was selected";
  }
}
