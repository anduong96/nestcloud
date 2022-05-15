import 'reflect-metadata';
import { applyDecorators, ExtendMetadata } from '@nestcloud2/common';
import { CONFIG_VALUE } from '../config.constants';

export function ConfigValue(name?: string, defaults?: any): PropertyDecorator {
    return applyDecorators((target, property) => {
        return ExtendMetadata(CONFIG_VALUE, {
            property,
            name,
            defaults,
        })(target, property);
    });
}
