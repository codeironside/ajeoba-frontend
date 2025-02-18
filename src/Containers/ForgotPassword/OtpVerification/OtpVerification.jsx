import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import { styles } from "./OtpVerificationStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { FORGOTPASSWORD } from "../../../Routes/Routes";
import { useEffect } from "react";
import { otpVerification } from "../../../Redux/common/otp/otpActions";
import { commonStyles } from "../../../Style/CommonStyle";

import AjOtpVerification from "../../../Components/AjOtpVerification/AjOtpVerification";
import { logoRedirection } from "../../../Services/commonService/commonService";

const OtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const email = useSelector((state) => state.otp.email);
  const mobileNumber = useSelector((state) => state.otp.mobileNumber);
  const option = useSelector((state) => state.otp.option);
  const countryId = useSelector((state) => state.countries.countryId);

  useEffect(() => {
    if (
      (option === "email" && !email) ||
      (option !== "email" && !mobileNumber)
    ) {
      navigate(FORGOTPASSWORD);
    }
  }, []);

  const otpVerificationHandler = (data) => {
    const dataToSend = {};
    if (option === "email") {
      dataToSend["email"] = email;
      dataToSend["emailOTP"] = data.emailOTP;
    } else {
      dataToSend["mobileNumber"] = mobileNumber;
      dataToSend["countryId"] = countryId;
      dataToSend["mobileOTP"] = data.mobileOTP;
    }
    dispatch(otpVerification(dataToSend, option, navigate));
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
        <AjOtpVerification
          otpData={otpVerificationHandler}
          isEmail={option === "email" ? true : false}
          isMobile={option !== "email" ? true : false}
          navigatePage={FORGOTPASSWORD}
        />
      </Grid>
    </Grid>
  );
};

export default OtpVerification;
