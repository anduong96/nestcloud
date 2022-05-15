import { AXIOS_INSTANCE_PROVIDER, HTTP_OPTIONS_PROVIDER } from './http.constants';
import { AsyncHttpOptions, HttpOptions } from './interfaces/http-options.interface';
import { BOOT, CONFIG, HTTP, IBoot, IConfig, Scanner } from '@nestcloud2/common';
import { DynamicModule, Global, Module } from '@nestjs/common';

import { DiscoveryModule } from '@nestjs/core';
import { HttpClient } from './http.client';
import { HttpExplorer } from './http.explorer';
import { HttpMetadataAccessor } from './http-metadata.accessor';
import { HttpOrchestrator } from './http.orchestrator';
import axios from 'axios';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [HttpOrchestrator, HttpMetadataAccessor, Scanner],
})
export class HttpModule {
    private static readonly CONFIG_PREFIX = 'http';

    public static forRoot(options: HttpOptions = {}): DynamicModule {
        return this.register(options);
    }

    public static forRootAsync(options: AsyncHttpOptions): DynamicModule {
        return this.register(options);
    }

    private static register(options: HttpOptions & AsyncHttpOptions = {}): DynamicModule {
        const inject = options.inject || [];
        const httpOptionsProvider = {
            provide: HTTP_OPTIONS_PROVIDER,
            useFactory: (...params: any[]) => {
                let registerOptions = options;
                const boot: IBoot = params[inject.indexOf(BOOT)];
                if (boot) {
                    options = boot.get<HttpOptions>(this.CONFIG_PREFIX);
                    registerOptions = Object.assign(registerOptions, options);
                }

                const config: IConfig = params[inject.indexOf(CONFIG)];
                if (config) {
                    options = config.get<HttpOptions>(this.CONFIG_PREFIX);
                }
                return Object.assign(registerOptions, options);
            },
            inject,
        };

        const axiosProvider = {
            provide: AXIOS_INSTANCE_PROVIDER,
            useFactory: () => axios,
        };

        const httpProvider = {
            provide: HTTP,
            useFactory: async (httpClient: HttpClient): Promise<any> => {
                return httpClient;
            },
            inject: [HttpClient],
        };

        return {
            module: HttpModule,
            providers: [httpProvider, httpOptionsProvider, axiosProvider, HttpExplorer, HttpClient],
            exports: [httpProvider],
        };
    }
}
