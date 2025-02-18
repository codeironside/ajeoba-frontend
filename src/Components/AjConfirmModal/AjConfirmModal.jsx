import React from "react";
import AjTypography from "../AjTypography";
import { commonStyles } from "../../Style/CommonStyle";
import { Box } from "@mui/material";
import AjButton from "../AjButton";
import { styles } from "./AjConfirmModalStyles.js";

const AjConfirmModal = (props) => {
  const handleClose = () => {
    props.closeModal(false);
  };
  const handleConfirm = () => {
    props.onConfirm();
    props.closeModal(false);
  };
  return (
    <>
      <Box sx={styles.modalContainer}>
        <Box sx={{ marginTop: "2rem" }}> {props.icon}</Box>
        <AjTypography
          displayText={props.displayText}
          styleData={{
            ...commonStyles.signupHeadingStyle,
            ...styles.displayTextStyle,
          }}
        />
        <Box sx={styles.buttonContainer}>
          <AjButton
            variant="text"
            displayText="Cancel"
            styleData={{
              ...commonStyles.buttonStyle,
              ...commonStyles.cancelButton,
            }}
            onClick={handleClose}
          />

          <AjButton
            variant="text"
            styleData={{
              ...commonStyles.buttonStyle,
              ...commonStyles.applyFilterButton,
            }}
            displayText="Confirm"
            onClick={handleConfirm}
          />
        </Box>
      </Box>
    </>
  );
};

export default AjConfirmModal;
