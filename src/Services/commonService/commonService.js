import React from "react";
import { getUserData, encrypt } from "../localStorageService";
import {
  DASHBOARD,
  SIGNIN,
  SUPERADMINSIGNIN,
  OPEN_ADS,
  SUBSCRIPTION,
  // FARMER_SUBSCRIPTION,
  TRADING,
  FINANCE_REQUESTS,
  ROOT,
  // FARMER_SUBSCRIPTION_DETAIL,
} from "../../Routes/Routes";
import * as moment from "moment";
import * as _ from "lodash";
import getSymbolFromCurrency from "currency-symbol-map";
import { ROLES, disabledRoutes } from "../../Constant/RoleConstant";
import { setStatus } from "../../Redux/common/Status/statusActions";
import {
  PASSWORD_ENCRYPTION_SECRET,
  customSignUpStepOptions,
  signUpStepOptions,
  SEARCH_FILTER_REGEX,
} from "../../Constant/AppConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const logout = () => {
  const userData = getUserData();
  localStorage.clear();
  if (
    userData &&
    (userData.role_id === ROLES.ADMIN || userData.role_id === ROLES.SUPER_ADMIN)
  ) {
    window.location.href = SUPERADMINSIGNIN;
  } else {
    if (window.location.pathname !== SIGNIN) {
      if (localStorage.getItem("unregistered") !== null) {
        localStorage.removeItem("unregistered");
      }
      setTimeout((window.location.href = SIGNIN), 3000);
    } else {
      return;
    }
  }
};

export const getStatus = (itemStatus) => {
  if (itemStatus === "ACTIVE") return "Active";
  if (itemStatus === "INACTIVE") return "Inactive";
  else return "On Hold";
};

export const getSubscriptionStatus = (itemStatus) => {
  if (itemStatus === true) return "Waived";
  else return "Unwaived";
};

export const getBooleanStatus = (itemStatus) => {
  if (itemStatus === true) return "Active";
  if (itemStatus === false) return "Inactive";
  else return "On Hold";
};

export const getDisabledPath = (roleId, path, status, subscriptionExpiry) => {
  if (disabledRoutes[roleId]?.includes(path)) {
    if (status === "ONHOLD") {
      return true;
    } else if (
      roleId === ROLES.QA_COMPANY ||
      roleId === ROLES.LOGISTICS_COMPANY
      // ||
      // roleId === ROLES.FARMING_ASSOCIATION
    ) {
      return !!(
        !subscriptionExpiry || moment(subscriptionExpiry).diff(moment.utc()) < 0
      );
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export const updateUserStatus = (status, dispatch) => {
  const userData = getUserData();
  if (userData.status !== status) {
    userData["status"] = status;
    const stringData = JSON.stringify(userData);
    localStorage.setItem(
      "user",
      encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
    );
    dispatch(setStatus(status));
  }
};

export const maskFields = (fieldData) => {
  return fieldData?.replace(/.(?=.{3})/g, "* ");
};

export const formatDate = (date) => {
  return moment(date).format("DD/MM/YYYY");
};

export const getPreviousYearDate = () => {
  const currDate = new Date();
  return new Date(
    currDate.getFullYear() - 1,
    currDate.getMonth(),
    currDate.getDate()
  );
};

export const getTodaysDate = () => {
  const currDate = new Date();
  return new Date(
    currDate.getFullYear(),
    currDate.getMonth(),
    currDate.getDate()
  );
};

export const getNextYearDate = () => {
  const currDate = new Date();
  return new Date(
    currDate.getFullYear() + 2,
    currDate.getMonth(),
    currDate.getDate()
  );
};

export const mergeDateTime = (date, time) => {
  const selectedDate = moment(date);
  const selectedTime = moment(time);
  const formattedDate = moment(selectedDate, "YYYY-MM-DD").format();
  const formattedTime = moment(selectedTime, "HH:mm:ss").format("LTS");
  return moment(
    `${formattedDate} ${formattedTime}`,
    "YYYY-MM-DD HH:mm:ss"
  ).format();
};

export const getCurrencySymbol = (currencyCode) => {
  if (currencyCode && currencyCode !== null) {
    return getSymbolFromCurrency(currencyCode);
  }
  return "";
};

export const getDefaultPath = (roleId, status, subscription) => {
  if (roleId === ROLES.QA_COMPANY || roleId === ROLES.LOGISTICS_COMPANY) {
    if (
      status === "ACTIVE" &&
      subscription &&
      moment(subscription).diff(moment.utc()) > 0
    ) {
      return OPEN_ADS;
    } else {
      return SUBSCRIPTION;
    }
  } else if (
    roleId === ROLES.CORPORATE_BUYER ||
    roleId === ROLES.SINGLE_BUYER
  ) {
    return TRADING;
  } else if (roleId === ROLES.FINANCE_COMPANY) {
    return FINANCE_REQUESTS;
  } else {
    return DASHBOARD;
  }
};

export const getCustomSignUpOption = (roleId) => {
  if (roleId === ROLES.FARMING_ASSOCIATION) return signUpStepOptions[1];
  else if (roleId === ROLES.PRODUCT_AGGREGATOR)
    return customSignUpStepOptions[0];
  else if (roleId === ROLES.QA_COMPANY) return customSignUpStepOptions[1];
  else if (roleId === ROLES.CORPORATE_BUYER) return customSignUpStepOptions[2];
  else if (roleId === ROLES.LOGISTICS_COMPANY)
    return customSignUpStepOptions[3];
  else if (roleId === ROLES.SINGLE_BUYER) return customSignUpStepOptions[4];
  else if (roleId === ROLES.SINGLE_SELLER) return customSignUpStepOptions[5];
  else return signUpStepOptions[1];
};

export const isTextValid = (data) => {
  return SEARCH_FILTER_REGEX.test(data) ? true : false;
};

export const toastMsgEllipsis = (errorMessage) => {
  const errMsg = errorMessage.split(":");
  let X;
  if (errMsg.length > 1) {
    if (errMsg[1].length > 35) {
      X = (
        <div
          style={{
            ...commonStyles.toastMsgEllipsis,
            ...commonStyles.textCapitalize,
          }}
        >
          {errMsg[1]}
        </div>
      );
    } else {
      X = <span style={commonStyles.textCapitalize}>{errMsg[1]}</span>;
    }
  }
  return (
    <div>
      {errMsg[0]}
      {errMsg.length > 1 && <>:{X}</>}
    </div>
  );
};

export const ellipsisOnDropdownValues = (item) => {
  if (item.length > 15) {
    return item.substring(0, 15) + "...";
  }
  return item;
};

export const getPhoneCodeSymbol = (phoneCode) => {
  if (phoneCode?.length) {
    if (phoneCode[0] === "+") return phoneCode;
    else return "+" + phoneCode;
  } else return "N/A";
};

export const getOrderStatus = (status) => {
  if (status === "ORDER_PACED") return "Order Placed";
  if (status === "ONGOING") return "Ongoing";
  if (status === "IN-TRANSIT") return "In-transit";
  else return "Completed";
};

export const numberWithCommas = (x, currencyCode) => {
  // let lang = window.navigator.language
  if (currencyCode) {
    return new Intl.NumberFormat(`en-${currencyCode?.substring(0, 2)}`, {
      style: "currency",
      currency: currencyCode,
    }).format(x);
  }
};

export const numberWithCommass = (x, currencyCode) => {
  if (currencyCode) {
    const formattedAmount = new Intl.NumberFormat(
      `en-${currencyCode?.substring(0, 2)}`,
      {
        style: "currency",
        currency: currencyCode,
      }
    ).format(x);

    const [currencySymbol, amount] = formattedAmount.split(/\s+/);
    return `${currencySymbol} ${amount}`;
  }
};

export const numberWithCommassNoCurrency = (x, currencyCode) => {
  if (currencyCode) {
    const formattedAmount = new Intl.NumberFormat(
      `en-${currencyCode?.substring(0, 2)}`
    ).format(x);

    const [amount] = formattedAmount.split(/\s+/);
    return `${amount}`;
  }
};

export const textCapitalize = (x) => {
  return x && x[0]?.toUpperCase() + x?.slice(1)?.toLowerCase();
};

export const getFinanceRequestAdditionalDetailStatus = (status) => {
  if (status === "PENDING") return "Pending";
  if (status === "DENIED") return "Denied";
  if (status === "GRANTED") return "Granted";
  if (status === "REVOKED") return "Revoked";
};

export const replaceWithUnderScore = (value) => {
  // NIN was changed to vNIN in redux/common/ProfileVerification file
  if (value === "vNIN") {
    value = "NIN";
    return value;
  }
  return value.replace(/ /g, "_");
};

export const removeUnderScore = (value) => {
  if (value === undefined || value === null) {
    return "";
  }
  const formattedValue = value.replace(/_/g, " ");
  return (
    formattedValue.charAt(0).toUpperCase() +
    formattedValue.slice(1).toLowerCase()
  );
};

// export const removeFloat = (value) => {
//   return parseInt(value?.replace(/\.00$/, ""));
// };

export const logoRedirection = () => {
  if (localStorage.getItem("unregistered")) {
    localStorage.removeItem("unregistered");
  }
  const userData = getUserData();
  if (userData) {
    window.location.href = getDefaultPath(userData?.role_id);
  } else {
    window.location.href = ROOT;
  }
};

export const isDateValid = (data) => {
  if (data?.length === 0) {
    return null;
  }
  let valid = _.isFinite(data) || _.isString(data) || _.isDate(data);
  valid = valid && new Date(data).toString() !== "Invalid Date";
  return valid ? true : false;
};
