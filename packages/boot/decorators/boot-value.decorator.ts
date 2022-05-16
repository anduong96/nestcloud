import 'reflect-metadata';

import { ExtendMetadata, applyDecorators } from '../../common';

import { BOOT_VALUE } from '../boot.constants';

export function BootValue(name?: string, defaults?: string): PropertyDecorator {
    return applyDecorators((target, property) => {
        return ExtendMetadata(BOOT_VALUE, {
            name,
            property,
            defaults,
        })(target, property);
    });
}
