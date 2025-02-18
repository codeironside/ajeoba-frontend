import React from "react";
import Box from "@mui/material/Box";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import { Popper } from "@mui/material";
import { commonStyles } from "../Style/CommonStyle";

const popperStyle = {
  maxWidth: "fit-content",
};

const dropDownStyle = {
  countryCodeSearchDropDown: {
    width: "6.438rem",
    height: "3.5rem",
    background: "rgba(109, 158, 63, 0.2)",
    borderRadius: "0.5rem 0px 0px 0.5rem",
  },
  searchBoxTextField: {
    "& .MuiIconButton-root": {
      color: "green",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "0.5rem 0px 0px 0.5rem",
      border: "none !important",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "& .MuiAutocomplete-input": {
      padding: "0.469rem 0px 0.469rem 0px !important",
      textAlign: "center",
      textOverflow: "initial",
      minWidth: "2.75rem !important",
    },
  },
  disableIconColor:{
    "& .MuiIconButton-root": {
      color: "gray",
    },
  }
};

const MyPopper = function (props) {
  return <Popper {...props} style={popperStyle} placement="bottom-start" />;
};

const AjSearchDropDown = (props) => {
  return (
    <Autocomplete
      readOnly={props.isDisable}
      id={props.id}
      sx={{...dropDownStyle.countryCodeSearchDropDown, ...(props.isDisable && commonStyles.disableInput)}}
      options={props.options}
      autoHighlight
      getOptionLabel={(option) => option.countryCode || ""}
      disableClearable
      value={props.value}
      PopperComponent={MyPopper}
      renderOption={(propsRender, option) => (
        <Box
          component="li"
          // sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
          {...propsRender}
          color="secondary"
          key={option.label}
        >
          {option.label}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          InputLabelProps={{
            shrink: true,
          }}
          // inputProps={{
          //   ...params.inputProps,
          //   autoComplete: "new-password", // disable autocomplete and autofill
          // }}
          color="secondary"
          sx={{...dropDownStyle.searchBoxTextField, ...(props.isDisable && dropDownStyle.disableIconColor)}}
        />
      )}
      onChange={props.onChange}
    />
  );
};

export default AjSearchDropDown;
