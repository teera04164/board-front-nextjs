import { AxiosError } from 'axios'
import { ERROR_CODES, ERROR_MESSAGES } from '@/constants/error'
import { ApiErrorResponse, ErrorResult } from '@/types/api.types'

const createErrorResult = (code: string, message: string, status: number, errors?: string[]): ErrorResult => ({
  code,
  message,
  status,
  errors,
})

const getMessage = (data: ApiErrorResponse, fallback: string): string =>
  Array.isArray(data?.message) ? data.message[0] : data?.message || fallback

const handleError = (code: string, message: string, status: number, errors?: string[]): ErrorResult =>
  createErrorResult(code, message, status, errors)

const handleValidationError = (data: ApiErrorResponse): ErrorResult => {
  const message = getMessage(data, ERROR_MESSAGES.VALIDATION)
  return handleError(ERROR_CODES.VALIDATION, message, 400, Array.isArray(data?.message) ? data.message : undefined)
}

const handleAuthError = (status: number, data: ApiErrorResponse): ErrorResult => {
  const message = getMessage(data, ERROR_MESSAGES.UNAUTHORIZED)
  return handleError(status === 401 ? ERROR_CODES.UNAUTHORIZED : ERROR_CODES.FORBIDDEN, message, status)
}

const handleServerError = (status: number): ErrorResult =>
  handleError(ERROR_CODES.SERVER_ERROR, ERROR_MESSAGES.SERVER_ERROR, status)

const handleClientError = (status: number, data: ApiErrorResponse): ErrorResult => {
  const message = getMessage(data, ERROR_MESSAGES.CLIENT_ERROR)
  return handleError(
    data?.error || ERROR_CODES.CLIENT_ERROR,
    message,
    data?.statusCode || status,
    Array.isArray(data?.message) ? data.message : undefined,
  )
}

const handleNetworkError = (): ErrorResult => handleError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES.NETWORK_ERROR, 0)

export const getErrorMessage = (error: unknown): ErrorResult => {
  if (error instanceof AxiosError) {
    if (error.code === 'ERR_NETWORK') {
      return handleNetworkError()
    }

    const status = error.response?.status
    const data = error.response?.data as ApiErrorResponse

    switch (status) {
      case 400:
        return handleValidationError(data)
      case 401:
      case 403:
        return handleAuthError(status, data)
      default:
        return (status ?? 500) >= 500 ? handleServerError(status ?? 500) : handleClientError(status ?? 400, data)
    }
  }

  return handleError(ERROR_CODES.UNKNOWN_ERROR, ERROR_MESSAGES.UNKNOWN_ERROR, 500)
}
