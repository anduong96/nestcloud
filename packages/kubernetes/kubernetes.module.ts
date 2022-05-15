import { AsyncKubernetesOptions, KubernetesOptions } from './interfaces/kubernetes-options.interface';
import { BOOT, CONFIG, IBoot, IConfig, KUBERNETES } from '@nestcloud2/common';
import { DynamicModule, Global, Module } from '@nestjs/common';
import { isObject, isString } from 'util';

import { KUBERNETES_OPTIONS_PROVIDER } from './kubernetes.constants';
import { KubeConfig } from '@kubernetes/client-node';
import { Kubernetes } from './kubernetes';
import Api = require('kubernetes-client');

@Global()
@Module({})
export class KubernetesModule {
    private static CONFIG_PREFIX = 'kubernetes';

    public static forRoot(options: KubernetesOptions): DynamicModule {
        return this.register(options);
    }

    public static forRootAsync(options: AsyncKubernetesOptions): DynamicModule {
        return this.register(options);
    }

    private static register(options: KubernetesOptions & AsyncKubernetesOptions = {}): DynamicModule {
        const inject = options.inject || [];
        const kubernetesOptionsProvider = {
            provide: KUBERNETES_OPTIONS_PROVIDER,
            useFactory: (...params: any[]) => {
                let registerOptions = options;
                const boot: IBoot = params[inject.indexOf(BOOT)];
                if (boot) {
                    options = boot.get(this.CONFIG_PREFIX);
                }
                registerOptions = Object.assign(registerOptions, options);

                const config: IConfig = params[inject.indexOf(CONFIG)];
                if (config) {
                    options = config.get(this.CONFIG_PREFIX);
                }
                return Object.assign(registerOptions, options);
            },
            inject,
        };

        const kubernetesProvider = {
            provide: KUBERNETES,
            useFactory: (options: KubernetesOptions): Kubernetes => {
                const kubeconfig = new KubeConfig();
                if (isString(options.config)) {
                    kubeconfig.loadFromFile(options.config);
                } else if (isObject(options.config)) {
                    kubeconfig.loadFromOptions(options.config);
                } else if (options.cluster && options.user) {
                    kubeconfig.loadFromClusterAndUser(options.cluster, options.user);
                } else {
                    kubeconfig.loadFromDefault();
                }
                const Request = require('kubernetes-client/backends/request');
                const backend = new Request({ kubeconfig });
                return new Api.Client1_13({ backend });
            },
            inject: [KUBERNETES_OPTIONS_PROVIDER],
        };

        return {
            module: KubernetesModule,
            providers: [kubernetesProvider, kubernetesOptionsProvider],
            exports: [kubernetesProvider],
        };
    }
}
