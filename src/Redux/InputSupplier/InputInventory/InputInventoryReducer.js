import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  inputInventoryList: {},
  inputInventoryDetail: null,
};

const getInputInventoryList = (state, action) => {
  return updateObject(state, {
    inputInventoryList: action.payload,
  });
};

const getInputInventoryDetail = (state, action) => {
  return updateObject(state, {
    inputInventoryDetail: action.payload,
  });
};

const inputInventoryReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_INPUT_INVENTORY_LIST)
    return getInputInventoryList(state, action);
  else if (action.type === types.GET_INPUT_INVENTORY_DETAIL)
    return getInputInventoryDetail(state, action);
  else return state;
};

export default inputInventoryReducer;
