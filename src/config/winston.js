const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, json, colorize, splat, align } = format;
const path = require('path');

const options = {
    file: {
        level: 'info',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        filename: path.resolve('logs', 'app.log'),
        handleExceptions: true,
        format: combine(
            timestamp(),
            splat(),          
            json(),
        )
    },
    console: {
        level: 'info',
        handleExceptions: true,
        timestamp: true,
        format: combine(
            timestamp(),            
            colorize(),
            splat(),
            align(),
            //simple(),
            printf(formatParams)
        )
    },
};

/*
const appendTimestamp = format((info, opts) => {
  if(opts.tz)
    info.timestamp = moment().tz(opts.tz).format();
  return info;
});
*/

 function formatParams(info) {
    const {timestamp, level, message, ...args} = info;
    //const ts = timestamp.slice(0, 19).replace("T", " ");
    const ts = timestamp; // TODO add current timezone
    return `${ts} [${level}]: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, "", "")
        : " "
        }`
}
// instantiate a new Winston Logger with the settings defined above
const logger = createLogger({
    transports: [
        new transports.File(options.file),
        new transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions
});
// create a stream object with a 'write' function that will be used by `morgan`
logger.stream = {
    write: function(message, encoding) {
        logger.info(message);
    },
};
module.exports = logger;