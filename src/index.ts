import app from './app';
import logger from './utils/logger';

// Start server: Use heroku configs in production mode
const host: string = app.get('host');
const port: number = app.get('port');
const server = app.listen(port);

// Fix me later
(process as NodeJS.EventEmitter).on('unhandledRejection', (reason: string, p: Promise<any>) => {
    logger.error('Unhandled rejection at: Promise ', p, reason);
});

server.on('listening', () => {
    logger.info(`Application running at http://${host}:${port}`);
});
