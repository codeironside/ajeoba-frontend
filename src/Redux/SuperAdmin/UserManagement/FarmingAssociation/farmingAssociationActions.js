import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_FARMING_ASSOCIATION,
} from "../../../../Routes/Routes";
import { getToken } from "../../../../Auth/getToken";

export const getFarmingAssociationList = (FarmingAssociationListRes) => {
  return {
    type: types.GET_FARMING_ASSOCIATION_LIST,
    payload: FarmingAssociationListRes,
  };
};
export const getBankRequestList = (bankreq) => {
  return {
    type: types.BANK_REQUEST_LIST,
    payload: bankreq,
  };
};

export const getFarmingAssociationListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/farmingAssociation",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmingAssociationList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editFarmingAssociationSubscriptionStatusAction = (
  id,
  status,
  reqBody
) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/subscription/waiver`,
      payload: { status: status, userId: id + "" },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status has been updated successfully", "success");
          dispatch(getFarmingAssociationListAction(reqBody));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editFarmingAssociationAction = (id, status, reqBody) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/farmingAssociation/${id}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status has been updated successfully", "success");
          dispatch(getFarmingAssociationListAction(reqBody));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addFarmingAssociationAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/admin/farmingAssociation/add",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Association added successfully", "success");
          navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}`);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const getBankRequestListActions = () => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/payment/banks",
      dispatch,
      token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getBankRequestList(res.body.banks));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
