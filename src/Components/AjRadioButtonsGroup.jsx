import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

const styles = {
  "radioItem": {
    color: "#898B87",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
  }
}


export default function AjRadioButtonsGroup(props) {

  const handleChange = (event) => {
    props.onSelect(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <RadioGroup
        // sx={{ marginLeft: "-0.75rem" }}
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.value}
        onChange={handleChange}
      >
        <FormControlLabel sx={styles.radioItem} value="email" control={<Radio />} label="E-mail Id" />
        <FormControlLabel sx={styles.radioItem}
          value="phone"
          control={<Radio />}
          label="Phone number"
        />
      </RadioGroup>
    </FormControl>
  );
}
