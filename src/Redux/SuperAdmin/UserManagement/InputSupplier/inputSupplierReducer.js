import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  inputSupplierList: {},
  inputSupplierDetails: null,
};

const getInputSupplierList = (state, action) => {
  return updateObject(state, {
    inputSupplierList: action.payload,
  });
};

const getInputSuppplierDetails = (state, action) => {
  return updateObject(state, {
    inputSupplierDetails: action.payload,
  });
};

const inputSupplierReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_INPUT_SUPPLIER_LIST) {
    return getInputSupplierList(state, action);
  } else if (action.type === types.GET_INPUT_SUPPLIER_DETAIL) {
    return getInputSuppplierDetails(state, action);
  }
  return state;
};

export default inputSupplierReducer;
