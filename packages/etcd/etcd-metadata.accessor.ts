import { ETCD_KEY_VALUE } from './etcd.constants';
import { Inject, Injectable } from '@nestjs/common';
import { KeyValueMetadata } from '@nestcloud2/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class EtcdMetadataAccessor {
    constructor(@Inject(Reflector.name) private readonly reflector: Reflector) {}

    getKeyValues(target: Function): KeyValueMetadata[] | undefined {
        return this.reflector.get(ETCD_KEY_VALUE, target);
    }
}
