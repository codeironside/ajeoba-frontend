import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getAdminReportsList = (res) => {
  return {
    type: types.GET_ADMIN_REPORTS_LIST,
    payload: res,
  };
};

export const getAdminReportsInputList = (res) => {
  return {
    type: types.GET_ADMIN_REPORTS_INPUT_LIST,
    payload: res,
  };
};

export const getAdminReportsUsersList = (res) => {
  return {
    type: types.GET_ADMIN_REPORTS_USERS_LIST,
    payload: res,
  };
};

export const getAdminReportsListAction = (reqBody, type) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint:
        type === "productSold"
          ? "api/admin/report/product-sold"
          : "api/admin/report/product-aggregated",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminReportsList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminReportsInputListAction = (reqBody, type) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint:
        type === "inputPurchased"
          ? "api/admin/report/input-purchased"
          : "api/admin/report/input-sold",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminReportsInputList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminReportUsersAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/report/users",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminReportsUsersList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
