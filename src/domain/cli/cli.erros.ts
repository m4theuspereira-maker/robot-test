export class InvalidCommandError implements Error {
  name: string;
  message: string;

  constructor() {
    this.name = "InvalidCommandError";
    this.message = "Invalid Command ";
  }
}
