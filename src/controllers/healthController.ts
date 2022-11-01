import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import asyncHandler from '../helpers/asyncHandler';

const getHealth = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const healthData = {
    uptime: process.uptime(),
  };
  return new SuccessResponse('success', healthData).send(res);
});

export { getHealth };
