import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { getToken } from "../../../Auth/getToken";
import { ADMIN_PRODUCT_ORDER_QA } from "../../../Routes/Routes";

export const getQACompaniesList = (res) => {
  return {
    type: types.GET_COMPANY,
    payload: res,
  };
};

export const assignQaCompany = (assignedQas) => {
  return {
    type: types.ASSIGN_PRODUCT_QA_COMPANY,
    payload: assignedQas,
  };
};

export const getCompaniesAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/qaCompanies",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getQACompaniesList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const assignQaCompanyAction = (reqBody, navigate) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/product/order-qa",
      token: token,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(assignQaCompany(res.body.data));
          showToast("QA Company assigned successfully", "success");
          navigate(ADMIN_PRODUCT_ORDER_QA);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
