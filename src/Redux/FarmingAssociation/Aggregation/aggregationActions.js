import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { AGGREGATIONS } from "../../../Routes/Routes";

export const getAggregationList = (aggregationListRes) => {
  return {
    type: types.GET_AGGREGATION_LIST,
    payload: aggregationListRes,
  };
};

export const getAggregationInputList = (aggregationListRes) => {
  return {
    type: types.GET_AGGREGATION_INPUT_LIST,
    payload: aggregationListRes,
  };
};

export const addAggregationAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/aggregation",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Aggregation added successfully", "success");
          navigate(`${AGGREGATIONS}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAggregationListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/aggregation",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAggregationList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addAggregationInputAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/input/aggregation",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Aggregation added successfully", "success");
          navigate(`${AGGREGATIONS}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAggregationInputListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/input/aggregation",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAggregationInputList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
