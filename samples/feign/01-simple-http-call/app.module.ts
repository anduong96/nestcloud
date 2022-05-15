import { BootModule } from '@nestcloud2/boot';
import { FeignModule } from '@nestcloud2/feign';
import { HttpClient } from './http.client';
import { Module } from '@nestjs/common';
import { NEST_BOOT } from '@nestcloud2/common';
import { TestService } from './test.service';

@Module({
    imports: [BootModule.register(__dirname, 'config.yaml'), FeignModule.register({ dependencies: [NEST_BOOT] })],
    providers: [HttpClient, TestService],
})
export class AppModule {}
