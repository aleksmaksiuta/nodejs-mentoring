const request = require('supertest');
const app = require('../../app');
const HttpStatusCode = require('../../constants/httpStatusCodes');

describe('Users controller', () => {
    it('should get all users', async () => {
        const res = await request(app).get('/users');

        expect(res.statusCode).toBe(HttpStatusCode.OK);
    });

    it('should create user', async () => {
        const res = await request(app).post('/users').send({
            login: 'testUser123',
            password: '123abc',
            age: 22,
        });

        expect(res.statusCode).toBe(HttpStatusCode.OK)
        expect(res.body.login).toBe('testUser123');
    });

    it('should update user', async () => {
        const postRes = await request(app).post('/users').send({
            login: 'te123213321sds3',
            password: '123abc',
            age: 22,
        });

        const {
            isDeleted,
            id,
            login,
            password,
        } = postRes.body;

        const res = await request(app).put('/users').send({
            isDeleted,
            id,
            login,
            password,
            age: 23,
        });

        expect(res.statusCode).toBe(HttpStatusCode.OK);

        const getRes = await request(app).get('/users/' + id);

        expect(getRes.body.age).toBe(23);
    });

    it('should delete user', async () => {
        const postRes = await request(app).post('/users').send({
            login: 'fsdfs123',
            password: '123abc',
            age: 22,
        });

        const { id } = postRes.body;

        const res = await request(app).delete(`/users/${id}`);

        expect(res.statusCode).toBe(HttpStatusCode.OK);
    });
});
