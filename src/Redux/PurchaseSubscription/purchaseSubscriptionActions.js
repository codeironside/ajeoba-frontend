import call from "../../API";
import * as types from "./types";
import { showToast } from "../../Services/toast";
import { encrypt, getUserData } from "../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";

export const getOrderDetails = (res) => {
  return {
    type: types.GET_ORDER_DETAIL,
    payload: res,
  };
};

export const purchaseSubscriptionAction = (subscriptionId, reqBody) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/payment/subscription/${subscriptionId}`,
      payload: reqBody,
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

export const purchaseSFarmingAssociationSubscriptionAction = (
  subscriptionId,
  reqBody
) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/payment/subscription/${subscriptionId}`,
      payload: reqBody,
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
            "Locate assoc :: ",
            JSON.stringify(res.body.data)
          );
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

export const getOrderDetailsAction = (id) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: `api/order/${id}`,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          let userData = getUserData();
          userData["subscription_expiry_date"] =
            res.body.data.orderDetail.subscription_expiry_date;
          const stringData = JSON.stringify(userData);
          localStorage.setItem(
            "user",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          dispatch(getOrderDetails(res.body.data));
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
