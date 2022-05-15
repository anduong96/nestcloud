import { Injectable, ServiceUnavailableException } from '@nestjs/common';

import { AxiosResponse } from 'axios';
import { IFallback } from '@nestcloud2/feign';

@Injectable()
export class CustomFallback implements IFallback {
    fallback(): Promise<AxiosResponse | void> | AxiosResponse | void {
        throw new ServiceUnavailableException('The service is unavailable, please retry soon.');
    }
}
