import { Module } from '@nestjs/common';
import { BootModule } from '@nestcloud2/boot';
import { ConsulModule } from '@nestcloud2/consul';
import { NEST_BOOT } from '@nestcloud2/common';
import { ConsulService } from './consul.service';

@Module({
    imports: [BootModule.register(__dirname, `config.yaml`), ConsulModule.register({ dependencies: [NEST_BOOT] })],
    providers: [ConsulService],
})
export class AppModule {}
