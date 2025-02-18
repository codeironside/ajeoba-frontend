import React from "react";
import InputBase from "@mui/material/InputBase";
import { FormHelperText } from "@mui/material";

import { commonStyles } from "../Style/CommonStyle";

const style = {
  error: {
    position: "absolute",
    top: "3.75rem",
  },
};
const AjInputBase = (props) => (
  <>
    <InputBase
      inputProps={{ maxLength: props.maxLen }}
      sx={{ ...props.styleData, ...commonStyles.relativePosition }}
      onBlur={props.onBlur}
      onChange={props.onChange}
      name={props.name}
      autoFocus={props.focus}
      value={props.value}
      placeholder={props.placeholder}
      fullWidth={props.fullWidth}
      endAdornment={props.endIcon}
      onKeyPress={
        props.onKeyPress ? (event) => props.onKeyPress(event) : () => {}
      }
      inputRef={props.inputRef}
    />
    <FormHelperText sx={style.error} error={true}>
      {props.invalid}
    </FormHelperText>
  </>
);

export default AjInputBase;
