import { useNavigate } from "react-router-dom";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import * as _ from "lodash";
import * as React from "react";
import { styles } from "./forgotPasswordGetOtpStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useState, useEffect } from "react";
import AjSearchDropDown from "../../../Components/AjSearchDropDown";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { commonStyles } from "../../../Style/CommonStyle";
import { forgotOtpSchema } from "../../../validationSchema/forgotOtp";
import { InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  forgotPassword,
  setOption,
} from "../../../Redux/common/otp/otpActions";
import {
  setCountryCode,
  setCountryId,
  getCountries,
} from "../../../Redux/common/Countries/getCountriesActions";
import AjRadioButtonsGroup from "../../../Components/AjRadioButtonsGroup";
import { logoRedirection } from "../../../Services/commonService/commonService";

const ForgotPasswordGetOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    resolver: yupResolver(forgotOtpSchema),
    mode: "onChange",
  });

  const email = useSelector((state) => state.otp.email || null);
  const mobileNumber = useSelector((state) => state.otp.mobileNumber || null);
  const option = useSelector((state) => state.otp.option || "email");
  const countryId = useSelector((state) => state.countries.countryId || "");
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const [countryValue, setCountryValue] = useState(null);

  useEffect(() => {
    dispatch(getCountries());
  }, []);

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

  const onSubmit = (data) => {
    let dataToSend;
    if (option === "email") {
      dataToSend = {
        email: data.email,
      };
    } else {
      dataToSend = {
        mobileNumber: data.mobile,
        countryId,
      };
    }
    dispatch(forgotPassword(dataToSend, option, navigate));
  };

  const selectHandler = (optionVal) => {
    dispatch(setOption(optionVal));
  };

  const arrowHandler = () => {
    navigate("/signin");
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
      <Grid
        xs={12}
        sm={7}
        item
        sx={[
          commonStyles.rightGrid,
          commonStyles.relativePosition,
          commonStyles.height60,
        ]}
      >
        <IconButton sx={commonStyles.backArrow} onClick={arrowHandler}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={commonStyles.mainHeadingContainer}>
          <AjTypography
            color="#006D33"
            styleData={commonStyles.mainHeading}
            displayText="Forgot password"
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
                  defaultValue={email}
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
                    defaultValue={mobileNumber}
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
            <AjButton
              type="submit"
              variant="contained"
              displayText="Send OTP"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ForgotPasswordGetOtp;
