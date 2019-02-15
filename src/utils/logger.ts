import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.splat(),
        format.colorize(),
        format.simple(),
    ),
    transports: [
        new transports.Console(),
    ],
});

export default logger;
