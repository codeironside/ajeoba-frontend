import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";

import AjButton from "../../../Components/AjButton";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjTypography from "../../../Components/AjTypography";

import { InputBase } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { superAdminSignInSchema } from "../../../validationSchema/superAdminSignIn";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { adminSignIn } from "../../../Redux/SuperAdmin/superAdminActions";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { commonStyles } from "../../../Style/CommonStyle";
import {
  DASHBOARD,
  SUPERADMINFORGOTPASSWORDGETOTP,
} from "../../../Routes/Routes";
import { logoRedirection } from "../../../Services/commonService/commonService";

function SuperAdminSignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = getUserData();

  useEffect(() => {
    if (userData) {
      navigate(DASHBOARD);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(superAdminSignInSchema),
    mode: "onChange",
  });

  const [passwordType, setPasswordType] = useState(true);

  const onSubmit = (data) => {
    const dataToSend = {
      userName: data.userId,
      password: encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
    };
    dispatch(adminSignIn(dataToSend, navigate));
  };

  const passwordToggle = () => {
    setPasswordType(!passwordType);
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
      <Grid xs={12} item sx={commonStyles.adminWhiteContainer}>
        <Box sx={[commonStyles.mainHeadingContainer, commonStyles.fullWidth]}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText="Admin sign In to Ajeoba Agro"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={commonStyles.formDetailsContainer}
          >
            <AjInputLabel
              required={true}
              styleData={{
                ...commonStyles.inputLabel,
              }}
              displayText={"User ID"}
            />
            <InputBase
              required
              placeholder="Enter your user ID"
              sx={commonStyles.inputStyle}
              {...register("userId")}
              error={errors.userId ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.userId?.message}
            />

            <AjInputLabel
              required={true}
              styleData={{
                ...commonStyles.inputLabel,
                ...commonStyles.marginTop20,
              }}
              displayText={"Password"}
            />
            <OutlinedInput
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
            <Box sx={commonStyles.alignRight}>
              <AjButton
                variant="text"
                displayText=" Forgot password?"
                onClick={() => navigate(SUPERADMINFORGOTPASSWORDGETOTP)}
              />
            </Box>
            <AjButton
              type="submit"
              variant="contained"
              displayText="Sign in"
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SuperAdminSignIn;
