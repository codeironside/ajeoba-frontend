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
import AjSearchInput from "../../../Components/AjSearchInput";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { commonStyles } from "../../../Style/CommonStyle";
import { InputBase } from "@mui/material";
import { getSignupOtpBuyer } from "../../../Redux/common/otp/otpActions";
import { getAllCountriesSignUpBuyerActions } from "../../../Redux/common/Countries/getCountriesActions";
import * as _ from "lodash";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { encrypt } from "../../../Services/localStorageService";
import { SignupSchema } from "../../../validationSchema/signupOtp";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { logoRedirection } from "../../../Services/commonService/commonService";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const SignUpLandingPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SignupSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getAllCountriesSignUpBuyerActions());
  }, []);

  const allCountries = useSelector(
    (state) => state.countries.allCountries || null
  );
  const tempUserId = useSelector((state) => state.otp.tempUserId);

  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const changeToggle = () => {
    setPasswordType(!passwordType);
  };

  const [country, setCountry] = useState(null);
  const [countryId, setCountryId] = useState(null);
  const [countryOptions, setCountryOptions] = useState(null);

  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [passwordType, setPasswordType] = useState(true);

  useEffect(() => {
    let options = allCountries?.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setCountryOptions(options);
  }, [allCountries]);

  const handleCountryChange = (_event, selectedCountry) => {
    setCountry(selectedCountry);
    setCountryId(selectedCountry.value);
  };

  const onSubmit = (data) => {
    const dataToSend = {
      name: data.buyerName,
      password: encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
      email: data.buyerEmail,
      address1: data.address1,
      address2: data.address2,
      countryId,
    };
    if (tempUserId) {
      data["tempUserId"] = tempUserId;
    }
    dispatch(getSignupOtpBuyer(dataToSend, navigate));
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
      <Grid xs={12} sm={7} item sx={commonStyles.rightGridBuyer}>
        <Box sx={commonStyles.mainHeadingContainer}>
          <AjTypography
            styleData={commonStyles.mainHeadingBuyer}
            displayText="Sign up to Ajeoba Agro"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainerlandingPage}
          >
            <Box sx={commonStyles.inputFiedsBuyername}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Enter Name"
              />
              <InputBase
                required
                id="buyerName"
                name="buyerName"
                sx={commonStyles.inputStyleSignupLandingPage}
                {...register("buyerName")}
                error={errors.buyerName ? true : false}
                placeholder="Full Name"
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.buyerName?.message}
              />
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainerlandingPage}
          >
            <Box sx={commonStyles.inputFiedsBuyer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Enter your E-mail id"
              />
              <InputBase
                required
                id="buyerEmail"
                name="buyerEmail"
                defaultValue=""
                sx={commonStyles.inputStyleSignupLandingPage}
                {...register("buyerEmail")}
                error={errors.buyerEmail ? true : false}
                placeholder="Enter email"
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.buyerEmail?.message}
              />
            </Box>
            <Box sx={commonStyles.inputFiedsBuyer}>
              <Box sx={commonStyles.fieldMarginBuyer}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Enter Country"
                />
                <AjSearchInput
                  displayText="Type to search"
                  id="country"
                  name="country"
                  source="label"
                  value={country}
                  onChange={handleCountryChange}
                  options={countryOptions ? countryOptions : []}
                  styleData={{
                    ...commonStyles.searchDropdownInput,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainerlandingPage}
          >
            <Box sx={commonStyles.inputFiedsBuyer}>
              <AjInputLabel
                required={false}
                styleData={commonStyles.inputLabel}
                displayText="Password"
              />
              <OutlinedInput
                id="password"
                name="password"
                placeholder="Enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={passwordType ? "password" : "text"}
                {...register("password")}
                error={errors.password ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changeToggle}
                      edge="end"
                    >
                      {passwordType ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.password?.message}
              />
            </Box>

            <Box sx={commonStyles.inputFiedsBuyer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Confirm Password"
              />
              <OutlinedInput
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Re-enter your password"
                sx={[
                  commonStyles.inputStyleSignupLandingPage,
                  commonStyles.passwordInput,
                ]}
                type={confirmPasswordType ? "password" : "text"}
                {...register("confirmPassword")}
                error={errors.confirmPassword ? true : false}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={changeConfirmPasswordToggle}
                      edge="end"
                    >
                      {confirmPasswordType ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.confirmPassword?.message}
              />
            </Box>
          </Box>
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainerlandingPage}
          >
            <Box sx={commonStyles.inputFiedsBuyer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Address line 1"
              />
              <InputBase
                required
                id="addressLine1"
                name="addressLine1"
                placeholder="Enter address line 1 "
                {...register("address1")}
                sx={{
                  ...commonStyles.inputStyleSignupLandingPage,
                }}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.address1?.message}
              />
            </Box>
            <Box sx={commonStyles.inputFiedsBuyer}>
              <AjInputLabel
                required={false}
                styleData={commonStyles.inputLabel}
                displayText="Address line 2"
              />
              <InputBase
                // readOnly={props.isDisable}
                id="addressLine2"
                name="addressLine2"
                placeholder="Enter address line 2 "
                {...register("address2")}
                sx={{
                  ...commonStyles.inputStyleSignupLandingPage,
                }}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.address2?.message}
              />
            </Box>
          </Box>
        </Box>

        <AjButton
          variant="contained"
          displayText="Send OTP"
          onClick={handleSubmit(onSubmit)}
          styleData={styles.signupButtonBuyer}
        />

        <Box sx={styles.existingAccountTextContainerBuyer}>
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
      </Grid>
    </Grid>
  );
};

export default SignUpLandingPage;
