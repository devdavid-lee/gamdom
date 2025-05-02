import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  format: format.combine(
    ...(process.env.NODE_ENV !== 'production'
      ? [format.errors({ stack: true })]
      : []),
    format.simple(),
    format.colorize()
  ),
  level: 'info',
  transports: [
    new transports.Console({
      silent: !!process.env.SILENT,
    }),
  ],
});

export default logger;
