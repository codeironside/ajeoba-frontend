import Box from "@mui/material/Box";

import * as React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import AjButton from "../AjButton";
import AjInputLabel from "../AjInputLabel";
import AjTypography from "../AjTypography";
import { setupPasswordSchema } from "../../validationSchema/setupPassword";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { commonStyles } from "../../Style/CommonStyle";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function AjSetupPassword(props) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(setupPasswordSchema),
    mode: "onChange",
  });

  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [passwordType, setPasswordType] = useState(true);

  const option = useSelector((state) => state.otp.option);
  const changeToggle = () => {
    setPasswordType(!passwordType);
  };
  const onSubmit = (data) => {
    props.getPasswordData(data);
  };

  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };
  useEffect(() => {
    setValue("option", option, { shouldValidate: true });
  }, [option]);

  return (
    <Box sx={commonStyles.mainHeadingContainer}>
      <AjTypography
        styleData={commonStyles.mainHeading}
        displayText={props.heading || "Set-up your password"}
      />
      <Box
        component="form"
        xs={12}
        sm={6}
        sx={commonStyles.formDetailsContainer}
      >
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
        <Box
          sx={
            option === "both"
              ? [
                  commonStyles.passwordCenterContent,
                  commonStyles.marginBottom160,
                ]
              : commonStyles.passwordCenterContent
          }
        >
          <Box sx={commonStyles.passwordcontent}>
            The password should be between 8 and 20 characters and must contain
            the following
          </Box>
          <Box sx={commonStyles.listItems}>
            {option === "both" ? (
              <ul>
                <li>a uppercase alphabet letter (Eg: A,B,C,D)</li>
                <li>a lowercase alphabet letter (Eg: a,b,c,d)</li>
                <li>a number (Eg: 1,2,3,4)</li>
                <li>a special character (Eg: @,#,!,*)</li>
              </ul>
            ) : (
              <ul>
                <li>an alphabet letter (Eg: a,B,c,D)</li>
                <li>a number (Eg: 1,2,3,4)</li>
              </ul>
            )}
          </Box>
        </Box>
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Confirm Password"
        />
        <OutlinedInput
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Re-enter your password"
          sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
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
        <AjButton
          type="submit"
          variant="contained"
          displayText="Done"
          onClick={handleSubmit(onSubmit)}
        />
      </Box>
    </Box>
  );
}

export default AjSetupPassword;
