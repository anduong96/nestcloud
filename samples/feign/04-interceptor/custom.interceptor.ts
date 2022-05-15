import { AxiosRequestConfig, AxiosResponse } from 'axios';

import { IInterceptor } from '@nestcloud2/feign';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomInterceptor implements IInterceptor {
    onRequest(request: AxiosRequestConfig): AxiosRequestConfig {
        return request;
    }

    onRequestError(error: any): any {
        return Promise.reject(error);
    }

    onResponse(response: AxiosResponse): AxiosResponse {
        return response;
    }

    onResponseError(error: any): any {
        return Promise.reject(error);
    }
}
