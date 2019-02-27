import * as mongoose from 'mongoose';
import { Application } from '@feathersjs/feathers';

import logger from './logger';

const initialize = (app: Application) => {
    try {
        const { url, database, options } = app.get('mongodb');

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
