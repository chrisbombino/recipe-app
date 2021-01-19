let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect

chai.use(chaiHttp);

describe('GET /api/v1/recipes', () => {
  it('Should return all recipes', (done) => {
    chai.request(app)
      .get('/api/v1/recipes')
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.include.all.keys(['img', 'name', 'recipe-id', 'url']);
        done();
      })
  });
});

describe('POST /api/v1/recipes', () => {
  it('Should return 401 unauthorized error if no header is sent', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      })
  })

  it('Should return 403 forbidden error if a bad token is sent', (done) => {
    chai.request(app)
      .post('/api/v1/recipes')
      .set("Authorization", "Bearer abc123")
      .end((err, res) => {
        expect(res.status).to.equal(403);
        done();
      })
  })

  it('Should return 409 if recipe already exists (ToDo)', (done) => {
    // TODO
    chai.request(app)
      .get("/")
      .end((err, res) => {
        done();
      })
  })

  it('Should return 201 if the recipe was created (ToDo)', (done) => {
    // TODO
    chai.request(app)
      .get("/")
      .end((err, res) => {
        done();
      })
  })
});

describe('GET /api/v1/bad-endpoint',  () => {
  it('Should return 404', (done) => {
    chai.request(app)
      .get('/api/v1/bad-endpoint')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      })
  });
});

describe('POST /api/v1/login', () => {
  it('Should return 401 error', (done) => {
    chai.request(app)
      .post('/api/v1/login')
      .send({ username: "abc", password: "123" })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        done();
      })
  })

  it('Should return 201 and JWT on valid credentials (ToDo)', (done) => {
    // TODO
    chai.request(app)
      // .post("/login")
      .get('/')
      .end((err, res) => {
        done();
      })
  })
});
