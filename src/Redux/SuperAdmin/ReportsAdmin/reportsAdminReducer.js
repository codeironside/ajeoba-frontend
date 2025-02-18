import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  adminReportsList: null,
  adminReportsInputList: null,
  adminReportsUsersList: null,
};

const getAdminReportsList = (state, action) => {
  return updateObject(state, {
    adminReportsList: action.payload,
  });
};
const getAdminReportsInputList = (state, action) => {
  return updateObject(state, {
    adminReportsInputList: action.payload,
  });
};

const getAdminReportsUsersList = (state, action) => {
  return updateObject(state, {
    adminReportsUsersList: action.payload,
  });
};

const reportsAdminReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ADMIN_REPORTS_LIST)
    return getAdminReportsList(state, action);
  if (action.type === types.GET_ADMIN_REPORTS_INPUT_LIST)
    return getAdminReportsInputList(state, action);
  if (action.type === types.GET_ADMIN_REPORTS_USERS_LIST)
    return getAdminReportsUsersList(state, action);
  else return state;
};

export default reportsAdminReducer;
