import call from "../../../API";
import { showToast } from "../../../Services/toast";
import * as types from "./types";

export const getNotification = (res) => {
  return {
    type: types.GET_NOTIFICATION,
    payload: res,
  };
};

export const getNotificationAction = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/notification",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getNotification(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const updateMarkReadNotificationStatusAction = (id) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/notification/read-mark/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getNotificationAction());
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
