import * as createService from 'feathers-mongoose';
import { Application } from '@feathersjs/feathers';

import PoemRemark from '../models/PoemRemark';
import poemRemarkHooks from '../hooks/poemRemark.hooks';

const poemRemarkService = (app: Application) => {
    const mongooseClient = app.get('mongooseClient');
    const paginate = app.get('paginate');

    const poemRemarkModel = PoemRemark(mongooseClient);

    const options = {
        paginate,
        Model: poemRemarkModel,
    };

    app.use('/poem-remark', createService(options));

    const service = app.service('poem-remark');

    // Initialize hooks
    service.hooks(poemRemarkHooks);
};

export default poemRemarkService;
