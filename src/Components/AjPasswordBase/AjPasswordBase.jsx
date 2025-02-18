import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, IconButton, InputAdornment, OutlinedInput } from "@mui/material";

import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import { PASSWORD_REGEX } from "../../Constant/AppConstant";

import { commonStyles } from "../../Style/CommonStyle";

const passwordBaseSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .matches(PASSWORD_REGEX, "Password is invalid"),

  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Confirm Password does not match"),
});

const AjPasswordBase = (props) => {
  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(passwordBaseSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValues();
  }, []);

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const setValues = () => {
    if (props.defaultPassword) {
      setValue("password", props.defaultPassword, {
        shouldValidate: true,
      });
    }
    if (props.defaultConfirmPassword) {
      setValue("confirmPassword", props.defaultConfirmPassword, {
        shouldValidate: true,
      });
    }
  };

  const onSubmit = (data) => {
    props.data(data);
  };

  const onError = (_err) => {
    props.data(null);
  };

  const changeToggle = () => {
    setPasswordType(!passwordType);
  };

  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  return (
    <>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fullWidth,
          ...props.customStyle,
        }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Password"
        />
        <OutlinedInput
          placeholder="Enter your password"
          sx={{
            ...commonStyles.inputStyle,
            ...commonStyles.passwordInput,
          }}
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
        <Box sx={commonStyles.passwordCenterContent}>
          <Box sx={commonStyles.passwordcontent}>
            The password should be between 8 and 20 characters and must contain
            the following
          </Box>
          <ul>
            <li>an alphabet letter (Eg: a,B,c,D)</li>
            <li>a number (Eg: 1,2,3,4)</li>
          </ul>
        </Box>
      </Box>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fullWidth,
          ...props.customStyle,
        }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Confirm Password"
        />
        <OutlinedInput
          placeholder="Re-enter your password"
          sx={{
            ...commonStyles.inputStyle,
            ...commonStyles.passwordInput,
          }}
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
    </>
  );
};

export default AjPasswordBase;
