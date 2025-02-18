import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  productDetails: null,
};

const getProductDetails = (state, action) => {
  return updateObject(state, {
    productDetails: action.payload,
  });
};

const productMasterReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_PRODUCT_DETAILS_BY_ID)
    return getProductDetails(state, action);
  return state;
};

export default productMasterReducer;
