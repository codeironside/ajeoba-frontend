import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getAdminRevenueList = (res) => {
  return {
    type: types.GET_ADMIN_REVENUE_LIST,
    payload: res,
  };
};

export const getAdminPaymentHistoryList = (res) => {
  return {
    type: types.GET_ADMIN_PAYMENT_HISTORY_LIST,
    payload: res,
  };
};

export const getAdminRevenueListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/sales",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminRevenueList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminPaymentHistoryListAction = (reqBody, type) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/transaction-history",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminPaymentHistoryList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const settleAmount = (id) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/admin/settlement/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(res?.body?.message, "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
