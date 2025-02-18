import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjButton from "../../../../Components/AjButton";
import AjInputBase from "../../../../Components/AjInputBase";
import InputSupplierListing from "./InputSupplierListing/InputSupplierListing";

import { ADMIN_INPUT_SUPPLIER_ADD } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const InputSupplier =()=> {
    
  const inputSupplierList = useSelector(
    (state) => state.inputSupplier.inputSupplierList
  );

  const navigate = useNavigate();

  const [inputSuplierName, setInputSupplier] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setSearchClick((prev) => !prev);
  };
  const handleNameChange = (e) => {
    setInputSupplier(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Input Supplier({inputSupplierList?.totalcount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...customCommonStyles.widthNone,
            }}
            displayText="Add Input Supplier"
            onClick={() => navigate(ADMIN_INPUT_SUPPLIER_ADD)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              placeholder="Search by name"
              value={inputSuplierName}
              onKeyPress={handleKeyPress}
              onChange={handleNameChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              name="search by name"
              endIcon={
                <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <InputSupplierListing
            onClick={searchClick}
            searchName={inputSuplierName}
          />
        </Box>
      </Grid>
    </>
  );
}

export default InputSupplier;