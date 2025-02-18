import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  aggregatorsList: {},
};

const getAggregatorsListList = (state, action) => {
  return updateObject(state, {
    aggregatorsList: action.payload,
  });
};

const aggregatorsReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_AGGREGATORS_LIST) {
    return getAggregatorsListList(state, action);
  } else {
    return state;
  }
};

export default aggregatorsReducer;
