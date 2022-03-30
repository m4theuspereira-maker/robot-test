import supertest from "supertest";
import { server } from "../../src/index";

describe("table controller", () => {
  afterEach(() => {
    server.close();
  });
  it(`
    should return the position of robot, 
    status: 200
    route:/table/place-robot`, async () => {
    const response = await supertest(server)
      .post("/table/place-robot")
      .send({ direction: "north", tablePosition: [0, 1] });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: { initialDirection: "NORTH", position: [0, 1] }
      })
    );
  });

  it(`
    should return a server error if invalid direction was provided, 
    status: 400
    route:/table/place-robot`, async () => {
    const response = await supertest(server)
      .post("/table/place-robot")
      .send({ direction: "naaa", tablePosition: [0, -1] });

    expect(response).toEqual(
      expect.objectContaining({
        status: 400,
        body: { body: "A foreign position was selected" }
      })
    );
  });

  it(`
    should move the robot to next y index, 
    status: 200
    route:/table/move-robot`, async () => {
    const response = await supertest(server)
      .post("/table/move-robot")
      .send({ direction: "south", position: [0, 0] });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: { robotMoved: [1, 0] }
      })
    );
  });

  it(`
    should return a serve error if robot was moved to position out of table, 
    status: 400
    route:/table/move-robot`, async () => {
    const response = await supertest(server)
      .post("/table/move-robot")
      .send({ direction: "north", position: [0, 0] });

    expect(response).toEqual(
      expect.objectContaining({
        status: 400,
        body: { body: "A foreign position was selected" }
      })
    );
  });

  it(`should return the EAST direction
     status: 200
     route: /table/turn-right  
  `, async () => {
    const response = await supertest(server)
      .post("/table/turn-right")
      .send({ direction: "north" });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: { robotTurned: "EAST" }
      })
    );
  });

  it(`should return a server error if invalid direction as provided
  status: 400
  route: /table/turn-right  
`, async () => {
    const response = await supertest(server)
      .post("/table/turn-right")
      .send({ direction: "wastinn" });

    expect(response).toEqual(
      expect.objectContaining({
        status: 400,
        body: { body: "Invalid Direction" }
      })
    );
  });

  it(`should return WEST if NORTH direction was provided
  status: 200
  route: /table/turn-left  
`, async () => {
    const response = await supertest(server)
      .post("/table/turn-left")
      .send({ direction: "north" });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: { robotTurned: "WEST" }
      })
    );
  });

  it(`should return a server error if invalid direction as provided
  status: 400
  route: /table/turn-left  
`, async () => {
    const response = await supertest(server)
      .post("/table/turn-left")
      .send({ direction: "noth" });

    expect(response).toEqual(
      expect.objectContaining({
        status: 400,
        body: { body: "Invalid Direction" }
      })
    );
  });
});
