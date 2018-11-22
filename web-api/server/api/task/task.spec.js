const app = require('../../app');
const request = require('supertest');

const API_ROOT = '/api/tasks'

describe('Task API', () => {

    describe('GET /api/tasks', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .get(API_ROOT)
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('POST /api/tasks', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .post(API_ROOT)
            .send({
                label: '',
                dependencies: '',
                script: '',
                cron: '',
                description: ''
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('GET /api/tasks/:id', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .get(API_ROOT + '/1')
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

    describe('PUT /api/tasks/:id', () => {
        it('should respond with JSON object', (done) => {
            request(app)
            .put(API_ROOT + '/1')
            .send({
                label: '',
                dependencies: '',
                script: '',
                cron: '',
                description: ''
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) return done(err);
                res.body.should.be.instanceof(Object);
                done();
            });
        });
    });

});
