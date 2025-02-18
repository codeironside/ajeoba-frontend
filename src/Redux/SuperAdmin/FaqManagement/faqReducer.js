import * as types from "./types";
import { updateObject } from "../../utility";
import { getDataFromSessionStorage } from "../../../Services/localStorageService";

const initialState = {
  faqList: [],
  toBeEditedData: getDataFromSessionStorage("forEditFaqData"),
};

const getFaqList = (state, action) => {
  return updateObject(state, {
    faqList: action.payload,
  });
};

const updateToBeEditedValueFromSessionStorge = (state, action) => {
  return updateObject(state, {
    toBeEditedData: action.payload,
  });
};

const faqReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_FAQ_LIST) return getFaqList(state, action);
  else if (action.type === types.UPDATE_TO_BE_EDITED_VALUE_FROM_SESSION_STORAGE)
    return updateToBeEditedValueFromSessionStorge(state, action);
  else return state;
};

export default faqReducer;
