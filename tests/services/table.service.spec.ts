import { Robot } from "../../src/domain/robot/robot";
import { Table } from "../../src/domain/table/table";
import { ForeignPositionError } from "../../src/domain/table/tableErros";

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
});

class TableService {
  constructor(private readonly table: Table, private readonly robot: Robot) {}

  placeRobotInTable(direction: string, tablePosition: number[]) {
    try {
      const { initialDirection, position } = this.robot.placeRobot(
        direction,
        tablePosition
      );

      const isValidPlace = this.table.validateRobotPosition(position);

      if (isValidPlace) {
        return {
          initialDirection,
          position,
        };
      }
    } catch (error: any) {
      throw new ForeignPositionError();
    }
  }

  reportPosition(): string {
    return "string";
  }
}
