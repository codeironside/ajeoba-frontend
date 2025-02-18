import * as types from "./types";
import call from "../../../../API";
import { showToast } from "../../../../Services/toast";
import {
  ADMIN_FARMING_ASSOCIATION,
  ADMIN_USER_MANAGEMENT,
  FARMERS,
} from "../../../../Routes/Routes";

export const getAssociationDetailsById = (data) => {
  return {
    type: types.GET_FARMING_ASSOCIATION,
    payload: data,
  };
};

export const getFarmerRefereeList = (data) => {
  return {
    type: types.GET_FARMER_REFEREE_LIST,
    payload: data,
  };
};

export const getFarmerRefereeDetailsById = (data) => {
  return {
    type: types.GET_REFEREE_FARMER_DETAILS,
    payload: data,
  };
};

export const getAssociationDetailsByIdAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/farmingAssociation/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAssociationDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editFarmingAssociation = (id, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/farmingAssociation/${id}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getAssociationDetailsByIdAction(id));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFarmerRefereeListAction = (farmingAssociationId, reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/farmingAssociation/${farmingAssociationId}/farmersList`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerRefereeList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFarmerRefereeDetailsByIdAction = (farmerId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/admin/refereeAndFarmer/${farmerId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerRefereeDetailsById(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editRefereeDetailByIdAction = (refereeId, data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/referee/${refereeId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getFarmerRefereeDetailsByIdAction(refereeId));
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getFarmerDetailsById = (data) => {
  return {
    type: types.GET_FARMER_DETAILS,
    payload: data,
  };
};

export const updateFarmerDetailsById = (data) => {
  return {
    type: types.GET_FARMER_DETAILS,
    payload: data,
  };
};

export const getFarmerDetailsByIdAction = (farmerId) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/farmer/${farmerId}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFarmerDetailsById(res.body.data));
        }
      })

      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateFarmerDetailsByIdAction = (
  farmerId,
  data,
  navigate,
  setEdit,
  isAdmin,
  associationId
) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/farmer/${farmerId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
        }
        dispatch(getFarmerDetailsByIdAction(farmerId));
        setEdit(false);
        navigate(
          isAdmin
            ? `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/farmer/${associationId}/detail/${farmerId}?activeTab=1`
            : `${FARMERS}/detail/${farmerId}`
        );
      })

      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
