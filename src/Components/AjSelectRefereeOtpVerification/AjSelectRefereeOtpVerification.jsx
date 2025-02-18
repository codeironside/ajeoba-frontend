import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import { useSelector } from "react-redux";
import AjOtp from "../AjOtp";
import AjButton from "../AjButton";
import * as _ from "lodash";
import { styles } from "./AjSelectRefereeOtpVerificationStyles.js";

const AjSelectRefereeOtpVerification = (props) => {

  const farmersDetailsData = useSelector(
    (state) => state.farmers.farmersDetailsData
  );
  const selectedRefereesData = useSelector(
    (state) => state.farmers.selectedRefereesData
  );
  const completeRefereeOtpDetails = useSelector(
    (state) => state.farmers.completeRefereeOtpDetails
  );
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  const mobileOtpCount = useSelector((state) => state.otp.mobileOtpCount);

  const [mobileNumber1, setMobileNumber1] = useState();
  const [mobileOtpError1, setMobileOtpError1] = useState(false);
  const [mobileOtpTimer1, setMobileOtpTimer1] = useState(null);
  const [mobileOtp1, setMobileOtp1] = useState({
    otpBox1: "",
    otpBox2: "",
    otpBox3: "",
    otpBox4: "",
  });
  const [countryId1, setCountryId1] = useState();
  const [countryCode1, setCountryCode1] = useState();
  const [mobileOtpCount1, setMobileOtpCount1] = useState();

  const [resendOtpLimit, setResendOtpLimit] = useState();
  const [refereeResendData, setRefereeResendData] = useState();

  const [mobileNumber2, setMobileNumber2] = useState();
  const [mobileOtpError2, setMobileOtpError2] = useState(false);
  const [mobileOtpTimer2, setMobileOtpTimer2] = useState(null);
  const [mobileOtp2, setMobileOtp2] = useState({
    otpBox1: "",
    otpBox2: "",
    otpBox3: "",
    otpBox4: "",
  });
  const [countryId2, setCountryId2] = useState();
  const [countryCode2, setCountryCode2] = useState();
  const [mobileOtpCount2, setMobileOtpCount2] = useState();
  const [refereeIdOne, setRefereeIdOne] = useState();
  const [refereeIdTwo, setRefereeIdTwo] = useState();

  const findCountryCode = (IdOfCountry) => {
    let countryIndex = -1;
    if (IdOfCountry !== null) {
      countryIndex = _.findIndex(countryMenuOptions, {
        countryId: IdOfCountry,
      });
    }
    return countryIndex;
  };

  const findRefereeId = (refId) => {
    let refereeId = -1;
    if (refId !== null) {
      refereeId = _.findIndex(selectedRefereesData?.otpData, {
        refereeId: refId,
      });
    }
    return refereeId;
  };

  useEffect(() => {
    if (farmersDetailsData !== null) {
      setMobileNumber1(farmersDetailsData?.refereeOne?.mobile_no);
      setMobileNumber2(farmersDetailsData?.refereeTwo?.mobile_no);
      setCountryId1(farmersDetailsData?.refereeOne?.country_id);
      setCountryId2(farmersDetailsData?.refereeTwo?.country_id);
    }
    if (selectedRefereesData !== null) {
      const refIndex1 = findRefereeId(farmersDetailsData?.refereeOne?.id);
      setRefereeIdOne(refIndex1);
      setMobileOtpCount1(selectedRefereesData?.otpData[refIndex1]?.otpCount);
      const refIndex2 = findRefereeId(farmersDetailsData?.refereeTwo?.id);
      setRefereeIdTwo(refIndex2);
      setMobileOtpCount2(selectedRefereesData?.otpData[refIndex2]?.otpCount);
      setResendOtpLimit(selectedRefereesData?.resendOtpLimit);
    }
  }, [farmersDetailsData, selectedRefereesData]);

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      const tempCountryIndex1 = findCountryCode(countryId1);
      setCountryCode1(countryMenuOptions[tempCountryIndex1]?.countryCode);
      const tempCountryIndex2 = findCountryCode(countryId2);
      setCountryCode2(countryMenuOptions[tempCountryIndex2]?.countryCode);
    }
  }, [countryMenuOptions, countryId1, countryId2]);

  useEffect(() => {
    if (refereeResendData && mobileOtpCount) {
      if (refereeResendData === "one") {
        setMobileOtpCount1(mobileOtpCount);
      } else {
        setMobileOtpCount2(mobileOtpCount);
      }
    }
  }, [refereeResendData, mobileOtpCount]);

  useEffect(() => {
    if(mobileOtpCount1 === undefined){
      return;
    }
    if (mobileOtpCount1 < 0 || mobileOtpCount1 === resendOtpLimit) {
      setMobileOtpTimer1(15);
    } else {
      setMobileOtpTimer1(1);
    }
  }, [mobileOtpCount1]);

  useEffect(() => {
    if(mobileOtpCount2  === undefined){
      return;
    }
    if (mobileOtpCount2 < 0 || mobileOtpCount2 === resendOtpLimit) {
      setMobileOtpTimer2(15);
    } else {
      setMobileOtpTimer2(1);
    }
  }, [mobileOtpCount2]);

  const getMobileOtp1 = (e) => {
    setMobileOtp1({ ...mobileOtp1, [e.target.name]: e.target.value });
  };
  const mobileTimerComplete1 = (data) => {
    setMobileOtpTimer1(0);
  };
  const getMobileOtp2 = (e) => {
    setMobileOtp2({ ...mobileOtp2, [e.target.name]: e.target.value });
  };
  const mobileTimerComplete2 = (data) => {
    setMobileOtpTimer2(0);
  };
  const concatOtp = (data) => {
    if (!data) {
      return "";
    }
    return data.otpBox1 + data.otpBox2 + data.otpBox3 + data.otpBox4;
  };

  const isRefereeOtpValid = (type, otpData) => {
    if (!otpData) {
      if (type === "mobile1") {
        setMobileOtpError1(true);
      } else {
        setMobileOtpError2(true);
      }
      return false;
    }
    if (otpData && otpData.length === 4) {
      if (type === "mobile1") {
        setMobileOtpError1(false);
      } else {
        setMobileOtpError2(false);
      }
      return true;
    }
    if (type === "mobile1") {
      setMobileOtpError1(true);
    } else {
      setMobileOtpError2(true);
    }
    return false;
  };

  const refereeOtpVerificationHandler = () => {
    let data1 = {};
    let data2 = {};
    const mOTP1 = concatOtp(mobileOtp1);
    const isMobileOTPValid1 = isRefereeOtpValid("mobile1", mOTP1);
    const mOTP2 = concatOtp(mobileOtp2);
    const isMobileOTPValid2 = isRefereeOtpValid("mobile2", mOTP2);
    console.log("selectedRefereesData: ", selectedRefereesData);
    if (props.isMobile) {
      if (isMobileOTPValid1) {
        data1["otp"] = parseInt(mOTP1);
        data1["countryId"] = countryId1;
        data1["id"] = selectedRefereesData?.otpData[refereeIdOne]?.refereeId;
        data1["mobileNumber"] = mobileNumber1;
      } else {
        return;
      }
      if (isMobileOTPValid2) {
        data2["otp"] = parseInt(mOTP2);
        data2["countryId"] = countryId2;
        data2["id"] = selectedRefereesData?.otpData[refereeIdTwo]?.refereeId;
        data2["mobileNumber"] = mobileNumber2;
      } else {
        return;
      }
    }
    props.otpData(data1, data2);
  };

  const verifyRefereesHandler = () => {
    let data1 = {};
    let data2 = {};
    const mOTP1 = concatOtp(mobileOtp1);
    const isMobileOTPValid1 = isRefereeOtpValid("mobile1", mOTP1);
    const mOTP2 = concatOtp(mobileOtp2);
    const isMobileOTPValid2 = isRefereeOtpValid("mobile2", mOTP2);
    if (props.isMobile) {
      if (isMobileOTPValid1) {
        data1["otp"] = parseInt(mOTP1);
        data1["countryId"] = completeRefereeOtpDetails?.referees[0].countryId;
        data1["id"] = selectedRefereesData?.otpData[0]?.refereeId;
        data1["mobileNumber"] = completeRefereeOtpDetails?.referees[0].mobileNumber;
      } else {
        return;
      }
      if (isMobileOTPValid2) {
        data2["otp"] = parseInt(mOTP2);
        data2["countryId"] = completeRefereeOtpDetails?.referees[1].countryId;
        data2["id"] = selectedRefereesData?.otpData[1]?.refereeId;
        data2["mobileNumber"] = completeRefereeOtpDetails?.referees[1].mobileNumber;
      } else {
        return;
      }
    }
    props.otpData(data1, data2);
  }

  return (
    <>
      <Grid
        container
        columnSpacing={2}
        sx={{ ...commonStyles.maxWidth, ...commonStyles.marginTopRoot }}
      >
        <Grid item xs={12} sm={6}>
          <Box sx={styles.otpContainer}>
            <AjOtp
              subHeading="Referee 1 verification"
              isMobile={true}
              otpError={mobileOtpError1}
              type="SMS"
              data={`${countryCode1} ${mobileNumber1}`}
              countryId={countryId1}
              countryCode={countryCode1}
              mobile={mobileNumber1}
              changeNavigate={props.navigatePage}
              otpTimer={mobileOtpTimer1}
              otpCount={mobileOtpCount1}
              resendOtpLimit={resendOtpLimit}
              otpValue={getMobileOtp1}
              timerComplete={mobileTimerComplete1}
              setSendOtpState={props.setSendOtpState}
              sendOtpState={props.sendOtpState}
              setRefereeResendData={setRefereeResendData}
              refereeSequence="one"
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box sx={styles.otpContainer}>
            <AjOtp
              subHeading="Referee 2 verification"
              isMobile={true}
              otpError={mobileOtpError2}
              type="SMS"
              data={`${countryCode2} ${mobileNumber2}`}
              countryId={countryId2}
              countryCode={countryCode2}
              mobile={mobileNumber2}
              changeNavigate={props.navigatePage}
              otpTimer={mobileOtpTimer2}
              otpCount={mobileOtpCount2}
              resendOtpLimit={resendOtpLimit}
              otpValue={getMobileOtp2}
              timerComplete={mobileTimerComplete2}
              setSendOtpState={props.setSendOtpState}
              sendOtpState={props.sendOtpState}
              setRefereeResendData={setRefereeResendData}
              refereeSequence="two"
            />
          </Box>
        </Grid>
      </Grid>
      <Box sx={[commonStyles.verificationContainer, styles.otpContainer]}>
        {
          props.isSkipButtonHidden?
          <AjButton
            variant="contained"
            displayText="Proceed to KYC"
            styleData={styles.buttonStyle}
            onClick={refereeOtpVerificationHandler}
          />
        :
          <AjButton
            variant="contained"
            displayText="Verify Referees"
            styleData={styles.buttonStyle}
            onClick={verifyRefereesHandler}
          />
      }
      </Box>
    </>
  );
};

export default AjSelectRefereeOtpVerification;
