import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { ADMIN_MANAGEMENT } from "../../../Routes/Routes";

export const addAdmin = (newAdmin) => {
  return {
    type: types.ADD_ADMIN,
    payload: newAdmin,
  };
};

export const getAdminList = (adminListRes) => {
  return {
    type: types.GET_ADMIN_LIST,
    payload: adminListRes,
  };
};

export const getAdminById = (adminRes) => {
  return {
    type: types.GET_ADMIN,
    payload: adminRes,
  };
};

export const getAdminListAction = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/users/admin",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAdminByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/users/admin/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAdminById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addAdminAction = (data, navigate) => {
  return (dispatch) => {
    dispatch(addAdmin(data));
    call({
      method: "post",
      endpoint: "api/users/admin/add",
      payload: data,
      dispatch,
    })
      .then((res) => {
        dispatch(addAdmin(null));
        showToast("Admin added successfully", "success");
        navigate(ADMIN_MANAGEMENT);
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editAdminAction = (id, reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/users/admin/${id}`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Admin has been updated successfully", "success");
          navigate(ADMIN_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
