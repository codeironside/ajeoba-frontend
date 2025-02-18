import call from "../../API";
import { showToast } from "../../Services/toast";
import { encrypt } from "../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { KYCVERIFICATION } from "../../Routes/Routes";

export const signUpSingleSellerDetails = (data, navigate) => {
  return (dispatch) => {
    call({
      method: "post",
      endpoint: "api/users/profile/sellerDetails",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("Seller details updated successfully", "success");
          const userData = JSON.stringify(res.body.data.userDetails);
          const accountData = JSON.stringify(res.body.data.accountDetails);
          localStorage.setItem(
            "user",
            encrypt(userData, PASSWORD_ENCRYPTION_SECRET)
          );
          localStorage.setItem(
            "accountData",
            encrypt(accountData, PASSWORD_ENCRYPTION_SECRET)
          );
          navigate(KYCVERIFICATION);
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };
};
