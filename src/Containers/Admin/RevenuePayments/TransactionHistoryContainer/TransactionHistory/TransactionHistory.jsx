import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../../Components/AjInputBase";
import TransactionHistoryListing from "./TransactionHistoryListing/TransactionHistoryListing";

import {
  customCommonStyles,
  commonStyles,
} from "../../../../../Style/CommonStyle";

const TransactionHistory = () => {
  const [searchHistoryText, setSearchHistoryText] = useState("");
  const [searchHistoryClick, setSearchHistoryClick] = useState(true);

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchHistoryClick((prev) => !prev);
    }
  };
  const handleSearchHistoryFilter = () => {
    setSearchHistoryClick((prev) => !prev);
  };

  const handleSearchHistoryTextChange = (e) => {
    setSearchHistoryText(e.target.value);
    if (e.target.value.length === 0) {
      setSearchHistoryClick((prev) => !prev);
    }
  };

  return (
    <Box
      sx={{
        ...customCommonStyles.subContentBox,
        ...commonStyles.marginTop0,
        ...commonStyles.responsiveNegativeMargin,
      }}
    >
      <Grid
        item
        sx={{
          ...customCommonStyles.subHeaderStyle,
          ...commonStyles.reportsMarginPadding,
        }}
      >
        <AjInputBase
          name="search by name"
          value={searchHistoryText}
          onKeyPress={onEnterPress}
          onChange={handleSearchHistoryTextChange}
          styleData={customCommonStyles.filterInputBaseStyle}
          placeholder="Search by name"
          endIcon={
            <Box
              sx={customCommonStyles.iconBox}
              onClick={handleSearchHistoryFilter}
            >
              <SearchIcon sx={customCommonStyles.searchIcon} />
            </Box>
          }
        />
      </Grid>
      <TransactionHistoryListing
        searchText={searchHistoryText}
        searchClick={searchHistoryClick}
      />
    </Box>
  );
};

export default TransactionHistory;
