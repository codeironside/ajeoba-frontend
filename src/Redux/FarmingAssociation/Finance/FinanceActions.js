import call from "../../../API";
import * as types from "./types";
import { FINANCE } from "../../../Routes/Routes";
import { showToast } from "../../../Services/toast";
import { typeOfRequestOptions } from "../../../Constant/AppConstant";

export const getFinanceRequestById = (res) => {
  return {
    type: types.GET_FINANCE_REQUEST_DETAIL_BY_ID,
    payload: res,
  };
};

export const createFinanaceRequestAction = (data, navigate, activeTab) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/finance-request",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Finance request created successfully", "success");
          navigate(`${FINANCE}?activeTab=${activeTab}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceRequestDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/finance-request/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceRequestById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceReqforInputList = (res) => {
  return {
    type: types.GET_FIN_REQ_FOR_INPUT_LIST,
    payload: res,
  };
};
export const getFinanceReqforProductList = (res) => {
  return {
    type: types.GET_FIN_REQ_FOR_PRODUCT_LIST,
    payload: res,
  };
};

export const getFinanceReqProductOrInputListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/finance-request",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (data.itemType === typeOfRequestOptions[1].value) {
            dispatch(getFinanceReqforInputList(res.body.data));
          }
          if (data.itemType === typeOfRequestOptions[0].value) {
            dispatch(getFinanceReqforProductList(res.body.data));
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
