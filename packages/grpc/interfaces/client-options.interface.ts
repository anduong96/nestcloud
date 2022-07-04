import { GrpcOptions } from '@nestjs/microservices/interfaces';

export interface ClientOptions extends Pick<GrpcOptions['options'], 'protoPath' | 'loader' | 'package' | 'url'> {
    service?: string;
}
