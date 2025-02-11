export interface ApiErrorResponse {
    error?: string;
    message?: string | string[];
    statusCode?: number;
}

export interface ErrorResult {
    code: string;
    message: string;
    status: number;
    errors?: string[];
}