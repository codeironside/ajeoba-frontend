import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, InputBase, Typography } from "@mui/material";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import {
  getFaqList,
  getFaqListAction,
  updateToBeEditedValueFromSessionStorge,
} from "../../../Redux/SuperAdmin/FaqManagement/faqActions";
import { encrypt, getUserData } from "../../../Services/localStorageService";
import { PASSWORD_ENCRYPTION_SECRET } from "../../../Constant/AppConstant";
import { ROLES } from "../../../Constant/RoleConstant";
import { FAQS_MANAGEMENT_ADD } from "../../../Routes/Routes";
import { convertToHTML } from "draft-convert";
import { convertFromRaw } from "draft-js";
import { styles as faqsManagementStyles } from "./FaqsManagementStyles";
import { styles } from "../../../Containers/SuperAdmin/AdminEditor/AdminEditorStyles";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

export default function FaqsManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const faqData = useSelector((state) => state.faq.faqList);

  const roleId = getUserData().role_id;

  useEffect(() => {
    dispatch(getFaqListAction());
    return () => {
      dispatch(getFaqList([{}]));
    };
  }, []);

  const editHandler = (obj) => {
    const forEditFaqData = JSON.stringify(obj);
    sessionStorage.setItem(
      "forEditFaqData",
      encrypt(forEditFaqData, PASSWORD_ENCRYPTION_SECRET)
    );
    dispatch(updateToBeEditedValueFromSessionStorge());
    navigate(`edit/${obj.id}`);
  };

  const getHtmlFromRaw = (data) => {
    const editorState = convertFromRaw(JSON.parse(data));
    const htmlContent = convertToHTML(editorState);
    return htmlContent;
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box
            sx={{
              ...customCommonStyles.headerBox,
              ...faqsManagementStyles.headerBoxHeight,
            }}
          >
            <Typography
              sx={{
                ...styles.tableText,
                ...styles.tableTextNew,
              }}
            >
              FAQs
            </Typography>
          </Box>
          {roleId === ROLES.SUPER_ADMIN && (
            <AjButton
              variant="text"
              styleData={customCommonStyles.addButtonStyle}
              displayText="Add FAQ"
              onClick={() => navigate(FAQS_MANAGEMENT_ADD)}
            />
          )}
        </Grid>
        <Box
          sx={{
            ...styles.subContentBox,
          }}
        >
          {faqData.length !== 0 ? (
            faqData.map((item, index) => {
              return (
                <Box
                  key={index}
                  sx={{
                    ...faqsManagementStyles.marginBottom20,
                    ...commonStyles.fullWidth,
                  }}
                >
                  <InputBase
                    required
                    readOnly={true}
                    fullWidth
                    multiline
                    defaultValue={item.question}
                    sx={faqsManagementStyles.questionStyle}
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
                          __html: getHtmlFromRaw(item.answer),
                        }}
                      />
                    )}
                  </Box>

                  {roleId === ROLES.SUPER_ADMIN && (
                    <Box
                      sx={{
                        ...faqsManagementStyles.editButtonBox,
                      }}
                    >
                      <AjButton
                        onClick={() => {
                          const obj = faqData.find(
                            (data) => item.id === data.id
                          );
                          editHandler(obj);
                        }}
                        styleData={faqsManagementStyles.editButtonStyle}
                        variant="outlined"
                        displayText="Edit"
                      />
                    </Box>
                  )}
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
    </>
  );
}
