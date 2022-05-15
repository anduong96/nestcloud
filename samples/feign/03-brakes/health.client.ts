import { Get, Loadbalanced } from '@nestcloud2/feign';

import { Injectable } from '@nestjs/common';

@Injectable()
@Loadbalanced('your-service-name')
export class HealthClient {
    @Get('/health')
    checkHealth() {}
}
