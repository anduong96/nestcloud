import 'reflect-metadata';
import { PATH_METADATA, METHOD_METADATA, OPTIONS_METADATA } from '../http.constants';
import { AxiosRequestConfig } from 'axios';
import { applyDecorators, SetMetadata, AssignMetadata } from '../../common';

export const Get = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('GET', path, options);

export const Post = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('POST', path, options);

export const Put = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('PUT', path, options);

export const Delete = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('DELETE', path, options);

export const Head = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('HEAD', path, options);

export const Patch = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('PATCH', path, options);

export const Options = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('OPTIONS', path, options);

export const Trace = (path: string, options?: AxiosRequestConfig): MethodDecorator =>
    createMappingDecorator('GET', path, options);

const createMappingDecorator = (method: string, path: string, options?: object) =>
    applyDecorators(
        SetMetadata(PATH_METADATA, path),
        SetMetadata(METHOD_METADATA, method),
        AssignMetadata(OPTIONS_METADATA, options || {}),
    );
