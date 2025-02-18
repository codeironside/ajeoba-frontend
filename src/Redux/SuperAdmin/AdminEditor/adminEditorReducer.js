import { updateObject } from "../../utility";
import * as types from "./types";
const initialState = {
  data: null,
  TncAndPrivacyPolicyData: null,
};

const getData = (state, action) => {
  return updateObject(state, {
    data: action.payload,
  });
};

const getTncAndPrivacyPolicyInfo = (state, action) => {
  return updateObject(state, {
    TncAndPrivacyPolicyData: action.payload,
  });
};

const adminEditorReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_DATA) {
    return getData(state, action);
  } else if (action.type === types.GET_TNC_AND_PRIVACY_POLICY) {
    return getTncAndPrivacyPolicyInfo(state, action);
  }
  return state;
};

export default adminEditorReducer;
