import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import loaderDotsImage from "../../Assets/Images/loaderDotsImage.svg";
import { dashboardStyles } from "../../Style/CommonStyle";
import { getUserData } from "../../Services/localStorageService";
import { getCurrencySymbol } from "../../Services/commonService/commonService";

const AjDashboardListCard = (props) => {
  const {
    dashboardInfoBox,
    loading,
    getInfo,
    boxStyle,
    headingTextStyle,
    countStyle,
    mainGridCountBox,
  } = props;

  return (
    <Grid
      container
      sx={{ ...dashboardStyles.dashboardCountContainer, ...mainGridCountBox }}
    >
      {dashboardInfoBox?.map((box, index) => {
        return (
          <Box
            sx={{ ...dashboardStyles.dashboardBox, ...boxStyle }}
            onClick={(event) => getInfo(event, index)}
            key={index}
          >
            <Typography
              sx={{
                ...dashboardStyles.dashboardBoxHeadingText,
                ...headingTextStyle,
              }}
            >
              {box.heading}
              {box.heading === "Sales revenue" &&
                `(${getCurrencySymbol(getUserData()?.currency)})`}
            </Typography>
            <Typography
              sx={{ ...dashboardStyles.dashboardBoxCount, ...countStyle }}
            >
              {loading ? (
                <Typography
                  sx={dashboardStyles.loaderDotsImage}
                  component="img"
                  src={loaderDotsImage}
                />
              ) : (
                `${box.count}`
              )}
            </Typography>
          </Box>
        );
      })}
    </Grid>
  );
};

export default AjDashboardListCard;
