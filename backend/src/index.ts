require('dotenv').config();
import express, { Request, Response } from 'express';
import { errorHandler, notFound } from './middlewares';
import connectToMongoDB from './utils/connectToMongoDB';
import requestLogger from './middlewares/requestLogger';
import routes from './routes';
import config from 'config';
import log from './utils/logger';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { swaggerDocs } from './documentation/swagger';

const app = express();
const PORT = config.get('port');

connectToMongoDB(startServer);

function startServer() {
    app.use(
        cors({
            origin: ['http://localhost:5173'],
            credentials: true,
            methods: ['GET,HEAD,PUT,PATCH,POST,DELETE'],
        })
    );
    app.use(express.json());
    app.use(cookieParser());
    app.use(requestLogger);
    app.use('/healthcheck', (_: Request, res: Response) =>
        res.json({ message: 'Server is up and running' })
    );
    app.use('/api', routes);
    swaggerDocs(app, PORT as number);
    app.use(notFound);
    app.use(errorHandler);
    app.listen(PORT, () => {
        log.info(`Server running on  http://localhost:${PORT}`);
    });
}
