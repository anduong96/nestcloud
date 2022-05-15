import { IBoot, IConfig } from '@nestcloud2/common';
import { OnModuleInit } from '@nestjs/common';
import { LoadbalanceOptions } from './interfaces/loadbalance-options.interface';

export class LoadbalanceConfig implements OnModuleInit {
    private CONFIG_PREFIX = 'loadbalance';
    private options: LoadbalanceOptions = {};
    private refs: Function[] = [];

    constructor(
        private readonly opts: LoadbalanceOptions = {},
        private readonly boot: IBoot,
        private readonly config: IConfig,
    ) {}

    public getGlobalRule() {
        return this.options.rule || 'RandomRule';
    }

    public getServiceOptions() {
        return this.options.services || [];
    }

    public getRule(serviceName: string) {
        const serviceOptions = this.getServiceOptions();
        const serviceOption = serviceOptions.filter(item => {
            return item.name === serviceName;
        })[0];
        if (!serviceOption) {
            return this.getGlobalRule();
        }
        return serviceOption.rule;
    }

    public on(ref: Function) {
        this.refs.push(ref);
    }

    onModuleInit(): any {
        if (this.boot) {
            const bootOptions = this.boot.get<LoadbalanceOptions>(this.CONFIG_PREFIX, {});
            this.options = Object.assign(this.opts, this.options, bootOptions);
        }
        if (this.config) {
            const configOptions = this.config.get<LoadbalanceOptions>(this.CONFIG_PREFIX, {});
            this.options = Object.assign(this.opts, this.options, configOptions);

            this.config.watch(this.CONFIG_PREFIX, configOptions => {
                this.options = Object.assign(this.opts, this.options, configOptions);
                this.refs.forEach(ref => ref(this.options));
            });
        }
    }
}
