import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import {
  ADMIN_FINANCE,
  ADMIN_USER_MANAGEMENT,
} from "../../../../Routes/Routes";

export const getFinanceCompanyList = (res) => {
  return {
    type: types.GET_FINANCE_COMPANY_LIST,
    payload: res,
  };
};

export const getFinanceDetailsById = (data) => {
  return {
    type: types.GET_FINANCE_DETAIL,
    payload: data,
  };
};

export const addFinanceCompanyAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/financeCompany",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Finance Company added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceCompanyListAction = (data, isAdmin) => {
  return (dispatch) => {
    call({
      method: "get",

      endpoint: isAdmin?"api/admin/financeCompany":"api/finance-company",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceCompanyList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};


export const toggleFinanceCompanyStatusAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/financeCompany/${id}/status`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFinanceDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/financeCompany/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editFinanceDetails = (id, data, navigate, setEditState) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/financeCompany/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          dispatch(getFinanceDetailsByIdAction(id));
          setEditState(false);
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FINANCE}/detail/${id}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
