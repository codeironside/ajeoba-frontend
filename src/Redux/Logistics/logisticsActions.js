import * as types from "./types";
import call from "../../API";
import { showToast } from "../../Services/toast";
import {
  ADMIN_LOGISTICS,
  ADMIN_USER_MANAGEMENT,
  OPEN_ADS,
  TRUCK_INFORMATION,
} from "../../Routes/Routes";
import { orderTypeOptions } from "../../Constant/AppConstant";

export const getTruckList = (listRes) => {
  return {
    type: types.GET_TRUCK_LIST,
    payload: listRes,
  };
};

export const getTruckDetailsById = (res) => {
  return {
    type: types.GET_TRUCK_DETAILS,
    payload: res,
  };
};
export const addTruck = (data) => {
  return {
    type: types.ADD_TRUCK,
    payload: data,
  };
};

export const getRequestAccessData = (res) => {
  return {
    type: types.GET_REQUEST_ACCESS_DATA,
    payload: res,
  };
};

export const getAdsInputList = (res) => {
  return {
    type: types.GET_ADS_INPUT_LIST,
    payload: res,
  };
};

export const getAdsProductList = (res) => {
  return {
    type: types.GET_ADS_PRODUCT_LIST,
    payload: res,
  };
};

export const getTransitInputList = (res) => {
  return {
    type: types.GET_TRANSIT_INPUT_LIST,
    payload: res,
  };
};
export const getTransitProductList = (res) => {
  return {
    type: types.GET_TRANSIT_PRODUCT_LIST,
    payload: res,
  };
};

export const getTransitOrderProductById = (res) => {
  return {
    type: types.GET_TRANSIT_ORDERS_DETAIL_BY_ID,
    payload: res,
  };
};

export const getTransitOrderInputById = (res) => {
  return {
    type: types.GET_TRANSIT_ORDERS_DETAIL_INPUT_BY_ID,
    payload: res,
  };
};

export const getTruckListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/truck",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getTruckList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleTruckStatusAction = (truckId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/truck/${truckId}/status`,
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

export const editLogisticCompanyTruckAction = (
  truckId,
  data,
  navigate,
  logisticCompanyId
) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/truck/${truckId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          dispatch(getTruckDetailsByIdAction(truckId));
          navigate(
            `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/${logisticCompanyId}/truck/detail/${truckId}`
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTruckDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/truck/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getTruckDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addTruckAction = (reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/truck",
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(addTruck(res.body.data));
          showToast("Truck added successfully", "success");
          navigate(TRUCK_INFORMATION);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdsProductInputListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/logistics-ads`,
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (data.requestFor === orderTypeOptions[0].inputOrders) {
            dispatch(getAdsInputList(res.body.data));
          }
          if (data.requestFor === orderTypeOptions[0].productOrders) {
            dispatch(getAdsProductList(res.body.data));
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const requestAccessAction = (
  advertisementId,
  reqBody,
  data,
  navigate
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/logistics-advertisement/${advertisementId}/logistics-requests`,
      dispatch,
      payload: reqBody,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            getRequestAccessData(
              res.body.advertisementDetails.logisticsRequestDetail
            )
          );
          showToast("Request sent successfully", "success");
          dispatch(getAdsProductInputListAction(data));
          {
            data.requestFor === "input_orders"
              ? navigate("/open-ads?activeTab=1")
              : navigate("/open-ads?activeTab=0");
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTransitProductInputListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/logistics/transit-orders`,
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (data.requestFor === orderTypeOptions[0].inputOrders) {
            dispatch(getTransitInputList(res.body.data));
          }
          if (data.requestFor === orderTypeOptions[0].productOrders) {
            dispatch(getTransitProductList(res.body.data));
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleTransitOrderStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/logistics/transit-orders/${id}/status`,
      payload: status,
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

export const getRecievedTransitOrderDetailsByIdAction = (id, requestFor) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/logistics/transit-orders/${id}`,
      query: requestFor,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (requestFor.requestFor === orderTypeOptions[0].inputOrders) {
            dispatch(getTransitOrderInputById(res.body.data));
          } else {
            dispatch(getTransitOrderProductById(res.body.data));
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleTransitStatusAction = (advertisementId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `/api/logistics/transit-orders/${advertisementId}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(
            "Transit status of the order changed successfully",
            "success"
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
