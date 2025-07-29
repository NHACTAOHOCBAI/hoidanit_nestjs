import { Request } from 'express';
export class SuccessResponseDto<T = any> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
    path: string;
}

export function buildSuccessResponse<T>(
    statusCode = 200,
    message: string,
    data: T,
    request?: Request
): SuccessResponseDto<T> {
    return {
        statusCode,
        message,
        data,
        timestamp: new Date().toISOString(),
        path: request?.url || '',
    };
}
