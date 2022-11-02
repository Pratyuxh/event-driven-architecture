import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';
import StateMachine from '../core/StateMachine';
import asyncHandler from '../helpers/asyncHandler';
import { createOneOrder } from '../services/repository/orderRepo';
import { createOneEvent } from '../services/repository/eventRepo';
import { setOrderCache, getOrderCache } from '../services/repository/cacheRepo';

const addOrder = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, data } = req.body;

  const order = await createOneOrder(data);

  const event = { type, orderId: order.entityId, data: JSON.stringify(data) };
  await createOneEvent(event);

  const state = StateMachine.transitionState({}, event);

  await setOrderCache(order.entityId, JSON.stringify(state));

  return new SuccessResponse('success', state).send(res);
});

const fetchOrderStatus = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { orderId } = req.params;

  const stateCache = await getOrderCache(orderId);
  if (!stateCache) throw new BadRequestError('Order not found');

  const state = JSON.parse(stateCache);
  return new SuccessResponse('success', state).send(res);
});

export { addOrder, fetchOrderStatus };
