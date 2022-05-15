import { HealthClient } from './health.client';
import { IHealthCheck } from '@nestcloud2/feign';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomCheck implements IHealthCheck {
    constructor(private readonly client: HealthClient) {}

    async check(): Promise<void> {
        await this.client.checkHealth();
    }
}
