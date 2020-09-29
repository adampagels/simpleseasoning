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
  });
});
