const winston = require('winston')
const { createLogger, format, transports } = winston

let transportsArr
let exceptionArr
let rejectionArr

if (process.env.NODE_ENV !== 'production') {
  transportsArr = [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple(), format.errors({ stack: true })),
    }),
  ]
  exceptionArr = [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple(), format.errors({ stack: true })),
    }),
  ]
  rejectionArr = [
    new transports.Console({
      format: format.combine(format.colorize(), format.simple(), format.errors({ stack: true })),
    }),
  ]
} else {
  transportsArr = [
    new transports.DailyRotateFile({
      // filename: errorDirectory,
      level: 'error',
      datePattern: 'YYYY-MM-DD',
    }),
    new transports.DailyRotateFile({
      // filename: combinedDirectory,
      datePattern: 'YYYY-MM-DD',
      maxSize: '5m',
    }),
  ]
  exceptionArr = [
    new transports.DailyRotateFile({
      // filename: exceptionDirectory,
      datePattern: 'YYYY-MM-DD',
    }),
  ]
  rejectionArr = [
    new transports.DailyRotateFile({
      // filename: rejectionDirectory,
      datePattern: 'YYYY-MM-DD',
    }),
  ]
}

const logger = createLogger({
  level: 'info',
  format: format.combine(format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), format.json()),
  defaultMeta: { service: 'server' },
  transports: transportsArr,
  exceptionHandlers: exceptionArr,
  rejectionHandlers: rejectionArr,
  exitOnError: false,
})

module.exports = logger
