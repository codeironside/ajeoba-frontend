import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { postPassword } from "../../../Redux/SetupPassword/setupPasswordActions";
import { SIGNUPOTP } from "../../../Routes/Routes";
import { encrypt } from "../../../Services/localStorageService";
import { styles } from "./SetupPasswordStyle";
import { commonStyles } from "../../../Style/CommonStyle";

import AjSetupPassword from "../../../Components/AjSetupPassword/AjSetupPassword";
import { logoRedirection } from "../../../Services/commonService/commonService";

function SetupPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const tempUserId = useSelector((state) => state.otp.tempUserId);
  
  useEffect(() => {
    if (!tempUserId) {
      navigate(SIGNUPOTP);
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(
      postPassword(
        tempUserId,
        encrypt(data.password, PASSWORD_ENCRYPTION_SECRET),
        navigate
      )
    );
  };

  return (
    <Grid container sx={commonStyles.mainGridContainer}>
      <CssBaseline />
      <Grid xs={12} sm={5} item sx={[commonStyles.leftGrid, styles.leftGridBG]}>
        <Grid
          item
          sx={commonStyles.logoImageContainer}
          onClick={() => logoRedirection()}
        ></Grid>
      </Grid>
      <Grid xs={12} sm={7} item sx={commonStyles.rightGrid}>
        <AjSetupPassword getPasswordData={onSubmit} />
      </Grid>
    </Grid>
  );
}

export default SetupPassword;
