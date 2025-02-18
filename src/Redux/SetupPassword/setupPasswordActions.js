import call from "../../API";
import { showToast } from "../../Services/toast";
import { encrypt } from "../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { USERROLESELECTION, SIGNUPPERSONALDETAILS } from "../../Routes/Routes";
import {
  settingUserRoleId,
} from "../../Redux/UserRoleSelection/userRoleSelectionActions";


export const postPassword = (tempUserId, password, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/public/users/signup/password",
      payload: {
        password,
        tempUserId,
      },
      dispatch,
    })
      .then((res) => {
        if (res.status === 201) {
          showToast("Your Password has been setup successfully", "success");
          localStorage.setItem("token", res.headers.authorization);
          const stringData = JSON.stringify(res.body.data);
          localStorage.setItem(
            "user",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          if (localStorage.getItem("unregistered") !== null) {
            if (localStorage.getItem("unregistered") === "input_buyer") {
              dispatch(settingUserRoleId(1, navigate))
            } else {
              dispatch(settingUserRoleId(6, navigate))
            }
          } else {
            if (localStorage.getItem("userRoleSelectedId")) {
              let userRoleSelectedId = parseInt(localStorage.getItem("userRoleSelectedId"));
              dispatch(settingUserRoleId(userRoleSelectedId, navigate))
            }
          }
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
