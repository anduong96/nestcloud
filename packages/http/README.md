[travis-image]: https://api.travis-ci.org/nest-cloud/nestcloud.svg?branch=master
[travis-url]: https://travis-ci.org/nest-cloud/nestcloud
[linux-image]: https://img.shields.io/travis/nest-cloud/nestcloud/master.svg?label=linux
[linux-url]: https://travis-ci.org/nest-cloud/nestcloud

# NestCloud - Http

<p align="center">
    <a href="https://www.npmjs.com/~nestcloud" target="_blank"><img src="https://img.shields.io/npm/v/@nestcloud2/core.svg" alt="NPM Version"/></a>
    <a href="https://www.npmjs.com/~nestcloud" target="_blank"><img src="https://img.shields.io/npm/l/@nestcloud2/core.svg" alt="Package License"/></a>
    <a href="https://www.npmjs.com/~nestcloud" target="_blank"><img src="https://img.shields.io/npm/dm/@nestcloud2/core.svg" alt="NPM Downloads"/></a>
    <a href="https://travis-ci.org/nest-cloud/nestcloud" target="_blank"><img src="https://travis-ci.org/nest-cloud/nestcloud.svg?branch=master" alt="Travis"/></a>
    <a href="https://travis-ci.org/nest-cloud/nestcloud" target="_blank"><img src="https://img.shields.io/travis/nest-cloud/nestcloud/master.svg?label=linux" alt="Linux"/></a>
    <a href="https://coveralls.io/github/nest-cloud/nestcloud?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nest-cloud/nestcloud/badge.svg?branch=master" alt="Coverage"/></a>
</p>

## Description

This is a [Nest](https://github.com/nestjs/nest) module for writing nestjs http clients easier.

## Installation

```bash
$ npm i --save @nestcloud2/http
```

## Quick Start

### Import Module

```typescript
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestcloud2/http';

@Module({
    imports: [HttpModule.forRoot()],
})
export class AppModule {}
```

### Configurations

```yaml
http:
    axios:
        timeout: 1000
```

## Usage

```typescript
import { Injectable } from '@nestjs/common';
import { Get, Query, Post, Body, Param, Put, Delete } from '@nestcloud2/http';

@Injectable()
export class UserClient {
    @Get('http://test.com/users')
    getUsers(@Query('role') role: string) {}

    @Post('http://test.com/users')
    createUser(@Body('user') user: any) {}

    @Put('http://test.com/users/:userId')
    updateUser(@Param('userId') userId: string, @Body('user') user: any) {}

    @Delete('http://test.com/users/:userId')
    deleteUser(@Param('userId') userId: string) {}
}
```

### Loadbalance

```typescript
import { Injectable } from '@nestjs/common';
import { Loadbalanced, Get, Query } from '@nestcloud2/http';

@Injectable()
// enable loadbalance supports, need import @nestcloud2/loadbalance module at first.
@Loadbalanced('user-service')
export class UserClient {
    @Get('/users')
    getUsers(@Query('role') role: string) {}

    @Get('http://test.com/users')
    // disable loadbalance supports.
    @Loadbalanced(false)
    getRemoteUsers() {}
}
```

### Interceptor

```typescript
import { Injectable } from '@nestjs/common';
import { Interceptor } from '@nestcloud2/http';
import { AxiosResponse, AxiosRequestConfig } from 'axios';

@Injectable()
export class AddHeaderInterceptor implements Interceptor {
    onRequest(request: AxiosRequestConfig): AxiosRequestConfig {
        request.headers['x-service'] = 'service-name';
        return request;
    }

    onResponse(response: AxiosResponse): AxiosResponse {
        return response;
    }

    onRequestError(error: any): any {
        return Promise.reject(error);
    }

    onResponseError(error: any): any {
        return Promise.reject(error);
    }
}
```

```typescript
import { Injectable } from '@nestjs/common';
import { Get, UseInterceptors } from '@nestcloud2/http';
import { AddHeaderInterceptor } from './middlewares/AddHeaderInterceptor';

@Injectable()
@UseInterceptors(AddHeaderInterceptor)
export class ArticleClient {
    @Get('https://api.apiopen.top/recommendPoetry')
    getArticles() {}
}
```

examples:

```typescript
@UseInterceptors(Interceptor1)
@UseInterceptors(Interceptor2)
export class Client {
    @UseInterceptors(Interceptor3)
    @UseInterceptors(Interceptor4)
    getArticles() {}
}
```

result:

```text
interceptor1 request
interceptor2 request
interceptor3 request
interceptor4 request
interceptor4 response
interceptor3 response
interceptor2 response
interceptor1 response
```

### Brakes

Import `@nestcloud2/brakes` module at first.

```typescript
import { Module } from '@nestjs/common';
import { BrakesModule } from '@nestcloud2/brakes';

@Module({
    imports: [BrakesModule.forRoot()],
})
export class AppModule {}
```

Write a fallback class.

```typescript
import { Fallback } from '@nestcloud2/brakes';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class UserFallback implements Fallback {
    config() {
        return {};
    }

    fallback(...params) {
        throw new BadRequestException('fallback invoke');
    }

    healthCheck() {}
}
```

Use fallback.

```typescript
import { Injectable } from '@nestjs/common';
import { Get } from '@nestcloud2/http';
import { UseFallback } from '@nestcloud2/brakes';
import { UserFallback } from './UserFallback';

@Injectable()
@UseFallback(UserFallback)
export class UserClient {
    @Get('/users')
    getUsers(): any {}
}
```

## API

### Get\|Post\|Put\|Delete\|Options\|Head\|Patch\|Trace\(uri: string, options?: AxiosRequestConfig\): MethodDecorator

Route decorator.

| field   | type   | description                                               |
| :------ | :----- | :-------------------------------------------------------- |
| uri     | string | the url                                                   |
| options | object | axios config，see [axios](https://github.com/axios/axios) |

### Param\|Body\|Query\|Header\(field?: string\): ParameterDecorator

Parameter decorator.

| field | type   | description    |
| :---- | :----- | :------------- |
| field | string | the field name |

### SetHeader\|SetQuery\|SetParam\|SetBody\(field: string, value: any\): MethodDecorator

constant parameter decorator

| field | type   | description     |
| :---- | :----- | :-------------- |
| field | string | the field name  |
| value | any    | the field value |

### Response\(\): MethodDecorator

If set this decorator, it will return full http response.

### ResponseHeader\(\): MethodDecorator

If set this decorator, it will return response.headers.

### ResponseBody\(\): MethodDecorator

It's a default decorator, it will return response.data.

### ResponseType\(type: string\): MethodDecorator

set response data type, eg: 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream', default 'json'

### ResponseEncode\(type: string\): MethodDecorator

Set response data encode, default 'utf8'

### Loadbalanced\(service: string \| boolean\): ClassDecorator \| MethodDecorator

Open or close lb support.

### UseInterceptors&lt;T extends IInterceptor&gt;\(...interceptors: Function[]\)

Use interceptor, supports dynamic import and inject.

## Stay in touch

-   Author - [NestCloud](https://github.com/nest-cloud)

## License

NestCloud is [MIT licensed](LICENSE).
