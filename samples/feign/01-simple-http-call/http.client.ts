import { Injectable } from '@nestjs/common';
import { Get, Query } from '@nestcloud2/feign';

@Injectable()
export class HttpClient {
    @Get('http://example.com/api/data')
    getRemoteData(@Query() query?: any): any {}
}
