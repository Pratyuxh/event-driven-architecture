import { Entity, Schema } from 'redis-om';
import redisClient from '../index';

class EventEntity extends Entity {}

const eventSchema = new Schema(
  EventEntity,
  {
    type: { type: 'string' },
    orderId: { type: 'string' },
    data: { type: 'string' },
  },
  {
    dataStructure: 'HASH',
  },
);

const Event = redisClient.fetchRepository(eventSchema);

Event.createIndex();

export default Event;
