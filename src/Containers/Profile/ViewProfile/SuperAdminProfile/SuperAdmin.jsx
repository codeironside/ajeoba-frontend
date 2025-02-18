import React from "react";
import { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { viewProfileStyles } from "../ViewProfileStyle";
import AjTypography from "../../../../Components/AjTypography";
import { getUserData } from "../../../../Services/localStorageService";
import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./SuperAdminStyles";
import { getPhoneCodeSymbol } from "../../../../Services/commonService/commonService";

const SuperAdmin = () => {
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    const data = getUserData();
    setAdminData(data);
  }, [adminData]);

  return (
    <Grid
      container
      sx={[commonStyles.signupFormMainGridContainer, styles.mainSuperAdmin]}
    >
      <Grid container item sx={[styles.superAdminContainer]}>
        {adminData && (
          <Box sx={styles.superAdminContent}>
            <AjTypography
              displayText={
                adminData.last_name
                  ? `${adminData.first_name} ${adminData.last_name}`
                  : adminData.first_name
              }
              align="center"
              styleData={viewProfileStyles.userName}
            />
            <AjTypography
              displayText={adminData.role_name}
              align="center"
              styleData={viewProfileStyles.roleHeading}
            />
            <Grid container sx={styles.superAdminSubContent}>
              <Box sx={styles.responsive}>
                <AjTypography
                  displayText="Email"
                  align="center"
                  styleData={styles.labelColor}
                />
                <AjTypography
                  displayText={adminData.email}
                  align="center"
                  styleData={styles.labelContentColor}
                />
              </Box>
              <Box>
                <AjTypography
                  displayText="Phone number"
                  align="center"
                  styleData={styles.labelColor}
                />
                <AjTypography
                  displayText={`${getPhoneCodeSymbol(adminData.phone_code)} ${
                    adminData.mobile_no
                  }`}
                  align="center"
                  styleData={styles.labelContentColor}
                />
              </Box>
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default SuperAdmin;
