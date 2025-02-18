import * as types from "./types";
import { updateObject } from "../utility";

const initialState = {
  userRoleMenuOptions: null,
};

const getUserRoles = (state, action) => {
  return updateObject(state, {
    userRoleMenuOptions: action.payload,
  });
};

const userRoleSelectionReducer = (state = initialState, action = {}) => {
  if(action.type === types.GET_USER_ROLES){
    return getUserRoles(state, action);
  } else {
    return state;
  }
};

export default userRoleSelectionReducer;
