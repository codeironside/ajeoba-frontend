import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Box } from "@mui/material";
import { BLACK, DARK_GREY } from "../Constant/ColorConstant";

const styles = {
  radioWrapper: {
    marginTop: "0.5rem",
    justifyContent: "space-between",
    "@media(max-width:500px)": {
      flexDirection: "column",
      width: "50%",
    },
  },
  radioItem: {
    color: DARK_GREY,
    fontWeight: "500",
    fontSize: "0.75rem",
    lineHeight: "1.313rem",
  },
  itemWrapper: {
    border: "0.063rem solid #F2F2F2",
    boxShadow: "0px 0.375rem 0.75rem rgb(0 0 0 / 4%)",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: "0.625rem",
    height: "3.5rem",
    color: "#1F1F1F",
    marginBottom: "0.75rem",
    "@media(max-width:600px)": {
      alignItems: "start",
    },
  },
  disableLabelColor: {
    "& .MuiFormControlLabel-label": {
      color: `${BLACK} !important`,
    },
  },
};

export default function AjRadioOptions({
  items,
  defaultValue,
  onSelect,
  readOnly,
  styleData,
  disableStyling,
}) {
  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <RadioGroup
      row
      aria-labelledby="demo-row-radio-buttons-group-label"
      name="row-radio-buttons-group"
      value={defaultValue}
      sx={styleData || styles.radioWrapper}
      onChange={handleChange}
    >
      {items &&
        items.map((choice) => (
          <Box
            key={choice.label}
            sx={{
              ...styles.itemWrapper,
              ...styleData,
              ...(readOnly && disableStyling),
            }}
          >
            <FormControlLabel
              disabled={readOnly}
              key={choice.value}
              sx={{
                ...styles.radioItem,
                ...(readOnly && styles.disableLabelColor),
              }}
              value={choice.value}
              control={<Radio />}
              label={choice.label}
            />
          </Box>
        ))}
    </RadioGroup>
  );
}
