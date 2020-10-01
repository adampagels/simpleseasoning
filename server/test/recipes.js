let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

describe("test recipe routes", () => {
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

  describe("/GET requests", () => {
    it("should return most recent recipes", (done) => {
      chai
        .request(app)
        .get("/recipes/most-recent")
        .set({ "auth-token": `${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it("should return a single recipe", (done) => {
      chai
        .request(app)
        .get("/recipes/5f6405901b57d1085fe85d53")
        .set({ "auth-token": `${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          done();
        });
    });

    let recipeId;
    it("should add a recipe", (done) => {
      chai
        .request(app)
        .post("/recipes/")
        .set({ "auth-token": `${token}` })
        .send({
          title: "Big meal",
          description: "testing food",
          prepTime: 30,
          cookTime: 20,
          photo: "string of photo",
          diet: ["high protein"],
          ingredients: "food",
          instructions: "Cook well",
        })
        .end((err, res) => {
          res.should.have.status(200);
          recipeId = res.text.replace(/"/g, "");
          done();
        });
    });

    it("should delete a recipe", (done) => {
      chai
        .request(app)
        .delete(`/recipes/test/${recipeId}`)
        .set({ "auth-token": `${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });
});
