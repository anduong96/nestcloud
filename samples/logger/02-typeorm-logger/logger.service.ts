import { Injectable } from '@nestjs/common';
import { InjectLogger } from '@nestcloud2/logger';
import { ILogger } from '@nestcloud2/common';

@Injectable()
export class LoggerService {
    constructor(@InjectLogger() private readonly logger: ILogger) {}

    log() {
        this.logger.info('hello logger');
    }
}
