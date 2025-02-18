import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  financeRequestDetailById: null,
  financeRequestsForInputList: null,
  financeRequestsForProductList: null,
};

const financeRequestDetailById = (state, action) => {
  return updateObject(state, {
    financeRequestDetailById: action.payload,
  });
};

const getFinanceRequestsForInputList = (state, action) => {
  return updateObject(state, {
    financeRequestsForInputList: action.payload,
  });
};
const getFinanceRequestsForProductList = (state, action) => {
  return updateObject(state, {
    financeRequestsForProductList: action.payload,
  });
};

const financeReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_FIN_REQ_FOR_INPUT_LIST:
      return getFinanceRequestsForInputList(state, action);
    case types.GET_FIN_REQ_FOR_PRODUCT_LIST:
      return getFinanceRequestsForProductList(state, action);
    case types.GET_FINANCE_REQUEST_DETAIL_BY_ID:
      return financeRequestDetailById(state, action);
    default:
      return state;
  }
};

export default financeReducer;
