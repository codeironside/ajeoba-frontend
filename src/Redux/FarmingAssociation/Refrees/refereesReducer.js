import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  addRefereeData: null,
  isKycVerified: false,
  refereeList: {},
};

const addReferee = (state, action) => {
  return updateObject(state, {
    addRefereeData: action.payload,
  });
};
const setKycVerified = (state, action) => {
  return updateObject(state, {
    isKycVerified: action.payload,
  });
};

const getRefereeList = (state, action) => {
  return updateObject(state, {
    refereeList: action.payload,
  });
};

const refereesReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_REFEREE:
      return addReferee(state, action);
    case types.GET_REFEREE_LIST:
      return getRefereeList(state, action);
    case types.SET_KYC_VERIFIED:
      return setKycVerified(state, action);
    default:
      return state;
  }
};

export default refereesReducer;
