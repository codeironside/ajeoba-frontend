import React, { useEffect } from "react";
import { Grid, Box, InputBase } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import AjTypography from "../../Components/AjTypography";
import NavBar from "../../Components/LandingPage/NavBar/NavBar.jsx";
import FAQs from "./FreqAskQs";
import Footer from "../../Components/LandingPage/Footer/Footer";

import {
  getFaqList,
  getFaqListAction,
} from "../../Redux/SuperAdmin/FaqManagement/faqActions";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { styles } from "../Layout/LayoutStyle";
import { styles as TermsAndConditionStyle } from "../TncAndPrivacyPolicy/TncAndPrivacyPolicyStyle";
import { styles as viewSupportStyles } from "../Profile/ViewSupport/ViewSupportStyles";
import { commonStyles } from "../../Style/CommonStyle";
import { styles as faqsManagementStyles } from "../SuperAdmin/FaqsManagement/FaqsManagementStyles";
import { styles as adminEditorstyles } from "../SuperAdmin/AdminEditor/AdminEditorStyles";

const Faqs = () => {
  const dispatch = useDispatch();

  const faqData = useSelector((state) => state.faq.faqList);

  useEffect(() => {
    dispatch(getFaqListAction());
    return () => {
      dispatch(getFaqList([{}]));
    };
  }, []);

  const getHtmlFromRawData = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent;
  };

  return (
    <>
      <Box>
        <NavBar />
        <FAQs />
        <Footer />
      </Box>
      {/* <Grid sx={{ ...styles.logoImageContainer }}></Grid>
      <Grid sx={{ ...TermsAndConditionStyle.mainContainer }}>
        <Grid
          container
          item
          sx={{
            ...viewSupportStyles.gridRadius,
            ...viewSupportStyles.ViewSupportMainContainer,
            ...TermsAndConditionStyle.TncContainer,
          }}
        >
          <Box sx={{ ...commonStyles.fullWidth }}>
            <AjTypography
              styleData={{
                ...TermsAndConditionStyle.headingStyle,
                ...commonStyles.alignCenter,
              }}
              displayText="Frequently Asked Questions"
            />
            <hr style={{ ...TermsAndConditionStyle.horizontalTag }} />
          </Box>
          <Box
            sx={{
              ...adminEditorstyles.subContentBox,
              ...faqsManagementStyles.faqsBox,
            }}
          >
            {faqData.length !== 0 ? (
              faqData.map((item) => {
                return (
                  <Box sx={faqsManagementStyles.marginBottom20}>
                    <InputBase
                      multiline
                      readOnly={true}
                      sx={faqsManagementStyles.questionStyle}
                      defaultValue={item.question}
                      fullWidth
                      id="question"
                      name="question"
                    />

                    <Box>
                      {item.answer && (
                        <div
                          style={{
                            ...faqsManagementStyles.displayTextEditorStyle,
                          }}
                          dangerouslySetInnerHTML={{
                            __html: getHtmlFromRawData(item.answer),
                          }}
                        />
                      )}
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Box sx={commonStyles.noContentBox}>
                <AjTypography
                  styleData={commonStyles.noDataText}
                  displayText="No data found"
                />
              </Box>
            )}
          </Box>
        </Grid>
      </Grid> */}
    </>
  );
};

export default Faqs;
