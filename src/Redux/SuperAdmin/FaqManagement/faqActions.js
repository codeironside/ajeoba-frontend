import { showToast } from "../../../Services/toast";
import * as types from "./types";
import call from "../../../API";
import { FAQS_MANAGEMENT } from "../../../Routes/Routes";
import {
  getDataFromSessionStorage,
  removeItemFromSessionStorage,
} from "../../../Services/localStorageService";

export const getFaqList = (data) => {
  return {
    type: types.GET_FAQ_LIST,
    payload: data,
  };
};

export const addFaq = (data) => {
  return {
    type: types.ADD_FAQ,
    payload: data,
  };
};

export const getFaqListAction = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/faq",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFaqList(res?.body?.data?.faqs));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addFaqAction = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/faq",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("FAQ added successfully", "success");
          navigate(FAQS_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const editDataByIdAction = (faqId, data, navigate) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/faq/${faqId}`,
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("FAQ updated successfully", "success");
        }
        removeItemFromSessionStorage("forEditFaqData");
        navigate(FAQS_MANAGEMENT);
      })

      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateToBeEditedValueFromSessionStorge = () => {
  const data = getDataFromSessionStorage("forEditFaqData");
  return {
    type: types.UPDATE_TO_BE_EDITED_VALUE_FROM_SESSION_STORAGE,
    payload: data,
  };
};
