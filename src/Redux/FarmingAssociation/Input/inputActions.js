import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getActiveAdsList = (res) => {
  return {
    type: types.GET_INPUT_ACTIVE_ADS_LIST,
    payload: res,
  };
};

export const getInputActiveAdDetailById = (data) => {
  return {
    type: types.GET_INPUT_ACTIVE_AD_DETAIL_BY_ID,
    payload: data,
  };
};

export const getInputOrderList = (res) => {
  return {
    type: types.GET_INPUT_ORDER_LIST,
    payload: res,
  };
};

export const getOrderDetailsById = (res) => {
  return {
    type: types.GET_ORDER_DETAIL_BY_ID,
    payload: res,
  };
};
export const getInputDetails = (res) => {
  return {
    type: types.GET_INPUT_DETAILS,
    payload: res,
  };
};

export const updateLoadingInput = (data) => {
  //details
  return {
    type: types.LOADING_INPUT,
    payload: data,
  };
};

export const updateLoadingInputLandingPage = (data) => {
  return {
    type: types.LOADING_INPUT_LANDING_PAGE,
    payload: data,
  };
};

export const getInputActiveAdsAction = (reqBody) => {
  return (dispatch) => {
    dispatch(updateLoadingInputLandingPage(true));
    call({
      method: "get",
      endpoint: "api/public/input/advertisement",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getActiveAdsList(res.body.data));
        }
        dispatch(updateLoadingInputLandingPage(false));
      })
      .catch((err) => {
        dispatch(updateLoadingInputLandingPage(false));
        showToast(err.message, "error");
      });
  };
};

export const getInputActiveAdDetailByIdAction = (id) => {
  return (dispatch) => {
    dispatch(updateLoadingInput(true));
    call({
      method: "get",
      endpoint: `api/public/input/advertisement/${id}`,
      dispatch,
    })
      .then((res) => {
        dispatch(updateLoadingInput(false));
        if (res.status === 200) {
          dispatch(getInputActiveAdDetailById(res.body.data));
        }
      })
      .catch((err) => {
        dispatch(updateLoadingInput(false));
        showToast(err.message, "error");
      });
  };
};

export const getInputOrderListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/input-order",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputOrderList(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleManageLogisticsAction = (status, orderType, orderId) => {
  return (dispatch) => {
    call({
      method: "PUT",
      endpoint: `api/logistics-manage`,
      payload: {
        status: status,
        orderType: orderType,
        orderId: orderId.toString(),
      },
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

export const getInputOrderDetailsById = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/input-order/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getOrderDetailsById(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
