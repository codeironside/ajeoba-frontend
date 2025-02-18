import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";
import { ADMIN_USER_MANAGEMENT, ADMIN_LOGISTICS } from "../../../Routes/Routes";

export const getLogisticCompanyList = (res) => {
  return {
    type: types.GET_LOGISTIC_COMPANY,
    payload: res,
  };
};

export const getLogisticCompanyDetailsById = (res) => {
  return {
    type: types.GET_LOGISTIC_COMPANY_DETAILS,
    payload: res,
  };
};

export const getLogisticCompanyListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/logistic-company",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getLogisticCompanyList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editLogisticCompanyAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/logistic-company/${id}/status`,
      payload: reqBody,
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

export const getLogisticCompanyDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/logistic-company/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getLogisticCompanyDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editLogisticCompanyDetails = (id, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/logistic-company/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getLogisticCompanyDetailsByIdAction(id));
            navigate(`/admin/user-management/logistics/detail/${id}`);
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addLogisticCompanyAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/logistic-company",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Logistic company added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
