import * as mongoose from 'mongoose';
import { Application } from '@feathersjs/feathers';

import logger from './logger';

const initialize = (app: Application) => {
    const { uri, options } = app.get('mongodb');

    mongoose.connect(uri, options, (err: any) => {
        if (err) {
            logger.error(err);
        } else {
            logger.info('Connection to database successful');
        }
    });

    app.set('mongooseClient', mongoose);
};

export default initialize;
