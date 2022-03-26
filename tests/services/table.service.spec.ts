import { Robot } from "../../src/domain/robot/robot";
import { Table } from "../../src/domain/table/table";
import { ForeignPositionError } from "../../src/domain/table/tableErros";
import { DirectionError } from "../../src/domain/robot/robotErros";
import { TableService } from "../../src/services/table-service/table.service";

describe("test table service", () => {
  const table = new Table();
  const robot = new Robot();

  let tableService: TableService;

  beforeAll(() => {
    tableService = new TableService(table, robot);
  });

  it("should placeRobot in a valid table place", () => {
    const table = tableService.placeRobotInTable("south", [0, 2]);

    expect(table).toEqual({ initialDirection: "south", position: [0, 2] });
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

  it("should throw an error if moved to an invalid position", () => {
    expect(() => tableService.moveRobot([0, 0], "north")).toThrowError(
      new ForeignPositionError()
    );
  });
});
