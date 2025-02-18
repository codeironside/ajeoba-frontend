import * as types from "./types";
import { updateObject } from "../../utility";
const initialState = {
  aggregationList: {},
  aggregationInputList: {},
};

const getAggregationList = (state, action) => {
  return updateObject(state, {
    aggregationList: action.payload,
  });
};

const getAggregationInputList = (state, action) => {
  return updateObject(state, {
    aggregationInputList: action.payload,
  });
};

const aggregationReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_AGGREGATION_LIST)
    return getAggregationList(state, action);
  else if (action.type === types.GET_AGGREGATION_INPUT_LIST)
    return getAggregationInputList(state, action);
  return state;
};

export default aggregationReducer;
