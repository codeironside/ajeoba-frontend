import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getActiveRequestsList = (res) => {
  return {
    type: types.GET_ACTIVE_REQUESTS_LIST,
    payload: res,
  };
};
export const getClosedRequestsList = (res) => {
  return {
    type: types.GET_CLOSED_REQUESTS_LIST,
    payload: res,
  };
};

export const getFinanceRequestDetail = (res) => {
  return {
    type: types.GET_FINANCE_REQUEST_DETAIL,
    payload: res,
  };
};
export const getAssociationSaleList = (res) => {
  return {
    type: types.GET_ASSOCIATION_SALE_LIST,
    payload: res,
  };
};
export const getFarmerInfoList = (res) => {
  return {
    type: types.GET_FARMER_INFO_LIST,
    payload: res,
  };
};

export const getFarmerInfoDetail = (res) => {
  return {
    type: types.GET_FARMER_INFO_DETAIL,
    payload: res,
  };
};

export const getFinanceRequestHarvestList = (res) => {
  return {
    type: types.GET_ASSOCIATION_HARVEST_LIST,
    payload: res,
  };
};

export const getFinanceRequestsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/finance-request",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (reqBody.status === "ACTIVE") {
          dispatch(getActiveRequestsList(res.body.data));
        } else {
          dispatch(getClosedRequestsList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceRequestDetailByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/finance-request/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceRequestDetail(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAssociationSaleListAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/additional-details/${id}`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAssociationSaleList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateFinanceRequestStatusAction = (id) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/finance-request/${id}/status`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Request closed successfully", "success");
          dispatch(getFinanceRequestDetailByIdAction(id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFarmerInfoListAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/finance-request/${id}/association/farmer`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerInfoList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateFinanceRequestAdditionalDetailAction = (id) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/finance-request/${id}/additional-details`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Request sent successfully", "success");
          dispatch(getFinanceRequestDetailByIdAction(id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFarmerInfoDetailAction = (id, farmerId, reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/finance-request/${id}/association/farmer/${farmerId}`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerInfoDetail(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceRequestHarvestListAction = (reqBody, id, farmerId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/finance-request/${id}/association/farmer/${farmerId}/harvest`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceRequestHarvestList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
