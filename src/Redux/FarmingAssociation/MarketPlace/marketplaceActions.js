import call from "../../../API";
import * as types from "./types";

import { ROLES } from "../../../Constant/RoleConstant";
import { showToast } from "../../../Services/toast";
import { getUserData } from "../../../Services/localStorageService";
import { MARKETPLACE } from "../../../Routes/Routes";
import { getInputOrderDetailsById } from "../Input/inputActions";

const userData = getUserData();

export const getActiveAdsList = (res) => {
  return {
    type: types.GET_ACTIVE_ADS_LIST,
    payload: res,
  };
};

export const getActiveAdsDetailsById = (res) => {
  return {
    type: types.GET_ACTIVE_ADS_DETAIL,
    payload: res,
  };
};

export const getRecievedOrdersList = (res) => {
  return {
    type: types.GET_RECIEVED_ORDERS_LIST,
    payload: res,
  };
};

export const getRecievedOrderDetailsById = (res) => {
  return {
    type: types.GET_RECIEVED_ORDER_DETAIL,
    payload: res,
  };
};

export const createMarketplaceAdAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/marketplace/advertisement",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Ad created successfully", "success");
          navigate(MARKETPLACE);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getActiveAdsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/marketplace/advertisement",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getActiveAdsList(res.body.data));
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
        orderId: orderId.toString(),
        status: status,
        orderType: orderType,
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


export const getRecievedOrdersListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/order",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getRecievedOrdersList(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const deleteActiveAdMarketplaceAction = (id) => {
  return (dispatch) => {
    call({
      method: "delete",
      endpoint: `api/marketplace/advertisement/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Ad deleted successfully", "success");
          dispatch(getActiveAdsListAction());
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getActiveAdsDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/marketplace/advertisement/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getActiveAdsDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateActiveAdsDetailsByIdAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/marketplace/advertisement/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Ad updated successfully", "success");
          dispatch(getActiveAdsDetailsByIdAction(id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getRecievedOrderDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/product/order/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getRecievedOrderDetailsById(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateRecievedOrderDetailsByIdAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/product/order/${id}/logistic-cost`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Logistics cost added successfully", "success");
          if (userData.role_id === ROLES.INPUT_SUPPLIER)
            dispatch(getInputOrderDetailsById(id));
          else dispatch(getRecievedOrderDetailsByIdAction(id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
