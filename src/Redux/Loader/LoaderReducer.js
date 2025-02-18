import { updateObject } from "../utility";
import * as types from "./types";

const initialState = {
  loader: false,
};

const showLoader = (state, action) => {
  return updateObject(state, {
    loader: action.payload,
  });
};

const loaderReducer = (state = initialState, action = {}) => {
  if (action.type === types.SHOW_LOADER) {
    return showLoader(state, action);
  } else {
    return state;
  }
};

export default loaderReducer;
