import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import {
  ADMIN_CORPORATE_BUYER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../Routes/Routes";

export const getCorporateBuyersList = (aggregatorsRes) => {
  return {
    type: types.GET_CORPORATE_BUYERS_LIST,
    payload: aggregatorsRes,
  };
};

export const getCorporateDetailsById = (data) => {
  return {
    type: types.GET_CORPORATE_BUYER_DETAIL,
    payload: data,
  };
};

export const getCorporateBuyersListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/corporateBuyer",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getCorporateBuyersList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editCorporateBuyerAction = (id, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/corporateBuyer/${id}/status`,
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

export const getCorporateDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/corporateBuyer/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getCorporateDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editCorporateDetails = (id, data, navigate, setEditState) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/corporateBuyer/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          dispatch(getCorporateDetailsByIdAction(id));
          setEditState(false);
          navigate(
            `${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}/detail/${id}`
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editCorporateStatusAction = (id, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/corporateBuyer/${id}/status`,
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

export const addCorporateAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/corporateBuyer",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Corporate Buyer added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_CORPORATE_BUYER}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
