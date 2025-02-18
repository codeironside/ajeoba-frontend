import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  emailOtpCount: "",
  vNINOtpCount: "",
  mobileOtpCount: "",
  resendOtpLimit: "",
  tempUserId: "",
  email: "",
  emailBuyer: "",
  mobileNumber: "",
  option: "email",
  mobileOTPId: "",
  emailOTPId: "",
  vninNumber: "",
  vninOTPId: ""
};

const setEmailOtpCount = (state, action) => {
  return updateObject(state, {
    emailOtpCount: action.payload,
  });
};
const setMobileOtpCount = (state, action) => {
  return updateObject(state, {
    mobileOtpCount: action.payload,
  });
};
const setResendOtpLimit = (state, action) => {
  return updateObject(state, {
    resendOtpLimit: action.payload,
  });
};

const setEmail = (state, action) => {
  return updateObject(state, {
    email: action.payload,
  });
};
const setEmailBuyer = (state, action) => {
  return updateObject(state, {
    emailBuyer: action.payload,
  });
};

const setMobileNumber = (state, action) => {
  return updateObject(state, {
    mobileNumber: action.payload,
  });
};

const setUniqueIdentificationNumberOptId = (state, action) => {
  return updateObject(state, {
    vninOTPId: action.payload,
  })
}

const setTempUserId = (state, action) => {
  return updateObject(state, {
    tempUserId: action.payload,
  });
};

const setOption = (state, action) => {
  return updateObject(state, {
    option: action.payload,
  });
};

const setMobileOtpId = (state, action) => {
  return updateObject(state, { mobileOTPId: action.payload });
};

const setEmailOtpId = (state, action) => {
  return updateObject(state, { emailOTPId: action.payload });
};

const otpReducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.SET_MOBILE_OTP_COUNT:
      return setMobileOtpCount(state, action);
    case types.SET_EMAIL_OTP_COUNT:
      return setEmailOtpCount(state, action);
    case types.SET_RESEND_OTP_LIMIT:
      return setResendOtpLimit(state, action);
    case types.SET_EMAIL:
      return setEmail(state, action);
    case types.SET_EMAIL_BUYER:
      return setEmailBuyer(state, action);
    case types.SET_MOBILE_NUMBER:
      return setMobileNumber(state, action);
    case types.SET_VNIN_NUMBER:
      return setUniqueIdentificationNumberOptId(state, action);
    case types.SET_TEMP_USER_ID:
      return setTempUserId(state, action);
    case types.SET_EMAIL_OTPID:
      return setEmailOtpId(state, action);
    case types.SET_MOBILE_OTPID:
      return setMobileOtpId(state, action);
    case types.SET_OPTION:
      return setOption(state, action);
    default:
      return state;
  }
};

export default otpReducer;
