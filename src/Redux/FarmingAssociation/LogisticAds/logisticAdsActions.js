import call from "../../../API";
import { LOGISTICS } from "../../../Routes/Routes";
import { showToast } from "../../../Services/toast";
import * as types from "./types";
import { getToken } from "../../../Auth/getToken";

export const getLogisticAdsList = (res) => {
  return {
    type: types.GET_LOGISTIC_ADS_LIST,
    payload: res,
  };
};

export const getLogisticAdDetailsById = (data) => {
  return {
    type: types.GET_LOGISTIC_AD_DETAIL,
    payload: data,
  };
};

export const getLogisticAdsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/logistics-advertisement",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getLogisticAdsList(res.body.data));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editLogisticAdStatusAction = (id, status, initData) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/logistics-advertisement/${id}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status has been updated successfully", "success");
          dispatch(getLogisticAdsListAction(initData));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const createLogisticAdAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/logistics-advertisement",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Ad created successfully", "success");
          if (localStorage.getItem("input_buyer"))
            localStorage.removeItem("input_buyer");
          navigate(`${LOGISTICS}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getLogisticAdDetailsByIdAction = (id) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/logistics-advertisement/${id}`,
      headers: { Authorization: token },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            getLogisticAdDetailsById({
              ...res.body.data.logisticsAdvertisementDetail[0],
              interestedCompanies: res.body.data.interestedLogisticsCompany,
            })
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const logisticAdRequestAction = (id, logisticAdId) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/logistics-requests/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Request accepted successfully", "success");
          dispatch(getLogisticAdDetailsByIdAction(logisticAdId));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const logisticAdRequestRevokeAction = (id, logisticAdId) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/logistics-requests/${id}/revoke`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Request accepted successfully", "success");
          dispatch(getLogisticAdDetailsByIdAction(logisticAdId));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
