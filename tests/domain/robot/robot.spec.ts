import { Robot } from "../../../src/domain/robot/robot";
import {
  DirectionError,
  PositionError
} from "../../../src/domain/robot/robotErros";

describe("robot", () => {
  let robot: Robot;
  beforeEach(() => {
    robot = new Robot();
  });

  it("show throws a place Error", () => {
    expect(() => {
      robot.placeRobot("north", [0, 0, 0]);
    }).toThrowError(new PositionError());
  });

  it("show throws a direction Error", () => {
    expect(() => {
      robot.placeRobot("northhh", [0, 0]);
    }).toThrowError(new DirectionError());
  });

  it("should return the robot position", () => {
    const robotPosition = robot.placeRobot("north", [0, 0]);

    expect(robotPosition).toEqual({
      initialDirection: "NORTH",
      position: [0, 0]
    });
  });
});
