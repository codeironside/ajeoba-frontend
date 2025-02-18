import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import FaqForm from "./FaqForm";
import { editDataByIdAction } from "../../../Redux/SuperAdmin/FaqManagement/faqActions";
import { removeItemFromSessionStorage } from "../../../Services/localStorageService";
import { FAQS_MANAGEMENT } from "../../../Routes/Routes";
import { styles as refreeDetailStyles } from "../../../Containers/Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import {
  commonStyles,
  commonAddProductStyles,
} from "../../../Style/CommonStyle";
import { styles as faqManagementStyle } from "./FaqsManagementStyles";
import { showToast } from "../../../Services/toast";

function EditFaq() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const itemToEdit = useSelector((state) => state.faq.toBeEditedData);

  const editorDataRef = useRef(null);

  const saveChanges = () => {
    editorDataRef.current.saveTextEditorDataHandler();
  };

  const onSaveHandler = (richTextEditorData, faqQuestionData) => {
    const parsedRteData = JSON.parse(richTextEditorData);

    if (
      parsedRteData.blocks.length === 1 &&
      parsedRteData.blocks[0].text.length === 0
    ) {
      showToast("Answer is required", "error");
      return;
    }

    const parsedRteDataLength = parsedRteData.blocks.reduce((sum, item) => {
      return sum + item.text.length;
    }, 0);

    if (parsedRteDataLength < 2 || parsedRteDataLength > 500) {
      showToast("Answer should be 2 to 500 characters long", "error");
      return;
    }

    if (
      faqQuestionData === null ||
      faqQuestionData.length === 0 ||
      faqQuestionData.length < 2 ||
      faqQuestionData.length > 200
    ) {
      return;
    }

    let requiredData = {
      question: faqQuestionData,
      answer: richTextEditorData,
    };

    dispatch(editDataByIdAction(itemToEdit.id, requiredData, navigate));
  };

  const handleCancel = (e, value) => {
    removeItemFromSessionStorage("forEditFaqData");
    navigate(FAQS_MANAGEMENT);
  };

  const backHandler = () => {
    removeItemFromSessionStorage("forEditFaqData");
    navigate(FAQS_MANAGEMENT);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          sx={{
            ...commonStyles.backButtonPosition,
            ...faqManagementStyle.backButtonAddEdit,
          }}
          onClick={backHandler}
          disableRipple
        >
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...faqManagementStyle.faqAddEditWhiteBoxContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box
          sx={{
            ...commonStyles.signupContentContainer,
            ...faqManagementStyle.marginTop0Responsive,
          }}
        >
          <AjTypography
            styleData={faqManagementStyle.addFaqButton}
            displayText={"Edit FAQ"}
          />
          <Grid
            item
            sx={{
              ...commonAddProductStyles.gridBox,
              ...commonAddProductStyles.gridData,
              ...faqManagementStyle.marginTop40,
            }}
          >
            <FaqForm
              defaultQuestion={itemToEdit?.question}
              defaultAnswer={itemToEdit?.answer}
              ref={editorDataRef}
              onSaveHandler={onSaveHandler}
            />
            <Grid sx={refreeDetailStyles.btnContainer} container>
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={saveChanges}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditFaq;
