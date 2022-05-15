import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud2/boot';
import { ConsulModule } from '@nestcloud2/consul';
import { ConsulServiceModule } from '@nestcloud2/consul-service';
import { LoadbalanceModule } from '@nestcloud2/consul-loadbalance';
import { NEST_BOOT } from '@nestcloud2/common';
import { LoadbalanceService } from './loadbalance.service';

@Module({
    imports: [
        BootModule.register(__dirname, `config.yaml`),
        ConsulModule.register({ dependencies: [NEST_BOOT] }),
        ConsulServiceModule.register({ dependencies: [NEST_BOOT] }),
        LoadbalanceModule.register({ dependencies: [NEST_BOOT], customRulePath: __dirname }),
    ],
    providers: [LoadbalanceService],
})
export class AppModule {}
