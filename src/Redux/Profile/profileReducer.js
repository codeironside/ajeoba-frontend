import * as types from "./types";
import { updateObject } from "../utility";

const initialState = {
  userProfileDetails: null,
  userBankingDetails: null,
};

const getUserProfileDetails = (state, action) => {
  return updateObject(state, {
    userProfileDetails: action.payload,
  });
};
const userBankDetails = (state, action) => {
  return updateObject(state, {
    userBankingDetails: action.payload,
  });
};

const profileReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_USER_PROFILE_DETAILS) {
    return getUserProfileDetails(state, action);
  } else if (action.type === types.USER_BANK_DETAILS) {
    return userBankDetails(state, action);
  }
  return state;
};

export default profileReducer;