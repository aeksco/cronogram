const app = require('../../app');
const request = require('supertest');

describe('User API', function() {

    describe('GET /api/users', function() {
        it('should respond with JSON object', function(done) {
            request(app)
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /json/)
            .end(function(err, res) {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

});
