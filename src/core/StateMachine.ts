const addDelivery = (state: any, event: any) => {
  return {
    ...event,
    state: 'READY',
  };
};

export default { addDelivery };
