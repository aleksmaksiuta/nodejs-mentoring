const request = require('supertest');
const app = require('../../app');
const HttpStatusCode = require('../../constants/httpStatusCodes');
const PERMISSIONS = require('../../constants/permissions');

describe('Users controller', function () {
    it('should get all users', async () => {
        const res = await request(app).get('/groups');

        expect(res.statusCode).toBe(200);
    });

    it('should create group', async () => {
        const res = await request(app).post('/groups').send({
            name: 'testGroup',
            permissions: [PERMISSIONS[3]],
        });

        expect(res.statusCode).toBe(HttpStatusCode.OK)
        expect(res.body.permissions).toContain(PERMISSIONS[3]);
        expect(res.body.id).toBeDefined();
    });

    it('should update group', async () => {
        const postRes = await request(app).post('/groups').send({
            name: 'testGroup12',
            permissions: [PERMISSIONS[3]],
        });

        const { id, permissions } = postRes.body;

        const res = await request(app).put('/groups').send({
            id,
            name: 'testGroup123',
            permissions: [
                ...permissions,
                PERMISSIONS[4],
            ]
        });

        expect(res.statusCode).toBe(HttpStatusCode.OK);

        const getRes = await request(app).get('/groups/' + id);

        expect(getRes.body.name).toBe('testGroup123');
        expect(getRes.body.permissions).toContain(PERMISSIONS[3]);
        expect(getRes.body.permissions).toContain(PERMISSIONS[4]);
    });

    it('should delete group', async () => {
        const postRes = await request(app).post('/groups').send({
            name: 'testGroup444',
            permissions: [],
        });

        const { id } = postRes.body;

        const res = await request(app).delete(`/groups/${id}`);

        expect(res.statusCode).toBe(HttpStatusCode.OK);
    });
});
