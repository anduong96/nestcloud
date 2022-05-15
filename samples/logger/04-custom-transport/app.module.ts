import { LoggerModule } from '@nestcloud2/logger';
import { LoggerService } from './logger.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [LoggerModule.register()],
    providers: [LoggerService],
})
export class AppModule {}
