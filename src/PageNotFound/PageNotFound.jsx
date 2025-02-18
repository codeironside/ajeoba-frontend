import React from "react";
import { Grid, Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

import { getUserData } from "../Services/localStorageService";
import { SIGNIN } from "../Routes/Routes";
import { ROLES } from "../Constant/RoleConstant";
import { getDefaultPath } from "../Services/commonService/commonService";

import { styles } from "../Containers/Layout/LayoutStyle";
import { styles as viewSupportStyles } from "../Containers/Profile/ViewSupport/ViewSupportStyles";
import { styles as CsvBulkStyle } from "../Components/AjCsvBulkUploader/AjCsvBulkUploaderStyles";
import { pageNotFoundStyle } from "./pageNotFoundStyle";
import { commonStyles } from "../Style/CommonStyle";

const PageNotFound = () => {
  const navigate = useNavigate();
  const userData = getUserData();

  const handleNavigation = () => {
    const roleId = getUserData()?.role_id;
    if (roleId) {
      navigate(getDefaultPath(roleId));
    } else {
      navigate(`${SIGNIN}`);
    }
  };

  const getText = () => {
    if (userData) {
      if (userData?.role_id === ROLES.QA_COMPANY) {
        return "Go to Subscription";
      } else if (
        userData?.role_id === ROLES.SINGLE_BUYER ||
        userData?.role_id === ROLES.CORPORATE_BUYER
      ) {
        return "Go to Trading";
      } else if (userData?.role_id === ROLES.FINANCE_COMPANY) {
        return "Go to Finance Request";
      } else {
        return "Go to Dashboard";
      }
    } else {
      return "Go to Sign In";
    }
  };

  return (
    <Grid>
      <Grid sx={{ ...styles.logoImageContainer }}></Grid>

      <Grid>
        <Grid
          container
          item
          sx={{
            ...viewSupportStyles.gridRadius,
            ...viewSupportStyles.ViewSupportMainContainer,
            ...pageNotFoundStyle.mainGrid,
          }}
        >
          <Box sx={{ ...commonStyles.relativePosition }}>
            <DescriptionOutlinedIcon
              sx={{ ...pageNotFoundStyle.DescriptionOutlinedIconStyle }}
            />
            <SearchIcon
              sx={{
                ...pageNotFoundStyle.SearchIconStyle,
              }}
            />
          </Box>

          <Box sx={{ ...pageNotFoundStyle.contentBoxStyle }}>
            <Typography
              sx={{
                ...pageNotFoundStyle.notFoundStyle,
              }}
            >
              Page Not Found
            </Typography>

            <Typography
              sx={{
                ...pageNotFoundStyle.notFoundContentStyle,
              }}
            >
              We're sorry, the page you requested could not be found. Please go
              back to homepage
            </Typography>
          </Box>
          <Button
            variant="contained"
            component="label"
            sx={{
              ...CsvBulkStyle.uploadButton,

              ...pageNotFoundStyle.uploadedBtn,
            }}
            onClick={handleNavigation}
          >
            {getText()}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageNotFound;
