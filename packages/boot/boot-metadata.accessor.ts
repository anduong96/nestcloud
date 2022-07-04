import { BOOT_VALUE } from './boot.constants';
import { BootValueMetadata } from './interfaces/boot-value-metadata.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class BootMetadataAccessor {
    constructor(@Inject(Reflector.name) private readonly reflector: Reflector) {}

    getBootValues(target: Function): BootValueMetadata[] | undefined {
        try {
            return this.reflector.get(BOOT_VALUE, target);
        } catch (e) {
            return;
        }
    }
}
