import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  status: null,
};

const setStatus = (state, action) => {
  return updateObject(state, {
    status: action.payload,
  });
};

const statusReducer = (state = initialState, action = {}) => {
  if (action.type === types.SET_STATUS) {
    return setStatus(state, action);
  } else return state;
};

export default statusReducer;
