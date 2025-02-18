import * as types from "./types";

import { updateObject } from "../../utility";

const initialState = {
  tradingActiveAdsData: null,
  tradingActiveAdDetail: null,
  orderDetails: null,
  orderDetailsById: null,
  tradingOrderList: null,
  tradingInputOrderList: null,
  tradingActiveAdsDataLandingPage: null,
  productListLandingPage: null,
  inputListLandingPage: null,
  loading: false,
  loadingproduct: false,
  loadingproductLandingPage: false,
  allOpenMarketPlaceProduct: null,
  allOpenMarketPlaceProductbyIddetails: null,
};

const getTradingActiveAdsData = (state, action) => {
  return updateObject(state, {
    tradingActiveAdsData: action.payload,
  });
};

const getTradingOrderList = (state, action) => {
  return updateObject(state, {
    tradingOrderList: action.payload,
  });
};

const getTradingInputOrderList = (state, action) => {
  return updateObject(state, {
    tradingInputOrderList: action.payload,
  });
};

const getTradingActiveAdDetailById = (state, action) => {
  return updateObject(state, {
    tradingActiveAdDetail: action.payload,
  });
};

const loading = (state, action) => {
  return updateObject(state, {
    loading: action.payload,
  });
};

const loadingproduct = (state, action) => {
  return updateObject(state, {
    loadingproduct: action.payload,
  });
};
const loadingproductLandingPage = (state, action) => {
  return updateObject(state, {
    loadingproductLandingPage: action.payload,
  });
};

const getOrderDetails = (state, action) => {
  return updateObject(state, {
    orderDetails: action.payload,
  });
};

const getOrderDetailsById = (state, action) => {
  return updateObject(state, {
    orderDetailsById: action.payload,
  });
};

const getTradingActiveAdsDataLandingPage = (state, action) => {
  return updateObject(state, {
    tradingActiveAdsDataLandingPage: action.payload,
  });
};

const getProductListLandingPage = (state, action) => {
  return updateObject(state, {
    productListLandingPage: action.payload,
  });
};
const getInputListLandingPage = (state, action) => {
  return updateObject(state, {
    inputListLandingPage: action.payload,
  });
};
const getAllOpenMarketPlaceProducts = (state, action) => {
  return updateObject(state, {
    allOpenMarketPlaceProduct: action.payload,
  });
};
const getAllOpenMarketPlaceProductsDetailsById = (state, action) => {
  return updateObject(state, {
    allOpenMarketPlaceProductbyIddetails: action.payload,
  });
};

const tradingReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_TRADING_ACTIVE_ADS) {
    return getTradingActiveAdsData(state, action);
  } else if (action.type === types.GET_TRADING_ACTIVE_AD_DETAIL_BY_ID) {
    return getTradingActiveAdDetailById(state, action);
  } else if (action.type === types.GET_TRADING_ORDER_LIST) {
    return getTradingOrderList(state, action);
  } else if (action.type === types.GET_TRADING_INPUT_ORDER_LIST) {
    return getTradingInputOrderList(state, action);
  } else if (action.type === types.GET_ORDER_DETAIL) {
    return getOrderDetails(state, action);
  } else if (action.type === types.GET_ORDER_DETAIL_BY_ID) {
    return getOrderDetailsById(state, action);
  } else if (action.type === types.GET_TRADING_ACTIVE_AD_LANDING_PAGE) {
    return getTradingActiveAdsDataLandingPage(state, action);
  } else if (action.type === types.GET_PRODUCT_LIST_LANDING_PAGE) {
    return getProductListLandingPage(state, action);
  } else if (action.type === types.GET_INPUT_LIST_LANDING_PAGE) {
    return getInputListLandingPage(state, action);
  } else if (action.type === types.GET_ALL_PRODUCT_OPENMARKETPLACE) {
    return getAllOpenMarketPlaceProducts(state, action);
  } else if (
    action.type === types.GET_ALL_PRODUCT_OPENMARKETPLACE_DETAILS_BY_ID
  ) {
    return getAllOpenMarketPlaceProductsDetailsById(state, action);
  } else if (action.type === types.LOADING) {
    return loading(state, action);
  } else if (action.type === types.LOADING_PRODUCT) {
    return loadingproduct(state, action);
  } else if (action.type === types.LOADING_PRODUCT_LANDING_PAGE) {
    return loadingproductLandingPage(state, action);
  } else {
    return state;
  }
};

export default tradingReducer;
