import { Entity, Schema } from 'redis-om';
import redisClient from '../index';

class DeliveryEntity extends Entity {}

const deliverySchema = new Schema(
  DeliveryEntity,
  {
    budget: { type: 'number' },
    quotes: { type: 'string' },
  },
  {
    dataStructure: 'HASH',
  },
);

const Delivery = redisClient.fetchRepository(deliverySchema);

Delivery.createIndex();

export default Delivery;
