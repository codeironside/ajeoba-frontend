import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

const getTradingActiveAds = (data) => {
  return {
    type: types.GET_TRADING_ACTIVE_ADS,
    payload: data,
  };
};

const getTradingActiveAdDetailById = (data) => {
  return {
    type: types.GET_TRADING_ACTIVE_AD_DETAIL_BY_ID,
    payload: data,
  };
};

export const getTradingActiveAdDetailByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/trading/advertisement/${id}`,
      dispatch,
    })
      .then((res) => {
        dispatch(getTradingActiveAdDetailById(res.body.data));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTradingActiveAdsAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/trading/advertisement",
      dispatch,
      query: reqBody,
    })
      .then((res) => {
        dispatch(getTradingActiveAds(res.body.data));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
