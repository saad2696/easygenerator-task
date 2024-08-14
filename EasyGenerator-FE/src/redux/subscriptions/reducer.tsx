import * as types from "./action-types";

const subscriptionState = {
    subscriptionName: '',
		price: '',
		subscriptionDescriptions: '',
};

const subscriptionsReducer = (
  state = subscriptionState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.SUBSCRIPTION_SET:
      return {
        ...state,
        subscriptionData: action?.payload,
      };
      case types.SUBSCRIPTION_CLEAR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default subscriptionsReducer;
