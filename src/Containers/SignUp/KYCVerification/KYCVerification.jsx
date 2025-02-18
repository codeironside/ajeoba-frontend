import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";

import AjTypography from "../../../Components/AjTypography";
import AjStepper from "../../../Components/AjStepper/AjStepper";

import { IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../Components/AjButton";
import KYCStatus from "../../../Components/KYCStatus/KYCStatus";
import { signUpStepOptions } from "../../../Constant/AppConstant";
import { commonStyles } from "../../../Style/CommonStyle";
import { useNavigate } from "react-router-dom";
import { SIGNUPACCOUNTDETAILS } from "../../../Routes/Routes";
import { DASHBOARD } from "../../../Routes/Routes";
import call from "../../../API";
import {
  getUserData,
  getLoggedInFromAdmin,
} from "../../../Services/localStorageService";
import { getText } from "../../../Services/utils";
import {
  getCustomSignUpOption,
  getDefaultPath,
  logoRedirection,
  logout,
} from "../../../Services/commonService/commonService";
import { styles } from "../SignUpAccountDetails/SignUpAccountDetailsStyles";

const KYCVerification = () => {
  const navigate = useNavigate();
  const data = getUserData();
  const isLoggedInFromAdmin = getLoggedInFromAdmin();

  const arrowHandler = () => {
    navigate(SIGNUPACCOUNTDETAILS);
  };

  useEffect(() => {
    if (data.is_kyc_verified) {
      localStorage.setItem("isUserRegistered", "true");
      setTimeout(() => {
        if (isLoggedInFromAdmin) {
          navigate(
            getDefaultPath(
              data.role_id,
              data.status,
              data.subscription_expiry_date
            )
          );
        } else {
          logout();
        }
      }, 6000);
    }
  }, [data]);

  return (
    <>
      <Grid
        container
        sx={{
          ...commonStyles.signupFormMainGridContainer,
          ...commonStyles.mainContainerHeight,
        }}
      >
        <Grid
          item
          sx={{ ...commonStyles.logoImageContainer, ...styles.logoStyles }}
          onClick={() => logoRedirection()}
        ></Grid>
        <Grid
          container
          item
          sx={{
            ...commonStyles.signupFormMainContentContainer,
            ...commonStyles.subRegistrationContainer,
            ...commonStyles.customSrollBar,
          }}
        >
          {data.is_kyc_verified ? (
            ""
          ) : (
            <IconButton sx={commonStyles.backArrow} onClick={arrowHandler}>
              <ArrowBackRoundedIcon />
            </IconButton>
          )}
          <Box
            sx={{
              ...commonStyles.signupContentContainer,
              ...commonStyles.kycVerficationHeight,
            }}
          >
            <AjTypography
              align="center"
              displayText={`Registration process for ${getText(data.role_id)} `}
              styleData={commonStyles.signupHeadingStyle}
            />
            <AjStepper
              stepOptions={[
                signUpStepOptions[0],
                getCustomSignUpOption(data.role_id),
                signUpStepOptions[2],
              ]}
              activeStep={2}
            />
            <Box sx={{ minHeight: "18.75rem" }}>
              <KYCStatus kycStatus={data?.is_kyc_verified} />
            </Box>
            <AjButton
              onClick={() => navigate(DASHBOARD)}
              variant="contained"
              displayText="Proceed to Dashboard"
              isDisable={false}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default KYCVerification;
