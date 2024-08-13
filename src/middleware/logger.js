import winstonLogger from '../utils/winstonLogger.js';


const logger = (req, res, next) => 
{
    const start = new Date();

    next();

    const duration = new Date() - start;
    winstonLogger.info(`Method: ${req.method}. URL: ${req.originalUrl}. Status: ${res.statusCode}. Duration: ${duration} ms`);
};

export default logger;
