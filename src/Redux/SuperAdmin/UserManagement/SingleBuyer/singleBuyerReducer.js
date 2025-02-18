import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  singleBuyerList: {},
  singleBuyerDetails: null,
};

const getSigleBuyerList = (state, action) => {
  return updateObject(state, {
    singleBuyerList: action.payload,
  });
};

const getSingleBuyerDetails = (state, action) => {
  return updateObject(state, {
    singleBuyerDetails: action.payload,
  });
};

const singleBuyerReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_SINGLE_BUYER_LIST) {
    return getSigleBuyerList(state, action);
  } else if (action.type === types.GET_SINGLE_BUYER_DETAIL) {
    return getSingleBuyerDetails(state, action);
  }
  return state;
};

export default singleBuyerReducer;
