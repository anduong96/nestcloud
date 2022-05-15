import { BootModule } from '@nestcloud2/boot';
import { ConsulModule } from '@nestcloud2/consul';
import { ConsulServiceModule } from '@nestcloud2/consul-service';
import { Module } from '@nestjs/common';
import { NEST_BOOT } from '@nestcloud2/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
    ],
})
export class AppModule {}
