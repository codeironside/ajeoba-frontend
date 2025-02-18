import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import * as _ from "lodash";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AjButton from "../../Components/AjButton";
import AjInputLabel from "../../Components/AjInputLabel";
import AjRadioButtonsGroup from "../../Components/AjRadioButtonsGroup";
import AjSearchDropDown from "../../Components/AjSearchDropDown";
import AjTypography from "../../Components/AjTypography";
import { InputBase } from "@mui/material";
import { loginSchema } from "../../validationSchema/login";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { PASSWORD_ENCRYPTION_SECRET } from "../../Constant/AppConstant";
import { signInWithPassword } from "../../Redux/SignIn/signInPasswordActions";
import {
  getCountries,
  setCountryCode,
  setCountryId,
} from "../../Redux/common/Countries/getCountriesActions";
import {
  USERROLESELECTIONFIRST,
  FORGOTPASSWORD,
  DASHBOARD,
  KYCVERIFICATION,
} from "../../Routes/Routes";
import { encrypt, getUserData } from "../../Services/localStorageService";
import { styles } from "./LogInStyle";
import { commonStyles } from "../../Style/CommonStyle";
import { logoRedirection } from "../../Services/commonService/commonService";

function LogIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = getUserData();

  useEffect(() => {
    if (userData?.is_kyc_verified) {
      navigate(DASHBOARD);
    }
    // if (!userData?.is_kyc_verified) {
    //   navigate(KYCVERIFICATION);
    // }
    if (localStorage.getItem("unregistered")) {
      localStorage.removeItem("unregistered");
    }
  }, []);

  const radioItems = [
    {
      label: "E-mail Id",
      value: "email",
    },
    {
      label: "Phone number",
      value: "phone",
    },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const [option, setOption] = useState("email");
  const [passwordType, setPasswordType] = useState(true);
  const [countryValue, setCountryValue] = useState(null);
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const countryId = useSelector((state) => state.countries.countryId || "");

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const tradingActiveAdsData = useSelector(
    (state) => state.tradingActiveAds.tradingActiveAdsData
  );

  useEffect(() => {
    setValue("option", option);
  }, [option]);

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

  const selectHandler = (optionVal) => {
    setOption(optionVal);
  };

  const onSubmit = (data) => {
    dispatch(
      signInWithPassword(
        data.email,
        data.mobile,
        countryId,
        encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
        navigate
      )
    );
  };

  const passwordToggle = () => {
    setPasswordType(!passwordType);
  };

  const signUp = () => {
    navigate(USERROLESELECTIONFIRST);
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid xs={12} sm={5} item sx={[commonStyles.leftGrid, styles.leftBG]}>
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
            displayText="Sign In to Ajeoba Agro"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainer}
          >
            <AjRadioButtonsGroup
              items={radioItems}
              value={option}
              onSelect={selectHandler}
            />
            {option === "email" ? (
              <>
                <InputBase
                  required
                  placeholder="Enter your Email"
                  id="email"
                  name="email"
                  sx={commonStyles.inputStyle}
                  {...register("email")}
                  error={errors.email ? true : false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.email?.message}
                />
              </>
            ) : (
              <Box sx={commonStyles.fullWidth}>
                <Box sx={commonStyles.flexFullWidth}>
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
                    sx={[
                      commonStyles.inputStyle,
                      commonStyles.phoneNumberInput,
                    ]}
                    {...register("mobile")}
                    error={errors.mobile ? true : false}
                    placeholder="Enter your Phone number"
                  />
                </Box>
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.mobile?.message}
                />
              </Box>
            )}
            <AjInputLabel
              required={true}
              styleData={{
                ...commonStyles.inputLabel,
                ...styles.passwordLabel,
              }}
              displayText={"Password"}
            />
            <OutlinedInput
              id="password"
              name="password"
              placeholder="Enter your password"
              sx={commonStyles.inputStyle}
              type={passwordType ? "password" : "text"}
              {...register("password")}
              error={errors.password ? true : false}
              endAdornment={
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={passwordToggle}
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
            <Box sx={styles.forgotWrapper}>
              <AjButton
                variant="text"
                displayText=" Forgot password?"
                onClick={() => navigate(FORGOTPASSWORD)}
              />
            </Box>
            <AjButton
              type="submit"
              variant="contained"
              displayText="Sign in"
              onClick={handleSubmit(onSubmit)}
            />

            <Box sx={styles.existingAccountTextContainer}>
              <AjInputLabel
                styleData={styles.existingAccountText}
                displayText="Don't have an account?"
              />
              <AjButton variant="text" displayText="Sign up" onClick={signUp} />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default LogIn;
