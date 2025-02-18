import { Typography, Button } from "@mui/material";
import React from "react";

const butttonStyle = {
  marginTop: "1.875rem",
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontWeight: "600",
  borderRadius: "0.5rem",
  backgroundColor: "#6d9e3f",
  width: "13.188rem",
  height: "3.5rem",
  textTransform: "unset",
  "&:hover": {
    backgroundColor: "#6d9e3f",
  },
};

const linkStyle = {
  fontSize: "0.875rem",
  lineHeight: "1.313rem",
  fontWeight: "400",
  textTransform: "capitalize",
};

const AjButton = (props) => {
  return (
    <Button
      id={props.id}
      variant={props.variant}
      sx={[
        props.variant === "text"
          ? { ...linkStyle, ...props.textStyle }
          : { ...butttonStyle, ...props?.btnStyle },
        props.styleData,
      ]}
      onClick={props.onClick}
      disabled={props.isDisable || false}
      disableTouchRipple={true}
      disableFocusRipple={true}
    >
      <Typography sx={props.textStyle}>{props.displayText}</Typography>
    </Button>
  );
};

export default AjButton;
