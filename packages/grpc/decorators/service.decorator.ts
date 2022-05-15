import { ClientOptions } from '../interfaces/client-options.interface';
import { GRPC_SERVICE } from '../grpc.constants';
import { applyDecorators, ExtendMetadata } from '@nestcloud2/common';

export function Service(name: string, options?: ClientOptions): PropertyDecorator {
    return applyDecorators((target, property) => {
        return ExtendMetadata(GRPC_SERVICE, {
            name,
            property,
            options,
        })(target, property);
    });
}
