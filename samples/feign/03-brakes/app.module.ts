import { NEST_BOOT, NEST_CONSUL_LOADBALANCE } from '@nestcloud2/common';

import { BootModule } from '@nestcloud2/boot';
import { ConsulModule } from '@nestcloud2/consul';
import { ConsulServiceModule } from '@nestcloud2/consul-service';
import { FeignModule } from '@nestcloud2/feign';
import { HealthClient } from './health.client';
import { HttpClient } from './http.client';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { TestService } from './test.service';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        FeignModule.register({ dependencies: [NEST_BOOT, NEST_CONSUL_LOADBALANCE] }),
        TerminusModule.forRootAsync({
            useFactory: () => ({ endpoints: [{ url: '/health', healthIndicators: [] }] }),
        }),
    ],
    providers: [HealthClient, HttpClient, TestService],
})
export class AppModule {}
