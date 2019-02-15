import * as createService from 'feathers-mongoose';
import { Application } from '@feathersjs/feathers';

import User from '../models/User';
import userHooks from '../hooks/user.hooks';

const userService = (app: Application) => {
    const mongooseClient = app.get('mongooseClient');
    const paginate = app.get('paginate');

    const userModel = User(mongooseClient);

    const options = {
        paginate,
        Model: userModel,
    };

    app.use('/user', createService(options));

    const service = app.service('user');

    // Initialize hooks
    service.hooks(userHooks);
};

export default userService;
