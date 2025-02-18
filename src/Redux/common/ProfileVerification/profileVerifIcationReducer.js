import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  profileVerificationData: null,
};

const getProfileVerificationData = (state, action) => {
  return updateObject(state, {
    profileVerificationData: action.payload,
  });
};

const profileVerificationReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_PROFILE_VERIFICATION_TYPE)
    return getProfileVerificationData(state, action);
  return state;
};

export default profileVerificationReducer;
