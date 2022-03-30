import { ForeignPositionError } from "../../src/domain/table/tableErros";
import { DirectionError } from "../../src/domain/robot/robotErros";
import { TableService } from "../../src/services/table-service/table.service";
import { tableServiceFactory } from "../../src/config/table.factories";

describe("table service", () => {
  let tableService: TableService;

  beforeEach(() => {
    tableService = tableServiceFactory();
  });

  it("should placeRobot in a valid table place", () => {
    const table = tableService.placeRobotInTable("south", [0, 2]);

    expect(table).toEqual({ initialDirection: "SOUTH", position: [0, 2] });
  });

  it("should throw if invalid place in talbe", () => {
    expect(() => {
      tableService.placeRobotInTable("south", [0, -2]);
    }).toThrowError(new ForeignPositionError());
  });

  it("should throws error if invalid direction", () => {
    expect(() => {
      tableService.turnRobotToLeft("noth");
    }).toThrowError(new DirectionError());

    expect(() => {
      tableService.turnRobotToRight("noth");
    }).toThrowError(new DirectionError());
  });

  it("should return east direction when north is imput", () => {
    const eastDirection = tableService.turnRobotToRight("north");

    expect(eastDirection).toEqual("EAST");
  });

  it("should return west direction when north is imput", () => {
    const eastDirection = tableService.turnRobotToLeft("NortH");

    expect(eastDirection).toEqual("WEST");
  });

  it("should return a text repoting robot location on table", () => {
    const robotPosition = tableService.reportPosition([0, 1], "WEST");

    expect(robotPosition).toBe("0,1,WEST");
  });

  it("should throw an error if moved to an invalid position towards north", () => {
    expect(() => tableService.moveRobot([0, 0], "north")).toThrowError(
      new ForeignPositionError()
    );
  });

  it("should throw an error if moved to an invalid position towards west", () => {
    expect(() => tableService.moveRobot([0, 0], "west")).toThrowError(
      new ForeignPositionError()
    );
  });

  it("should throw an error if moved to an invalid position towards east", () => {
    expect(() => tableService.moveRobot([0, 4], "east")).toThrowError(
      new ForeignPositionError()
    );
  });
  it("should throw an error if moved to an invalid position towards south", () => {
    expect(() => tableService.moveRobot([4, 4], "south")).toThrowError(
      new ForeignPositionError()
    );
  });

  it("should return a valid position of moved to south", () => {
    const validPosition = tableService.moveRobot([0, 0], "south");

    expect(validPosition).toEqual([1, 0]);
  });

  it("should return a valid position of moved to east", () => {
    const validPosition = tableService.moveRobot([0, 0], "east");

    expect(validPosition).toEqual([0, 1]);
  });

  it("should return a valid position of moved to west", () => {
    expect(() => tableService.moveRobot([1, 0], "west")).toThrowError(
      new ForeignPositionError()
    );
  });

  it("should return a valid position of moved to north", () => {
    const validPosition = tableService.moveRobot([1, 1], "north");

    expect(validPosition).toEqual([0, 1]);
  });
});
