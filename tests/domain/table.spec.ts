import { Table } from "../../src/domain/table/table";
import { ForeignPositionError } from "../../src/domain/table/tableErros";

describe("table test", () => {
  let table: Table;
  beforeEach(() => {
    table = new Table();
  });
  it("should throws foreign position error", () => {
    expect(() => {
      table.validateRobotPosition([-6, 4]);
    }).toThrowError(new ForeignPositionError());
  });
});
