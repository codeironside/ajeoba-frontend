import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Typography } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import { useLocation } from "react-router-dom";

import {
  WHITE,
  ACTIVE_GREEN,
  PLACEHOLDER_COLOR,
} from "../../Constant/ColorConstant";

const styles = {
  inputStyle: {
    "& .MuiInputBase-input": {
      position: "relative",
      fontSize: 16,
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderRadius: "0.5rem 0px 0px 0.5rem",
      border: "none !important",
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
      border: "none !important",
    },
    "& .MuiSelect-select": {
      padding: "0 0 0 0.5rem",
      minHeight: "0",
    },
    margin: "auto 0",
  },
  optionBox: { maxHeight: "21.875rem", maxWidth: "21.875rem" },
  mainBox: {
    width: "100%",
    height: "3.5rem",
    marginTop: "0.5rem",
    background: WHITE,
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: ACTIVE_GREEN,
      },
    },
    minWidth: 240,
    minHeight: "2.75rem",
    "@media (max-width:600px)": {
      minWidth: "20rem",
    },
  },
  mainBoxyeild: {
    width: "100%",
    height: "3.5rem",
    marginTop: "0.5rem",
    background: WHITE,
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: ACTIVE_GREEN,
      },
    },
    minWidth: 240,
    minHeight: "2.75rem",
    "@media (max-width:600px)": {
      minWidth: "100%",
    },
  },
  placeholderStyle: {
    color: PLACEHOLDER_COLOR,
  },
  valueEllipsis: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    width: "21.2rem",
    display: "block",
  },
};

export default function AjDropDown(props) {
  const {
    options = [],
    source,
    placeHolder,
    value = '',
    onChange,
    defaultValue = "",
    styleData,
    readOnly,
    disableSourceForValue,
    isPlaceholderCapiltalize = true,
  } = props;

  const location = useLocation();
  const isFarmersDetaileditPage = location.pathname.includes("farmers/edit");

  return (
    <div>
      <FormControl
        sx={{
          ...(isFarmersDetaileditPage ? styles.mainBoxyeild : styles.mainBox),
          ...styleData,
          ...(readOnly && commonStyles.disableInput),
        }}
      >
        <Select
          inputProps={{ "aria-label": "Without label" }}
          value={value}
          displayEmpty
          readOnly={readOnly}
          renderValue={(val) => {
            if (!val) {
              return (
                <Typography
                  sx={isPlaceholderCapiltalize && commonStyles.textCapitalize}
                >
                  {defaultValue ? (
                    defaultValue
                  ) : (
                    <Typography sx={styles.placeholderStyle}>
                      {placeHolder}
                    </Typography>
                  )}
                </Typography>
              );
            }
            return (
              <Typography
                sx={{
                  ...commonStyles.textCapitalize,
                }}
              >
                {disableSourceForValue ? val[source] : val}
              </Typography>
            );
          }}
          onChange={onChange}
          sx={styles.inputStyle}
          MenuProps={{
            style: {
              maxHeight: 350,
              maxWidth: 350,
            },
          }}
        >
          {Array.isArray(options) && options.length > 0 ? (
            options.map((item, index) => (
              <MenuItem
                key={index}
                sx={{
                  ...commonStyles.textCapitalize,
                  ...styles.valueEllipsis,
                  ...props.productTypeStyle,
                }}
                {...{ value: disableSourceForValue ? item : item[source] }}
              >
                {item[source]}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled value="">
              {"No options available"}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </div>
  );
}
