import { Box, Grid, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AjSignUpAssociationFarmingDetails from "../../../Components/AjSignUpAssociationFarmingDetails";
import AjSignupAggregatorDetails from "../../../Components/AjSignupAggregatorDetails/AjSignupAggregatorDetails";
import AjStepper from "../../../Components/AjStepper/AjStepper";
import AjTypography from "../../../Components/AjTypography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { styles } from "./SignUpAccountDetailsStyles";
import { commonStyles } from "../../../Style/CommonStyle";
import { SIGNUPPERSONALDETAILS } from "../../../Routes/Routes";
import { getText } from "../../../Services/utils";
import { signUpStepOptions } from "../../../Constant/AppConstant";
import { getUserData } from "../../../Services/localStorageService";
import AjSignupQACompanyDetails from "../../../Components/AjSignupQACompanyDetails";
import AjSignUpCorporateBuyer from "../../../Components/AjSignUpCorporateBuyer/AjSignUpCorporateBuyer";
import {
  getCustomSignUpOption,
  logoRedirection,
} from "../../../Services/commonService/commonService";
import { ROLES } from "../../../Constant/RoleConstant";
import AjSignUpLogisticsCompany from "../../../Components/AjSignupLogisticsCompany/AjSignUpLogisticsCompany";
import AjSignupSingleBuyerDetails from "../../../Components/AjSignupSingleBuyerDetails/AjSignupSingleBuyerDetails";
import AjSignupSingleSellerDetails from "../../../Components/AjSignupSIngleSellerDetails/AjSignupSingleSellerDetails";

function SignUpAccountDetails() {
  const [roleId, setRoleId] = useState();
  const navigate = useNavigate();

  const arrowHandler = () => {
    navigate(SIGNUPPERSONALDETAILS);
  };

  useEffect(() => {
    const userData = getUserData();
    setRoleId(userData.role_id);
  }, [roleId]);

  return (
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
        <IconButton sx={commonStyles.backArrow} onClick={arrowHandler}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            styleData={styles.title}
            align="center"
            displayText={`Registration process for ${getText(roleId)} `}
          />
          <AjStepper
            stepOptions={[
              signUpStepOptions[0],
              getCustomSignUpOption(roleId),
              signUpStepOptions[2],
            ]}
            activeStep={1}
          />
          <Box component="form" sx={commonStyles.signupFormContainer}>
            {roleId === ROLES.FARMING_ASSOCIATION && (
              <AjSignUpAssociationFarmingDetails />
            )}
            {roleId === ROLES.PRODUCT_AGGREGATOR && (
              <AjSignupAggregatorDetails />
            )}
            {roleId === ROLES.SINGLE_SELLER && (
              <AjSignupSingleSellerDetails />
            )}
            {roleId === ROLES.QA_COMPANY && <AjSignupQACompanyDetails />}
            {/* {roleId === ROLES.CORPORATE_BUYER && <AjSignUpCorporateBuyer />} */}
            {roleId === ROLES.LOGISTICS_COMPANY && <AjSignUpLogisticsCompany />}
            {roleId === ROLES.SINGLE_BUYER && <AjSignupSingleBuyerDetails />}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default SignUpAccountDetails;
