import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getProductList = (res) => {
  return {
    type: types.GET_PRODUCTS_LIST,
    payload: res,
  };
};

export const getInputList = (res) => {
  return {
    type: types.GET_INPUT_LIST_REPORT,
    payload: res,
  };
};

export const getProductListAction = (reqBody, type) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint:
        type === "productSold"
          ? "api/report/product-sold"
          : "api/report/product-aggregated",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getProductList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getInputPurchasedAssociationReportListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/report/input-purchased",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
