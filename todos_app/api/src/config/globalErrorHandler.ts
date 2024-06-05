import { Request, Response, NextFunction } from 'express';

export function globalErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(`Global Error Handler: ${err.message}`);

  if (!res.headersSent) {
    res.status(500).json({ error: 'Internal Server Error', message: err.message} );
  }
}
