import * as createService from 'feathers-mongoose';
import { Application } from '@feathersjs/feathers';

import Poem from '../models/Poem';
import poemHooks from '../hooks/poem.hooks';

const poemService = (app: Application) => {
    const mongooseClient = app.get('mongooseClient');
    const paginate = app.get('paginate');

    const poemModel = Poem(mongooseClient);

    const options = {
        paginate,
        Model: poemModel,
    };

    app.use('/poem', createService(options));

    const service = app.service('poem');

    // Initialize hooks
    service.hooks(poemHooks);
};

export default poemService;
