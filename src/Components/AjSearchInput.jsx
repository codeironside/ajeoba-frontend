import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";

export default function AjSearchInput({
  displayText,
  styleData,
  options,
  source,
  value,
  type,
  uneditable,
  ...restProps
}) {
  return (
    <Autocomplete
      {...restProps}
      id="free-solo-2-demo"
      disableClearable={true}
      value={value}
      readOnly={!uneditable ? false : true}
      getOptionLabel={(option) => option[source] || ""}
      options={options}
      renderInput={(params) => (
        <TextField
          placeholder={displayText}
          sx={{
            ...styleData,
            width: type === "product_order_qa_report" ? "250px" : "100%",
          }}
          {...params}
          InputProps={{
            ...params.InputProps,
            type: "search",
          }}
        />
      )}
    />
  );
}
