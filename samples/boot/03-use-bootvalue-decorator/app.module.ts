import { BootModule } from '@nestcloud2/boot';
import { ConfigService } from './config.service';
import { Module } from '@nestjs/common';

@Module({
    imports: [BootModule.register(__dirname, `config.yaml`)],
    providers: [ConfigService],
})
export class AppModule {}
