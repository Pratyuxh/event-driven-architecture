import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';
import StateMachine from '../core/StateMachine';
import asyncHandler from '../helpers/asyncHandler';
import { createOneOrder } from '../services/repository/orderRepo';
import { createOneEvent } from '../services/repository/eventRepo';
import { setOrderCache, getOrderCache } from '../services/repository/cacheRepo';

const dispatchEvent = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, orderId, data } = req.body;

  const event = { type, orderId, data: JSON.stringify(data) };
  await createOneEvent(event);

  const stateCache = await getOrderCache(orderId);
  if (!stateCache) throw new BadRequestError('Order not found');

  const state = JSON.parse(stateCache);
  const newState = StateMachine.transitionState(state, event);

  await setOrderCache(orderId, JSON.stringify(newState));

  return new SuccessResponse('success', newState).send(res);
});

export { dispatchEvent };
