import call from "../../API";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { encrypt } from "../../Services/localStorageService";
import { showToast } from "../../Services/toast";
import { setStatus } from "../common/Status/statusActions";
import { getDefaultPath } from "../../Services/commonService/commonService";
import { DASHBOARD } from "../../Routes/Routes";

const signInOrSignOut = (
  res,
  dispatch,
  navigate,
  isLoggedInFromAdmin = false
) => {
  // Prompt farmer associate admin to subscribe at the first signin and when status is ONHOLD

  if (res.body.data.role_name === "Farming Association") {
    let showSubscriptionModal;
    if (
      res.body.data.waiver_status === true ||
      res.body.data.subscription_expiry_date !== null
      // ||
      // res.body.data.status !== "ONHOLD"
    ) {
      // it means that the user  has an active subscription or the subscription is waived so, dont show the modal
      showSubscriptionModal = false;
    } else {
      showSubscriptionModal = true;
    }
    localStorage.setItem("showSubscriptionModal", showSubscriptionModal);
  }

  // setting isLoggedInFromAdmin key in localStorage for global access
  if (isLoggedInFromAdmin) {
    localStorage.setItem(
      "isLoggedInFromAdmin",
      encrypt("true", PASSWORD_ENCRYPTION_SECRET)
    );
  } else {
    localStorage.setItem(
      "isLoggedInFromAdmin",
      encrypt("false", PASSWORD_ENCRYPTION_SECRET)
    );
  }
  // showing toast
  showToast("Signed in successfully", "success");
  // setting token,userData and accountData in localStorage
  localStorage.setItem("token", res.headers.authorization);
  const stringData = JSON.stringify(res.body.data);

  localStorage.setItem("user", encrypt(stringData, PASSWORD_ENCRYPTION_SECRET));
  if (res.body.accountDetails) {
    const accData = JSON.stringify(res.body.accountDetails);
    localStorage.setItem(
      "accountData",
      encrypt(accData, PASSWORD_ENCRYPTION_SECRET)
    );
  }
  // navigating according to the default path
  navigate(
    getDefaultPath(
      res.body.data.role_id,
      res.body.data.status,
      res.body.data.subscription_expiry_date
    )
  );
  // setting status in redux
  dispatch(setStatus(res.body.data.status));
};

export const signInWithPassword = (
  userEmail,
  userMobileNumber,
  countryId,
  userPassword,
  navigate
) => {
  return (dispatch) => {
    let data = { password: userPassword };
    if (userEmail) data.email = userEmail;
    else {
      data = {
        ...data,
        mobileNumber: userMobileNumber,
        countryId,
      };
    }
    call({
      method: "post",
      endpoint: "api/public/users/login",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.body.data);
          if (res.body.data.role_id === 6) {
            if (sessionStorage.getItem("productSelected") !== null) {
              sessionStorage.setItem("isProductSelected", "Yes");
            }
          } else if (res.body.data.role_id === 1) {
            if (sessionStorage.getItem("inputSelected") !== null) {
              sessionStorage.setItem("isInputSelected", "Yes");
            }
          }
          // default sign in
          signInOrSignOut(res, dispatch, navigate);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
export const signInWithId = (id, navigate) => {
  return (dispatch) => {
    let data = { id: id };
    call({
      method: "post",
      endpoint: "api/admin/login",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          // sign in and setting isLoggedFromAdmin true
          signInOrSignOut(res, dispatch, navigate, true);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const logoutFromAdmin = (navigate) => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/admin/logout",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          // sign in and setting isLoggedFromAdmin false
          signInOrSignOut(res, dispatch, navigate, false);
          // navigating back to farming association listing in case of back to admin
          navigate("/admin/user-management/farming-association");
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
