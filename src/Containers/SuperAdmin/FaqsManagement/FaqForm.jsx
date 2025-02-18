import React, { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MUIRichTextEditor from "mui-rte";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjTypography from "../../../Components/AjTypography";
import { styles as viewSupportStyles } from "../../../Containers/Profile/ViewSupport/ViewSupportStyles";
import { commonStyles } from "../../../Style/CommonStyle";
import { styles as faqManagementStyles } from "./FaqsManagementStyles";
import { PLACEHOLDER_COLOR } from "../../../Constant/ColorConstant";

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
        ...viewSupportStyles.textAreaStyle,
        width: "100%",
        overflowY: "auto",
        height: "15.625rem",
        ...commonStyles.customSrollBar,
      },
      editor: {
        fontFamily: "Poppins",
      },
      placeHolder: {
        fontFamily: "Poppins",
        color: PLACEHOLDER_COLOR,
        fontSize: "1rem",
      },
    },
  },
});

const { forwardRef, useRef, useImperativeHandle } = React;

const FaqForm = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    saveTextEditorDataHandler() {
      if (editRef?.current) {
        editRef.current.save();
      }
    },
  }));

  const editRef = useRef(null);

  const [faqQuestion, setFaqQuestion] = useState(props.defaultQuestion || []);
  const [faqQuestionError, setFaqQuestionError] = useState(null);
  const [isQuestionModified, setIsQuestionModified] = useState(false);

  useEffect(() => {
    if (isQuestionModified) {
      vaidateQuestion();
    }
  }, [faqQuestion]);

  const vaidateQuestion = () => {
    if (faqQuestion.length === 0) {
      setFaqQuestionError("Question is required");
    } else {
      if (faqQuestion.length < 2) {
        setFaqQuestionError("This should be 2 to 200 characters long");
      } else if (faqQuestion.length > 200) {
        setFaqQuestionError("This should be 2 to 200 characters long");
      } else if (faqQuestion.length >= 2 && faqQuestion.length <= 200) {
        setFaqQuestionError(null);
      }
    }
  };

  const onSubmit = (data) => {
    vaidateQuestion();
    if (faqQuestion.length >= 2 && faqQuestion.length <= 200) {
      props.onSaveHandler(data, faqQuestion);
    }
  };

  return (
    <Box sx={faqManagementStyles.faqFormBox}>
      <AjInputLabel
        required={true}
        styleData={commonStyles.inputLabel}
        displayText="Question"
      />
      <InputBase
        required
        multiline
        rows={2.9}
        sx={{
          ...viewSupportStyles.textAreaStyle,
          ...faqManagementStyles.questionHeight,
        }}
        placeholder="Enter the question"
        id="question"
        name="question"
        value={faqQuestion}
        onChange={(e) => {
          setIsQuestionModified(true);
          setFaqQuestion(e.target.value);
        }}
        defaultValue={props.defaultQuestion}
      />

      <AjTypography
        styleData={commonStyles.errorText}
        displayText={faqQuestionError ? faqQuestionError : ""}
      />

      <AjInputLabel
        required={true}
        styleData={{
          ...commonStyles.inputLabel,
          ...faqManagementStyles.marginTopForAnswer,
        }}
        displayText="Answer"
      />
      {
        <ThemeProvider theme={defaultTheme}>
          <MUIRichTextEditor
            defaultValue={props.defaultAnswer}
            label="Enter the answer"
            controls={options}
            onSave={(_data) => {
              onSubmit(_data);
            }}
            ref={editRef}
          />
        </ThemeProvider>
      }
    </Box>
  );
});

export default FaqForm;
