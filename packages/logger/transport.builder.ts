import * as fs from 'fs';
import * as mkdirp from 'mkdirp';
import { resolve } from 'path';
import * as winston from 'winston';
import { ConsoleTransport, DailyRotateFile, FileTransport } from './interfaces/transport.interface';
import * as Transport from 'winston-transport';

export class TransportBuilder {
    private readonly AVAILABLE_TRANSPORTS = ['console', 'file', 'dailyRotateFile'];

    constructor(private readonly basePath: string) {}

    public build(transports: (DailyRotateFile | ConsoleTransport | FileTransport)[]): Transport[] {
        const instances: Transport[] = transports
            .filter((item) => this.AVAILABLE_TRANSPORTS.includes(item.transport))
            .map((item) => {
                switch (item.transport) {
                    case 'file':
                        return this.buildFileTransportInstance(item as FileTransport);
                    case 'dailyRotateFile':
                        return this.buildDailyRotateFileTransportInstance(item as DailyRotateFile);
                    case 'console':
                    default:
                        return this.buildConsoleTransportInstance(item as ConsoleTransport);
                }
            });

        if (instances.length === 0) {
            instances.push(this.buildDefaultTransport());
        }

        return instances;
    }

    private mkdirPath(filename) {
        if (filename.charAt(0) !== '/') {
            filename = resolve(this.basePath, filename);
        }

        const last = filename.lastIndexOf('/');
        const path = filename.substring(0, last);
        if (!fs.existsSync(path)) {
            mkdirp.sync(path);
        }

        return filename;
    }

    private buildConsoleTransportInstance(config: ConsoleTransport) {
        return new winston.transports.Console();
    }

    private buildFileTransportInstance(config: FileTransport) {
        return new winston.transports.File({
            level: config.level,
            filename: this.mkdirPath(config.filename),
            maxsize: config.maxSize,
            maxFiles: config.maxFiles,
            eol: config.eol,
            zippedArchive: config.zippedArchive,
            silent: config.silent,
            tailable: config.tailable,
        });
    }

    private buildDailyRotateFileTransportInstance(config: DailyRotateFile) {
        return new winston.transports.DailyRotateFile({
            filename: this.mkdirPath(config.filename),
            datePattern: config.datePattern || 'YYYY-MM-DD h:mm:ss',
            zippedArchive: config.zippedArchive,
            maxSize: config.maxSize,
            maxFiles: config.maxFiles,
            options: config.options,
        });
    }

    private buildDefaultTransport() {
        return new winston.transports.Console({});
    }
}
