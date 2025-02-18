import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Grid, Box, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTypography from "../../../../Components/AjTypography";
import AjStepper from "../../../../Components/AjStepper/AjStepper";
import KYCStatus from "../../../../Components/KYCStatus/KYCStatus";
import { signUpStepOptions } from "../../../../Constant/AppConstant";
import { ADD_REFEREES, REFEREES } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./FarmerKYCVerificationStyles";

const FarmerKYCVerification = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(`${REFEREES}/${ADD_REFEREES}`);
  };

  const verified = useSelector((state) => state.referee.isKycVerified);

  useEffect(() => {
    if (verified) {
      setTimeout(() => {
        localStorage.removeItem("addReferee");
        navigate(REFEREES);
      }, 3000);
    }
  }, [verified]);

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        {!verified ? (
          <IconButton
            disableRipple
            sx={commonStyles.backButtonPosition}
            onClick={backArrowHandler}
          >
            {" "}
            <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
          </IconButton>
        ) : (
          ""
        )}
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box
          sx={{
            ...commonStyles.signupContentContainer,
            ...commonStyles.kycVerficationHeight,
            ...styles.kycVerficationResponsiveHeight,
          }}
        >
          <AjTypography
            displayText="KYC Verification"
            styleData={commonStyles.signupHeadingStyle}
          />
          <Box sx={{ width: "100%" }}>
            <AjStepper
              stepOptions={[signUpStepOptions[0], signUpStepOptions[2]]}
              activeStep={1}
            />
          </Box>
          <Box sx={{ minHeight: "18.75rem" }}>
            <KYCStatus kycStatus={verified} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default FarmerKYCVerification;
