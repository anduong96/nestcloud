import { Module, DynamicModule, Global } from '@nestjs/common';
import { ProxyOptions } from './interfaces/proxy-options.interface';
import { Proxy } from './proxy';
import { ProxyExplorer } from './proxy.explorer';
import { ProxyFilterRegistry } from './proxy-filter.registry';
import { ProxyRouteRegistry } from './proxy-route.registry';
import { ProxyMetadataAccessor } from './proxy-metadata.accessor';
import { DiscoveryModule } from '@nestjs/core';
import { Scanner, BOOT, CONFIG, IBoot, IConfig, PROXY, ILoadbalance, LOADBALANCE } from '@nestcloud2/common';
import { ProxyFilterRegister } from './proxy-filter.register';
import { ProxyConfig } from './proxy.config';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [ProxyMetadataAccessor, Scanner],
})
export class ProxyModule {
    public static forRoot(options: ProxyOptions): DynamicModule {
        return this.forRootAsync(options);
    }

    public static forRootAsync(options: ProxyOptions = {}): DynamicModule {
        const inject = options.inject || [];

        const proxyOptionsProvider = {
            provide: ProxyConfig,
            useFactory: (...params: any[]) => {
                const boot: IBoot = params[inject.indexOf(BOOT)];
                const config: IConfig = params[inject.indexOf(CONFIG)];
                return new ProxyConfig(options, boot, config);
            },
            inject,
        };
        const proxyProvider = {
            provide: PROXY,
            useFactory: (
                config: ProxyConfig,
                filterRegistry: ProxyFilterRegistry,
                routeRegistry: ProxyRouteRegistry,
                ...params: any[]
            ) => {
                const lb: ILoadbalance = params[inject.indexOf(LOADBALANCE)];
                return new Proxy(config, filterRegistry, routeRegistry, lb);
            },
            inject: [ProxyConfig, ProxyFilterRegistry, ProxyRouteRegistry, ...inject],
        };
        return {
            module: ProxyModule,
            providers: [
                proxyOptionsProvider,
                proxyProvider,
                ProxyExplorer,
                ProxyFilterRegistry,
                ProxyRouteRegistry,
                ProxyFilterRegister,
            ],
            exports: [proxyProvider],
        };
    }
}
