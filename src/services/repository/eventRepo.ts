import Event from '../../database/redis/model/event';

const createOneEvent = (data: any) => {
  return Event.save(Event.createEntity(data));
};

export { createOneEvent };
