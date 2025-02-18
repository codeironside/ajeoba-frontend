import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../Constant/AppConstant";
import { postPassword } from "../../../../Redux/common/otp/otpActions";
import { encrypt } from "../../../../Services/localStorageService";
import { SUPERADMINFORGOTPASSWORDGETOTP } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";

import AjSetupPassword from "../../../../Components/AjSetupPassword/AjSetupPassword";
import { logoRedirection } from "../../../../Services/commonService/commonService";

function SuperAdminForgotPasswordResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const email = useSelector((state) => state.otp.email);
  const countryId = useSelector((state) => state.countries.countryId || "");
  const mobileNumber = useSelector((state) => state.otp.mobileNumber);
  const mobileOTPId = useSelector((state) => state.otp.mobileOTPId || "");
  const emailOTPId = useSelector((state) => state.otp.emailOTPId || "");

  useEffect(() => {
    if (!mobileOTPId && !emailOTPId) {
      navigate(SUPERADMINFORGOTPASSWORDGETOTP);
    }
  }, []);

  const onSubmit = (data) => {
    const OtpDataToSend = {
      password: encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
      email: email,
      emailOTPId: emailOTPId,
      mobileNumber: mobileNumber,
      countryId: countryId,
      mobileOTPId: mobileOTPId,
    };
    dispatch(postPassword(OtpDataToSend, "both", navigate));
  };

  return (
    <Grid
      container
      sx={[
        commonStyles.mainGridContainer,
        commonStyles.ligthSilverGreyBG,
        commonStyles.autoHeight,
      ]}
    >
      <CssBaseline />
      <Grid
        item
        sx={commonStyles.logoImageContainer}
        onClick={() => logoRedirection()}
      ></Grid>
      <Grid xs={12} item sx={commonStyles.adminWhiteContainer}>
        <AjSetupPassword
          heading="Reset your password"
          getPasswordData={onSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default SuperAdminForgotPasswordResetPassword;
