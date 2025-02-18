import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getInputSupplierReportsList = (res) => {
  return {
    type: types.GET_INPUT_SUPPLIER_REPORT_LIST,
    payload: res,
  };
};

export const getInputSupplierReportsListAction = (reqBody, type) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint:
        type === "inputSold"
          ? "api/report/input-sold"
          : "api/report/input-aggregated",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputSupplierReportsList(res.body));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
