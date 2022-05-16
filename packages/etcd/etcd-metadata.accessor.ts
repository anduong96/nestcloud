import { ETCD_KEY_VALUE } from './etcd.constants';
import { Injectable } from '@nestjs/common';
import { KeyValueMetadata } from '../common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class EtcdMetadataAccessor {
    constructor(private readonly reflector: Reflector) {}

    getKeyValues(target: Function): KeyValueMetadata[] | undefined {
        return this.reflector.get(ETCD_KEY_VALUE, target);
    }
}
