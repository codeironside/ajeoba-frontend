import call from "../../../../API";
import * as types from "./types";
import { showToast } from "../../../../Services/toast";
import {
  ADMIN_INPUT_SUPPLIER,
  ADMIN_USER_MANAGEMENT,
  SIGNIN,
} from "../../../../Routes/Routes";

export const getInputSupplierList = (res) => {
  return {
    type: types.GET_INPUT_SUPPLIER_LIST,
    payload: res,
  };
};

export const getInputSupplierDetailsById = (data) => {
  return {
    type: types.GET_INPUT_SUPPLIER_DETAIL,
    payload: data,
  };
};

export const getInputSupplierListAction = (data, isAdmin) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: isAdmin ? "api/admin/inputSupplier" : "api/input-supplier",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputSupplierList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editInputSupplierStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/inputSupplier/${id}/status`,
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

export const getInputSupplierDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/inputSupplier/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getInputSupplierDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addInputSupplierAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/inputSupplier",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Input supplier added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_INPUT_SUPPLIER}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const signUpAsInputSupplierAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/signup/inputSupplier",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Input supplier added successfully", "success");
          navigate(SIGNIN);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editInputSupplierDetailsAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/inputSupplier/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          dispatch(getInputSupplierDetailsByIdAction(id));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
