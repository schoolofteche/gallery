process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const { app, server } = require('../server'); 
const should = chai.should();

chai.use(chaiHttp);

describe('Photos', function () {
  it('should list ALL photos on / GET', function (done) {
    this.timeout(60000);
    chai.request(app)
      .get('/')
      .end(function (err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });

  after(() => {
    if (server) server.close(); 
  });
});

