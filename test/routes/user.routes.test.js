import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
const { expect } = chai;
import mocha from 'mocha';
const { describe, it } = mocha;
const should = chai.should();

const url = "http://localhost:3000";
let requBody = {
    "name": "testmocha",
    "contact_no": 999999999,
    "age": 2,
    "password": "mocha"
}

describe('User Registration', function () {

        it("Register User and return JWT Token", function (done) {
            // Send some Form Data
            chai.request(url)
                .post('/register')
                .send(requBody)
                .end(function (err, res) {
                    expect(res.statusCode).to.equal(200);
                    should.exist(res.body);
                    (res.body).should.have.property('token')
                    done();
                });
        });
});