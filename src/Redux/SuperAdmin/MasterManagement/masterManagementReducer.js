import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  itemList: {},
  itemDetails: null,
};

const getItemList = (state, action) => {
  return updateObject(state, {
    itemList: action.payload,
  });
};
const getItemDetails = (state, action) => {
  return updateObject(state, {
    itemDetails: action.payload,
  });
};

const masterManagementReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_ITEM_LIST) return getItemList(state, action);
  else if (action.type === types.GET_ITEMS_DETAILS_BY_ID)
    return getItemDetails(state, action);
  else return state;
};

export default masterManagementReducer;
