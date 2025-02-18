import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import AjButton from "../../../Components/AjButton";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjTypography from "../../../Components/AjTypography";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { changePassword } from "../../../Redux/Profile/profileActions";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { commonStyles } from "../../../Style/CommonStyle";
import { styles } from "./changePasswordStyles";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from "../../../validationSchema/changePassword";
import { ROLES } from "../../../Constant/RoleConstant";

function ChangePassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(changePasswordSchema),
    mode: "onChange",
  });

  const [oldPasswordType, setOldPasswordType] = useState(true);
  const [newPasswordType, setNewPasswordType] = useState(true);
  const [confirmNewPasswordType, setConfirmNewPasswordType] = useState(true);
  const [roleType, setRoleType] = useState(null);

  const changeOldPasswordToggle = () => {
    setOldPasswordType(!oldPasswordType);
  };

  const changeNewPasswordToggle = () => {
    setNewPasswordType(!newPasswordType);
  };

  const changeConfirmNewPasswordToggle = () => {
    setConfirmNewPasswordType(!confirmNewPasswordType);
  };

  const onSubmit = (data) => {
    const dataToSend = {
      oldPassword: encrypt(data.oldPassword, PASSWORD_ENCRYPTION_SECRET),
      newPassword: encrypt(data.newPassword, PASSWORD_ENCRYPTION_SECRET),
    };
    dispatch(changePassword(dataToSend, navigate));
  };

  useEffect(() => {
    const userData = getUserData();
    if (
      userData.role_id === ROLES.SUPER_ADMIN ||
      userData.role_id === ROLES.ADMIN
    ) {
      setRoleType("management");
    }
    setValue("roleType", roleType, { shouldValidate: true });
  }, [roleType]);

  return (
    <Grid xs={12} sm={7} item sx={commonStyles.rightGrid}>
      <Box sx={commonStyles.mainHeadingContainer}>
        <AjTypography
          styleData={{ ...commonStyles.mainHeading, ...styles.mainHeading }}
          displayText="Change Password"
        />
        <Box
          component="form"
          xs={12}
          sm={6}
          sx={[commonStyles.formDetailsContainer, styles.formDetailsContainer]}
        >
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Old Password"
          />
          <OutlinedInput
            id="oldPassword"
            name="oldPassword"
            sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
            type={oldPasswordType ? "password" : "text"}
            {...register("oldPassword")}
            error={errors.oldPassword ? true : false}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={changeOldPasswordToggle}
                  edge="end"
                >
                  {oldPasswordType ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter old password"
          />
          <AjTypography
            styleData={{ ...commonStyles.errorText, ...styles.errorText }}
            displayText={errors.oldPassword?.message}
          />

          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="New Password"
          />
          <OutlinedInput
            id="newPassword"
            name="newPassword"
            sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
            type={newPasswordType ? "password" : "text"}
            {...register("newPassword")}
            error={errors.newPassword ? true : false}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={changeNewPasswordToggle}
                  edge="end"
                >
                  {newPasswordType ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Enter new password"
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.newPassword?.message}
          />
          <Box
            sx={{
              ...commonStyles.passwordCenterContent,
              ...styles.passwordCenterContent,
              ...(roleType === "management" && commonStyles.marginBottom160),
            }}
          >
            <Box sx={commonStyles.passwordcontent}>
              The password should be between 8 and 20 characters and must
              contain the following
            </Box>
            <Box sx={commonStyles.listItems}>
              {roleType === "management" ? (
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
            displayText="Confirm New Password"
          />
          <OutlinedInput
            id="confirmNewPassword"
            name="confirmNewPassword"
            sx={[commonStyles.inputStyle, commonStyles.passwordInput]}
            type={confirmNewPasswordType ? "password" : "text"}
            {...register("confirmNewPassword")}
            error={errors.confirmNewPassword ? true : false}
            endAdornment={
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={changeConfirmNewPasswordToggle}
                  edge="end"
                >
                  {confirmNewPasswordType ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            placeholder="Re-eneter new password"
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.confirmNewPassword?.message}
          />
          <AjButton
            type="submit"
            variant="contained"
            displayText="Change password"
            onClick={handleSubmit(onSubmit)}
            styleData={styles.buttonStyle}
          />
        </Box>
      </Box>
    </Grid>
  );
}
export default ChangePassword;
