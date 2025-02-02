import { DiscoveryService, NestContainer } from '@nestjs/core';
import { Injectable, OnModuleInit } from '@nestjs/common';

import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { Module } from '@nestjs/core/injector/module';
import { STATIC_CONTEXT } from '@nestjs/core/injector/constants';

@Injectable()
export class Scanner implements OnModuleInit {
    private container: NestContainer;

    constructor(private readonly discoveryService: DiscoveryService) {}

    onModuleInit(): any {
        this.container = this.findContainer();
    }

    public findInjectable<T extends any>(metaType: Function): T | undefined {
        if (!metaType) {
            return undefined;
        }
        const modules = this.container.getModules().values();
        for (const module of modules) {
            const instanceWrapper = module.injectables.get(metaType);
            if (instanceWrapper) {
                const instanceWrapper: InstanceWrapper = module.injectables.get(metaType);
                if (instanceWrapper) {
                    const instanceHost = instanceWrapper.getInstanceByContextId(STATIC_CONTEXT);
                    if (instanceHost.isResolved && instanceHost.instance) {
                        return instanceHost.instance;
                    }
                }
            }
        }
    }

    public findProviderByName<T extends any>(name: string): T | undefined {
        const modules = this.container.getModules().values();
        for (const module of modules) {
            const instanceWrapper = module.providers.get(name);
            if (instanceWrapper && module.providers.has(name)) {
                const instanceWrapper: InstanceWrapper = module.providers.get(name);
                if (instanceWrapper) {
                    const instanceHost = instanceWrapper.getInstanceByContextId(STATIC_CONTEXT);
                    if (instanceHost.isResolved && instanceHost.instance) {
                        return instanceHost.instance;
                    }
                }
            }
        }
    }

    public findContainer(): NestContainer {
        const providers: InstanceWrapper[] = this.discoveryService.getProviders();
        if (providers.length === 0) {
            return;
        }
        const module = providers[0].host as any;
        return module.container;
    }

    public findContextModule(constructor: Function): Module {
        const className = constructor.name;
        if (!className) {
            return;
        }
        for (const [, module] of [...this.container.getModules().entries()]) {
            if (this.findProviderByClassName(module, className)) {
                return module;
            }
        }
        return;
    }

    public findContextModuleName(constructor: Function): string {
        const className = constructor.name;
        if (!className) {
            return '';
        }
        for (const [key, module] of [...this.container.getModules().entries()]) {
            if (this.findProviderByClassName(module, className)) {
                return key;
            }
        }
        return '';
    }

    public findProviderByClassName(module: Module, className: string): boolean {
        const { providers } = module;
        const hasProvider = [...providers.keys()].some(provider => provider === className);
        return hasProvider;
    }
}
