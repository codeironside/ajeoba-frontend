import { SIGNIN } from "../../../Routes/Routes";
import { useNavigate } from "react-router-dom";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import * as React from "react";
import { styles } from "../SignUpOtp/SignUpOtpStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AjInputLabel from "../../../Components/AjInputLabel";
import { useState, useEffect } from "react";
import AjSearchDropDown from "../../../Components/AjSearchDropDown";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { commonStyles } from "../../../Style/CommonStyle";
import { InputBase } from "@mui/material";
import { getSignupOtpInputSupply } from "../../../Redux/common/otp/otpActions";
import {
  setCountryCode,
  setCountryId,
  getCountries,
} from "../../../Redux/common/Countries/getCountriesActions";
import * as _ from "lodash";
import { SignupOtpSchema } from "../../../validationSchema/signupOtp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logoRedirection } from "../../../Services/commonService/commonService";

function SignUpOtpInputSupplier() {
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
  const email = useSelector((state) => state.otp.email || "");
  const phone = useSelector((state) => state.otp.mobileNumber || "");
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const countryId = useSelector((state) => state.countries.countryId || "");
  const tempUserId = useSelector((state) => state.otp.tempUserId || "");

  useEffect(() => {
    dispatch(getCountries());
  }, []);

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
      email: data.email,
      mobileNumber: data.mobile,
      countryId,
    };
    if (tempUserId) {
      data["tempUserId"] = tempUserId;
    }
    dispatch(getSignupOtpInputSupply(dataToSend, navigate));
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid
        xs={12}
        sm={5}
        item
        sx={[commonStyles.leftGrid, styles.signUpOtpBg]}
      >
        <Grid
          item
          sx={commonStyles.logoImageContainer}
          onClick={() => logoRedirection()}
        ></Grid>
      </Grid>
      <Grid xs={12} sm={7} item sx={commonStyles.rightGrid}>
        <Box sx={commonStyles.mainHeadingContainer}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText="Sign up to Ajeoba Agro"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainer}
          >
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Enter your E-mail id"
            />
            <InputBase
              required
              id="email"
              name="email"
              defaultValue={email}
              sx={commonStyles.inputStyle}
              {...register("email")}
              error={errors.email ? true : false}
              placeholder="Enter email"
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.email?.message}
            />

            <Box sx={commonStyles.fieldMargin}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Enter your phone number"
              />
              <Box sx={styles.phoneNumberContainer}>
                <AjSearchDropDown
                  id="combo-box-demo"
                  options={countryMenuOptions || []}
                  value={countryValue}
                  onChange={countryCodeChangeHandler}
                />
                <InputBase
                  required
                  id="mobile"
                  name="mobile"
                  defaultValue={phone}
                  sx={[commonStyles.inputStyle, commonStyles.phoneNumberInput]}
                  {...register("mobile")}
                  error={errors.mobile ? true : false}
                  placeholder="Enter phone number"
                />
              </Box>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.mobile?.message}
              />
            </Box>

            <AjButton
              variant="contained"
              displayText="Send OTP"
              onClick={handleSubmit(onSubmit)}
            />

            <Box sx={styles.existingAccountTextContainer}>
              <AjInputLabel
                styleData={styles.existingAccountText}
                displayText="Already have an account?"
              />
              <AjButton
                variant="text"
                displayText="Sign In"
                onClick={() => {
                  if (localStorage.getItem("unregistered") !== null) {
                    localStorage.removeItem("unregistered");
                  }
                  navigate(SIGNIN);
                }}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUpOtpInputSupplier;
