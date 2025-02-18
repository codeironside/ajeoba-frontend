import React from "react";
import { signupOtpVerification } from "../../../Redux/common/otp/otpActions";
import { useNavigate } from "react-router-dom";
import { styles } from "./SignUpOtpVerificationStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { SIGNUPOTP } from "../../../Routes/Routes";
import { useEffect } from "react";
import { commonStyles } from "../../../Style/CommonStyle";
import { useSelector, useDispatch } from "react-redux";
import AjOtpVerification from "../../../Components/AjOtpVerification/AjOtpVerification";
import { logoRedirection } from "../../../Services/commonService/commonService";

const SignUpOtpVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tempUserId = useSelector((state) => state.otp.tempUserId);
  
  useEffect(() => {
    if (!tempUserId) {
      navigate(SIGNUPOTP);
    }
  }, []);

  const otpVerificationHandler = (data) => {
    data["tempUserId"] = tempUserId.toString();
    dispatch(signupOtpVerification(data, navigate));
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid
        xs={12}
        sm={5}
        item
        sx={[commonStyles.leftGrid, styles.OtpVerificationBG]}
      >
        <Grid
          item
          sx={commonStyles.logoImageContainer}
          onClick={() => logoRedirection()}
        ></Grid>
      </Grid>
      <Grid xs={12} sm={7} item sx={commonStyles.rightGrid}>
        <AjOtpVerification
          otpData={otpVerificationHandler}
          isEmail={true}
          isMobile={true}
          navigatePage={SIGNUPOTP}
        />
      </Grid>
    </Grid>
  );
};

export default SignUpOtpVerification;
