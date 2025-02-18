import * as types from "./types";
import call from "../../../API";
import { showToast } from "../../../Services/toast";
import { SELLER_WALLET } from "../../../Routes/Routes";
import { getToken } from "../../../Auth/getToken";
import { showLoader } from "../../Loader/LoaderActions";

export const withdraw = (newWithdraw) => {
  return {
    type: types.WITHDRAW,
    payload: newWithdraw,
  };
};

export const makeWithdrawal = (reqBody, id, navigate) => {
  if (reqBody.password === null) {
    showToast("Password field can't be empty", "warning");
    return;
  }
  return (dispatch) => {
    setTimeout(() => {
      showLoader();
    }, 4000);
    call({
      method: "post",
      endpoint: `api/admin/settlement/${id}`,
      payload: reqBody,
      token: getToken(),
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("The transaction is been processed", "success");
          setTimeout(() => {
            navigate(SELLER_WALLET);
          }, 4000);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
