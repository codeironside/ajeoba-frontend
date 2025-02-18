import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  corporateBuyersList: {},
  corporateDetails: null,
};

const getCorporateBuyersList = (state, action) => {
  return updateObject(state, {
    corporateBuyersList: action.payload,
  });
};

const getCorporateDetails = (state, action) => {
  return updateObject(state, {
    corporateDetails: action.payload,
  });
};

const corporateBuyerReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_CORPORATE_BUYERS_LIST) {
    return getCorporateBuyersList(state, action);
  } else if (action.type === types.GET_CORPORATE_BUYER_DETAIL) {
    return getCorporateDetails(state, action);
  } else {
    return state;
  }
};

export default corporateBuyerReducer;
