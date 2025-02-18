import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { postPassword } from "../../../Redux/common/otp/otpActions";
import { encrypt } from "../../../Services/localStorageService";
import { styles } from "./resetPasswordStyle";
import { FORGOTPASSWORD } from "../../../Routes/Routes";
import { commonStyles } from "../../../Style/CommonStyle";

import AjSetupPassword from "../../../Components/AjSetupPassword/AjSetupPassword";
import { logoRedirection } from "../../../Services/commonService/commonService";

function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const mobileOTPId = useSelector((state) => state.otp.mobileOTPId || "");
  const emailOTPId = useSelector((state) => state.otp.emailOTPId || "");
  const email = useSelector((state) => state.otp.email);
  const mobileNumber = useSelector((state) => state.otp.mobileNumber);
  const option = useSelector((state) => state.otp.option);
  const countryId = useSelector((state) => state.countries.countryId || "");

  useEffect(() => {
    if (!mobileOTPId && !emailOTPId) {
      navigate(FORGOTPASSWORD);
    }
  }, []);

  const onSubmit = (data) => {
    const dataToSend = {
      password: encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
    };
    if (option === "email") {
      dataToSend["email"] = email;
      dataToSend["emailOTPId"] = emailOTPId;
    } else {
      dataToSend["mobileNumber"] = mobileNumber;
      dataToSend["countryId"] = countryId;
      dataToSend["mobileOTPId"] = mobileOTPId;
    }
    dispatch(postPassword(dataToSend, option, navigate));
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid xs={12} sm={5} item sx={[commonStyles.leftGrid, styles.leftBG]}>
        <Grid
          item
          sx={commonStyles.logoImageContainer}
          onClick={() => logoRedirection()}
        ></Grid>
      </Grid>
      <Grid xs={12} sm={7} item sx={commonStyles.rightGrid}>
        <AjSetupPassword
          heading="Reset your password"
          getPasswordData={onSubmit}
        />
      </Grid>
    </Grid>
  );
}

export default ResetPassword;
