import Event from '../../database/redis/model/event';

const createOneEvent = (data: any) => {
  return Event.createAndSave(data);
};

export { createOneEvent };
