import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  aggregatorDetails: null,
};

const getAggregatorDetails = (state, action) => {
  return updateObject(state, {
    aggregatorDetails: action.payload,
  });
};

const aggregatorDetailReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_AGGREGATOR_DETAILS) {
    return getAggregatorDetails(state, action);
  }
  return state;
};

export default aggregatorDetailReducer;
