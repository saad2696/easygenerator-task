import { userDefault } from "./userDefault";
import * as types from "./action-types";

const userState = {
  loading: false,
  userData: null,
  error: null,
};

const userReducer = (
  state = userState,
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case types.LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action?.payload,
      };
    case types.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action?.payload,
      };
    case types.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action?.payload,
      };
    case types.SET_USER:
      return {
        ...state,
        loading: false,
        userData: action?.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
