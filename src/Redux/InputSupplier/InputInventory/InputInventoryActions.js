import call from "../../../API";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { showToast } from "../../../Services/toast";
import * as types from "./types";

export const getInputInventoryList = (res) => {
  return {
    type: types.GET_INPUT_INVENTORY_LIST,
    payload: res,
  };
};

export const getInputInventoryDetail = (res) => {
  return {
    type: types.GET_INPUT_INVENTORY_DETAIL,
    payload: res,
  };
};

export const getInputInventoryListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/input/inventory",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputInventoryList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const deleteInputInventoryAction = (id) => {
  return (dispatch) => {
    call({
      method: "delete",
      endpoint: `api/input/inventory/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputInventoryListAction({ limit: LIMIT, skip: SKIP }));
          showToast("Record deleted from inventory", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInputInventoryDetailByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/input/inventory/${id}/`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputInventoryDetail(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editInputInventoryAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/input/inventory/${id}/`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(" Details updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
