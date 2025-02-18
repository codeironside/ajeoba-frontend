import call from "../../../API";
import { showToast } from "../../../Services/toast";
import * as types from "./types";

export const getDashboardAdminCount = (data) => {
  return {
    type: types.GET_ADMIN_DASHBOARD_COUNT,
    payload: data,
  };
};

export const getAdminDashboardCountAction = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/dashboard/admin/active-users",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getDashboardAdminCount(res.body.data.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
