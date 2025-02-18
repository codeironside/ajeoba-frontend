import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  inputSupplierReportsList: {},
};

const getInputSupplierReportsList = (state, action) => {
  return updateObject(state, {
    inputSupplierReportsList: action.payload,
  });
};

const inputSupplierReportsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_INPUT_SUPPLIER_REPORT_LIST)
    return getInputSupplierReportsList(state, action);
  else return state;
};

export default inputSupplierReportsReducer;
