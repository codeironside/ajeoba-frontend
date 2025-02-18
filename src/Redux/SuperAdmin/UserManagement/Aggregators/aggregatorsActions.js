import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import { ADMIN_USER_MANAGEMENT, ADMIN_AGGREGATORS } from '../../../../Routes/Routes';

export const getAggregatorsList = (aggregatorsRes) => {
  return {
    type: types.GET_AGGREGATORS_LIST,
    payload: aggregatorsRes,
  };
};

export const getAggregatorsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/aggregator",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAggregatorsList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editAggregatorAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/aggregator/${id}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status has been updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addAggregatorAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/aggregator",
      payload: data,
      dispatch,
    })
    .then((res) => {
        if (res.status === 200) {
          showToast("Aggregator added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_AGGREGATORS}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};