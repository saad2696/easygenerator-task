import * as types from "./action-types";


const setSubscription = (subDetails: any) => ({
  type: types.SUBSCRIPTION_SET,
  payload: subDetails,
});
const clearSubscription = () => ({
  type: types.SUBSCRIPTION_CLEAR,
});


export const setSubscriptions = (subDetails: any): any => {
  return (dispatch: any) => {
    dispatch(setSubscription(subDetails));
  };
};

export const clearSubscriptions = (subDetails: any): any => {
  return (dispatch: any) => {
    dispatch(clearSubscription());
  };
};