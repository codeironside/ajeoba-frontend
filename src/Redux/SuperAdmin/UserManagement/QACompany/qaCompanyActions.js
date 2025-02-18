import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import { ADMIN_USER_MANAGEMENT, ADMIN_QA_COMPANIES } from '../../../../Routes/Routes';

export const getQACompanyDetailsById = (data) => {
  return {
    type: types.GET_QA_COMPANY,
    payload: data,
  };
};

export const editQACompanyStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/qaCompany/${id}/status`,
      payload: { status: status },
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

export const addQACompanyAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/qaCompany",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("QA company added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_QA_COMPANIES}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};


export const getQACompanyDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/qaCompany/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getQACompanyDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editQACompanyDetailsAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/qaCompany/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getQACompanyDetailsByIdAction(id));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};




