import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  adminDashboardCount: {},
};

const getDashboardAdminCount = (state, action) => {
  return updateObject(state, {
    adminDashboardCount: action.payload,
  });
};

const adminDashboardReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ADMIN_DASHBOARD_COUNT)
    return getDashboardAdminCount(state, action);
  return state;
};

export default adminDashboardReducer;
