import * as mongoose from 'mongoose';
import { Application } from '@feathersjs/feathers';

import logger from './logger';

const initialize = (app: Application) => {
    try {
        // Use heroku configuration in production mode
        const url = app.get('mongodb.url');
        const database = app.get('mongodb.database');

        const options = app.get('mongodb.options');

        const uri = `${url}/${database}`;

        mongoose.connect(uri, options, (err: any) => {
            if (err) {
                logger.error(err);
            }
        });

        app.set('mongooseClient', mongoose);
    } catch (err) {
        throw err;
    }
};

export default initialize;
