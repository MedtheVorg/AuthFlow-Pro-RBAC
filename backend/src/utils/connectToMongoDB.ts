import { connect } from 'mongoose';
import process from 'process';
import config from 'config';
import log from './logger';

async function connectToMongoDB(startServer: () => void) {
    try {
        //connect to remote mongoDB
        const { connection } = await connect(config.get('mongodbUrl'));

        log.info(`connected to MongoDB ${connection.host}`);
        startServer();
    } catch (error: any) {
        log.error(`failed to establish a connection with the database`);
        log.error(`reason : ${error.message}`);

        process.exit(1);
    }
}

export default connectToMongoDB;
