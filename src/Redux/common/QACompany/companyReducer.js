import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  companies: {},
  productOrdersQa: {},
};

const getQACompaniesList = (state, action) => {
  return updateObject(state, {
    companies: action.payload,
  });
};

const assignQaCompany = (state, action) => {
  return updateObject(state, {
    productOrdersQa: action.payload,
  });
};

const companyReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_COMPANY) {
    return getQACompaniesList(state, action);
  } else if (action.type === types.ASSIGN_PRODUCT_QA_COMPANY) {
    return assignQaCompany(state, action);
  } else {
    return state;
  }
};

export default companyReducer;
