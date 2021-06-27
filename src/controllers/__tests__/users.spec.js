const request = require('supertest');
const app = require('../../app');
const HttpStatusCode = require('../../constants/httpStatusCodes');
const UserService = require('../../services/UserService');
const { sequelize } = require('../../models/index');


describe('Users controller', () => {
    const auth = {};

    beforeAll(async () => {
        await sequelize.sync({ force: true });

        const testUser = {
            login: 'majorTom',
            password: '123abc',
            age: 38,
        };

        await UserService.createUser(testUser);

        const res = await request(app).post('/login').send({
            login: testUser.login,
            password: testUser.password,
        });

        auth.token = res.header['x-access-token'];
    });

    describe('GET /users', () => {
        it('should get all users', async () => {
            const res = await request(app)
                .get('/users')
                .set('x-access-token', auth.token);

            expect(res.statusCode).toBe(HttpStatusCode.OK);
            expect(res.body.length).toBe(1);
        });
    })

    describe('POST /users', () => {
        it('should create user', async () => {
            const res = await request(app)
                .post('/users')
                .set('x-access-token', auth.token)
                .send({
                    login: 'testUser1',
                    password: '123abc',
                    age: 22,
                });

            expect(res.statusCode).toBe(HttpStatusCode.OK)
            expect(res.body.login).toBe('testUser1');
        });
    });

    describe('PUT /users', () => {
        it('should update user', async () => {
            const postRes = await request(app)
                .post('/users')
                .set('x-access-token', auth.token)
                .send({
                    login: 'testUser2',
                    password: '123abc',
                    age: 22,
                });

            const {
                isDeleted,
                id,
                login,
                password,
            } = postRes.body;

            const res = await request(app)
                .put('/users')
                .set('x-access-token', auth.token)
                .send({
                    isDeleted,
                    id,
                    login,
                    password,
                    age: 23,
                });

            expect(res.statusCode).toBe(HttpStatusCode.OK);

            const getRes = await request(app)
                .get('/users/' + id)
                .set('x-access-token', auth.token);

            expect(getRes.body.age).toBe(23);
        });
    });

    describe('DELETE /users', () => {
        it('should delete user', async () => {
            const postRes = await request(app)
                .post('/users')
                .set('x-access-token', auth.token)
                .send({
                    login: 'TestUser3',
                    password: '123abc',
                    age: 22,
                });

            const { id } = postRes.body;

            const res = await request(app)
                .delete(`/users/${id}`)
                .set('x-access-token', auth.token);

            expect(res.statusCode).toBe(HttpStatusCode.OK);
        });
    });

    afterAll(async () => {
        await sequelize.close();
    });
});
