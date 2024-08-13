import winston from 'winston';


const winstonLogger = winston.createLogger(
{
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'booking-api' },
});

if (process.env.NODE_ENV !== 'production') 
{
    winstonLogger.add(
        new winston.transports.Console(
        {
            format: winston.format.simple(),
        }),
    );
}

export default winstonLogger;