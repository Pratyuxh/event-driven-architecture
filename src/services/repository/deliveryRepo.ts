import Delivery from '../../database/redis/model/delivery';

const createOneDelivery = (data: any) => {
  return Delivery.createAndSave(data);
};

export { createOneDelivery };
