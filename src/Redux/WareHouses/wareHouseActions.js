import * as types from "./types";
import call from "../../API";
import { showToast } from "../../Services/toast";
import { WAREHOUSES } from "../../Routes/Routes";

export const getWareHousesList = (res) => {
  return {
    type: types.GET_WAREHOUSES_LIST,
    payload: res,
  };
};

export const getWareHouseDetailsById = (data) => {
  return {
    type: types.GET_WAREHOUSE_DETAILS,
    payload: data,
  };
};

export const getWareHousesListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/warehouse",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getWareHousesList(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addWareHouseAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/warehouse",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Warehouse added successfully", "success");
          navigate(`${WAREHOUSES}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getWareHouseDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/warehouse/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getWareHouseDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editWareHouseDetailsByIdAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/warehouse/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getWareHouseDetailsByIdAction(id));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const toggleWareHouseStatusAction = (warehouseId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/warehouse/${warehouseId}/status`,
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
