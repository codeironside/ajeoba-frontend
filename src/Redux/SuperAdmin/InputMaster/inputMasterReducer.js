import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  inputList: {},
  inputDetails: null,
};

const getInputList = (state, action) => {
  return updateObject(state, {
    inputList: action.payload,
  });
};

const getInputDetails = (state, action) => {
  return updateObject(state, {
    inputDetails: action.payload,
  });
};

const inputMasterReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_INPUT_LIST) return getInputList(state, action);
  else if (action.type === types.GET_INPUT_DETAILS_BY_ID)
    return getInputDetails(state, action);
  else return state;
};

export default inputMasterReducer;
