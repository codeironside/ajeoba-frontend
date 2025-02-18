import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Grid,
  Box,
  IconButton,
  InputBase,
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjButton from "../../../../Components/AjButton";
import AjTypography from "../../../../Components/AjTypography";
import AjInputLabel from "../../../../Components/AjInputLabel";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../../Constant/AppConstant";
import { encrypt } from "../../../../Services/localStorageService";
import { adminManagementSchema } from "../../../../validationSchema/adminManagementSchema";
import { ADMIN_MANAGEMENT } from "../../../../Routes/Routes";
import {
  addAdminAction,
  editAdminAction,
  getAdminByIdAction,
} from "../../../../Redux/SuperAdmin/AdminManagement/adminManagementActions";
import { styles } from "./AdminFormStyles";
import { styles as masterManagementStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";
import { commonStyles } from "../../../../Style/CommonStyle";

import { Visibility, VisibilityOff } from "@mui/icons-material";

const AdminForm = () => {
  const [passwordType, setPasswordType] = useState(true);
  const [mode, setMode] = useState("add");
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const adminData = useSelector((state) => state.adminManagement.adminData);

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(adminManagementSchema),
    mode: "onChange",
  });

  const changeToggle = () => {
    setPasswordType(!passwordType);
  };
  const changeConfirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };
  const backArrowHandler = () => {
    navigate(ADMIN_MANAGEMENT);
  };
  const onSubmit = (data) => {
    let dataToEdit = {
      firstName: data.adminFirstName,
      lastName: data.adminLastName,
    };
    if (data.adminPassword) {
      dataToEdit = {
        ...dataToEdit,
        password: encrypt(data.adminPassword, PASSWORD_ENCRYPTION_SECRET),
      };
    }
    const dataToSend = {
      firstName: data.adminFirstName,
      lastName: data.adminLastName,
      password: encrypt(data.adminPassword, PASSWORD_ENCRYPTION_SECRET),
    };
    if (mode === "add") {
      dispatch(addAdminAction(dataToSend, navigate));
    } else {
      dispatch(editAdminAction(id, dataToEdit, navigate));
    }
  };

  useEffect(() => {
    if (window.location.pathname.includes("edit")) {
      setMode("edit");
      dispatch(getAdminByIdAction(id));
    }
  }, [id]);

  useEffect(() => {
    if (mode === "edit") {
      setValue("adminLastName", adminData.result.last_name, {
        shouldValidate: true,
      });
      setValue("adminFirstName", adminData.result.first_name, {
        shouldValidate: true,
      });
    }
  }, [adminData]);

  useEffect(() => {
    setValue("mode", mode, { shouldValidate: true });
  }, [mode]);

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
          ...masterManagementStyles.addItemStyles,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText={mode === "add" ? "Add Admin" : "Edit Admin"}
            styleData={{
              ...commonStyles.signupHeadingStyle,
              ...commonStyles.marginBottom0,
            }}
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.mobileScreenFormContainer,
            }}
          >
            {mode === "edit" && (
              <Box
                xs={12}
                sm={6}
                sx={{
                  ...commonStyles.signupFormFieldContainer,
                  ...commonStyles.fullWidth,
                }}
              >
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="User ID"
                />
                <InputBase
                  required
                  readOnly={true}
                  id="User ID"
                  name="User ID"
                  sx={{
                    ...commonStyles.inputStyle,
                    ...commonStyles.disableInput,
                  }}
                  value={adminData?.result?.user_name}
                />
              </Box>
            )}
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="First name"
              />
              <InputBase
                required
                id="adminFirstName"
                name="adminFirstName"
                placeholder="Enter your first name"
                sx={commonStyles.inputStyle}
                {...register("adminFirstName")}
                error={errors.adminFirstName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.adminFirstName?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Last name"
              />
              <InputBase
                required
                id="adminLastName"
                name="adminLastName"
                placeholder="Enter your last name"
                sx={commonStyles.inputStyle}
                {...register("adminLastName")}
                error={errors.adminLastName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.adminLastName?.message}
              />
            </Box>
            <Box
              xs={12}
              sm={6}
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                required={mode === "edit" ? false : true}
                styleData={commonStyles.inputLabel}
                displayText="Password"
              />
              <OutlinedInput
                id="adminPassword"
                name="adminPassword"
                placeholder="Enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={passwordType ? "password" : "text"}
                {...register("adminPassword")}
                error={errors.adminPassword ? true : false}
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
                displayText={errors.adminPassword?.message}
              />
              <Box
                sx={{
                  ...commonStyles.passwordCenterContent,
                  ...commonStyles.marginBottom160,
                }}
              >
                <Box sx={commonStyles.passwordcontent}>
                  The password should be between 8 and 20 characters and must
                  contain the following
                </Box>
                <Box sx={commonStyles.listItems}>
                  <ul>
                    <li>a uppercase alphabet letter (Eg: A,B,C,D)</li>
                    <li>a lowercase alphabet letter (Eg: a,b,c,d)</li>
                    <li>a number (Eg: 1,2,3,4)</li>
                    <li>a special character (Eg: @,#,!,*)</li>
                  </ul>
                </Box>
              </Box>
            </Box>
            <Box
              xs={12}
              sm={6}
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...commonStyles.fullWidth,
              }}
            >
              <AjInputLabel
                required={mode === "edit" ? false : true}
                styleData={commonStyles.inputLabel}
                displayText="Confirm Password"
              />
              <OutlinedInput
                id="adminConfirmPassword"
                name="adminConfirmPassword"
                placeholder="Re-enter your password"
                sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
                type={confirmPasswordType ? "password" : "text"}
                {...register("adminConfirmPassword")}
                error={errors.adminConfirmPassword ? true : false}
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
                displayText={errors.adminConfirmPassword?.message}
              />
            </Box>
            <Box sx={styles.btnBox}>
              <AjButton
                type="submit"
                variant="contained"
                displayText={mode === "add" ? "Add Admin" : "Edit"}
                onClick={handleSubmit(onSubmit)}
              />
            </Box>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AdminForm;
