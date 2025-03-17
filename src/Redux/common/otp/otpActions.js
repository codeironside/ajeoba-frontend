import * as types from "./types";

import call from "../../../API";
import { showToast } from "../../../Services/toast";
import {
  SIGNUPOTPVERIFICATION,
  SIGNUPSETUPPASSWORD,
  SIGNUPOTPINPUTSUPPLIERVERIFICATION,
  FORGOTPASSWORDOTPVERIFICATION,
  RESETPASSWORD,
  SIGNIN,
  ADD_FARMERS_LAND_DETAILS,
  SUPERADMINSIGNIN,
  SIGNUPOTPBUYERVERIFICATION,
  SUPERADMINFORGOTPASSWORDOTPVERIFICATION,
  SUPERADMINFORGOTPASSWORDRESETPASSWORD,
  ADD_FARMER_PERSONAL_DETAILS,
  SIGNUPOTPINPUTSUPPLIERDETAILS,
} from "../../../Routes/Routes";
import {
  completeRefereeOtpDetails,
  selectedRefereesData,
  updateFarmerDetails,
  getFarmerOtpData,
  getFarmerOtpId,
  addFarmerkycVerificationAction,
} from "../../FarmingAssociation/Farmers/farmersActions";

export const setEmailOtpCount = (value) => {
  return {
    type: types.SET_EMAIL_OTP_COUNT,
    payload: value,
  };
};
export const setMobileOtpCount = (value) => {
  return {
    type: types.SET_MOBILE_OTP_COUNT,
    payload: value,
  };
};
export const setVNINOtpCount = (value) => {
  return {
    type: types.SET_VNIN_OTP_COUNT,
    payload: value,
  };
};
export const setResendOtpLimit = (value) => {
  return {
    type: types.SET_RESEND_OTP_LIMIT,
    payload: value,
  };
};

export const setTempUserId = (value) => {
  return {
    type: types.SET_TEMP_USER_ID,
    payload: value,
  };
};

export const setEmail = (value) => {
  return {
    type: types.SET_EMAIL,
    payload: value,
  };
};
export const setEmailBuyer = (value) => {
  return {
    type: types.SET_EMAIL_BUYER,
    payload: value,
  };
};

export const setMobileNumber = (value) => {
  return {
    type: types.SET_MOBILE_NUMBER,
    payload: value,
  };
};

export const setUniqueIdentificationNumberOptId = (value) => {
  return {
    type: types.SET_VNIN_NUMBER,
    payload: value,
  };
};

export const setEmailOtpId = (value) => {
  return {
    type: types.SET_EMAIL_OTPID,
    payload: value,
  };
};

export const setMobileOtpId = (value) => {
  return {
    type: types.SET_MOBILE_OTPID,
    payload: value,
  };
};

export const setOption = (value) => {
  return {
    type: types.SET_OPTION,
    payload: value,
  };
};

export const resendOtp = (data) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/otp/resend",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.body.data.otpData.status === 0) {
            showToast(res.body.data.otpData.otpError, "error");
          } else {
            if (data.otpType === "EMAIL") {
              dispatch(setEmailOtpCount(res.body.data.otpData.otpCount));
            } else if (data.otpType === "VNIN") {
              dispatch(setVNINOtpCount(res.body.data.otpData.otpCount));
            } else {
              dispatch(setMobileOtpCount(res.body.data.otpData.otpCount));
            }
            showToast("OTP resent successfully.", "success");
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSignupOtp = (data, navigate) => {
  return (dispatch) => {

    dispatch(setEmail(data.email));
    dispatch(setMobileNumber(data.mobileNumber));
    call({
      method: "post",
      endpoint: "api/public/users/signup/otp",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (
            res.body.data.otpData.email.status === 0 ||
            res.body.data.otpData.mobile.status === 0
          ) {
            showToast("OTP limit reached. Try after sometime.", "error");
          } else {
            dispatch(setTempUserId(res.body.data.tempUserId));
            dispatch(setEmailOtpCount(res.body.data.otpData.email.otpCount));
            dispatch(setMobileOtpCount(res.body.data.otpData.mobile.otpCount));
            dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
            navigate(SIGNUPOTPVERIFICATION);
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const getSignupOtpInputSupply = (data, navigate) => {
  return (dispatch) => {
    dispatch(setEmail(data.email));
    dispatch(setMobileNumber(data.mobileNumber));
    call({
      method: "post",
      endpoint: "api/public/users/signup/otp",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (
            res.body.data.otpData.email.status === 0 ||
            res.body.data.otpData.mobile.status === 0
          ) {
            showToast("OTP limit reached. Try after sometime.", "error");
          } else {
            dispatch(setTempUserId(res.body.data.tempUserId));
            dispatch(setEmailOtpCount(res.body.data.otpData.email.otpCount));
            dispatch(setMobileOtpCount(res.body.data.otpData.mobile.otpCount));
            dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
            navigate(SIGNUPOTPINPUTSUPPLIERVERIFICATION);
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const getSignupOtpBuyer = (data, navigate) => {

  return (dispatch) => {
    dispatch(setEmail(data.email));
    call({
      method: "post",
      endpoint: "api/public/users/corporate-buyer",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.body.data.otpData.email.status === 0) {
            showToast("OTP limit reached. Try after sometime.", "error");
          } else {
            dispatch(setTempUserId(res.body.data.tempUserId));
            dispatch(setEmailOtpCount(res.body.data.otpData.email.otpCount));
            dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
            navigate(SIGNUPOTPBUYERVERIFICATION);
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const signupOtpVerification = (data, navigate) => {
  return (dispatch, getState) => {
    const { tempUserId } = getState().otp;
    const verificationData = {
      ...data,
      tempUserId
    };
    call({
      method: "post",
      endpoint: "api/public/users/signup/otp/verify",
      payload: verificationData,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(
            "Email and phone number have been verified successfully",
            "success"
          );
          navigate(SIGNUPSETUPPASSWORD);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const signupOtpInputSupplyVerification = (data, navigate) => {
  return (dispatch, getState) => {
    const { tempUserId } = getState().otp;
    const verificationData = {
      ...data,
      tempUserId
    };
    call({
      method: "post",
      endpoint: "api/public/users/signup/otp/verify",
      payload: verificationData,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("isUserRegistered", "true");
          showToast(
            "Email and phone number have been verified successfully",
            "success"
          );
          navigate(SIGNUPOTPINPUTSUPPLIERDETAILS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const signupOtpVerificationBuyer = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/corporate/otp",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem("isUserRegistered", "true");
          showToast("Email has been verified successfully", "success");
          navigate(SIGNIN);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const forgotPassword = (data, option, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/forgot-password/otp",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (option === "email" || option === "both") {
            if (res.body.data.otpData.email.status === 0) {
              showToast(res.body.data.otpData.email.otpError, "error");
              return;
            }
            dispatch(setEmail(data.email));
            dispatch(setEmailOtpCount(res.body.data.otpData.email.otpCount));
          }
          if (option === "phone" || option === "both") {
            if (res.body.data.otpData.mobile.status === 0) {
              showToast(res.body.data.otpData.mobile.otpError, "error");
              return;
            }
            dispatch(setMobileNumber(data.mobileNumber));
            dispatch(setMobileOtpCount(res.body.data.otpData.mobile.otpCount));
          }
          dispatch(setOption(option));
          dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
          showToast("OTP Sent successfully", "success");
          if (option === "both") {
            navigate(SUPERADMINFORGOTPASSWORDOTPVERIFICATION);
          } else {
            navigate(FORGOTPASSWORDOTPVERIFICATION);
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const otpVerification = (data, option, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/forgot-password/otp/verify",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (option === "email" || option === "both") {
            dispatch(setEmailOtpId(res.body.data.emailOTPId));
          }
          if (option === "phone" || option === "both") {
            dispatch(setMobileOtpId(res.body.data.mobileOTPId));
          }
          showToast("OTP Verified successfully", "success");
          setTimeout(() => {
            if (option === "both") {
              navigate(SUPERADMINFORGOTPASSWORDRESETPASSWORD);
            } else {
              navigate(RESETPASSWORD);
            }
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const postPassword = (data, option, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/forgot-password/set-password",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast(res.body.message, "success");
          if (option === "both") {
            navigate(SUPERADMINSIGNIN);
          } else {
            navigate(SIGNIN);
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const sendOtp = (data, navigate, setSendOtpState) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/otp/send",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.body.data.otpData.status === 0) {
            showToast(res.body.data.otpData.otpError, "error");
            return;
          }
          setSendOtpState(true);
          dispatch(setMobileNumber(data.mobileNumber));
          dispatch(getFarmerOtpData(data));
          dispatch(setMobileOtpCount(res.body.data.otpData.otpCount));
          dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
          showToast("OTP Sent successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const sendVNINOtp = (data, navigate, setSendOtpState) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/kyc/send",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.body.data.otpData.status === 0) {
            showToast(res.body.data.otpData.otpError, "error");
            return;
          }
          setSendOtpState(true);
          dispatch(
            setUniqueIdentificationNumberOptId(res.body.data.otpData.optId)
          );
          // dispatch(getFarmerOtpData(res.body.data.otpData));
          dispatch(setVNINOtpCount(res.body.data.otpData.otpCount));
          dispatch(setResendOtpLimit(res.body.data.resendOtpLimit));
          showToast("OTP Sent successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const verifyOtp = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/otp/verify",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("OTP Verified successfully", "success");
          dispatch(getFarmerOtpId(res.body.data));
          navigate(ADD_FARMER_PERSONAL_DETAILS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const verifyVNINOtp = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/kyc/verify",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("OTP Verified successfully", "success");
          let d = { otpId: res.body.data.kycTransactionId };
          dispatch(getFarmerOtpId(d));
          navigate(ADD_FARMERS_LAND_DETAILS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const refereeSendOtp = (
  data,
  navigate,
  setSendOtpState,
  farmersDetailsData
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/select-referees",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          if (res.body.data.otpData[0].status === 0) {
            showToast(res.body.data.otpData[0].otpError, "error");
            return;
          }
          if (res.body.data.otpData[1].status === 0) {
            showToast(res.body.data.otpData[1].otpError, "error");
            return;
          }
          setSendOtpState(true);
          dispatch(updateFarmerDetails(farmersDetailsData));
          dispatch(completeRefereeOtpDetails(data));
          dispatch(selectedRefereesData(res.body.data));
          showToast("OTP Sent successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const refereeVerifyOtp = (data, finalData, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/farmer/verify-referee",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const finalDataToSend = {
            ...finalData,
            refereesOtpData: res.body.data,
          };
          dispatch(
            addFarmerkycVerificationAction(
              { farmer: finalDataToSend },
              navigate
            )
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const completeRefereeOtpVerification = (data, navigate, id) => {
  return (dispatch) => {
    call({
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const refreshPage = () => {
  window.location.reload(false);
};
