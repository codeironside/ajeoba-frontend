import call from "../../../API";
import { showToast } from "../../../Services/toast";
import * as types from "./types";

export const getDataAction = (data, isTermsAndConditons) => {
  return {
    type: types.GET_DATA,
    payload: isTermsAndConditons ? data.termsAndConditions : data.privacyPolicy,
  };
};

export const getTncAndPrivacyPolicyAction = (data, isTermsAndConditions) => {
  return {
    type: types.GET_TNC_AND_PRIVACY_POLICY,
    payload: isTermsAndConditions
      ? data?.termsAndConditions?.terms_and_conditions
      : data?.privacyPolicy?.privacy_policy,
  };
};

export const saveData = (data, isTermsAndConditions) => {
  const endpoint = isTermsAndConditions
    ? "api/termsAndCondition"
    : "api/privacyPolicy";

  return (dispatch) => {
    call({
      method: "post",
      endpoint,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(res.body.message, "success");
          if (isTermsAndConditions) {
            getDataAction({ termsAndConditions: null }, isTermsAndConditions);
          } else {
            getDataAction({ privacyPolicy: null }, isTermsAndConditions);
          }
          setTimeout(()=>getData(isTermsAndConditions));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getData = (isTermsAndConditions) => {
  const endpoint = isTermsAndConditions
    ? "api/getTermsAndCondition"
    : "api/getPrivacyPolicy";

  return (dispatch) => {
    call({
      method: "get",
      endpoint,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getDataAction(res.body.data, isTermsAndConditions));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getTncAndPrivacyPolicyInfo = (isTermsAndConditions) => {
  const endpoint = isTermsAndConditions
    ? "api/getTermsAndCondition"
    : "api/getPrivacyPolicy";

  return (dispatch) => {
    call({
      method: "get",
      endpoint,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            getTncAndPrivacyPolicyAction(res.body.data, isTermsAndConditions)
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
