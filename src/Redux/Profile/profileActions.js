import { showToast } from "../../Services/toast";
import call from "../../API";
import { DASHBOARD } from "../../Routes/Routes";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { encrypt } from "../../Services/localStorageService";

import * as types from "./types";

export const changePassword = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/users/changePassword",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 201) {
          showToast("Password updated successfully", "success");
          navigate(DASHBOARD);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getProfileDetails = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/users/profile/getUserProfile",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const stringData = JSON.stringify(res.body.data.personalDetails);
          localStorage.setItem(
            "user",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          if (res.body.data.accountDetails) {
            const accData = JSON.stringify(res.body.data.accountDetails);
            localStorage.setItem(
              "accountData",
              encrypt(accData, PASSWORD_ENCRYPTION_SECRET)
            );
          }
          dispatch({
            type: types.GET_USER_PROFILE_DETAILS,
            payload: res.body.data,
          });
        }
      })
      .catch((err) => {});
  };
};

export const userBankDetails = (
  data,
  setFillBankingDetails,
  setDetailsFilled
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/users/profile/bankDetails",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Bank details added successfully", "success");
          dispatch({
            type: types.USER_BANK_DETAILS,
            payload: res.body.data,
          });
          setFillBankingDetails(false);
          setDetailsFilled(true);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateUserProfileData = (data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: "api/users/profile/farmingAssociation",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getProfileDetails());
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateAggregatorProfileData = (data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: "api/users/profile/aggregator",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getProfileDetails());
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateQaProfileData = (data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: "api/users/profile/qaCompany",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getProfileDetails());
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateLogisticProfileData = (data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: "api/users/profile/logisticsCompany",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getProfileDetails());
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateInputSupplierProfileData = (data) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: "api/users/profile/inputSupplier",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Details updated successfully", "success");
          setTimeout(() => {
            dispatch(getProfileDetails());
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
