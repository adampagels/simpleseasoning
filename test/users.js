let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);

describe("test user routes", () => {
  it('should return status 400 when email is already registered', (done) => {
    chai.request(app)
      .post('/users/register')
      .send({ username: "brandNewUser", email: "newUser@new.com", password: "newUser" })
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

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

  it('should return current user info', (done) => {
    chai.request(app)
      .get('/users/test')
      .set({ "auth-token": `${token}` })
      .end((err, res) => {
        res.should.have.status(201);
        done();
      });
  });
});
