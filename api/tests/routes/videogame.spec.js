/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require("chai");
const session = require("supertest-session");
const app = require("../../src/app.js");
const { Videogame, conn } = require("../../src/db.js");

const agent = session(app);
const videogame = {
  name: "Super Mario Bros",
  id: 1000000,
  description: "Super mario is game very well known....",
  platform: ["Android", "Nintendo"],
};
const videogame2 = {
  name: "Super Mario Bros 2",
  id: 1000005,
  description: "Super mario is game very well known....",
  platform: ["Android", "Nintendo"],
};
let values = [videogame2, videogame];

describe("Videogame routes", () => {
  before(() =>
    conn.authenticate().catch(err => {
      console.error("Unable to connect to the database:", err);
    })
  );
  before(() =>
    Videogame.sync({ force: true }).then(() => Videogame.bulkCreate(values, { returning: true }))
  );
  describe("GET /videogames", () => {
    let videogames;
    it("should get 200", () => {
      agent.get("/videogames").expect(200);
    });
    beforeEach(async () => {
      videogames = await agent.get("/videogames");
    });
    it("should get  100 videogames of api", async () => {
      console.log("res.body api count", videogames.body.apiCount);
      expect(videogames.body.apiCount).to.equal(100);
    });
    it("should get videogame created in the database", () => {
      expect(videogames.body.dbCount).to.equal(2);
      console.log("apicount and dbconunt", videogames.body.apiCount, " ", videogames.body.dbCount);
    });
    it("should get videogame all count", () => {
      expect(videogames.body.count).to.equal(102);
      console.log("video game all ", videogames.body.count);
    });
  });
});
