import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { convertFromRaw } from "draft-js";
import { convertToHTML } from "draft-convert";

import AjTypography from "../../Components/AjTypography";

import { getTncAndPrivacyPolicyInfo } from "../../Redux/SuperAdmin/AdminEditor/adminEditorActions";
import { TERMS_AND_CONDITIONS } from "../../Routes/Routes";
import { styles } from "../Layout/LayoutStyle";
import { styles as TermsAndConditionStyle } from "./TncAndPrivacyPolicyStyle";
import { styles as viewSupportStyles } from "../Profile/ViewSupport/ViewSupportStyles";
import { commonStyles } from "../../Style/CommonStyle";
import { styles as faqsManagementStyles } from "../SuperAdmin/FaqsManagement/FaqsManagementStyles";

const TncAndPrivacyPolicy = () => {
  const dispatch = useDispatch();
  const location = window.location.pathname;

  const TncAndPrivacyPolicyData = useSelector(
    (state) => state.adminEditor.TncAndPrivacyPolicyData
  );

  useEffect(() => {
    dispatch(
      getTncAndPrivacyPolicyInfo(location.includes(TERMS_AND_CONDITIONS))
    );
  }, [location]);

  const getHtmlFromRaw = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent;
  };

  return (
    <>
      <Grid sx={{ ...styles.logoImageContainer }}></Grid>

      <Grid sx={{ ...TermsAndConditionStyle.mainContainer }}>
        <Grid
          container
          item
          sx={{
            ...viewSupportStyles.gridRadius,
            ...viewSupportStyles.ViewSupportMainContainer,
            ...TermsAndConditionStyle.TncContainer,
            ...TermsAndConditionStyle.blockDisplay,
          }}
        >
          {TncAndPrivacyPolicyData && (
            <>
              <Box sx={{ ...commonStyles.fullWidth }}>
                <AjTypography
                  styleData={{
                    ...TermsAndConditionStyle.headingStyle,
                    ...commonStyles.alignCenter,
                  }}
                  displayText={
                    location.includes(TERMS_AND_CONDITIONS)
                      ? "Terms and Conditions"
                      : "Privacy Policy"
                  }
                />
                <hr style={{ ...TermsAndConditionStyle.horizontalTag }} />
              </Box>
              <div
                style={{
                  ...faqsManagementStyles.displayTextEditorStyle,
                }}
                dangerouslySetInnerHTML={{
                  __html: getHtmlFromRaw(TncAndPrivacyPolicyData),
                }}
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default TncAndPrivacyPolicy;
