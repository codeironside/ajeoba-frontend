import React from "react";
import { signupOtpVerificationBuyer } from "../../../Redux/common/otp/otpActions";
import { useNavigate } from "react-router-dom";
import { styles } from "../SignUpOtpVerification/SignUpOtpVerificationStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { SIGNUP_BUYER_PAGE, SIGNIN } from "../../../Routes/Routes";
import { useEffect } from "react";
import { commonStyles } from "../../../Style/CommonStyle";
import { useSelector, useDispatch } from "react-redux";
import AjOtpBuyerVerification from "../../../Components/AjOtpBuyerVerification/AjOtpBuyerVerification";
import { logoRedirection } from "../../../Services/commonService/commonService";

const SignUpOtpBuyerVerification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const tempUserId = useSelector((state) => state.otp.tempUserId);
  useEffect(() => {
    if (!tempUserId) {
      navigate(SIGNUP_BUYER_PAGE);
    }
  }, []);

  const otpVerificationHandler = (data) => {
    data["tempUserId"] = tempUserId.toString();
    dispatch(signupOtpVerificationBuyer(data, navigate));
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
        <AjOtpBuyerVerification
          otpData={otpVerificationHandler}
          isEmail={true}
          isMobile={false}
          // navigatePage={SIGNIN}
        />
      </Grid>
    </Grid>
  );
};

export default SignUpOtpBuyerVerification;
