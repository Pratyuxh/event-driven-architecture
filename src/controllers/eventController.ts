import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';
import StateMachine from '../core/StateMachine';
import asyncHandler from '../helpers/asyncHandler';
import { createOneDelivery } from '../services/repository/deliveryRepo';
import { createOneEvent } from '../services/repository/eventRepo';
import { setCache, getCache } from '../services/repository/cacheRepo';

const dispatchEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, deliveryId, data } = req.body;

  const event = { type, deliveryId, data: JSON.stringify(data) };
  await createOneEvent(event);

  return new SuccessResponse('success', {}).send(res);
});

export { dispatchEvent };
