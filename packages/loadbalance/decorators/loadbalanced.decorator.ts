import { LOADBALANCE_SERVICE, SetMetadata, applyDecorators } from '@nestcloud2/common';

export function Loadbalanced(service: string | boolean) {
    return applyDecorators(SetMetadata(LOADBALANCE_SERVICE, service));
}
