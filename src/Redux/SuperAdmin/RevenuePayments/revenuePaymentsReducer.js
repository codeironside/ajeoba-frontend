import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  adminRevenueList: null,
  adminPaymentHistoryList: null,
};

const getAdminRevenueList = (state, action) => {
  return updateObject(state, {
    adminRevenueList: action.payload,
  });
};
const getAdminPaymentHistoryList = (state, action) => {
  return updateObject(state, {
    adminPaymentHistoryList: action.payload,
  });
};

const revenuePaymentsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ADMIN_REVENUE_LIST)
    return getAdminRevenueList(state, action);
  if (action.type === types.GET_ADMIN_PAYMENT_HISTORY_LIST)
    return getAdminPaymentHistoryList(state, action);
  return state;
};

export default revenuePaymentsReducer;
