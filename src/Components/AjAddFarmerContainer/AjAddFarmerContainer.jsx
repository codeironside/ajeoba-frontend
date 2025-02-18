import React from "react";
import { IconButton, Box, Grid } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTypography from "../AjTypography";
import AjStepper from "../AjStepper/AjStepper";
import {
  addFarmerOptions,
  completeKycVNINOptions,
} from "../../Constant/AppConstant";
import { commonStyles } from "../../Style/CommonStyle";
import { useNavigate } from "react-router-dom";
import { useBerforUnload } from "../../Services/useBeforUnload";
import { styles } from "./AjAddFarmerContainerStyles";
import { useDispatch } from "react-redux";

const AjAddFarmerContainer = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const backArrowHandler = () => {
    if (props.sendOtpState) {
      props.setSendOtpState(false);
    }
    if (props.resetAddFarmerDetails) {
      dispatch(props.resetAddFarmerDetails());
    }
    navigate("/farmers");
  };

  useBerforUnload(function (e) {
    e.preventDefault();
    e.returnValue = "";
  });

  return (
    <>
      <Grid container sx={commonStyles.signupFormMainGridContainer}>
        <Box sx={styles.addFarmerContainer}>
          <IconButton
            disableRipple
            sx={commonStyles.backButtonPosition}
            onClick={backArrowHandler}
          >
            {" "}
            <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
          </IconButton>
        </Box>
        <Grid
          container
          item
          sx={[
            commonStyles.signupFormMainContentContainer,
            commonStyles.customSrollBar,
          ]}
        >
          <Box
            sx={[
              commonStyles.signupContentContainer,
              styles.addFarmerContentContainer,
            ]}
          >
            <AjTypography
              displayText={
                props?.isCompleteKYCVNIN ? "Complete KYC" : "Add farmer"
              }
              styleData={commonStyles.signupHeadingStyle}
            />

            <AjStepper
              stepOptions={
                props?.isCompleteKYCVNIN
                  ? completeKycVNINOptions
                  : addFarmerOptions
              }
              activeStep={props.activeStepNumber}
              styleData={styles.stepperAlignment}
            />
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default AjAddFarmerContainer;
