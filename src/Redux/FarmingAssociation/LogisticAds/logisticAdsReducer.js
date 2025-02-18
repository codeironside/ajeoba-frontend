import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  logisticAdsList: {},
  logisticAdDetails: null,
};

const getLogisticAdDetails = (state, action) => {
  return updateObject(state, {
    logisticAdDetails: action.payload,
  });
};

const getLogisticAdsList = (state, action) => {
  return updateObject(state, {
    logisticAdsList: action.payload,
  });
};

const logisticAdsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_LOGISTIC_ADS_LIST) {
    return getLogisticAdsList(state, action);
  } else if (action.type === types.GET_LOGISTIC_AD_DETAIL) {
    return getLogisticAdDetails(state, action);
  }
  return state;
};

export default logisticAdsReducer;
