import * as types from "./types";
import { updateObject } from "../../utility";

const initialState = {
  notificationList: null,
};

const getNotification = (state, action) => {
  return updateObject(state, {
    notificationList: action.payload,
  });
};

const notificationReducer = (state = initialState, action = {}) => {
  if (action.type === types.GET_NOTIFICATION)
    return getNotification(state, action);
  return state;
};

export default notificationReducer;
