import { updateObject } from "../../utility";
import * as types from "./types";
const initialState = {
  createAdData: null,
  qaAdsList: {},
  qaAdsDetailData: null,
};

const createAds = (state, action) => {
  return updateObject(state, {
    createAdData: action.payload,
  });
};
const getQaAdsList = (state, action) => {
  return updateObject(state, {
    qaAdsList: action.payload,
  });
};

const getQaAdsDetailsById = (state, action) => {
  return updateObject(state, {
    qaAdsDetailData: action.payload,
  });
};
const qaAdsReducer = (state = initialState, action = {}) => {
  if (action.types === types.CREATE_ADS) return createAds(state, action);
  else if (action.type === types.GET_QAADS_LIST)
    return getQaAdsList(state, action);
  else if (action.type === types.GET_QAADS_DETAILS)
    return getQaAdsDetailsById(state, action);
  else return state;
};

export default qaAdsReducer;
