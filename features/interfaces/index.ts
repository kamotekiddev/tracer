export interface ErrorResponse {
    message: string | { property: string; message: string }[];
    error: string;
    statusCode: number;
}
