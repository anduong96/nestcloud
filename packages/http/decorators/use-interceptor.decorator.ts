import 'reflect-metadata';

import { ExtendArrayMetadata, GUARDS_METADATA, applyDecorators } from '../../common';

import { INTERCEPTOR_METADATA } from '../http.constants';
import { Interceptor } from '../interfaces/interceptor.interface';

export function UseInterceptors(...Interceptors: (Interceptor | Function)[]) {
    return applyDecorators(
        ExtendArrayMetadata(INTERCEPTOR_METADATA, Interceptors),
        ExtendArrayMetadata(GUARDS_METADATA, Interceptors),
    );
}
