import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import { BadRequestError } from '../core/ApiError';
import StateMachine from '../core/StateMachine';
import asyncHandler from '../helpers/asyncHandler';
import { createOneDelivery } from '../services/repository/deliveryRepo';
import { createOneEvent } from '../services/repository/eventRepo';
import { setCache, getCache } from '../services/repository/cacheRepo';

const addDelivery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, data } = req.body;

  const delivery = await createOneDelivery(data);

  const event = { type, deliveryId: delivery.entityId, data: JSON.stringify(data) };
  await createOneEvent(event);

  const state = StateMachine.addDelivery({}, { ...event, data });

  await setCache(`Delivery:${delivery.entityId}`, JSON.stringify(state));

  return new SuccessResponse('success', state).send(res);
});

const fetchDeliveryStatus = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { deliveryId } = req.params;

    const stateCache = await getCache(`Delivery:${deliveryId}`);
    if (!stateCache) throw new BadRequestError('Delivery not found');

    const state = JSON.parse(stateCache);
    return new SuccessResponse('success', state).send(res);
  },
);

export { addDelivery, fetchDeliveryStatus };
