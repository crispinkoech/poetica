import feathers from '@feathersjs/feathers';
import express from '@feathersjs/express';
import socketio from '@feathersjs/socketio';
import configuration from '@feathersjs/configuration';

import core from './core';
import database from './utils/database';
import logger from './utils/logger';

const app = express(feathers());

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

export default app;
