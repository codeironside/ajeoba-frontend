import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";

export const getAggregatorDetailsById = (data) => {
  return {
    type: types.GET_AGGREGATOR_DETAILS,
    payload: data,
  };
};

export const getAggregatorDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/aggregator/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAggregatorDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editAggregator = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/aggregator/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getAggregatorDetailsByIdAction(id));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
