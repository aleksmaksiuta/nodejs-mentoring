const request = require('supertest');
const app = require('../../app');
const HttpStatusCode = require('../../constants/httpStatusCodes');
const PERMISSIONS = require('../../constants/permissions');
const UserService = require('../../services/UserService');
const { sequelize } = require('../../models/index');

describe('Groups controller',  () => {
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

    describe('GET /groups', () => {
        it('should get all groups', async () => {
            const res = await request(app)
                .get('/groups')
                .set('x-access-token', auth.token);

            expect(res.statusCode).toBe(200);
        });
    });

    describe('POST /groups', () => {
        it('should create group', async () => {
            const res = await request(app)
                .post('/groups')
                .set('x-access-token', auth.token)
                .send({
                    name: 'testGroup1',
                    permissions: [PERMISSIONS[3]],
                })

            expect(res.statusCode).toBe(HttpStatusCode.OK)
            expect(res.body.permissions).toContain(PERMISSIONS[3]);
            expect(res.body.id).toBeDefined();
        });
    });

    describe('PUT /groups', () => {
        it('should update group', async () => {
            const postRes = await request(app)
                .post('/groups')
                .set('x-access-token', auth.token)
                .send({
                    name: 'testGroup2',
                    permissions: [PERMISSIONS[3]],
                });

            const { id, permissions } = postRes.body;

            const res = await request(app)
                .put('/groups')
                .set('x-access-token', auth.token)
                .send({
                    id,
                    name: 'testGroup2-1',
                    permissions: [
                        ...permissions,
                        PERMISSIONS[4],
                    ]
                });

            expect(res.statusCode).toBe(HttpStatusCode.OK);

            const getRes = await request(app)
                .get('/groups/' + id)
                .set('x-access-token', auth.token);

            expect(getRes.body.name).toBe('testGroup2-1');
            expect(getRes.body.permissions).toContain(PERMISSIONS[3]);
            expect(getRes.body.permissions).toContain(PERMISSIONS[4]);
        });
    });

    describe('DELETE /groups', () => {
        it('should delete group', async () => {
            const postRes = await request(app)
                .post('/groups')
                .set('x-access-token', auth.token)
                .send({
                    name: 'testGroup3',
                    permissions: [],
                });

            const { id } = postRes.body;

            const res = await request(app)
                .delete(`/groups/${id}`)
                .set('x-access-token', auth.token);

            expect(res.statusCode).toBe(HttpStatusCode.OK);
        });
    });
});
