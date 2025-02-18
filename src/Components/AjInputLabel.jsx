import InputLabel from "@mui/material/InputLabel";
import React from "react";

const AjInputLabel = (props) => {
  return (
    <InputLabel required={props.required} sx={props.styleData}>
      {props.displayText}
    </InputLabel>
  );
};

export default AjInputLabel;
