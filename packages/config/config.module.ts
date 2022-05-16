import { BOOT, CONFIG, CONSUL, ETCD, KUBERNETES } from '../common';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { IBoot, IConsul, IEtcd, IKubernetes } from '../common';

import { CONFIG_OPTIONS_PROVIDER } from './config.constants';
import { ConfigExplorer } from './config.explorer';
import { ConfigFactory } from './config.factory';
import { ConfigMetadataAccessor } from './config-metadata.accessor';
import { ConfigOptions } from './interfaces/config-options.interface';
import { ConfigOrchestrator } from './config.orchestrator';
import { ConfigStore } from './config.store';
import { DiscoveryModule } from '@nestjs/core';
import { IConfig } from '../common';
import { NO_DEPS_MODULE_FOUND } from './config.messages';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [ConfigMetadataAccessor, ConfigOrchestrator],
})
export class ConfigModule {
    private static CONFIG_PREFIX = 'config';

    public static forRootAsync(options: ConfigOptions = { name: '' }): DynamicModule {
        const inject = options.inject || [];
        const optionsProvider = {
            provide: CONFIG_OPTIONS_PROVIDER,
            useFactory: (...params: any[]) => {
                const registerOptions = options;
                const boot: IBoot = params[inject.indexOf(BOOT)];
                if (boot) {
                    options = boot.get(this.CONFIG_PREFIX);
                }
                return Object.assign(registerOptions, options);
            },
            inject,
        };
        const configProvider = {
            provide: CONFIG,
            useFactory: async (options: ConfigOptions, store: ConfigStore, ...params: any[]): Promise<IConfig> => {
                const factory = new ConfigFactory(store, options);
                const consul: IConsul = params[inject.indexOf(CONSUL)];
                if (consul) {
                    return factory.create(CONSUL, consul);
                }
                const kubernetes: IKubernetes = params[inject.indexOf(KUBERNETES)];
                if (kubernetes) {
                    return factory.create(KUBERNETES, kubernetes);
                }
                const etcd: IEtcd = params[inject.indexOf(ETCD)];
                if (etcd) {
                    return factory.create(ETCD, etcd);
                }

                throw new Error(NO_DEPS_MODULE_FOUND);
            },
            inject: [CONFIG_OPTIONS_PROVIDER, ConfigStore, ...inject],
        };
        return {
            global: true,
            module: ConfigModule,
            providers: [optionsProvider, configProvider, ConfigStore, ConfigExplorer],
            exports: [configProvider],
        };
    }
}
