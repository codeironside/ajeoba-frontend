import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { log } from "async";

export const getMasterData = (data) => {
  return {
    type: types.GET_MASTER_DATA,
    payload: data,
  };
};

export const getMasterDataSecond = (data) => {
  return {
    type: types.GET_MASTER_DATA_SECOND,
    payload: data,
  };
};

export const getDistance = (data) => {
  return {
    type: types.GET_DISTANCE,
    payload: data,
  };
};

export const getMasterDataAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/item",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getMasterData(res.body.result.result));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getMasterDataSecondAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/item",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getMasterDataSecond(res.body.result.result));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getDistanceAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/distance",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getDistance(res.body.data));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
