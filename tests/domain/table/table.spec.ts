import { Table } from "../../../src/domain/table/table";
import { ForeignPositionError } from "../../../src/domain/table/tableErros";

describe("table domain", () => {
  let table: Table;
  beforeEach(() => {
    table = new Table();
  });
  it("should throws foreign position error", () => {
    expect(() => {
      table.validateRobotPosition([-6, 4]);
    }).toThrowError(new ForeignPositionError());
  });

  it("should return true for a valid position", () => {
    const tableValidPosition = table.validateRobotPosition([0, 4]);

    expect(tableValidPosition).toEqual(true);
  });
});
