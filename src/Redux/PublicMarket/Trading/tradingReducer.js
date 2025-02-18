import * as types from "./types";

import { updateObject } from "../../utility";

const initialState = {
  tradingActiveAdsData: null,
  tradingActiveAdDetail: null,
};

const getTradingActiveAdsData = (state, action) => {
  return updateObject(state, {
    tradingActiveAdsData: action.payload,
  });
};

const getTradingActiveAdDetailById = (state, action) => {
  return updateObject(state, {
    tradingActiveAdDetail: action.payload,
  });
};

const tradingReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_TRADING_ACTIVE_ADS) {
    return getTradingActiveAdsData(state, action);
  } else if (action.type === types.GET_TRADING_ACTIVE_AD_DETAIL_BY_ID) {
    return getTradingActiveAdDetailById(state, action);
  } else {
    return state;
  }
};

export default tradingReducer;
