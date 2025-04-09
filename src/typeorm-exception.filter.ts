import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';

export interface IResponseError {
  statusCode: number;
  message: string;
  error: string;
}

export const TypeORMResponseError: (
  statusCode: number,
  message: string,
  error: string,
) => IResponseError = (
  statusCode: number,
  message: string,
  error: string,
): IResponseError => {
  return {
    statusCode,
    message,
    error,
  };
};

/**
 * TypeORMExceptionFilter is supposed to handle database errors.
 * One potenntial problem is using `message` property of the error object,
 * as it can leak sensitive information.
 *
 * To achieve more secture solution, we would need either custom messages for every type of error,
 * or some formatting of the database error message.
 */
@Catch(TypeORMError)
export class TypeORMExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let message = exception.message;

    Logger.error(message, exception.stack, `${request.method} ${request.url}`);

    let status: HttpStatus;
    let error: string;

    switch (exception.constructor) {
      case EntityNotFoundError:
        status = HttpStatus.UNPROCESSABLE_ENTITY;
        message = (exception as EntityNotFoundError).message;
        error = 'Unprocessable Entity';
        break;
      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = exception.message;
        error = 'Internal Server Error';
        break;
    }

    response.status(status).json(TypeORMResponseError(status, message, error));
  }
}
