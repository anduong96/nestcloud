import {
    NEST_BOOT_PROVIDER,
    NEST_CONFIG_PROVIDER,
    NEST_CONSUL_PROVIDER,
    NEST_ETCD_PROVIDER,
    NEST_FEIGN_PROVIDER,
    NEST_KUBERNETES_PROVIDER,
    NEST_LOADBALANCE_PROVIDER,
    NEST_LOGGER_PROVIDER,
    NEST_MEMCACHED_PROVIDER,
    NEST_PROXY_PROVIDER,
    NEST_SERVICE_PROVIDER,
} from '@nestcloud2/common';

import { Global } from './global';
import { INestApplicationContext } from '@nestjs/common';
import { STATIC_CONTEXT } from '@nestjs/core/injector/constants';

export class NestCloud {
    public static global: Global = new Global();
    private static readonly providerKeys = {
        [NEST_BOOT_PROVIDER]: 'boot',
        [NEST_CONSUL_PROVIDER]: 'consul',
        [NEST_CONFIG_PROVIDER]: 'consulConfig',
        [NEST_SERVICE_PROVIDER]: 'consulService',
        [NEST_LOADBALANCE_PROVIDER]: 'loadbalance',
        [NEST_FEIGN_PROVIDER]: 'feign',
        [NEST_PROXY_PROVIDER]: 'proxy',
        [NEST_LOGGER_PROVIDER]: 'logger',
        [NEST_MEMCACHED_PROVIDER]: 'memcached',
        [NEST_ETCD_PROVIDER]: 'etcd',
        [NEST_KUBERNETES_PROVIDER]: 'kubernetes',
    };

    static create<T extends INestApplicationContext = INestApplicationContext>(application: T): T {
        this.initialize(application);
        return application;
    }

    private static initialize(app) {
        this.global.app = app;
        const modules = this.global.getContainer().getModules();
        for (const module of modules.values()) {
            for (const providerKey in this.providerKeys) {
                if (module.providers.has(providerKey)) {
                    const instanceWrapper = module.providers.get(providerKey);
                    if (!instanceWrapper) {
                        continue;
                    }
                    const instanceHost = instanceWrapper.getInstanceByContextId(STATIC_CONTEXT);
                    if (instanceHost.isResolved && instanceHost.instance) {
                        this.global[this.providerKeys[providerKey]] = instanceHost.instance;
                    }
                }
            }
        }
    }
}
