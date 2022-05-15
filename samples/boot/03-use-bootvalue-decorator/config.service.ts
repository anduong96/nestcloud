import { BootValue } from '@nestcloud2/boot';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
    // constructor(
    //     @InjectBoot() private readonly boot: Boot,
    // ) {
    // }
    //
    // getService(): string {
    //     return this.boot.get<string>('config.service.name', 'default-service');
    // }

    @BootValue('config.service.name', 'default-service')
    private readonly serviceName: string;
}
