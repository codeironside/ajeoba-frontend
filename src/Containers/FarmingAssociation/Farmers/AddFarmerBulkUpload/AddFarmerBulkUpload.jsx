import React from "react";
import { Grid, IconButton, Box } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SampleCsv from "../../../../Assets/farmer.csv";

import { useNavigate } from "react-router-dom";
import AjTypography from "../../../../Components/AjTypography";
import { FARMERS } from "../../../../Routes/Routes";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjCsvBulkComponent from "../../../../Components/AjCsvBulkUploader/AjCsvBulkComponent";
import { farmerBulkUploadNoteText } from "../../../../Constant/AppConstant";
import { PRIMARY_GREEN } from "../../../../Constant/ColorConstant";
import { styles } from "./AddFarmerBulkUploadStyle";

const AddFarmerBulkUpload = () => {
  const navigate = useNavigate();
  const backArrowHandler = () => {
    navigate(FARMERS);
  };
  return (
    <>
      <Grid container sx={commonStyles.signupFormMainGridContainer}>
        <Box sx={commonStyles.relativePosition}>
          <IconButton
            disableRipple
            onClick={backArrowHandler}
            sx={commonStyles.backButtonPosition}
          >
            <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
          </IconButton>
        </Box>

        <Grid
          container
          item
          sx={{
            ...commonStyles.signupFormMainContentContainer,
            ...commonStyles.customSrollBar,
            ...styles.mainContainer,
          }}
        >
          <Grid sm={9} xs={12} sx={styles.subContainer}>
            <Box sx={commonStyles.signupContentContainer}>
              <AjTypography
                displayText="Add Farmers"
                styleData={commonStyles.mainHeading}
              />
            </Box>
            <Box sx={styles.anchorBtnMobile}>
              <a
                href={SampleCsv}
                download
                style={{
                  color: PRIMARY_GREEN,
                }}
              >
                Sample Csv
              </a>
            </Box>
            <AjCsvBulkComponent
              noteText={farmerBulkUploadNoteText}
              apiCallFor="farmers"
            />
          </Grid>
          <Grid sm={3} xs={12} sx={styles.anchorBtnDesktop}>
            <a
              href={SampleCsv}
              download
              style={{
                color: PRIMARY_GREEN,
              }}
            >
              Sample Csv
            </a>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default AddFarmerBulkUpload;
