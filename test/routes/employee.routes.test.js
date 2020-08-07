import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const { expect } = chai;
import mocha from 'mocha';
const { describe, it , before} = mocha;
const should = chai.should();
const url = "http://localhost:3000";

let requBody = {
    "name": "testuser",
    "contact_no": 999999999,
    "age": 2,
    "password": "mocha"
}
let employeeId = undefined;
let token = undefined;

describe('Employee Operations', function () {
    before(function (done) {
        chai.request(url)
        .post('/register')
        .send(requBody)
        .end(function (err, res,) {
            token = res.body.token;
            done();
        });
      });
      it("Should return error without Jwt token", function (done) {
        // Send some Form Data
        chai.request(url)
            .get('/employee')
            .send(requBody)
            .end(function (err, res) {
                expect(res.statusCode).to.equal(401);
                done();
            });
    });
        it("Should return list of Employee", function (done) {
            // Send some Form Data
            chai.request(url)
                .get('/employee').set('Authorization', token)
                .send(requBody)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    should.exist(res.body);
                    expect(res.body.data).to.be.an('array')
                    let obj = res.body.data.find(o => o.name === 'testuser');
                    employeeId = obj._id;
                    done();
                });
        });
        // it("Create New Employee", function (done) {
        //     // Send some Form Data
        //     chai.request(url)
        //         .post('/employee').set('Authorization', token)
        //         .send(requBody)
        //         .end(function (err, res) {
        //             expect(res.statusCode).to.equal(200);
        //             should.exist(res.body);
        //             done();
        //         });
        // });
        // it("Update Employee Employee", function (done) {
        //     // Send some Form Data
        //     chai.request(url)
        //         .post('/employee').set('Authorization', token)
        //         .send(requBody)
        //         .end(function (err, res) {
        //             expect(res.statusCode).to.equal(200);
        //             should.exist(res.body);
        //             done();
        //         });
        // });
        it("SHould delete Employee", function (done) {
            // Send some Form Data
            chai.request(url)
                .delete('/employee/'+employeeId).set('Authorization', token)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    done();
                });
        });
});