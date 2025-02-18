import * as React from "react";
import Checkbox from "@mui/material/Checkbox";
import AjInputLabel from "./AjInputLabel";

const styles = {
  checkboxItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#898B87",
    // fontWeight: "500",
    // fontSize: "0.875rem",
    // lineHeight: "1.313rem",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "2.5rem",
  },
  headingLabel: {
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "2.5rem",
  },
};

export default function AjCheckbox(props) {
  return (
    <div style={styles.checkboxItem}>
      <Checkbox
        id={props.id}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        checked={props.checked}
        styleData={styles.checkboxItem}
      />
      <AjInputLabel
        displayText={props.label}
        id={props.id}
        name={props.name}
        styleData={styles.headingLabel}
      />
    </div>
  );
}
