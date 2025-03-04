import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';

@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.BAD_REQUEST;

    let message = 'Database error';
    if (exception.code === 11000) {
      // Handle duplicate key error
      message =
        'A user with this email already exists. Please use a different email address.';
    }

    response.status(status).json({
      statusCode: status,
      message,
      error: exception.message,
    });
  }
}
