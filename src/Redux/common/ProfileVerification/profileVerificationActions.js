import call from "../../../API";
import * as types from "./types";
import { showToast } from "../../../Services/toast";

export const getProfileVerificationData = (res) => {
  return {
    type: types.GET_PROFILE_VERIFICATION_TYPE,
    payload: res,
  };
};

export const getProfileVerificationDataAction = (data = {}) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/verificationType",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          // changed back to NIN in commonService.js file
          const filteredData = res.body.data["UIN"].map((item) => {
            if (item === "NIN") return { label: "vNIN" };
            return { label: item };
          });
          dispatch(
            getProfileVerificationData({
              orgUINOptions: filteredData,
              orgVerificationType: res.body["data"]["ORG_VERIFICATION"],
            })
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
