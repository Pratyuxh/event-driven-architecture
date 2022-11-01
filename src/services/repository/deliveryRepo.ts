import Delivery from '../../database/redis/model/delivery';

const createOneDelivery = (data: any) => {
  return Delivery.save(Delivery.createEntity(data));
};

export { createOneDelivery };
