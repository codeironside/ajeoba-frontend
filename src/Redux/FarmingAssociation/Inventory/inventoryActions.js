import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { toastMsgEllipsis } from "../../../Services/commonService/commonService";

export const getInventoryList = (res) => {
  return {
    type: types.GET_INVENTORY_LIST,
    payload: res,
  };
};

export const getInventoryWarehouseList = (res) => {
  return {
    type: types.GET_INVENTORY_WAREHOUSES_LIST,
    payload: res,
  };
};

export const getBatchDetail = (res) => {
  return {
    type: types.GET_BATCH_DETAIL,
    payload: res,
  };
};

export const getInventoryListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/inventory",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInventoryList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInventoryWarehouseListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/inventory/warehouse",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInventoryWarehouseList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const createBatchAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/inventory/batch",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Batch added successfully", "success");
          navigate("/inventory?activeTab=1");
        }
      })
      .catch((err) => {
        showToast(toastMsgEllipsis(err.message), "error");
      });
  };
};

export const getbatchDetailAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/inventory/batch/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBatchDetail(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addProductCertificateAction = (
  data,
  batchId,
  setIsNewDataAdded
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/inventory/certifications/${batchId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Certificate added successfully", "success");
          setIsNewDataAdded(false);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getBatchList = (res) => {
  return {
    type: types.GET_BATCH_LIST,
    payload: res,
  };
};

export const getBatchListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/inventory/batch",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBatchList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const deleteBatch = (res) => {
  return {
    type: types.DELETE_BATCH,
    payload: res,
  };
};

export const deleteBatchAction = (batchId) => {
  return (dispatch) => {
    call({
      method: "delete",
      endpoint: `api/inventory/batch/${batchId}/`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBatchListAction({ limit: LIMIT, skip: SKIP }));
          showToast("Batch deleted successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
