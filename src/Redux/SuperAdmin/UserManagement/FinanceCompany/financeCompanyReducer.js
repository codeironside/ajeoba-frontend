import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  financeCompanyList: {},
  financeDetails: null,
};

const getFinanceCompanyList = (state, action) => {
  return updateObject(state, {
    financeCompanyList: action.payload,
  });
};

const getFinanceDetails = (state, action) => {
  return updateObject(state, {
    financeDetails: action.payload,
  });
};

const financeCompanyReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_FINANCE_COMPANY_LIST) {
    return getFinanceCompanyList(state, action);
  } else if (action.type === types.GET_FINANCE_DETAIL) {
    return getFinanceDetails(state, action);
  } else {
    return state;
  }
};
export default financeCompanyReducer;
