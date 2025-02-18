import call from "../../API";
import { showToast } from "../../Services/toast";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { SIGNUPACCOUNTDETAILS } from "../../Routes/Routes";
import { encrypt } from "../../Services/localStorageService";

export const postPersonalDetails = (personalDetails, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: `api/users/profile/personalDetails`,
      payload: personalDetails,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Personal Details saved successfully", "success");
          const stringData = JSON.stringify(res.body.data);
          localStorage.setItem(
            "user",
            encrypt(stringData, PASSWORD_ENCRYPTION_SECRET)
          );
          navigate(SIGNUPACCOUNTDETAILS);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
