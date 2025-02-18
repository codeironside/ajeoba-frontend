import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  inputActiveAdsList: null,
  inputOrderList: null,
  inputOrderDetail: null,
  inputActiveAdDetail: null,
  inputDetails: null,
  loadinginput: false,
  loadinginputLandingPage: false,
};

const getInputActiveAdsList = (state, action) => {
  return updateObject(state, {
    inputActiveAdsList: action.payload,
  });
};

const getInputOrderList = (state, action) => {
  return updateObject(state, {
    inputOrderList: action.payload,
  });
};

const getInputOrderDetail = (state, action) => {
  return updateObject(state, {
    inputOrderDetail: action.payload,
  });
};
const getInputActiveAdDetailById = (state, action) => {
  return updateObject(state, {
    inputActiveAdDetail: action.payload,
  });
};

const getInputDetails = (state, action) => {
  return updateObject(state, {
    inputOrderList: action.payload,
  });
};

const getInputByDetailsLoadingState = (state, action) => {
  return updateObject(state, {
    loadinginput: action.payload,
  });
};
const getInputByLandingPageLoadingState = (state, action) => {
  return updateObject(state, {
    loadinginputLandingPage: action.payload,
  });
};

const inputReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_INPUT_ACTIVE_ADS_LIST:
      return getInputActiveAdsList(state, action);
    case types.GET_INPUT_ORDER_LIST:
      return getInputOrderList(state, action);
    case types.GET_ORDER_DETAIL_BY_ID:
      return getInputOrderDetail(state, action);
    case types.GET_INPUT_ACTIVE_AD_DETAIL_BY_ID:
      return getInputActiveAdDetailById(state, action);
    case types.GET_INPUT_DETAILS:
      return getInputDetails(state, action);
    case types.LOADING_INPUT:
      return getInputByDetailsLoadingState(state, action);
    case types.LOADING_INPUT_LANDING_PAGE:
      return getInputByLandingPageLoadingState(state, action);
    default:
      return state;
  }
};

export default inputReducer;
