import React from "react";
import { Dialog, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { styles } from "./AjDialogStyles";

const AjDialogProductImages = ({ children, open, closeModal, title, styleData, close }) => {
  
  const handleCloseModal = () => {
    close(false);
  };

  return (
    <Dialog
      fullScreen={true}
      open={open}
      sx={{ ...styles.dialogProductInput, ...styleData }}
    >
      <Typography sx={styles.title}>{title}</Typography>
      <Typography onClick={handleCloseModal}>
        <CloseIcon sx={styles.closeIcon} />
      </Typography>
      {children}
    </Dialog>
  );
};

export default AjDialogProductImages;