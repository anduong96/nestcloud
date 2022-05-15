import { NEST_BOOT, NEST_CONSUL_CONFIG } from '@nestcloud2/common';

import { ApiController } from './api.controller';
import { BootModule } from '@nestcloud2/boot';
import { ConsulConfigModule } from '@nestcloud2/consul-config';
import { ConsulModule } from '@nestcloud2/consul';
import { ConsulServiceModule } from '@nestcloud2/consul-service';
import { GatewayModule } from '@nestcloud2/gateway';
import { GatewayService } from './gateway.service';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulConfigModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        GatewayModule.register({ dependencies: [NEST_CONSUL_CONFIG] }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
    ],
    controllers: [ApiController],
    providers: [GatewayService],
})
export class AppModule {}
