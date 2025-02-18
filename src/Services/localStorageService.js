import * as _ from "lodash";
import * as crypto from "crypto-js";
import { PASSWORD_ENCRYPTION_SECRET } from "../Constant/AppConstant";

export const encrypt = (data, secretKey) => {
  const cipher = crypto.AES.encrypt(data, secretKey).toString();
  return cipher;
};

export const decrypt = (data, secretKey) => {
  const bytes = crypto.AES.decrypt(data, secretKey);
  var originalText = bytes.toString(crypto.enc.Utf8);
  return originalText;
};

const getDescryptedVal = (val, secretKey) => {
  let decryptObj = crypto.AES.decrypt(val, secretKey);
  return _.attempt(_.invoke, decryptObj, "toString", crypto.enc.Utf8);
};

export const removeItem = (key) => {
  localStorage.removeItem(key);
};

export const getRoleName = (arg) => {
  return arg === "Corporate Buyer" ? "Buyer" : arg === "Aggregator" ? "Retailer or Aggregator" : arg
}

export const getItem = (key) => {
  let retrievedVal = localStorage.getItem(key);

  if (_.isNull(retrievedVal)) {
    return null;
  }
  return retrievedVal;
};

export const getUserData = () => {
  const encryptedUserData = localStorage.getItem("user");
  if (encryptedUserData) {
    return JSON.parse(decrypt(encryptedUserData, PASSWORD_ENCRYPTION_SECRET));
  } else {
    return null;
  }
};
export const getLoggedInFromAdmin = () => {
  const encryptedUserData = localStorage.getItem("isLoggedInFromAdmin");
  if (encryptedUserData) {
    return JSON.parse(decrypt(encryptedUserData, PASSWORD_ENCRYPTION_SECRET));
  } else {
    return null;
  }
};

export const getOrderId = () => {
  const encryptedUserData = sessionStorage.getItem("orderId");
  if (encryptedUserData) {
    return JSON.parse(decrypt(encryptedUserData, PASSWORD_ENCRYPTION_SECRET));
  } else {
    return null;
  }
};

export const getUserAccountData = () => {
  const encryptedUserData = localStorage.getItem("accountData");
  if (encryptedUserData) {
    return JSON.parse(decrypt(encryptedUserData, PASSWORD_ENCRYPTION_SECRET));
  } else {
    return null;
  }
};

export const setItem = (key, val) => {
  let parsedVal;

  if (_.isObject(val) || _.isArray(val)) {
    parsedVal = _.attempt(JSON.stringify.bind(null, val));
  } else if (_.isString(val)) {
    parsedVal = val;
  }

  if (!_.isError(parsedVal) && !_.isUndefined(parsedVal)) {
    parsedVal = crypto.AES.encrypt(parsedVal, key);
    localStorage.setItem(key, parsedVal);
  }
};

export const getDataFromSessionStorage = (key) => {
  const encryptedData = sessionStorage.getItem(key);
  if (encryptedData) {
    return JSON.parse(decrypt(encryptedData, PASSWORD_ENCRYPTION_SECRET));
  } else {
    return null;
  }
};

export const removeItemFromSessionStorage = (key) => {
  sessionStorage.removeItem(key);
};
