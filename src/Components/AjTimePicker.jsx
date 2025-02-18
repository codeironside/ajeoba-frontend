import * as React from "react";
import TextField from "@mui/material/TextField";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Box from "@mui/material/Box";
import { commonStyles } from "../Style/CommonStyle";
import { styles } from "./AjDatePicker";

export default function AjTimePicker(props) {
  const {
    timeSelectionHandler,
    value,
    maxDate,
    minDate,
    readOnly,
    ...restProps
  } = props;

  return (
    <Box
      sx={
        props.customIconSize
          ? [styles.calendarContainer, { svg: props.customIconSize }]
          : styles.calendarContainer
      }
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          value={value}
          readOnly={readOnly}
          minTime={minDate}
          maxTime={maxDate}
          {...restProps}
          onChange={(newValue) => {
            timeSelectionHandler(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                ...styles.calendarBox,
                ...(readOnly && commonStyles.disableInput),
              }}
              InputLabelProps={{
                sx: styles.inputLable,
              }}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}
