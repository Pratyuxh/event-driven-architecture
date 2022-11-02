import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';
import StateMachine from '../core/StateMachine';
import asyncHandler from '../helpers/asyncHandler';
import { createOneOrder } from '../services/repository/orderRepo';
import { createOneEvent } from '../services/repository/eventRepo';
import { setCache, getCache } from '../services/repository/cacheRepo';

const dispatchEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, orderId, data } = req.body;

  const event = { type, orderId, data: JSON.stringify(data) };
  await createOneEvent(event);

  return new SuccessResponse('success', {}).send(res);
});

export { dispatchEvent };
