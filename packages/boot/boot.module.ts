import { DynamicModule, Global, Module } from '@nestjs/common';

import { BOOT } from '../common';
import { BOOT_OPTIONS_PROVIDER } from './boot.constants';
import { Boot } from './boot.class';
import { BootExplorer } from './boot.explorer';
import { BootFileLoader } from './boot-file.loader';
import { BootMetadataAccessor } from './boot-metadata.accessor';
import { BootOptions } from './interfaces/boot-options.interface';
import { BootOrchestrator } from './boot.orchestrator';
import { BootStore } from './boot.store';
import { DiscoveryModule } from '@nestjs/core';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [BootMetadataAccessor, BootOrchestrator],
})
export class BootModule {
    static forRoot(options: BootOptions): DynamicModule {
        const bootOptionsProvider = {
            provide: BOOT_OPTIONS_PROVIDER,
            useValue: options,
        };
        const bootProvider = {
            provide: BOOT,
            useClass: Boot,
        };
        return {
            global: true,
            module: BootModule,
            providers: [bootOptionsProvider, bootProvider, BootFileLoader, BootStore, BootExplorer],
            exports: [bootProvider],
        };
    }
}
