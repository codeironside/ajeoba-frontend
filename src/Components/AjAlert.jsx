import { Alert } from "@mui/material";
import React from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

function AjAlert({ title, sx, iconProps, ...restProps }) {
  return (
    <Alert
      action={<DoneRoundedIcon {...iconProps} />}
      icon={false}
      severity="success"
      sx={{
        ...sx,
        "& .MuiAlert-action": {
          padding: 0,
          alignItems: "center",
        },
      }}
      {...restProps}
    >
      {title}
    </Alert>
  );
}

export default AjAlert;
