import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { SUBSCRIPTION_MANAGEMENT } from "../../../Routes/Routes";
import { getToken } from "../../../Auth/getToken";
import { encrypt } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";

export const getAllSubscriptionsData = (data) => {
  return {
    type: types.GET_ALL_SUBSCRIPTIONS,
    payload: data,
  };
};

export const allSubscriptionLength = (length) => {
  return {
    type: types.ALL_SUBSCRIPTIONS_LENGTH,
    payload: length,
  };
};

export const subscriptionCurrency = (currency) => {
  return {
    type: types.SUBSCRIPTION_CURRENCY,
    payload: currency,
  };
};

export const addSubscriptionData = (data) => {
  return {
    type: types.ADD_SUBSCRIPTION,
    payload: data,
  };
};

export const farmersSubscriptionData = (data) => {
  return {
    type: types.FARMERS_SUBSCRIPTION,
    payload: data,
  };
};

export const getSubscriptionInfo = (data) => {
  return {
    type: types.FARMERS_SUBSCRIPTION_INFO,
    payload: data,
  };
};

export const getSubscriptionDetail = (data) => {
  return {
    type: types.FARMERS_SUBSCRIPTION_DETAIL,
    payload: data,
  };
};

export const getAllSubscriptionsDataIndex = (data) => {
  return {
    type: types.FARMERS_SUBSCRIPTION_INDEX,
    payload: data,
  };
};

export const toggleSubscriptionStatusAction = (subscriptionId, status) => {
  return (dispatch) => {
    call({
      method: "put",
      endpoint: `api/subscription/${subscriptionId}/status`,
      payload: { status: status },
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Status updated successfully", "success");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getAllSubscriptions = (reqBody) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/subscriptions`,
      query: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllSubscriptionsData(res.body.result.result));
          dispatch(allSubscriptionLength(res.body.result.totalCount));
          dispatch(subscriptionCurrency(res.body.result.currency));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const addSubscription = (reqBody, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/subscription`,
      payload: reqBody,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(addSubscriptionData(res.body.data.planDetails));
          showToast(res.body.message, "success");
          navigate(SUBSCRIPTION_MANAGEMENT);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const farmersSubscriptionAction = (reqBody, subscriptionId) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/payment/subscription/${subscriptionId}`,
      payload: reqBody,
      token,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const stringData = JSON.stringify(res.body.order_id);
          const userType = reqBody?.subscription_type;
          const userSubTypeData = {
            orderId: encrypt(stringData, PASSWORD_ENCRYPTION_SECRET),
            userType: userType,
          };
          localStorage.setItem(
            "userSubTypeData",
            JSON.stringify(userSubTypeData)
          );
          sessionStorage.setItem(
            "orderId",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          window.location.href = res.body.data.link;
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSubscriptionInfoActions = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/subscription/farmer/info`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getSubscriptionInfo(res.body.result));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const getSubscriptionDetailActions = (farmerId) => {
  const token = getToken();
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/subscription/farmer?farmerId=${farmerId}`,
      dispatch,
      token: token,
    })
      .then((res) => {
        if (res.status === 200) {
          dispatch(getAllSubscriptionsDataIndex(res.body.result.sub[0]));
          dispatch(getSubscriptionDetail(res.body.result.sub));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
