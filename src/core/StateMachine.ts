const addOrder = (state: any, event: any) => {
  return {
    ...event,
    state: 'READY',
  };
};

export default { addOrder };
