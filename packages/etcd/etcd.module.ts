import { AsyncEtcdOptions, EtcdOptions } from './interfaces/etcd-options.interface';
import { BOOT, ETCD, IBoot } from '@nestcloud2/common';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { Etcd3, IOptions } from 'etcd3';

import { DiscoveryModule } from '@nestjs/core';
import { ETCD_OPTIONS_PROVIDER } from './etcd.constants';
import { Etcd } from './etcd';
import { EtcdExplorer } from './etcd.explorer';
import { EtcdMetadataAccessor } from './etcd-metadata.accessor';
import { EtcdOrchestrator } from './etcd.orchestrator';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [EtcdMetadataAccessor, EtcdOrchestrator],
})
export class EtcdModule {
    private static CONFIG_PREFIX = 'etcd';

    public static forRoot(options: EtcdOptions): DynamicModule {
        return this.register(options);
    }

    public static forRootAsync(options: AsyncEtcdOptions): DynamicModule {
        return this.register(options);
    }

    private static register(options: EtcdOptions & AsyncEtcdOptions = { hosts: '127.0.0.1:2379' }): DynamicModule {
        const inject = options.inject || [];
        const etcdOptionsProvider = {
            provide: ETCD_OPTIONS_PROVIDER,
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

        const etcdProvider = {
            provide: ETCD,
            useFactory: (options: EtcdOptions): Etcd => {
                this.parseCertificate(options);
                return new Etcd3(options as IOptions);
            },
            inject: [ETCD_OPTIONS_PROVIDER],
        };

        return {
            module: EtcdModule,
            providers: [etcdOptionsProvider, etcdProvider, EtcdExplorer],
            exports: [etcdProvider],
        };
    }

    private static parseCertificate(options: EtcdOptions): EtcdOptions {
        if (options.credentials) {
            if (options.credentials.rootCertificate) {
                options.credentials.rootCertificate = new Buffer(options.credentials.rootCertificate);
            }
            if (options.credentials.privateKey) {
                options.credentials.privateKey = new Buffer(options.credentials.privateKey);
            }
            if (options.credentials.certChain) {
                options.credentials.certChain = new Buffer(options.credentials.certChain);
            }
        }
        return options;
    }
}
