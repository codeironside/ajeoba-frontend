import * as types from "./types";

import { showToast } from "../../Services/toast";
import call from "../../API";
import { getUserData } from "../../Services/localStorageService";
import { getDefaultPath } from "../../Services/commonService/commonService";

export const getSupportDetails = (formData, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/support",
      payload: formData,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Support request raised", "success");
          const roleId = getUserData().role_id;
          navigate(getDefaultPath(roleId));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSupportRequestsList = (listRes) => {
  return {
    type: types.GET_SUPPORT_REQUESTS_LIST,
    payload: listRes,
  };
};

export const getSupportDetailsById = (res) => {
  return {
    type: types.GET_SUPPORT_REQUESTS_BY_ID,
    payload: res,
  };
};

export const getSupportRequestsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/support",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSupportRequestsList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const changeSupportRequestStatusAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/support/${id}/status`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status has been updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSupportDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/support/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSupportDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
