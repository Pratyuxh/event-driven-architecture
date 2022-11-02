import Order from '../../database/redis/model/order';

const createOneOrder = (data: any) => {
  return Order.createAndSave(data);
};

export { createOneOrder };
