import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  qaAdsData: null,
  qaAdsDataLength: null,
};

const getQaAdsData = (state, action) => {
  return updateObject(state, {
    qaAdsData: action.payload,
  });
};

const getQaAdsDataLength = (state, action) => {
  return updateObject(state, {
    qaAdsDataLength: action.payload,
  });
};

const getQaAdsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_QA_ADS) {
    return getQaAdsData(state, action);
  } else if (action.type === types.GET_QA_ADS_LENGTH) {
    return getQaAdsDataLength(state, action);
  } else {
    return state;
  }
};

export default getQaAdsReducer;
