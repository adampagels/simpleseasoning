let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe("test recipe routes", () => {
  let token;
  before((done) => {
    chai.request(app)
      .post('/users/login')
      .send({ email: "test@test.com", password: "testtest" })
      .end((err, res) => {
        res.should.have.status(200);
        token = res.text
        done();
      });
  })

  describe('/GET requests', () => {
    it('should return most recent recipes', (done) => {
      chai.request(app)
        .get('/recipes/most-recent')
        .set({ "auth-token": `${token}` })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('should return a single recipe', (done) => {
      chai.request(app)
        .get('/recipes/5f6405901b57d1085fe85d53')
        .set({ "auth-token": `${token}` })
        .end((err, res) => {
          res.should.have.status(201);
          console.log(res.text)
          done();
        });
    });
  });
});
