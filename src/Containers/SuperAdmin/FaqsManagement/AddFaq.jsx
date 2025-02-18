import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import FaqForm from "./FaqForm";
import { addFaqAction } from "../../../Redux/SuperAdmin/FaqManagement/faqActions";
import { FAQS_MANAGEMENT } from "../../../Routes/Routes";
import { styles as addWarehouseStyles } from "../../../Containers/FarmingAssociation/WareHouses/AddWareHouse/AddWareHouseStyles";
import {
  commonStyles,
  commonAddProductStyles,
} from "../../../Style/CommonStyle";
import { styles as faqManagementStyle } from "./FaqsManagementStyles";
import { showToast } from "../../../Services/toast";

function AddFaq() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editorDataRef = useRef(null);

  const addFaq = () => {
    editorDataRef.current.saveTextEditorDataHandler();
  };

  const onSaveHandler = (textEditorData, faqQuestion) => {
    const parsedData = JSON.parse(textEditorData);

    if (
      parsedData.blocks.length === 1 &&
      parsedData.blocks[0].text.length === 0
    ) {
      showToast("Answer is required", "error");
      return;
    }

    const parsedDataLength = parsedData.blocks.reduce((total, item) => {
      return total + item.text.length;
    }, 0);

    if (parsedDataLength < 2 || parsedDataLength > 500) {
      showToast("Answer should be 2 to 500 characters long", "error");
      return;
    }

    if (
      faqQuestion === null ||
      faqQuestion.length === 0 ||
      faqQuestion.length < 2 ||
      faqQuestion.length > 200
    ) {
      return;
    }

    const requiredData = {
      question: faqQuestion,
      answer: textEditorData,
    };

    dispatch(addFaqAction(requiredData, navigate));
  };

  const backHandler = () => {
    navigate(FAQS_MANAGEMENT);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          onClick={backHandler}
          sx={commonStyles.backButtonPosition}
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
            displayText={"Add FAQ"}
            styleData={faqManagementStyle.addFaqButton}
          />
          <Grid
            item
            sx={{
              ...commonAddProductStyles.gridBox,
              ...commonAddProductStyles.gridData,
              ...faqManagementStyle.marginTop40,
            }}
          >
            <FaqForm onSaveHandler={onSaveHandler} ref={editorDataRef} />
            <Box sx={addWarehouseStyles.addWareHouseSaveBtnContainer}>
              <AjButton
                variant="contained"
                onClick={addFaq}
                displayText={"Add"}
              />
            </Box>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default AddFaq;
