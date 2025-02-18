import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { InputBase, Box } from "@mui/material";
import * as _ from "lodash";

import AjSearchDropDown from "../../../../../Components/AjSearchDropDown";
import AjButton from "../../../../../Components/AjButton";
import AjTypography from "../../../../../Components/AjTypography";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import {
  setCountryCode,
  setCountryId,
  getCountries,
} from "../../../../../Redux/common/Countries/getCountriesActions";
import {
  ADD_FARMER_OTP_VERIFICATION,
  FARMERS,
} from "../../../../../Routes/Routes";
import { farmersCommonStyles } from "../../FarmersStyles";
import { AddFarmerSchema } from "../../../../../validationSchema/addFarmerSchema";
import { sendOtp, verifyOtp } from "../../../../../Redux/common/otp/otpActions";
import AjAddFarmerContainer from "../../../../../Components/AjAddFarmerContainer/AjAddFarmerContainer";
import AjOtpVerification from "../../../../../Components/AjOtpVerification/AjOtpVerification";

const AddFarmerOtpVerification = () => {
  const [countryValue, setCountryValue] = useState(null);
  const [sendOtpState, setSendOtpState] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddFarmerSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const mobileNumber = useSelector((state) => state.otp.mobileNumber);
  const countryId = useSelector((state) => state.countries.countryId || "");
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      let countryIndex = -1;
      if (!countryId) {
        countryIndex = _.findIndex(countryMenuOptions, { countryCode: "+234" });
      } else {
        countryIndex = _.findIndex(countryMenuOptions, {
          countryId: countryId,
        });
      }
      dispatch(setCountryCode(countryMenuOptions[countryIndex].countryCode));
      dispatch(setCountryId(countryMenuOptions[countryIndex].countryId));
      setCountryValue(countryMenuOptions[countryIndex]);
    }
  }, [countryMenuOptions]);

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryCode(selectedCountry.countryCode));
    dispatch(setCountryId(selectedCountry.countryId));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setCountryValue(countryMenuOptions[countryIndex]);
  };

  const onSubmit = (data) => {
    const dataToSend = {
      mobileNumber: data.mobileNumber,
      countryId,
    };
    dispatch(sendOtp(dataToSend, navigate, setSendOtpState));
  };

  const verifyOtpData = (data) => {
    const dataToSend = {
      mobileNumber,
      countryId,
      mobileOTP: data.mobileOTP,
    };
    dispatch(verifyOtp(dataToSend, navigate));
  };
  return (
    <>
      <AjAddFarmerContainer
        changeNavigate={sendOtpState ? ADD_FARMER_OTP_VERIFICATION : FARMERS}
        activeStepNumber={0}
        setSendOtpState={setSendOtpState}
        sendOtpState={sendOtpState}
      >
        {!sendOtpState ? (
          <Box
            component="form"
            sx={[
              commonStyles.signupFormContainer,
              farmersCommonStyles.farmerSendOtp,
            ]}
          >
            <AjInputLabel
              required={false}
              styleData={commonStyles.inputLabel}
              displayText="Enter your phone number"
            />
            <Box sx={commonStyles.fullWidth}>
              <Box sx={commonStyles.flexFullWidth}>
                <AjSearchDropDown
                  id="combo-box-demo"
                  options={countryMenuOptions || []}
                  value={countryValue}
                  onChange={countryCodeChangeHandler}
                />
                <InputBase
                  fullWidth={true}
                  required
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter your phone number"
                  sx={[
                    commonStyles.inputStyle,
                    farmersCommonStyles.phoneNumberInput,
                  ]}
                  {...register("mobileNumber")}
                  error={errors.mobileNumber ? true : false}
                />
              </Box>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.mobileNumber?.message}
              />
            </Box>
            <AjButton
              variant="contained"
              styleData={farmersCommonStyles.nextBtnStyle}
              displayText=" Send OTP"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        ) : (
          <Box sx={commonStyles.verificationContainer}>
            <AjOtpVerification
              otpData={verifyOtpData}
              isMobile={true}
              navigatePage={ADD_FARMER_OTP_VERIFICATION}
              setSendOtpState={setSendOtpState}
              sendOtpState={sendOtpState}
            />
          </Box>
        )}
      </AjAddFarmerContainer>
    </>
  );
};

export default AddFarmerOtpVerification;
