import React from "react";
import AjTypography from "./AjTypography";
import AjInputLabel from "./AjInputLabel";
import AjInputBase from "./AjInputBase";
import AjButton from "./AjButton";
import AjTimer from "./AjTimer";
import Box from "@mui/material/Box";
// import { styles } from "../Containers/SignUp/SignUpOtpVerification/SignUpOtpVerificationStyle";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOtp } from "../Redux/common/otp/otpActions";

const styles = {
  subHeading1: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "1.125rem",
    lineHeight: "1.688rem",
    textAlign: "center",
  },
  verificationError: {
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    marginTop: "1rem",
    color: "red",
  },
  sentContainer: {
    marginTop: "1rem",
    color: "#1F1F1F",
    display: "flex",
    alignItems: "center",
  },
  sentToDetailsOtp: {
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    color: "#3B3B3B",
    fontStyle: "medium",
  },
  otpInputContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "15rem",
    marginTop: "1rem",
  },
  otpInputField: {
    width: "3rem",
    height: "3rem",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    background: "#FFFFFF",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.02)",
    borderRadius: "0.5rem",
    textAlign: "center",
    input: {
      textAlign: "center",
    },
  },
  timeRemaining: {
    marginTop: "0.75rem",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    fontWeight: "400",
    color: "#898B87",
  },
  changeBtnStyle: {
    padding: "0",
    paddingLeft: "0.313rem",
    textDecoration: "underline",
  },
  notReceiveText: {
    color: "#1F1F1F",
  },
};

const AjOtp = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refs = React.useRef([]);

  const otpBoxOnChangeHandler = (e) => {
    props.otpValue(e);
    let sName = e.target.name;

    if (sName == "otpBox1") {
      if (e.target.value.length == 1) refs.current[1].focus();
    } else if (sName == "otpBox2") {
      if (e.target.value.length == 1) refs.current[2].focus();
      else refs.current[0].focus();
    } else if (sName == "otpBox3") {
      if (e.target.value.length == 1) refs.current[3].focus();
      else refs.current[1].focus();
    } else {
      if (e.target.value.length == 0) refs.current[2].focus();
    }
  };

  const resendOtpHandler = () => {
    const data = {
      otpType: props.type,
    };
    if (props.type === "EMAIL") {
      data["email"] = props.data;
    } else {
      data["mobileNumber"] = props.mobile;
      data["countryId"] = props.countryId;
    }
    dispatch(resendOtp(data));
  };

  return (
    <>
      <AjTypography
        styleData={styles.subHeading1}
        displayText={props.subHeading}
      />
      <AjTypography
        styleData={styles.verificationError}
        displayText={props.otpError ? "Required" : ""}
      />
      <Box sx={styles.sentContainer}>
        <AjInputLabel
          styleData={styles.sentToDetailsOtp}
          displayText={`Sent to ${props.data}`}
        />
        <AjButton
          variant="text"
          styleData={styles.changeBtnStyle}
          displayText="Change"
          onClick={() => {
            if (props.sendOtpState) {
              props.setSendOtpState(false);
            }
            navigate(props.changeNavigate);
          }}
        />
      </Box>
      <Box sx={styles.otpInputContainer}>
        <AjInputBase
          name="otpBox1"
          maxLen={1}
          onChange={otpBoxOnChangeHandler}
          styleData={styles.otpInputField}
          inputRef={(element) => {
            refs.current[0] = element;
          }}
        />
        <AjInputBase
          name="otpBox2"
          maxLen={1}
          onChange={otpBoxOnChangeHandler}
          styleData={styles.otpInputField}
          inputRef={(element) => {
            refs.current[1] = element;
          }}
        />
        <AjInputBase
          name="otpBox3"
          maxLen={1}
          onChange={otpBoxOnChangeHandler}
          styleData={styles.otpInputField}
          inputRef={(element) => {
            refs.current[2] = element;
          }}
        />
        <AjInputBase
          name="otpBox4"
          maxLen={1}
          onChange={otpBoxOnChangeHandler}
          styleData={styles.otpInputField}
          inputRef={(element) => {
            refs.current[3] = element;
          }}
        />
      </Box>
      <Box sx={styles.sentContainer}>
        <AjInputLabel
          styleData={{ ...styles.sentToDetailsOtp, ...styles.notReceiveText }}
          displayText="Didn't receive OTP?"
        />
        <AjButton
          variant="text"
          styleData={styles.changeBtnStyle}
          displayText="Resend"
          isDisable={props.otpTimer > 0 ? true : false}
          onClick={() => {
            resendOtpHandler();
            if (props.setRefereeResendData && props.refereeSequence) {
              props.setRefereeResendData(props.refereeSequence);
            }
          }}
        />
      </Box>
      <AjTimer
        name="emailOtp"
        timer={props.otpTimer}
        styleData={styles.timeRemaining}
        onComplete={props.timerComplete}
      />
      <AjTypography
        styleData={styles.timeRemaining}
        displayText={`${
          props.otpTimer > -1 ? props.resendOtpLimit - props.otpCount : 0
        } attempts remaining`}
      />
    </>
  );
};

export default AjOtp;
