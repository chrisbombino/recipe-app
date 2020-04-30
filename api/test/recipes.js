let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let expect = chai.expect

chai.use(chaiHttp);

describe('GET api/v1/recipes', () => {
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
