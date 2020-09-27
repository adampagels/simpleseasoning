let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../server/app');
let should = chai.should();

chai.use(chaiHttp);

describe("test routes", () => {
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
});
