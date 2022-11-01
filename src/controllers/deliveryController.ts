import { Request, Response, NextFunction } from 'express';
import { SuccessResponse } from '../core/ApiResponse';
import asyncHandler from '../helpers/asyncHandler';
import { createOneDelivery } from '../services/repository/deliveryRepo';
import { createOneEvent } from '../services/repository/eventRepo';

const addDelivery = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const { type, data } = req.body;

  const deliveryId = await createOneDelivery(data);

  const eventId = await createOneEvent({ type, deliveryId, data: JSON.stringify(data) });

  return new SuccessResponse('success', { type, deliveryId, eventId }).send(res);
});

export { addDelivery };
