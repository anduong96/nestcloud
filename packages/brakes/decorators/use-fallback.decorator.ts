import 'reflect-metadata';
import { BRAKES_METADATA, GUARDS_METADATA, SetMetadata, applyDecorators, ExtendMetadata } from '@nestcloud2/common';
import { Fallback } from '../interfaces/fallback.interface';

export function UseFallback(Fallback: Fallback | Function) {
    return applyDecorators(SetMetadata(BRAKES_METADATA, Fallback), ExtendMetadata(GUARDS_METADATA, Fallback));
}
