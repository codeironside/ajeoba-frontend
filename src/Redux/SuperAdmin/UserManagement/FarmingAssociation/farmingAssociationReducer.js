import * as types from "./types";
import { updateObject } from "../../../utility";

const initialState = {
  farmingAssociationList: {},
  bankReq: null,
};

const getFarmigAssociationList = (state, action) => {
  return updateObject(state, {
    farmingAssociationList: action.payload,
  });
};
const getFarmigAssociationBankReqList = (state, action) => {
  return updateObject(state, {
    bankReq: action.payload,
  });
};

const farmingAssociationReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_FARMING_ASSOCIATION_LIST) {
    return getFarmigAssociationList(state, action);
  } else if (action.type === types.BANK_REQUEST_LIST) {
    return getFarmigAssociationBankReqList(state, action);
  } else {
    return state;
  }
};

export default farmingAssociationReducer;
