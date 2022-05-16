import { LOADBALANCE_SERVICE, SetMetadata, applyDecorators } from '../../common';

export function Loadbalanced(service: string | boolean) {
    return applyDecorators(SetMetadata(LOADBALANCE_SERVICE, service));
}
