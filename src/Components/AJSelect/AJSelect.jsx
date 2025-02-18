import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { styles } from "./AJSelectStyles";
import AjTypography from "../AjTypography";

export function AJSelect(props) {
  const [selected, setSelected] = React.useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const selectededData = props.data
      .filter((item) => {
        return item[props.metaSource] === props.selectedProductId;
      })
      .map((product) => {
        return product[props.source];
      });
    setSelected(selectededData); // setting the value of selected product using product id
    setData(props.data);
  }, [props.data]);

  const handleChange = (event) => {
    props.onSelectChange(event.target.value);
    setSelected(event.target.value);
  };

  function capitalize(word) {
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }

  return (
    <FormControl variant="standard" sx={{ m: 1, minWidth: "4rem" }}>
      {data?.length ? (
        <Select
          id="productSelected"
          value={selected}
          onChange={handleChange}
          disableUnderline
          renderValue={(selectedItem) => {
            if (!selectedItem) {
              return;
            } else {
              return (
                <AjTypography
                  displayText={selectedItem}
                  styleData={styles.renderValue}
                />
              );
            }
          }}
        >
          {data?.map((item) => {
            let capitalizedWord;
            if (item[props.source]) {
              capitalizedWord = capitalize(item[props.source]);
            }
            return (
              <MenuItem value={item[props.source]} key={item.id}>
                {capitalizedWord}
              </MenuItem>
            );
          })}
        </Select>
      ) : (
        ""
      )}
    </FormControl>
  );
}

export default AJSelect;
