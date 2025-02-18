import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  logisticCompanies: {},
  logisticCompanyDetails: null,
};

const getLogisticCompanyList = (state, action) => {
  return updateObject(state, {
    logisticCompanies: action.payload,
  });
};

const getLogisticCompanyDetailsById = (state, action) => {
  return updateObject(state, {
    logisticCompanyDetails: action.payload,
  });
};

const logisticCompanyReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_LOGISTIC_COMPANY)
    return getLogisticCompanyList(state, action);
  else if (action.type === types.GET_LOGISTIC_COMPANY_DETAILS)
    return getLogisticCompanyDetailsById(state, action);
  else return state;
};

export default logisticCompanyReducer;
