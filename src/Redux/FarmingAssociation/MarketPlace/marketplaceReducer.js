import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  activeAdsList: null,
  activeAdDetail: null,
  recievedOrdersList: null,
  recievedOrderDetail: null,
};

const getActiveAdsList = (state, action) => {
  return updateObject(state, {
    activeAdsList: action.payload,
  });
};

const getActiveAdsDetailsById = (state, action) => {
  return updateObject(state, {
    activeAdDetail: action.payload,
  });
};

const getRecievedOrdersList = (state, action) => {
  return updateObject(state, {
    recievedOrdersList: action.payload,
  });
};

const getRecievedOrderDetailById = (state, action) => {
  return updateObject(state, {
    recievedOrderDetail: action.payload,
  });
};

const marketplaceReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ACTIVE_ADS_LIST)
    return getActiveAdsList(state, action);
  if (action.type === types.GET_ACTIVE_ADS_DETAIL)
    return getActiveAdsDetailsById(state, action);
  if (action.type === types.GET_RECIEVED_ORDERS_LIST)
    return getRecievedOrdersList(state, action);
  if (action.type === types.GET_RECIEVED_ORDER_DETAIL)
    return getRecievedOrderDetailById(state, action);
  else return state;
};

export default marketplaceReducer;
