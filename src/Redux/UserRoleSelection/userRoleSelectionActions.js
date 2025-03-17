import * as types from "./types";
import call from "../../API";
import { showToast } from "../../Services/toast";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { encrypt } from "../../Services/localStorageService";
import { SIGNUPOTP, SIGNUPPERSONALDETAILS } from "../../Routes/Routes";

export const getUserRoles = () => {
  return (dispatch) => {
    call({
      method: "get",
      endpoint: "api/public/users/roles",
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          const roles = res.body.result.filter((item) => {
            return item.is_signup_allowed; // && item.name !== "Aggregator";
          });
          const userRoles = roles.map((item) => {
            console.log('Filtered Roles:', item);

            return {
              id: item.id,
              name: item.name,
            };
          });
          dispatch({
            type: types.GET_USER_ROLES,
            payload: userRoles,
          });
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};

export const settingUserRoleId = (userRoleSelectedId, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/users/signup/role",
      payload: {
        roleId: userRoleSelectedId,
      },
      dispatch,
    })
      .then((res) => {
        console.log('came here', res);
        if (res.status === 201) {
          showToast("Your User Role has been setup successfully", "success");
          localStorage.setItem("token", res.headers.authorization);
          const stringData = JSON.stringify(res.body.data);
          localStorage.setItem(
            "user",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          navigate(SIGNUPPERSONALDETAILS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
