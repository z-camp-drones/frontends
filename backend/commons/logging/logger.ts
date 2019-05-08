import * as winston from 'winston';

const defaultFormat = [
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.splat(),
  winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}` + (info.splat !== undefined ? `${info.splat}` : ' ')),
];

const logLevel = 'info';

const logger = winston.createLogger({
  level: logLevel,
  format: winston.format.combine(
    ...defaultFormat,
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({filename: 'error.log', level: 'error'}),
    new winston.transports.File({filename: 'combined.log'}),
    new winston.transports.Console({
      format: winston.format.combine(
        ...defaultFormat,
        winston.format.align(),
        winston.format.colorize(),
      )
    })
  ]
});


export default logger;
