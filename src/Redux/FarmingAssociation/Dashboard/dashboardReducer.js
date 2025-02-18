import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  headerList: {},
  productList: [],
  salesAndRevenueEarned: [],
  productAggregated: [],
  inputPurchased: [],
  inputList: null,
  productSoldOptions: null,
  productAggOptions: null,
  balance: {},
  bankDetails: {},
  history: {},
  accountDetails: {},
  loadingFarmerDetails: false,
};

const getDashboardHeaderList = (state, action) => {
  return updateObject(state, {
    headerList: action.payload,
  });
};

const getSalesAndRevenueData = (state, action) => {
  return updateObject(state, {
    salesAndRevenueEarned: action.payload,
  });
};

const getProductAggregatedData = (state, action) => {
  return updateObject(state, {
    productAggregated: action.payload,
  });
};

const getInputPurchasedData = (state, action) => {
  return updateObject(state, {
    inputPurchased: action.payload,
  });
};

const getInputList = (state, action) => {
  return updateObject(state, {
    inputList: action.payload,
  });
};

const getProductSoldOptions = (state, action) => {
  return updateObject(state, {
    productSoldOptions: action.payload,
  });
};

const getProductAggregatedOptions = (state, action) => {
  return updateObject(state, {
    productAggOptions: action.payload,
  });
};

export const getDashBoardlist = (state, action) => {
  return updateObject(state, {
    allfarmers: action.payload,
  });
};

const getBalance = (state, action) => {
  return updateObject(state, {
    balance: action.payload,
  });
};

const getAssociationDetails = (state, action) => {
  return updateObject(state, {
    associationDetails: action.payload,
  });
};

const getTransactionHistory = (state, action) => {
  return updateObject(state, {
    history: action.payload,
  });
};
const getAccountBalance = (state, action) => {
  return updateObject(state, {
    accountDetails: action.payload,
  });
};
const loadingFarmer = (state, action) => {
  return updateObject(state, {
    loadingFarmerDetails: action.payload,
  });
};

const dashboardReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_DASHBOARD_HEADER_LIST)
    return getDashboardHeaderList(state, action);
  else if (action.type === types.GET_SALES_AND_REVENUE_DATA)
    return getSalesAndRevenueData(state, action);
  else if (action.type === types.GET_PRODUCT_AGGREGATED_DATA)
    return getProductAggregatedData(state, action);
  else if (action.type === types.GET_INPUT_PURCHASED_DATA)
    return getInputPurchasedData(state, action);
  else if (action.type === types.GET_INPUT_LIST_DATA)
    return getInputList(state, action);
  else if (action.type === types.GET_PRODUCT_SOLD_OPTIONS)
    return getProductSoldOptions(state, action);
  else if (action.type === types.GET_PRODUCT_AGGREGATED_OPTIONS)
    return getProductAggregatedOptions(state, action);
  else if (action.type === types.GET_FARMER_DASHBOARD)
    return getDashBoardlist(state, action);
  else if (action.type === types.GET_BALANCE) return getBalance(state, action);
  else if (action.type === types.GET_ASSOCIATION_DETAILS)
    return getAssociationDetails(state, action);
  else if (action.type === types.GET_TRANSACTION_HISTORY)
    return getTransactionHistory(state, action);
  else if (action.type === types.GET_ACCOUNT_DETAILS)
    return getAccountBalance(state, action);
  else if (action.type === types.GET_LOADING_STATE)
    return loadingFarmer(state, action);
  return state;
};

export default dashboardReducer;
