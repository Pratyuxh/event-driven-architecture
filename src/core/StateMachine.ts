const createDelivery = (state: any, event: any) => {
  return {
    ...event,
    state: 'READY',
  };
};

export default { createDelivery };
