export class ErrorResponseDto {
    statusCode: number;
    message: string | object
    timestamp: string;
    path: string;
}