import { updateObject } from "../utility";
import * as types from "./types";

const initialState = {
  supportRequestsList: [],
  supportRequestDetailById: null,
};

const supportRequestsList = (state, action) => {
  return updateObject(state, {
    supportRequestsList: action.payload,
  });
};

const supportRequestDetailById = (state, action) => {
  return updateObject(state, {
    supportRequestDetailById: action.payload,
  });
};

const HelpAndSupportReducers = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.GET_SUPPORT_REQUESTS_LIST:
      return supportRequestsList(state, action);
    case types.GET_SUPPORT_REQUESTS_BY_ID:
      return supportRequestDetailById(state, action);
    default:
      return state;
  }
};
export default HelpAndSupportReducers;
