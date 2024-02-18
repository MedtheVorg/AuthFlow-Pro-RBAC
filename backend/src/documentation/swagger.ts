import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { version } from '../../package.json';
import { Request, Response, Express } from 'express';
import log from '../utils/logger';
import config from 'config';
const options: swaggerJsDoc.Options = {
    definition: {
        // Every API definition must include the version of the OpenAPI Specification that this definition is based on:
        openapi: '3.0.0',
        // general info about the API
        info: {
            title: 'Auth Flow REST API Docs',
            version: version,
            description:
                "Rest api that implements the RBAC model to manage tasks depending on a user's role and permissions.",
        },
        // list of servers that will serve the  swagger ui documentation interface
        servers: [
            {
                url: `http://localhost:${config.get('port')}`,
            },
        ],
        consumes: ['application/json'],
        produces: ['application/json'],
        schemes: ['http'],

        tags: [
            {
                name: 'Authentication',
                description:
                    'authenticate  yourself to access all available routes',
            },
            { name: 'healthcheck' },

            {
                name: 'Tasks',
                description: 'Tasks Routes ',
            },
            {
                name: 'Roles',
                description: 'Roles Routes ',
            },
            {
                name: 'Permissions',
                description: 'Permissions Routes ',
            },
            {
                name: 'Users',
                description: 'Users Routes',
            },
        ],

        //components definition
        components: {
            schemas: {
                CreateUserInput: {
                    type: 'Object',
                    required: ['username', 'email', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: "user's username",
                        },
                        email: {
                            type: 'string',
                            description: "user's email",
                        },
                        password: {
                            type: 'string',
                            description: "users's password",
                        },
                    },
                    example: {
                        username: 'John Doe',
                        email: 'johnDoe@gmail.com',
                        password: '12345678@',
                    },
                },
                LoginUserInput: {
                    type: 'object',
                    required: ['username', 'password'],
                    properties: {
                        username: {
                            type: 'string',
                            description: 'email',
                            default: 'john Doe',
                        },
                        password: {
                            type: 'string',
                            description: 'SomeRandomPassword123',
                        },
                    },
                    example: {
                        username: 'JohnDoe@gmail.com',
                        password: 'SomeRandomPassword123',
                    },
                },
                CreateRoleInput: {
                    type: 'object',
                    required: ['name', 'permissions'],
                    properties: {
                        name: {
                            type: 'string',
                            description: 'role name',
                            default: 'Role example',
                        },
                        permissions: {
                            type: 'array',
                            description: "array of role permissions id's",
                        },
                    },
                },
                CreatePermissionInput: {
                    type: 'object',
                    required: ['name'],
                    properties: {
                        name: { type: 'string', default: 'PERMISSION_NAME' },
                    },
                },
                CreateTaskInput: {
                    type: 'object',
                    required: [
                        'title',
                        'description',
                        'priority',
                        'status',
                        'deadline',
                        'author',
                    ],
                    properties: {
                        title: { type: 'string' },
                        description: { type: 'string' },
                        priority: {
                            type: 'string',
                            enum: ['Low', 'Normal', 'Urgent'],
                        },
                        status: {
                            type: 'string',
                            enum: ['To Do', 'In Progress', 'Completed'],
                        },
                        deadline: {
                            type: 'string',
                            default: new Date().toISOString(),
                        },
                        author: { type: 'string' },
                    },
                },
            },
            // add the possibility to provide a jwt token
            securitySchemes: {
                cookieAuth: {
                    type: 'apiKey',
                    in: 'cookie',
                    name: 'accessToken',
                },
            },
        },

        // endpoints/paths/routes definition
        paths: {
            //authentication
            '/api/users': {
                post: {
                    tags: ['Authentication'],
                    summary: 'Create a new user.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/CreateUserInput',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            user: {
                                                type: 'object',
                                                properties: {
                                                    _id: {
                                                        type: 'string',
                                                    },
                                                    username: {
                                                        type: 'string',
                                                    },
                                                    email: {
                                                        type: 'string',
                                                    },
                                                    password: {
                                                        type: 'string',
                                                    },
                                                    role: {
                                                        type: 'string',
                                                    },
                                                    __v: {
                                                        type: 'number',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                get: {
                    tags: ['Users'],
                    summary: 'Get a list of all users',
                    security: [{ cookieAuth: [] }],

                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            users: {
                                                type: 'array',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/auth/login': {
                post: {
                    tags: ['Authentication'],
                    summary: 'login.',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/LoginUserInput',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'OK',
                            headers: {
                                'Set-Cookie': {
                                    schema: {
                                        type: 'string',
                                        example:
                                            'accessToken=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWM4OTBmNDc0YTIxMzBlYTczMzVlNjYiLCJ1c2VybmFtZSI6Im1lZCIsImVtYWlsIjoibWVkQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJEJadnBBVHZncnEvbXFmSVV1TGpWd2VWOUdWN2Z0; Path=/; HttpOnly; Expires=Tue, 20 Feb 2024 12:15:52 GMT;',
                                    },
                                },
                            },
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            userInfo: {
                                                type: 'Object',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '400': {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: false,
                                            },
                                            message: {
                                                type: 'string',
                                                default:
                                                    'Invalid email or password.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/auth/logout': {
                post: {
                    tags: ['Authentication'],
                    summary: 'logout.',
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            message: {
                                                type: 'string',
                                                default: 'User Logged out.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            //users
            '/api/users/{userID}': {
                get: {
                    tags: ['Users'],
                    summary: 'Get User by ID',
                    description:
                        'Execute a get request to fetch a user by their ID ',
                    security: [{ cookieAuth: [] }],

                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            user: {
                                                type: 'object',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'NOT FOUND ',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: false,
                                            },
                                            errMessage: {
                                                type: 'string',
                                                default: 'User not found',
                                            },
                                            status: {
                                                type: 'number',
                                                default: 404,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'userID',
                            in: 'path',
                            description: 'User id to search for',
                            type: 'string',
                        },
                    ],
                },

                delete: {
                    tags: ['Users'],
                    summary: 'Delete a user by their  ID',
                    description: 'Execute a delete request to delete  a user',
                    security: [{ cookieAuth: [] }],
                    responses: {
                        '200': {
                            description: 'DELETED',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            deletedUser: {
                                                type: 'object',
                                                properties: {
                                                    acknowledged: {
                                                        type: 'boolean',
                                                        default: true,
                                                    },
                                                    deletedCount: {
                                                        type: 'number',
                                                        default: 1,
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'NOT FOUND ',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: false,
                                            errMessage: 'User not found',
                                            status: 404,
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'userID',
                            in: 'path',
                            description: 'User id to search for',
                            type: 'string',
                        },
                    ],
                },
            },

            // health check
            '/healthcheck': {
                get: {
                    tags: ['healthcheck'],
                    description: 'Responds if the app is up and running',
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            msg: {
                                                type: 'string',
                                                default:
                                                    'Server is up and running',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            //permissions
            '/api/permissions': {
                get: {
                    tags: ['Permissions'],
                    description: 'get a list of all permissions',
                    responses: {
                        '200': {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            permissions: { type: 'array' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Permissions'],
                    description: 'create a new permission',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '$/components/schemas/CreatePermissionInput',
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            createdPermission: {
                                                type: 'object',
                                                properties: {
                                                    name: {
                                                        type: 'string',
                                                        default:
                                                            'PERMISSION_NAME',
                                                    },
                                                    _id: { type: 'string' },
                                                    __v: { type: 'number' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },

            //roles
            '/api/roles': {
                get: {
                    tags: ['Roles'],
                    description: 'get a list of all roles.',
                    responses: {
                        '200': {
                            description: 'ok',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            roles: { type: 'array' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                post: {
                    tags: ['Roles'],
                    description: 'Create a new Role',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/CreateRoleInput',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'Created',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            role: {
                                                type: 'object',
                                                properties: {
                                                    name: { type: 'string' },
                                                    permissions: {
                                                        type: 'array',
                                                    },
                                                    _id: { type: 'string' },
                                                    __v: { type: 'number' },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '409': {
                            description: 'Conflict',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: false,
                                            },

                                            errMessage: {
                                                type: 'string',
                                                default:
                                                    '"Role_Name" role already Exists.',
                                            },
                                            status: {
                                                type: 'number',
                                                default: 409,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/roles/assign': {
                post: {
                    tags: ['Roles'],
                    description: 'assign a role to a user',
                    requestBody: {
                        required: true,
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        userID: { type: 'string' },
                                        roleID: { type: 'string' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            message: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/roles/{roleID}': {
                get: {
                    tags: ['Roles'],
                    description: 'get role by ID',
                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            role: { type: 'object' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'roleID',
                            in: 'path',
                            description: 'Role id to search for',
                            type: 'string',
                        },
                    ],
                },
                patch: {
                    tags: ['Roles'],
                    description: "update a role's permissions by ID",
                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        permissions: { type: 'array' },
                                    },
                                },
                            },
                        },
                    },
                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            role: { type: 'object' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'roleID',
                            in: 'path',
                            description: 'Role id to search for',
                            type: 'string',
                        },
                    ],
                },
                delete: {
                    tags: ['Roles'],
                    description: 'Delete a role by ID',
                    responses: {
                        '200': {
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            role: { type: 'object' },
                                        },
                                    },
                                },
                            },
                        },
                    },

                    parameters: [
                        {
                            name: 'roleID',
                            in: 'path',
                            description: 'Role id to search for',
                            type: 'string',
                        },
                    ],
                },
            },
            '/api/tasks': {
                get: {
                    tags: ['Tasks'],
                    summary: 'Get all Tasks',
                    description: 'Retrieve a list of all Tasks.',
                    // security: [{ bearerAuth: [] }],

                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            tasks: { type: 'array' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

                post: {
                    tags: ['Tasks'],
                    summary: 'Create a task',
                    description: 'create a new task',
                    security: [{ cookieAuth: [] }],

                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    $ref: '#/components/schemas/CreateTaskInput',
                                },
                            },
                        },
                    },
                    responses: {
                        '201': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            createdTask: { type: 'object' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/tasks/{taskID}': {
                get: {
                    tags: ['Tasks'],
                    summary: 'Get tasks by ID',
                    description:
                        'Execute a get request to fetch a task by its ID ',
                    security: [{ cookieAuth: [] }],

                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            recipe: {
                                                type: 'object',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'NOT FOUND',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: false,
                                            },
                                            errMessage: {
                                                type: 'string',
                                                default: 'Task not found.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'taskID',
                            in: 'path',
                            description: 'task id to search for',
                            type: 'string',
                        },
                    ],
                },
                patch: {
                    tags: ['Tasks'],
                    summary: 'Update a Task',
                    description:
                        'send a patch request to update an existing Task',
                    security: [{ cookieAuth: [] }],

                    requestBody: {
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'taskID',
                            in: 'path',
                            description: 'task id to search for',
                            type: 'string',
                        },
                    ],
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            updatedTask: {
                                                type: 'Object',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },

                delete: {
                    tags: ['Tasks'],
                    summary: 'Delete a Task by ID',
                    description: 'Execute a delete request to delete  a Task',
                    security: [{ cookieAuth: [] }],

                    responses: {
                        '200': {
                            description: 'Task Deleted.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: true,
                                            },
                                            message: {
                                                type: 'string',
                                                default: 'Task deleted.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                        '404': {
                            description: 'NOT FOUND',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean',
                                                default: false,
                                            },
                                            message: {
                                                type: 'string',
                                                default: 'Task not found.',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    parameters: [
                        {
                            name: 'recipeID',
                            in: 'path',
                            description: 'recipe id to search for',
                            type: 'string',
                        },
                    ],
                },
            },
        },
    },

    //routes definitions location
    apis: [
        '../routes/role.routes.ts',
        '../routes/user.routes.ts',
        '../routes/task.routes.ts',
        '../routes/permission.routes.ts',
        '../routes/auth.routes.ts',
    ],
};

// initialize swaggerJsDoc
const swaggerSpecs = swaggerJsDoc(options);

export function swaggerDocs(app: Express, port: number) {
    // Swagger page
    app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

    // Docs in JSON format
    app.get('/docs.json', (req: Request, res: Response) => {
        res.setHeader('Content-type', 'application/json');
        res.send(swaggerSpecs);
    });

    log.info(`Docs available at http://localhost:${port}/docs`);
}
