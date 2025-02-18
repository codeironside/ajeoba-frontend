import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { QAADS } from "../../../Routes/Routes";

export const createAds = (data) => {
  return {
    type: types.CREATE_ADS,
    payload: data,
  };
};

export const getQaAdsList = (listRes) => {
  return {
    type: types.GET_QAADS_LIST,
    payload: listRes,
  };
};

export const getQaAdsDetailsById = (res) => {
  return {
    type: types.GET_QAADS_DETAILS,
    payload: res,
  };
};

export const createAdsAction = (reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/qa-advertisment",
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(createAds(res.body.data));
          showToast("Ad created successfully", "success");
          navigate(QAADS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getQaAdsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/qa-advertisement",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getQaAdsList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleQaAdsStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/qa-advertisement/${id}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getQaAdsDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/qa-advertisment/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getQaAdsDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
