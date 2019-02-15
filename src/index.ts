import feathers from '@feathersjs/feathers';
import express, { Application } from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import configuration from '@feathersjs/configuration';

import core from './core';
import database from './utils/database';
import logger from './utils/logger';

const app: Application<any> = express(feathers());

// Configure application
app.configure(configuration());

// Set up database, plugins and providers(transports)
app.configure(express.rest());
app.configure(socketio);
app.configure(database);

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure error handler
app.use(express.errorHandler({ logger }));

// Configure core services
app.configure(core);

// Start server
const host: string = app.get('host');
const port: number = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason: string, p: Promise<any>) => {
    logger.error('Unhandled rejection at: Promise ', p, reason);
});

server.on('listening', () => {
    logger.info(`Application running at http://${host}:${port}`);
});
