import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import MUIRichTextEditor from "mui-rte";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AjButton from "../../../Components/AjButton";
import { convertToHTML } from "draft-convert";
import {
  getData,
  saveData,
} from "../../../Redux/SuperAdmin/AdminEditor/adminEditorActions";

import { styles } from "./AdminEditorStyles";
import { viewProfileStyles } from "../../Profile/ViewProfile/ViewProfileStyle";
import { convertFromRaw } from "draft-js";
import { showToast } from "../../../Services/toast";
import { ADD_TERMS_AND_CONDITION } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import AjTypography from "../../../Components/AjTypography";
import { styles as faqsManagementStyles } from "../../SuperAdmin/FaqsManagement/FaqsManagementStyles";

const options = [
  "title",
  "bold",
  "italic",
  "underline",
  "numberList",
  "bulletList",
  "quote",
  "code",
  "clear",
];

const defaultTheme = createTheme();
Object.assign(defaultTheme, {
  overrides: {
    MUIRichTextEditor: {
      root: {
        width: "100%",
      },
      editor: {
        fontFamily: "Poppins",
      },
    },
  },
});
const getHtmlFromRaw = (data) => {
  const editorState = convertFromRaw(JSON.parse(data));
  const htmlContent = convertToHTML(editorState);
  return htmlContent;
};
const AdminEditor = () => {
  const location = window.location.pathname;
  const [isTermsAndConditions, setIsTermsAndConditions] = useState(
    location.includes(ADD_TERMS_AND_CONDITION)
  );

  const [data, setData] = useState(null);

  const [openEditor, setOpenEditor] = useState(false);

  const ref = useRef(null);
  const dispatch = useDispatch();

  const adminTermsAndConditions = useSelector(
    (state) => state.adminEditor.data
  );

  useEffect(() => {
    setIsTermsAndConditions(location.includes(ADD_TERMS_AND_CONDITION));
  }, [location]);

  useEffect(() => {
    dispatch(getData(isTermsAndConditions));
  }, [openEditor, isTermsAndConditions]);

  useEffect(() => {
    if (adminTermsAndConditions) {
      if (isTermsAndConditions) {
        setData(adminTermsAndConditions?.terms_and_conditions);
      } else {
        setData(adminTermsAndConditions?.privacy_policy);
      }
    }
  }, [adminTermsAndConditions, isTermsAndConditions]);
  const onEditClickHandler = () => {
    setOpenEditor(true);
  };

  const onCancelClickHandler = () => {
    setOpenEditor(false);
  };

  const validate = (dataToValidate) => {
    const parsedData = JSON.parse(dataToValidate);
    if (
      parsedData.blocks.length === 1 &&
      parsedData.blocks[0].text.length === 0
    ) {
      showToast(
        `Please enter the ${
          isTermsAndConditions ? "terms and conditions" : "privacy policy"
        }`,
        "error"
      );
      return false;
    }
    return true;
  };

  const onSaveHandler = (dataToSave) => {
    const isValid = validate(dataToSave);
    if (isValid) {
      let dataToSend;
      if (isTermsAndConditions) {
        dataToSend = {
          termsAndConditions: dataToSave,
        };
      } else {
        dataToSend = {
          privacyPolicy: dataToSave,
        };
      }
      dispatch(saveData(dataToSend, isTermsAndConditions));
      setOpenEditor(false);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography
              sx={{
                ...styles.tableText,
                ...(openEditor && styles.tableTextNew),
              }}
            >
              {isTermsAndConditions ? `Terms and Conditions` : `Privacy Policy`}
            </Typography>
          </Box>
          {!openEditor && (
            <AjButton
              variant="text"
              styleData={styles.addButtonStyle}
              displayText={!data ? "Add" : "Edit"}
              onClick={onEditClickHandler}
            />
          )}
        </Grid>
        <Box
          sx={{
            ...styles.subContentBox,
            ...(openEditor && styles.subContentBoxNew),
          }}
        >
          {openEditor && (
            <ThemeProvider theme={defaultTheme}>
              <MUIRichTextEditor
                defaultValue={data}
                label="Type something here..."
                controls={options}
                onSave={onSaveHandler}
                ref={ref}
              />
            </ThemeProvider>
          )}
          {!openEditor &&
            (data ? (
              <div
                style={{
                  ...faqsManagementStyles.displayTextEditorStyle,
                }}
                dangerouslySetInnerHTML={{
                  __html: getHtmlFromRaw(data),
                }}
              />
            ) : (
              <Box sx={commonStyles.noContentBox}>
                <AjTypography
                  styleData={commonStyles.noDataText}
                  displayText="No data found"
                />
              </Box>
            ))}
        </Box>
        <Grid sx={styles.btn} container>
          {openEditor && (
            <>
              <AjButton
                onClick={onCancelClickHandler}
                styleData={viewProfileStyles.cancelBtnStyle}
                variant="outlined"
                displayText="Cancel"
              />
              <AjButton
                onClick={() => ref?.current?.save()}
                variant="contained"
                displayText="Save Changes"
              />
            </>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default AdminEditor;
