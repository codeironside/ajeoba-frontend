import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import * as React from "react";
import AjChip from "./AjChip";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";

const styles = {
  inputBaseRoot: {
    "& .MuiSelect-select": {
      paddingRight: "3.5rem !important",
    },
  },
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const DropDownIconComponent = styled("div")(({ isReadOnly, className }) => ({
  height: "100%",
  width: "3.5rem",
  background: "#f4f4f4",
  borderRadius: "0px 0.5rem 0.5rem 0px",
  right: "-0.063rem !important",
  top: "0 !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& .MuiSvgIcon-root": {
    fontSize: "3.961rem",
    color: isReadOnly ? "#898B87" : "#6D9E3F",
  },
}));

const AjChipDropdown = ({
  value,
  styleData,
  options,
  onChange,
  onDelete,
  isReadOnly,
  source,
  disableSourceForValue,
  isObjectValue,
  ...restProps
}) => {
  const theme = useTheme();
  const personName = [];

  return (
    <FormControl sx={styleData} {...restProps}>
      <Select
        IconComponent={(props) => (
          <DropDownIconComponent isReadOnly={isReadOnly} {...props}>
            <ArrowDropDownRoundedIcon />
          </DropDownIconComponent>
        )}
        readOnly={isReadOnly}
        multiple
        value={value}
        onChange={onChange}
        input={
          <OutlinedInput
            sx={styles.inputBaseRoot}
            id="select-multiple-chip"
            label="Chip"
          />
        }
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((item, index) => (
              <AjChip
                key={index}
                isReadOnly={isReadOnly}
                label={
                  isObjectValue
                    ? item[source]
                    : disableSourceForValue
                    ? item[source]
                    : item
                }
                onDelete={() => onDelete(item, index)}
              />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {options?.length !== 0 ? (
          options?.map((name, index) => (
            <MenuItem
              key={index}
              value={
                isObjectValue
                  ? name
                  : disableSourceForValue
                  ? name
                  : name[source || "productName"]
              }
              style={getStyles(name, personName, theme)}
              sx={{ textTransform: "capitalize" }}
            >
              {name[source || "productName"]}
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled value="No option found">
            {"No option found"}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  );
};

export default AjChipDropdown;
