import React from "react";
import AjTypography from "../AjTypography";
import AjButton from "../AjButton";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import AjOtp from "../AjOtp";
import { commonStyles } from "../../Style/CommonStyle";
import { useSelector } from "react-redux";

const AjOtpVerification = (props) => {
  const [emailOtpError, setEmailOtpError] = useState(false);
  const [emailOtpTimer, setEmailOtpTimer] = useState(null);
  const [emailOtp, setEmailOtp] = useState({
    otpBox1: "",
    otpBox2: "",
    otpBox3: "",
    otpBox4: "",
  });

  const email = useSelector((state) => state.otp.email);
  const emailOtpCount = useSelector((state) => state.otp.emailOtpCount);
  const resendOtpLimit = useSelector((state) => state.otp.resendOtpLimit);

  useEffect(() => {
    if (emailOtpCount < 0 || emailOtpCount === resendOtpLimit) {
      setEmailOtpTimer(15);
    } else {
      setEmailOtpTimer(1);
    }
  }, [emailOtpCount]);

  const concat = (data) => {
    if (!data) {
      return "";
    }
    return data.otpBox1 + data.otpBox2 + data.otpBox3 + data.otpBox4;
  };

  const isOtpValid = (type, otpData) => {
    if (!otpData) {
      if (type === "EMAIL") {
        setEmailOtpError(true);
      }
      return false;
    }
    if (otpData && otpData.length === 4) {
      if (type === "EMAIL") {
        setEmailOtpError(false);
      }
      return true;
    }
    if (type === "EMAIL") {
      setEmailOtpError(true);
    }
    return false;
  };

  const emailTimerComplete = (data) => {
    setEmailOtpTimer(0);
  };

  const geEmailtOtp = (e) => {
    setEmailOtp({ ...emailOtp, [e.target.name]: e.target.value });
  };

  const otpVerificationHandler = () => {
    let data = {};
    const eOTP = concat(emailOtp);
    const isEmailOTPValid = isOtpValid("EMAIL", eOTP);
    if (props.isEmail) {
      if (isEmailOTPValid) {
        data["emailOTP"] = eOTP;
      } else {
        return;
      }
    }
    /*
      otpData={otpVerificationHandler}
          isEmail={true}
          isMobile={false}
          navigatePage={SIGNIN}
    */ 
    props.otpData(data);
  };

  return (
    <Box
      sx={[
        commonStyles.mainHeadingContainer,
        commonStyles.marginTopRoot,
        commonStyles.marginBottomRoot,
      ]}
    >
      <AjTypography
        styleData={commonStyles.mainHeading}
        displayText={`Verify your ${props.isEmail ? "E-mail" : ""} ${
          props.isEmail && props.isMobile ? "&" : ""
        } ${props.isMobile ? "Phone number" : ""}`}
      />
      {props.isEmail ? (
        <Box xs={12} sm={6} sx={commonStyles.verificationContainer}>
          <AjOtp
            subHeading="E-mail verification "
            otpError={emailOtpError}
            type="EMAIL"
            data={email}
            // changeNavigate={props.navigatePage}
            otpTimer={emailOtpTimer}
            otpCount={emailOtpCount}
            resendOtpLimit={resendOtpLimit}
            otpValue={geEmailtOtp}
            timerComplete={emailTimerComplete}
          />
        </Box>
      ) : (
        ""
      )}
      <AjButton
        variant="contained"
        displayText="Verify"
        onClick={otpVerificationHandler}
      />
    </Box>
  );
};

export default AjOtpVerification;
