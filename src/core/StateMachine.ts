import { BadRequestError } from './ApiError';

enum TransitionsMap {
  CREATE_ORDER = 'CREATE_ORDER',
  START_DELIVERY = 'START_DELIVERY',
  PICKUP_PRODUCTS = 'PICKUP_PRODUCTS',
  DROP_PRODUCTS = 'DROP_PRODUCTS',
  TOP_UP_BUDGET = 'TOP_UP_BUDGET',
}

enum State {
  READY = 'READY',
  ACTIVE = 'ACTIVE',
  COLLECTED = 'COLLECTED',
  COMPLETED = 'COMPLETED',
}

const transitionState = (state: any, event: any) => {
  switch (event.type) {
    case TransitionsMap.CREATE_ORDER:
      return addOrder(state, event);
    case TransitionsMap.START_DELIVERY:
      return startOrder(state, event);
    case TransitionsMap.PICKUP_PRODUCTS:
      return pickupOrder(state, event);
    case TransitionsMap.DROP_PRODUCTS:
      return dropOrder(state, event);
    case TransitionsMap.TOP_UP_BUDGET:
      return topUpBudget(state, event);

    default:
      throw new BadRequestError('Unknown event type');
  }
};

const addOrder = (state: any, event: any) => {
  event.data = JSON.parse(event.data);

  return {
    ...event,
    status: State.READY,
  };
};

const startOrder = (state: any, event: any) => {
  event.data = JSON.parse(event.data);
  state.data = { ...state.data, ...event.data };

  if (state.status !== State.READY) throw new BadRequestError('Delivery already started');

  return {
    ...state,
    status: State.ACTIVE,
  };
};

const pickupOrder = (state: any, event: any) => {
  event.data = JSON.parse(event.data);
  state.data = { ...state.data, ...event.data };

  state.data.budget = state.data.budget - event.data.purchasePrice * event.data.quantity;
  if (state.data.budget < 0) throw new BadRequestError('Not enough budget');

  return {
    ...state,
    status: State.COLLECTED,
  };
};

const dropOrder = (state: any, event: any) => {
  event.data = JSON.parse(event.data);
  state.data = { ...state.data, ...event.data };

  state.data.budget = state.data.budget + event.data.sellPrice * event.data.quantity;
  state.data.quantity = state.data.quantity - event.data.quantity;
  if (state.data.quantity < 0) throw new BadRequestError('Not enough quantity');

  return {
    ...state,
    status: State.COMPLETED,
  };
};

const topUpBudget = (state: any, event: any) => {
  event.data = JSON.parse(event.data);
  state.data = { ...state.data, ...event.data };

  state.data.budget += event.data.budget;

  return state;
};

export default { transitionState };
