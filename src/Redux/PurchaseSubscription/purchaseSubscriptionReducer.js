import * as types from "./types";
import { updateObject } from "../utility";

const initialState = {
  orderDetails: null,
};

const getOrderDetails = (state, action) => {
  return updateObject(state, {
    orderDetails: action.payload,
  });
};

const purchaseSubscriptionReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ORDER_DETAIL) {
    return getOrderDetails(state, action);
  } else return state;
};

export default purchaseSubscriptionReducer;
