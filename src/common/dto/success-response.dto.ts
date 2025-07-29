import { Request } from 'express';
export class SuccessResponseDto<T = any> {
    statusCode: number;
    message: string;
    data: T;
    timestamp: string;
    path: string;
}

export function buildSuccessResponse<T>(
    data: T,
    message: string,
    statusCode = 200,
    request?: Request,
): SuccessResponseDto<T> {
    return {
        statusCode,
        message,
        data,
        timestamp: new Date().toISOString(),
        path: request?.url || '',
    };
}
