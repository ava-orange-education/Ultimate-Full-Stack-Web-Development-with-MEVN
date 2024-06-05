import winston from 'winston';
import { Console, File } from 'winston/lib/winston/transports';

export class LoggerService {

    private logger: any;

    constructor() {
        this.logger = winston.createLogger({
            level: 'info',
            format: winston.format.combine(
              winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
              }),
              winston.format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
            ),
            transports: [
              // new Console(),
               //new File({ filename: 'combined.log' })
            ]
          });
    }

    public info(message: string): void {
        //this.logger.info(message);
    }

    public warn(message: string): void {
        this.logger.warn(message);
    }

    public error(message: string): void {
        this.logger.error(message);
    }

    public debug(message: string): void {
        this.logger.debug(message);
    }
}
