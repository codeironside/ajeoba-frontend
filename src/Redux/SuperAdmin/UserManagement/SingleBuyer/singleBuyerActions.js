import call from "../../../../API";
import * as types from "./types";
import {
  ADMIN_SINGLE_BUYER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../Routes/Routes";
import { showToast } from "../../../../Services/toast";

export const getSingleBuyerList = (res) => {
  return {
    type: types.GET_SINGLE_BUYER_LIST,
    payload: res,
  };
};

export const getSingleBuyerDetailsById = (data) => {
  return {
    type: types.GET_SINGLE_BUYER_DETAIL,
    payload: data,
  };
};

export const addSingleBuyerAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/buyer",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Buyer added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_SINGLE_BUYER}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSingleBuyerListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/buyer",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSingleBuyerList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editSingleBuyerStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/buyer/${id}/status`,
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

export const getSingleBuyerDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/buyer/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSingleBuyerDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editSingleBuyerDetailsAction = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/buyer/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getSingleBuyerDetailsByIdAction(id));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
