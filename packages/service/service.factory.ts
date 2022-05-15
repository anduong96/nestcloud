import { CONSUL, ETCD } from '@nestcloud2/common';

import { ConsulService } from './service.consul';
import { EtcdService } from './service.etcd';
import { NO_DEPS_MODULE_FOUND } from './service.messages';
import { ServiceOptions } from './interfaces/service-options.interface';

export class ServiceFactory {
    constructor(private readonly options: ServiceOptions) {}

    create(backend: string, ref: any) {
        switch (backend) {
            case CONSUL:
                return new ConsulService(ref, this.options);
            case ETCD:
                return new EtcdService(ref, this.options);
            default:
                throw new Error(NO_DEPS_MODULE_FOUND);
        }
    }
}
