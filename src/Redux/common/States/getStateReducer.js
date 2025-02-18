import { updateObject } from "../../utility";
import * as types from "./types";

const initialState = {
  stateMenuOptions: null,
};

const setStates = (state, action) => {
  return updateObject(state, {
    stateMenuOptions: action.payload,
  });
};

const getStateReducer = (state = initialState, action = {}) => {
  if (action.type === types.SET_STATES) {
    return setStates(state, action);
  } else {
    return state;
  }
};

export default getStateReducer;
