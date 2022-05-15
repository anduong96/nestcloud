import { LoggerModule, TypeormLogger } from '@nestcloud2/logger';

import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';
import { NEST_TYPEORM_LOGGER_PROVIDER } from '@nestcloud2/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        LoggerModule.register(),
        TypeOrmModule.forRootAsync({
            useFactory: (logger: TypeormLogger) => ({ logger }),
            inject: [NEST_TYPEORM_LOGGER_PROVIDER],
        }),
    ],
    providers: [LoggerService],
})
export class AppModule {}
