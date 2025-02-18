import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  financeRequestsList: {},
};

const getFinanceRequestsList = (state, action) => {
  return updateObject(state, {
    financeRequestsList: action.payload,
  });
};

const adminFinanceRequestsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_FINANCE_REQUESTS_LIST) {
    return getFinanceRequestsList(state, action);
  } else {
    return state;
  }
};

export default adminFinanceRequestsReducer;
