let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("test rating routes", () => {
  let token;
  before((done) => {
    chai
      .request(app)
      .post("/users/login")
      .send({ email: "test@test.com", password: "testtest" })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.text;
        done();
      });
  });

  it("should rate a recipe", (done) => {
    chai
      .request(app)
      .post("/rating/5f6405901b57d1085fe85d53")
      .set({ "auth-token": `${token}` })
      .send({ stars: 5 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });

  it("should return status 404 when recipe Id does not exist", (done) => {
    chai
      .request(app)
      .post("/rating/notARecipeId")
      .set({ "auth-token": `${token}` })
      .send({ stars: 5 })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});
