import { DynamicModule, Global, Module } from '@nestjs/common';
import { GRPC, LOADBALANCE, Scanner } from '../common';

import { DiscoveryModule } from '@nestjs/core';
import { GrpcExplorer } from './grpc.explorer';
import { GrpcMetadataAccessor } from './grpc-metadata.accessor';
import { GrpcOrchestrator } from './grpc.orchestrator';

@Global()
@Module({
    imports: [DiscoveryModule],
    providers: [Scanner, GrpcMetadataAccessor, GrpcOrchestrator],
})
export class GrpcModule {
    static forRoot(): DynamicModule {
        const inject = [LOADBALANCE];

        const grpcProvider = {
            provide: GRPC,
            useFactory: async (): Promise<any> => {},
            inject,
        };

        return {
            module: GrpcModule,
            providers: [grpcProvider, GrpcExplorer],
            exports: [grpcProvider],
        };
    }
}
