process.env.NODE_ENV = 'test';

const EventSchema = require("../models/EventSchema");

let mongoose = require("mongoose");

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);


describe('Events', () => {
    let newDate = new Date(2050,11,17,3,24,0);

    let event = { event: {
        name: "testName",
        creator: "creatorName",
        eventType: "VOLLEYBAL",
        group: "testId",
        location: {
            longitude: "5",
            latitude: "10",
        },
        date: newDate
    }}
    beforeEach((done) => {
        EventSchema.remove({}, (err) => {
            done();
         });
    });
  describe('/GET eventList', () => {
      it('it should GET all the events', (done) => {
        chai.request(server)
            .get('/api/event/')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                done();
            });
      });
  });
  describe('/POST event', () => {
    it('it should POST new event', (done) => {
      chai.request(server)
          .post('/api/event/add')
          .send(event)
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
                done();
          });
    });
    });
    describe('/GET event', () => {
        it('it should GET certain event', (done) => {
            chai.request(server)
                .post('/api/event/add')
                .send(event)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        chai.request(server)
                        .get('/api/event/')
                        .end((err, res) => {
                              res.should.have.status(200);
                              res.body.should.be.a('array');
                              res.body.length.should.be.eql(1);
                              try {
                                chai.request(server)
                                .get(`/api/event/${res.body[0]._id}`)
                                .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.name.should.be.eql("testName");
                                        res.body.creator.should.be.eql("creatorName");
                                        res.body.group.should.be.eql("testId");
                                        res.body.date.should.be.eql("2050-12-17T02:24:00.000Z");
                                    done();
                                });
                              } catch (err) {
                                  console.log(err)
                              }
                              
                        });
                });
        });
    });

    describe('/DELETE event', () => {
        it('it should GET certain event', (done) => {
            chai.request(server)
                .post('/api/event/add')
                .send(event)
                .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        chai.request(server)
                        .get('/api/event/')
                        .end((err, res) => {
                              res.should.have.status(200);
                              res.body.should.be.a('array');
                              res.body.length.should.be.eql(1);
                              try {
                                chai.request(server)
                                .delete(`/api/event/${res.body[0]._id}`)
                                .end((err, res) => {
                                        res.should.have.status(200);
                                        res.body.should.be.a('object');
                                        res.body.name.should.be.eql("testName");
                                        res.body.creator.should.be.eql("creatorName");
                                        res.body.group.should.be.eql("testId");
                                        res.body.date.should.be.eql("2050-12-17T02:24:00.000Z");
                                    done();
                                });
                              } catch (err) {
                                  console.log(err)
                              }
                              
                        });
                });
        });
    });
});
