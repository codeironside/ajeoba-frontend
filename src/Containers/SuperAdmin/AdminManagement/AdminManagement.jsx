import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";

import SuperAdminListing from "./AdminListing/AdminListing";
import AjButton from "../../../Components/AjButton";

import refreeLogo from "../../../Assets/Images/refreeLogo.svg";
import { ADD_ADMIN } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

export default function AdminManagement() {
  const adminList = useSelector((state) => state.adminManagement.adminList);

  const navigate = useNavigate();

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img src={refreeLogo} style={{ marginBottom: "0.375rem" }} />
            <Typography sx={commonStyles.tableText}>
              Admins({adminList?.result?.length})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={customCommonStyles.addButtonStyle}
            displayText="Add Admin"
            onClick={() => navigate(ADD_ADMIN)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <SuperAdminListing />
        </Box>
      </Grid>
    </>
  );
}
