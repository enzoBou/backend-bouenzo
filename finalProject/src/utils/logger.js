import winston, { level } from 'winston'

const devLogger = winston.createLogger({
    level: "verbose",
    transports: [
        new winston.transports.Console()
    ]  
});

const prodLogger = winston.createLogger({
    level: "http",
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename:'./errors.log', level:'warn'})
    ]  
});

const loggerLevels = {
    production: prodLogger,
    development: devLogger
}

export function addLogger(req, res, next){
    req.logger = loggerLevels[`${process.env.NODE_ENV}`];
    next();
};