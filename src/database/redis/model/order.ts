import { Entity, Schema } from 'redis-om';
import redisClient from '../index';

class OrderEntity extends Entity {}

const orderSchema = new Schema(
  OrderEntity,
  {
    budget: { type: 'number' },
    quote: { type: 'string' },
  },
  {
    dataStructure: 'HASH',
  },
);

const Order = redisClient.fetchRepository(orderSchema);

Order.createIndex();

export default Order;
