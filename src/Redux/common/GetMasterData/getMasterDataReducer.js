import * as types from "./types";

import { updateObject } from "../../utility";

const initialState = {
  masterData: null,
  masterDataSecond: null,
  distance: null,
};

const getMasterData = (state, action) => {
  return updateObject(state, {
    masterData: action.payload,
  });
};

const getMasterDataSecond = (state, action) => {
  return updateObject(state, {
    masterDataSecond: action.payload,
  });
};

const getDistance = (state, action) => {
  return updateObject(state, {
    distance: action.payload,
  });
};

const getMasterDataReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_MASTER_DATA) {
    return getMasterData(state, action);
  } else if (action.type === types.GET_MASTER_DATA_SECOND) {
    return getMasterDataSecond(state, action);
  } else if (action.type === types.GET_DISTANCE) {
    return getDistance(state, action);
  } else {
    return state;
  }
};

export default getMasterDataReducer;
