import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";

export const getFinanceRequestsList = (res) => {
  return {
    type: types.GET_FINANCE_REQUESTS_LIST,
    payload: res,
  };
};

export const getFinanceRequestsListAction = (data) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/finance-request",
      query: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getFinanceRequestsList(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const toggleAdditionalDetailsRequestStatusAction = (
  requestId,
  status
) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/admin/finance-request/${requestId}/additional-request`,
      payload: status,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status updated successfully", "success");
          dispatch(
            getFinanceRequestsListAction({
              limit: LIMIT,
              skip: SKIP,
            })
          );
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
