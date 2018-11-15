process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Client = require('../app/models/client');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

describe('Clients', () => {
  beforeEach((done) => {
    Client.remove({}, (err) => {
      done();
    });
  });

  describe('/GET client', () => {
    it('it should GET all the clients', (done) => {
      let client = new Client({
        firstName: "rodrigo",
        lastName: "campero",
        password: "123456",
        email: "rodrigocampero.it@gmail.com",
        age: 18
      });
      client.save((err, client) => {
        chai.request(server)
          .get('/client')
          .end((err, res) => {
            console.log(JSON.stringify(res.body));
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(1);
            done();
          });
      });
    });
  });

  describe('/POST client', () => {
    it('it should POST a client ', (done) => {
      let client = {
        firstName: "rodrigo",
        lastName: "campero",
        password: "123456",
        email: "rodrigocampero.it@gmail.com",
        age: 18
      }
      chai.request(server)
        .post('/client')
        .send(client)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Client successfully added!');
          res.body.client.should.have.property('firstName');
          res.body.client.should.have.property('lastName');
          res.body.client.should.have.property('password');
          res.body.client.should.have.property('email');
          res.body.client.should.have.property('age');
          done();
        });
    });
  });

  describe('/GET/:id client', () => {
    it('it should GET a client by the given id', (done) => {
      let client = new Client({
        firstName: "rodrigo",
        lastName: "campero",
        password: "123456",
        email: "rodrigocampero.it@gmail.com",
        age: 18
      });
      client.save((err, client) => {
        chai.request(server)
          .get('/client/' + client.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('firstName');
            res.body.should.have.property('lastName');
            res.body.should.have.property('password');
            res.body.should.have.property('email');
            res.body.should.have.property('age');
            res.body.should.have.property('_id').eql(client.id);
            done();
          });
      });
    });
  });

  describe('/PUT/:id client', () => {
    it('it should UPDATE a client given the id', (done) => {
      let client = new Client({
        firstName: "rodrigo",
        lastName: "campero",
        password: "123456",
        email: "rodrigocampero.it@gmail.com",
        age: 18
      })
      client.save((err, client) => {
        chai.request(server)
          .put('/client/' + client.id)
          .send({
            firstName: "rodrigo",
            lastName: "campero",
            password: "123456",
            email: "rodrigocampero.it@gmail.com",
            age: 20
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Client updated!');
            res.body.client.should.have.property('firstName');
            res.body.client.should.have.property('lastName');
            res.body.client.should.have.property('password');
            res.body.client.should.have.property('email');
            res.body.client.should.have.property('age').eql(20);
            done();
          });
      });
    });
  });

  describe('/DELETE/:id client', () => {
    it('it should DELETE a client given the id', (done) => {
      let client = new Client({
        firstName: "rodrigo",
        lastName: "campero",
        password: "123456",
        email: "rodrigocampero.it@gmail.com",
        age: 18
      })
      client.save((err, client) => {
        chai.request(server)
          .delete('/client/' + client.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Client successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});
