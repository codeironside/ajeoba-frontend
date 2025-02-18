import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  productList: {},
  inputList: {},
};

const getProductList = (state, action) => {
  return updateObject(state, {
    productList: action.payload,
  });
};

const getInputList = (state, action) => {
  return updateObject(state, {
    inputList: action.payload,
  });
};

const reportsReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_PRODUCTS_LIST:
      return getProductList(state, action);
    case types.GET_INPUT_LIST_REPORT:
      return getInputList(state, action);
    default:
      return state;
  }
};
export default reportsReducer;
