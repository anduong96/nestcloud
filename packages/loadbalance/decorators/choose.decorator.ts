import { applyDecorators, ExtendMetadata } from '@nestcloud2/common';
import { LOADBALANCE_CHOOSE } from '../loadbalance.constants';

export function Choose(service: string): PropertyDecorator {
    return applyDecorators((target, property) => {
        return ExtendMetadata(LOADBALANCE_CHOOSE, {
            property,
            service,
        })(target, property);
    });
}
