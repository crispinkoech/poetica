import { Application } from '@feathersjs/feathers';

import user from './user';
import poem from './poem';

export default (app: Application) => {
    const services = [...user, ...poem];

    // Add each service to the app instance
    services.forEach(service => app.configure(service));
};
