// import config from 'config';
require('dotenv').config();
import mongoose from 'mongoose';
import express from 'express';
import request from 'supertest';
import permissionRouter from '../routes/permission.routes';
import rolesRouter from '../routes/role.routes';
import userRouter from '../routes/user.routes';
import authRouter from '../routes/auth.routes';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/permissions', permissionRouter);
app.use('/api/roles', rolesRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
const requestHandler = request(app);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL as string);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('Integration Tests', () => {
    let roleId: string | null = null;
    let permissionId: string | null = null;
    let userId: string | null = null;
    let accessToken: null | string = null;
    const user = {
        username: 'testing-user',
        email: 'testingUser@gmail.com',
        password: '123456789',
    };
    const role = {
        name: 'TEST-ROLE',
    };

    it('GET /api/permissions => permissions List ', async () => {
        const response = await requestHandler
            .get('/api/permissions')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                permissions: expect.any(Array),
            })
        );
    });

    it('POST /api/permissions => newly created  permission', async () => {
        const response = await requestHandler
            .post('/api/permissions')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send({
                name: 'test-permission',
            });

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                createdPermission: expect.objectContaining({
                    _id: expect.any(String),
                    name: 'test-permission',
                }),
            })
        );
        permissionId = response.body.createdPermission._id;
    });

    //create role
    it('POST /api/roles  => newly created role', async () => {
        const response = await requestHandler
            .post('/api/roles')
            .send({
                name: role.name,
            })
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                role: expect.objectContaining({
                    _id: expect.any(String),
                    name: 'TEST-ROLE',
                    permissions: expect.any(Array),
                }),
            })
        );
        roleId = response.body.role._id;
    });
    //get roles list
    it('GET /api/roles  => Roles List', async () => {
        const response = await requestHandler
            .get('/api/roles')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                roles: expect.any(Array),
            })
        );
    });
    // get role by id
    it(`GET /api/roles/:roleID  => role with ID : ${roleId}`, async () => {
        const response = await requestHandler
            .get(`/api/roles/${roleId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                role: expect.objectContaining({
                    _id: expect.any(String),
                    name: 'TEST-ROLE',
                    permissions: expect.arrayContaining([]),
                }),
            })
        );
    });
    //update role and add READ_USERS and DELETE_USER permissions
    it('PATCH /api/roles  => updated role', async () => {
        const response = await requestHandler
            .patch(`/api/roles/${roleId}`)
            .send({
                // READ_USERS and DELETE_USER Permissions
                permissions: [
                    '65c8b4bd9ecd171a123f1759',
                    '65c8bf047c5e8eeb8d1c0bed',
                ],
            })

            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                role: expect.objectContaining({
                    _id: expect.any(String),
                    name: 'TEST-ROLE',
                    permissions: [
                        '65c8b4bd9ecd171a123f1759',
                        '65c8bf047c5e8eeb8d1c0bed',
                    ],
                }),
            })
        );
    });
    // create new user
    it('POST /api/users => newly created user', async () => {
        const response = await requestHandler
            .post('/api/users')
            .send({
                username: 'testing-user',
                email: 'testingUser@gmail.com',
                password: '123456789',
            })
            .expect('Content-Type', /json/)
            .expect(201);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                user: expect.any(Object),
            })
        );

        userId = response.body.user._id;
    });
    // assign newly created users the role with the two permissions
    it(`POST /api/roles/assign => assign role ${roleId} to user ${userId} `, async () => {
        const response = await requestHandler
            .post('/api/roles/assign')
            .send({
                roleID: roleId,
                userID: userId,
            })
            .expect('Content-Type', /json/);

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                message: expect.any(String),
            })
        );
    });
    //login user
    it('POST /api/auth/login  => accessToken', async () => {
        const response = await requestHandler
            .post('/api/auth/login')
            .send({ email: 'testingUser@gmail.com', password: '123456789' })
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                userInfo: {
                    _id: userId,
                    email: user.email,
                    username: user.username,
                    role: expect.any(Object),
                },
            })
        );
        expect(response.body.userInfo.role.name).toBe('TEST-ROLE');
        const match =
            response.headers['set-cookie'][0].match(/accessToken=([^;]+)/);
        accessToken = match ? match[1] : null;
    });

    // get user by id
    it(`GET /api/users/:userID => user with ID : ${userId} `, async () => {
        const response = await requestHandler
            .get(`/api/users/${userId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                user: expect.any(Object),
            })
        );
        expect(response.body.user._id).toBe(userId);
    });

    //get users list
    it('GET /api/users => list of Users', async () => {
        const response = await requestHandler
            .get('/api/users')
            .set('Cookie', [`accessToken=${accessToken}`])
            .withCredentials(true)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                users: expect.any(Array),
            })
        );
    });

    it(`DELETE /api/users/:userID => delete user with ID : ${userId} `, async () => {
        const response = await requestHandler
            .delete(`/api/users/${userId}`)
            .set('Cookie', [`accessToken=${accessToken}`])
            .withCredentials(true)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                deletedUser: expect.any(Object),
            })
        );
    });
    it('DELETE /api/roles  => Deleted Role', async () => {
        const response = await requestHandler
            .delete(`/api/roles/${roleId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                role: expect.objectContaining({
                    _id: expect.any(String),
                    name: 'TEST-ROLE',
                    permissions: [
                        '65c8b4bd9ecd171a123f1759',
                        '65c8bf047c5e8eeb8d1c0bed',
                    ],
                }),
            })
        );
    });

    it('DELETE /api/permissions/:permissionID => confirmation message ', async () => {
        const response = await requestHandler
            .delete(`/api/permissions/${permissionId}`)
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response.body).toEqual(
            expect.objectContaining({
                success: true,
                message: 'permission Deleted.',
            })
        );
    });
});
