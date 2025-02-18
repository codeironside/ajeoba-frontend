import React from "react";
import { Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./AjDialogStyles";

const AjDialog = ({ children, open, closeModal, title, styleData }) => {
  
  const handleCloseModal = () => {
    closeModal(false);
  };

  return (
    <Dialog
      fullScreen={true}
      open={open}
      sx={{ ...styles.dialog, ...styleData }}
    >
      <Typography sx={styles.title}>{title}</Typography>
      <Typography onClick={handleCloseModal}>
        <CloseIcon sx={styles.closeIcon} />
      </Typography>
      {children}
    </Dialog>
  );
};

export default AjDialog;
