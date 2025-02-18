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
    const [mobileOtpError, setMobileOtpError] = useState(false);
    const [vNINOtpError, setvNINOtpError] = useState(false);
    const [mobileOtpTimer, setMobileOtpTimer] = useState(null);
    const [emailOtpTimer, setEmailOtpTimer] = useState(null);
    const [vNINOtpTimer, setvNINOtpTimer] = useState(null);
    const [emailOtp, setEmailOtp] = useState({
        otpBox1: "",
        otpBox2: "",
        otpBox3: "",
        otpBox4: "",
    });
    const [phoneOtp, setPhoneOtp] = useState({
        otpBox1: "",
        otpBox2: "",
        otpBox3: "",
        otpBox4: "",
    });
    const [vNINOtp, setvNINOtp] = useState({
        otpBox1: "",
        otpBox2: "",
        otpBox3: "",
        otpBox4: "",
    });

    const email = useSelector((state) => state.otp.email);
    const mobileNumber = useSelector((state) => state.otp.mobileNumber);
    const vNIN = useSelector((state) => state.otp.vninNumber);
    const countryId = useSelector((state) => state.countries.countryId);
    const countryCode = useSelector((state) => state.countries.countryCode);
    const emailOtpCount = useSelector((state) => state.otp.emailOtpCount);
    const vNINOtpCount = useSelector((state) => state.otp.vNINOtpCount);
    const mobileOtpCount = useSelector((state) => state.otp.mobileOtpCount);
    const resendOtpLimit = useSelector((state) => state.otp.resendOtpLimit);


    useEffect(() => {
        if (emailOtpCount < 0 || emailOtpCount === resendOtpLimit) {
            setEmailOtpTimer(15);
        } else {
            setEmailOtpTimer(1);
        }
    }, [emailOtpCount]);

    useEffect(() => {
        if (vNINOtpCount < 0 || vNINOtpCount === resendOtpLimit) {
            setvNINOtpTimer(15);
        } else {
            setvNINOtpTimer(1);
        }
    }, [vNINOtpCount]);

    useEffect(() => {
        if (mobileOtpCount < 0 || mobileOtpCount === resendOtpLimit) {
            setMobileOtpTimer(15);
        } else {
            setMobileOtpTimer(1);
        }
    }, [mobileOtpCount]);

    const concat = (data) => {
        if (!data) {
            return "";
        }
        return data.otpBox1 + data.otpBox2 + data.otpBox3 + data.otpBox4;
    }

    const isOtpValid = (type, otpData) => {
        if (!otpData) {
            if (type === 'EMAIL') {
                setEmailOtpError(true);
            } else if(type === "") {

            } else {
                setMobileOtpError(true);
            }
            return false;
        }
        if (otpData && otpData.length === 4) {
            if (type === 'EMAIL') {
                setEmailOtpError(false);
            } else {
                setMobileOtpError(false);
            }
            return true;
        }
        if (type === 'EMAIL') {
            setEmailOtpError(true);
        } else {
            setMobileOtpError(true);
        }
        return false;
    }

    const emailTimerComplete = (data) => {
        setEmailOtpTimer(0);
    };

    const mobileTimerComplete = (data) => {
        setMobileOtpTimer(0);
    };

    const vNINTimerComplete = (data) => {
        setMobileOtpTimer(0);
    };

    const geEmailtOtp = (e) => {
        setEmailOtp({ ...emailOtp, [e.target.name]: e.target.value });
    }

    const getvNINOtp = (e) => {
        setvNINOtp({ ...vNINOtp, [e.target.name]: e.target.value });
    }

    const getMobileOtp = (e) => {
        setPhoneOtp({ ...phoneOtp, [e.target.name]: e.target.value });
    }

    const otpVerificationHandler = () => {
        let data = {};
        const eOTP = concat(emailOtp);
        const isEmailOTPValid = isOtpValid("EMAIL", eOTP);
        const vOTP = concat(vNINOtp);
        const isVNINOTPValid = isOtpValid("VNIN", vOTP);
        const mOTP = concat(phoneOtp);
        const isMobileOTPValid = isOtpValid("SMS", mOTP);
        if (props.isEmail) {
            if (isEmailOTPValid) {
                data['emailOTP'] = eOTP;
            } else {
                return;
            }
        }
        if (props.isVNIN) {
            if (isVNINOTPValid) {
                data['vNINOTP'] = vOTP;
            } else {
                return;
            }
        }
        if (props.isMobile) {
            if (isMobileOTPValid) {
                data['mobileOTP'] = mOTP;
            } else {
                return;
            }
        }
        props.otpData(data);
    }

    return (
        <Box sx={[commonStyles.mainHeadingContainer, commonStyles.marginTopRoot, commonStyles.marginBottomRoot]}>
            <AjTypography
                styleData={commonStyles.mainHeading}
                displayText={`Verify your ${props.isEmail ? 'E-mail' : ''} ${props.isEmail && props.isMobile ? '&' : ''} ${props.isMobile ? 'Phone number' : ''}`}
            />
            {props.isEmail ?
                <Box xs={12} sm={6} sx={commonStyles.verificationContainer}>

                    <AjOtp
                        subHeading="E-mail verification"
                        otpError={emailOtpError}
                        type="EMAIL"
                        data={email}
                        changeNavigate={props.navigatePage}
                        otpTimer={emailOtpTimer}
                        otpCount={emailOtpCount}
                        resendOtpLimit={resendOtpLimit}
                        otpValue={geEmailtOtp}
                        timerComplete={emailTimerComplete}
                    />
                </Box>
                : ""}
            {props.isMobile ?
                <Box sx={commonStyles.verificationContainer}>
                    <AjOtp
                        subHeading="Phone number verification"
                        otpError={mobileOtpError}
                        type="SMS"
                        data={`${countryCode} ${mobileNumber}`}
                        countryId={countryId}
                        countryCode={countryCode}
                        mobile={mobileNumber}
                        changeNavigate={props.navigatePage}
                        otpTimer={mobileOtpTimer}
                        otpCount={mobileOtpCount}
                        resendOtpLimit={resendOtpLimit}
                        otpValue={getMobileOtp}
                        timerComplete={mobileTimerComplete}
                        setSendOtpState={props.setSendOtpState}
                        sendOtpState={props.sendOtpState}
                    />
                </Box>
                : ""}
            
            {props.isVNIN ?
                <Box sx={commonStyles.verificationContainer}>
                    <AjOtp
                        subHeading="vNIN/NIN verification"
                        otpError={vNINOtpError}
                        type="SMS"
                        data={`${vNIN}`}
                        changeNavigate={props.navigatePage}
                        otpTimer={vNINOtpTimer}
                        otpCount={vNINOtpCount}
                        resendOtpLimit={resendOtpLimit}
                        otpValue={getvNINOtp}
                        timerComplete={vNINTimerComplete}
                        setSendOtpState={props.setSendOtpState}
                        sendOtpState={props.sendOtpState}
                    />
                </Box>
                : ""}
            <AjButton
                variant="contained"
                displayText="Verify"
                onClick={otpVerificationHandler}
            />
        </Box>
    );
};

export default AjOtpVerification;