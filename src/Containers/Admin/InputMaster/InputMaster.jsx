import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

import { ADD_INPUT } from "../../../Routes/Routes";
import InputMasterListing from "./InputMasterListing/InputMasterListing";

export default function InputMaster() {
  const inputList = useSelector((state) => state.inputMaster.inputList);
  const navigate = useNavigate();

  const [searchInput, setsearchInput] = useState("");
  const [onSearchClick, setonSearchClick] = useState(true);

  const handleonSearchClick = () => {
    setonSearchClick((prev) => !prev);
  };
  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setonSearchClick((prev) => !prev);
    }
  };
  const handleChange = (e) => {
    setsearchInput(e.target.value);
    if (e.target.value.length === 0) {
      setonSearchClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <Typography sx={commonStyles.tableText}>
              Inputs({inputList?.totalCount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
            }}
            displayText="Add Input"
            onClick={() => navigate(ADD_INPUT)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              value={searchInput}
              onKeyPress={onEnterKeyPress}
              onChange={handleChange}
            styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by name"
              name="search by  name"
              endIcon={
                <Box
                  sx={customCommonStyles.iconBox}
                  onClick={handleonSearchClick}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <InputMasterListing
            searchClick={onSearchClick}
            searchText={searchInput}
          />
        </Box>
      </Grid>
    </>
  );
}
