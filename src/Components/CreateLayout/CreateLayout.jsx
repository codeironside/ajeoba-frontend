import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { commonAddProductStyles, commonStyles } from "../../Style/CommonStyle";
import AjRadioOptions from "../AjRadioOptions";
import AjTypography from "../AjTypography";

const CreateLayout = ({
  children,
  displayText,
  options,
  defaultValue,
  selectHandler,
  backNavigation,
}) => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(backNavigation);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backButtonHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            styleData={commonStyles.mainHeading}
            displayText={displayText}
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.batchFormContainer,
            }}
          >
            <Box
              sx={{
                ...commonStyles.signupFormFieldContainer,
                ...commonStyles.fullWidth,
              }}
            >
              <AjRadioOptions
                styleData={commonAddProductStyles.radioOptions}
                items={options}
                defaultValue={defaultValue}
                onSelect={selectHandler}
              />
            </Box>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CreateLayout;
