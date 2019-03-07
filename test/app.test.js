const mongoose = require('mongoose');
const app = require('../dist/app').default;
const logger = require('../dist/utils/logger').default;

// Delete all records in test database
before((done) => {
    const database = app.get('mongodb.database');
    const { collections } = mongoose.connections.find(db => db.name === database);

    try {
        Object.entries(collections).forEach(async ([name, collection]) => {
            logger.info(`Cleaning the ${name} collection...`);
            await collection.deleteMany({});
        });

        logger.info('Collections cleaned successfully.\n');
    } catch (err) {
        throw err;
    }

    done();
});

describe('Initialize App', () => {
    let server;

    it('Starts OK', (done) => {
        const port = app.get('port');

        server = app.listen(port);
        server.once('listening', () => done());
    });

    after(done => server.close(done));
});
