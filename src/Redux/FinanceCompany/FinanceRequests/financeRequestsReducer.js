import * as types from "./types";

import { updateObject } from "../../utility";

const initialState = {
  activeRequestsList: null,
  closedRequestsList: null,
  financeRequestDetail: null,
  farmerInfoList: null,
  farmerInfoDetail: null,
  financeRequestHarvestList: null,
};

const getActiveRequestsList = (state, action) => {
  return updateObject(state, {
    activeRequestsList: action.payload,
  });
};

const getClosedRequestsList = (state, action) => {
  return updateObject(state, {
    closedRequestsList: action.payload,
  });
};

const getFinanceRequestDetail = (state, action) => {
  return updateObject(state, {
    financeRequestDetail: action.payload,
  });
};
const getAssociationSaleList = (state, action) => {
  return updateObject(state, {
    associationSaleList: action.payload,
  });
};
const getFarmerInfoList = (state, action) => {
  return updateObject(state, {
    farmerInfoList: action.payload,
  });
};
const getFarmerInfoDetail = (state, action) => {
  return updateObject(state, {
    farmerInfoDetail: action.payload,
  });
};

export const getFinanceRequestHarvestList = (state, action) => {
  return updateObject(state, {
    financeRequestHarvestList: action.payload,
  });
};

const financeRequestsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ACTIVE_REQUESTS_LIST) {
    return getActiveRequestsList(state, action);
  }
  if (action.type === types.GET_FINANCE_REQUEST_DETAIL) {
    return getFinanceRequestDetail(state, action);
  }
  if (action.type === types.GET_CLOSED_REQUESTS_LIST) {
    return getClosedRequestsList(state, action);
  }
  if (action.type === types.GET_ASSOCIATION_SALE_LIST) {
    return getAssociationSaleList(state, action);
  }
  if (action.type === types.GET_FARMER_INFO_LIST) {
    return getFarmerInfoList(state, action);
  }
  if (action.type === types.GET_FARMER_INFO_DETAIL) {
    return getFarmerInfoDetail(state, action);
  }
  if (action.type === types.GET_ASSOCIATION_HARVEST_LIST) {
    return getFinanceRequestHarvestList(state, action);
  } else {
    return state;
  }
};

export default financeRequestsReducer;
