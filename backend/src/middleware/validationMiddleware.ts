import { Request, Response, NextFunction } from 'express';
import { z, ZodSchema } from 'zod';
import { createError } from './errorMiddleware';

export function validationMiddleware(schema: ZodSchema) {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      req.body = await schema.parseAsync(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        const validationError = createError(
          'Validation failed',
          400,
          'VALIDATION_ERROR',
          error.errors
        );
        next(validationError);
      } else {
        next(error);
      }
    }
  };
}
