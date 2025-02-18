import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getQaAdsData = (data) => {
  return {
    type: types.GET_QA_ADS,
    payload: data,
  };
};
export const getQaAdsDataLength = (data) => {
  return {
    type: types.GET_QA_ADS_LENGTH,
    payload: data,
  };
};

export const getQaAdsListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/qa-ads",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        dispatch(getQaAdsData(res.body.data.result));
        dispatch(getQaAdsDataLength(res.body.data.totalcount));
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};


