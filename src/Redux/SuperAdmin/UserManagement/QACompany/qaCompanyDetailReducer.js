import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  qaCompanyDetails: null,
};

const getQAComapanyDetails = (state, action) => {
  return updateObject(state, {
    qaCompanyDetails: action.payload,
  });
};

const qaCompanyDetailReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_QA_COMPANY) {
    return getQAComapanyDetails(state, action);
  }
  return state;
};

export default qaCompanyDetailReducer;
