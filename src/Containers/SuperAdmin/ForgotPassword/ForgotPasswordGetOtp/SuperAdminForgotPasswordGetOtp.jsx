import { useNavigate } from "react-router-dom";
import AjButton from "../../../../Components/AjButton";
import AjTypography from "../../../../Components/AjTypography";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AjInputLabel from "../../../../Components/AjInputLabel";
import { useState, useEffect } from "react";
import AjSearchDropDown from "../../../../Components/AjSearchDropDown";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, IconButton, InputBase } from "@mui/material";
import { commonStyles } from "../../../../Style/CommonStyle";
import { forgotPassword } from "../../../../Redux/common/otp/otpActions";
import {
  setCountryCode,
  setCountryId,
  getCountries,
} from "../../../../Redux/common/Countries/getCountriesActions";
import * as _ from "lodash";
import { SignupOtpSchema } from "../../../../validationSchema/signupOtp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { SUPERADMINSIGNIN } from "../../../../Routes/Routes";
import { logoRedirection } from "../../../../Services/commonService/commonService";

function SuperAdminForgotPasswordGetOtp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupOtpSchema),
    mode: "onChange",
  });

  const [countryValue, setCountryValue] = useState(null);
  const phone = useSelector((state) => state.otp.mobileNumber || "");
  const email = useSelector((state) => state.otp.email || "");
  const countryId = useSelector((state) => state.countries.countryId || "");
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  useEffect(() => {
    dispatch(getCountries());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryId(selectedCountry.countryId));
    dispatch(setCountryCode(selectedCountry.countryCode));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setCountryValue(countryMenuOptions[countryIndex]);
  };

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
      dispatch(setCountryId(countryMenuOptions[countryIndex].countryId));
      dispatch(setCountryCode(countryMenuOptions[countryIndex].countryCode));
      setCountryValue(countryMenuOptions[countryIndex]);
    }
  }, [countryMenuOptions]);

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
      dispatch(setCountryId(countryMenuOptions[countryIndex].countryId));
      dispatch(setCountryCode(countryMenuOptions[countryIndex].countryCode));
      setCountryValue(countryMenuOptions[countryIndex]);
    }
  }, [countryMenuOptions]);

  const onSubmit = (data) => {
    const dataToSend = {
      email: data.email,
      countryId: countryId,
      mobileNumber: data.mobile,
    };
    dispatch(forgotPassword(dataToSend, "both", navigate));
  };

  const arrowHandler = () => {
    navigate(SUPERADMINSIGNIN);
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
      <Grid
        xs={12}
        item
        sx={[commonStyles.adminWhiteContainer, commonStyles.relativePosition]}
      >
        <IconButton sx={commonStyles.backArrow} onClick={arrowHandler}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={[commonStyles.mainHeadingContainer, commonStyles.fullWidth]}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText="Super admin forgot password"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainer}
          >
            <AjInputLabel
              styleData={commonStyles.inputLabel}
              required={true}
              displayText="Enter your E-mail id"
            />
            <InputBase
              required
              sx={commonStyles.inputStyle}
              defaultValue={email}
              {...register("email")}
              error={errors.email ? true : false}
              placeholder="Enter email"
            />
            <AjTypography
              displayText={errors.email?.message}
              styleData={commonStyles.errorText}
            />

            <Box sx={commonStyles.fieldMargin}>
              <AjInputLabel
                styleData={commonStyles.inputLabel}
                required={true}
                displayText="Enter your phone number"
              />
              <Box sx={commonStyles.adminPhoneNumberContainer}>
                <AjSearchDropDown
                  value={countryValue}
                  options={countryMenuOptions || []}
                  onChange={countryCodeChangeHandler}
                  id="combo-box-demo"
                />
                <InputBase
                  required
                  sx={[commonStyles.inputStyle, commonStyles.phoneNumberInput]}
                  defaultValue={phone}
                  {...register("mobile")}
                  placeholder="Enter phone number"
                  error={errors.mobile ? true : false}
                />
              </Box>
              <AjTypography
                displayText={errors.mobile?.message}
                styleData={commonStyles.errorText}
              />
            </Box>

            <AjButton
              variant="contained"
              onClick={handleSubmit(onSubmit)}
              displayText="Send OTP"
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SuperAdminForgotPasswordGetOtp;
