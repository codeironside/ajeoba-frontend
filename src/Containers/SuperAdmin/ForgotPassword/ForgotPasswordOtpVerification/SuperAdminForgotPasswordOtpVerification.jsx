import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";

import { otpVerification } from "../../../../Redux/common/otp/otpActions";
import { SUPERADMINFORGOTPASSWORDGETOTP } from "../../../../Routes/Routes";

import { commonStyles } from "../../../../Style/CommonStyle";

import AjOtpVerification from "../../../../Components/AjOtpVerification/AjOtpVerification";
import { logoRedirection } from "../../../../Services/commonService/commonService";

const SuperAdminForgotPasswordOtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const countryId = useSelector((state) => state.countries.countryId);
  const mobileNumber = useSelector((state) => state.otp.mobileNumber);
  const email = useSelector((state) => state.otp.email);

  useEffect(() => {
    if (!email && !mobileNumber) {
      navigate(SUPERADMINFORGOTPASSWORDGETOTP);
    }
  }, []);

  const otpVerificationHandler = (data) => {
    const dataToSend = {
      email: email,
      emailOTP: data.emailOTP,
      mobileNumber: mobileNumber,
      countryId: countryId,
      mobileOTP: data.mobileOTP,
    };
    dispatch(otpVerification(dataToSend, "both", navigate));
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
        <AjOtpVerification
          otpData={otpVerificationHandler}
          isEmail={true}
          isMobile={true}
          navigatePage={SUPERADMINFORGOTPASSWORDGETOTP}
        />
      </Grid>
    </Grid>
  );
};

export default SuperAdminForgotPasswordOtpVerification;
