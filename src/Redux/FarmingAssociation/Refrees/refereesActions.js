import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { FARMER_KYC_VERIFICATION, REFEREES } from "../../../Routes/Routes";

export const addReferee = (newReferee) => {
  return {
    type: types.ADD_REFEREE,
    payload: newReferee,
  };
};
export const setKycVerified = (data) => {
  return {
    type: types.SET_KYC_VERIFIED,
    payload: data,
  };
};

export const getRefereeList = (refereeListRes) => {
  return {
    type: types.GET_REFEREE_LIST,
    payload: refereeListRes,
  };
};

export const getRefereeListAction = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/farmers",
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getRefereeList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addRefereeAction = (data, navigate) => {
  return (dispatch) => {
    dispatch(addReferee(data));
    call({
      method: "post",
      endpoint: "api/farmers/referee/add",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200 && res.body.data.is_kyc_verified) {
          dispatch(addReferee(null));
          dispatch(setKycVerified(true));
          showToast("Referee added successfully", "success");
        } else {
          dispatch(setKycVerified(false));
        }
        navigate(`${REFEREES}/${FARMER_KYC_VERIFICATION}`);
      })
      .catch((err) => {
        if (err.code === "KYC_VERIFICATION_FAILED") {
          dispatch(setKycVerified(false));
          navigate(`${REFEREES}/${FARMER_KYC_VERIFICATION}`);
        } else {
          showToast(err.message, "error");
        }
      });
  };
};

export const toggleRefereeStatusAction = (refereeId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/farmers/${refereeId}/status`,
      payload: { status: status },
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
