import * as React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import * as moment from "moment";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { commonStyles } from "../Style/CommonStyle";
import { DARK_GREY } from "../Constant/ColorConstant";
import { MIN_AGE } from "../Constant/AppConstant";
export const LIGHT_GREY = "#F4F4F4";

export const styles = {
  calendarContainer: {
    marginTop: "0.5rem",
    pointerEvents: "none",
    "@media (max-width: 600px)": {
      pointerEvents: "all",
    },
    "& .Mui-disabled": {
      "& svg": {
        color: DARK_GREY,
      },
    },
  },
  disableInput: {
    background: LIGHT_GREY,
  },
  calendarBox: {
    width: "100%",
    border: "0.063rem solid #F2F2F2",
    boxShadow: "0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    input: {
      textTransform: "uppercase",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
      padding: "0",
    },
    "& .MuiOutlinedInput-input": {
      padding: "0.97rem",
    },
    button: {
      pointerEvents: "all",
      "&:hover": {
        backgroundColor: "transparent",
      },
    },
    svg: {
      color: "#6d9e3f",
      backgroundColor: "#F4F4F4",
      height: "3.5rem",
      width: "3.25rem",
      padding: "0.75rem",
      margin: "0",
      marginRight: "-0.7rem",
      borderRadius: "0 0.5rem 0.5rem 0",
    },
    fieldset: {
      border: "0.063rem solid #F2F2F2",
      boxSizing: "border-box",
      boxShadow: "0rem 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
      borderRadius: "0.5rem",
    },
    inputLable: {
      fontSize: "0.875rem",
      lineHeight: "1.313rem",
      fontWeight: "400",
    },
  },
};

export default function AjDatePicker(props) {
  return (
    <Box
      sx={
        props.customIconSize
        ? [styles.calendarContainer, { svg: props.customIconSize }]
        : styles.calendarContainer
      }
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          sx={styles.calendarContainer}
          inputFormat="dd/MM/yyyy"
          readOnly={props.readOnly}
          allowSameDateSelection={true}
          maxDate={
            props.agePicker
              ? new Date(moment().subtract(MIN_AGE, "years"))
              : props.maxDate || new Date()
          }
          minDate={props.minDate || new Date(1900, 12, 31)}
          value={props.value}
          onChange={(newValue) => {
            !props.uneditable && props.dateSelectHandler(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                ...styles.calendarBox,
                ...(props.readOnly && commonStyles.disableInput),
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
