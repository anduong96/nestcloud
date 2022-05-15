import { BootModule } from '@nestcloud2/boot';
import { ConfigService } from './config.service';
import { ConsulConfigModule } from '@nestcloud2/consul-config';
import { ConsulModule } from '@nestcloud2/consul';
import { Module } from '@nestjs/common';
import { NEST_BOOT } from '@nestcloud2/common';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulConfigModule.register({ dependencies: [NEST_BOOT] }),
    ],
    providers: [ConfigService],
})
export class AppModule {}
