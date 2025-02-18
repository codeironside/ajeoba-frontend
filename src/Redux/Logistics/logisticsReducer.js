import { updateObject } from "../utility";
import * as types from "./types";

const initialState = {
  truckList: {},
  truckDetails: null,
  requestAccessData: null,
  transitInputList: null,
  transitProductList: null,
  transitOrderDetailById: null,
  transitOrderInputById: null,
  adsProductList: null,
  adsInputList: null,
};

const truckList = (state, action) => {
  return updateObject(state, {
    truckList: action.payload,
  });
};

const getTruckDetailsById = (state, action) => {
  return updateObject(state, {
    truckDetails: action.payload,
  });
};
const addTruck = (state, action) => {
  return updateObject(state, {
    truckList: action.payload,
  });
};

const getRequestAccessData = (state, action) => {
  return updateObject(state, {
    requestAccessData: action.payload,
  });
};

const getAdsProductList = (state, action) => {
  return updateObject(state, {
    adsProductList: action.payload,
  });
};
const getAdsInputList = (state, action) => {
  return updateObject(state, {
    adsInputList: action.payload,
  });
};

const getTransitInputList = (state, action) => {
  return updateObject(state, {
    transitInputList: action.payload,
  });
};
const getTransitProductList = (state, action) => {
  return updateObject(state, {
    transitProductList: action.payload,
  });
};

const transitOrderDetailById = (state, action) => {
  return updateObject(state, {
    transitOrderDetailById: action.payload,
  });
};
const transitOrderInputById = (state, action) => {
  return updateObject(state, {
    transitOrderInputById: action.payload,
  });
};

const logisticsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_TRUCK_LIST:
      return truckList(state, action);
    case types.GET_TRUCK_DETAILS:
      return getTruckDetailsById(state, action);
    case types.ADD_TRUCK:
      return addTruck(state, action);
    case types.GET_ADS_INPUT_LIST:
      return getAdsInputList(state, action);
    case types.GET_ADS_PRODUCT_LIST:
      return getAdsProductList(state, action);
    case types.GET_REQUEST_ACCESS_DATA:
      return getRequestAccessData(state, action);

    case types.GET_TRANSIT_INPUT_LIST:
      return getTransitInputList(state, action);
    case types.GET_TRANSIT_PRODUCT_LIST:
      return getTransitProductList(state, action);
    case types.GET_TRANSIT_ORDERS_DETAIL_BY_ID:
      return transitOrderDetailById(state, action);
    case types.GET_TRANSIT_ORDERS_DETAIL_INPUT_BY_ID:
      return transitOrderInputById(state, action);
    default:
      return state;
  }
};

export default logisticsReducer;
