import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  addAdminData: null,
  adminList: {},
  adminData: {},
};

const addAdmin = (state, action) => {
  return updateObject(state, {
    addAdminData: action.payload,
  });
};

const getAdmin = (state, action) => {
  return updateObject(state, {
    adminData: action.payload,
  });
};

const getAdminList = (state, action) => {
  return updateObject(state, {
    adminList: action.payload,
  });
};

const adminManagementReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.ADD_ADMIN:
      return addAdmin(state, action);
    case types.GET_ADMIN_LIST:
      return getAdminList(state, action);
    case types.GET_ADMIN:
      return getAdmin(state, action);
    default:
      return state;
  }
};

export default adminManagementReducer;
