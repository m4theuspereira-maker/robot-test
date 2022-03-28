import supertest from "supertest";
import { server } from "../../src/index";

describe("table controller", () => {
  afterEach(() => {
    server.close();
  });
  it("should return the position of robot", async () => {
    const response = await supertest(server)
      .post("/table/place-robot")
      .send({ direction: "north", tablePosition: [0, 1] });

    expect(response).toEqual(
      expect.objectContaining({
        status: 200,
        body: { initialDirection: "north", position: [0, 1] }
      })
    );
  });
});
