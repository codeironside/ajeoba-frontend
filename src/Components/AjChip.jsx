import React from "react";
import Chip from "@mui/material/Chip";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

const styles = {
  height: "2.125rem",
  borderRadius: "0.375rem",
  background: "#F4F4F4",
  "& .MuiChip-deleteIcon": {
    fontSize: "0.911rem",
    background: "#6D9E3F",
    borderRadius: "0.25rem",
    color: "white",
    padding: "0.045rem",
    "&:hover": {
      opacity: 0.9,
      color: "white",
    },
  },
  "& .MuiChip-label": {
    fontSize: "0.75rem",
    color: "#1F1F1F",
  },
};

const disableStyles = {
  pointerEvents:"none",
  "& .MuiChip-deleteIcon": {
    background: "#898B87",
  },
};

const AjChip = ({ isReadOnly, ...restProps }) => {
  return (
    <Chip
      sx={isReadOnly ? [styles, disableStyles] : styles}
      {...restProps}
      deleteIcon={
        <CloseRoundedIcon onMouseDown={(event) => event.stopPropagation()} />
      }
    />
  );
};

export default AjChip;
