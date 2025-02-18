import React, { useState } from "react";
import { Box, Grid } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import RevenueListing from "./RevenueListing/RevenueListing";
import AjInputBase from "../../../../../Components/AjInputBase";

const Revenue = (props) => {
  const { level } = props;
  const [searchRevenueClick, setSearchRevenueClick] = useState(true);
  const [searchByName, setSearchByName] = useState(null);

  const enterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchRevenueClick((prev) => !prev);
    }
  };

  const handleClickOnSearch = () => {
    setSearchRevenueClick((prev) => !prev);
  };

  const handleSearchRevenue = (e) => {
    setSearchByName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchRevenueClick((prev) => !prev);
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
          value={searchByName}
          onKeyPress={enterKeyPress}
          onChange={handleSearchRevenue}
          styleData={customCommonStyles.filterInputBaseStyle}
          placeholder="Search by name"
          name="search by name"
          endIcon={
            <Box sx={customCommonStyles.iconBox} onClick={handleClickOnSearch}>
              <SearchIcon sx={customCommonStyles.searchIcon} />
            </Box>
          }
        />
      </Grid>
      <RevenueListing
        searchText={searchByName}
        searchClick={searchRevenueClick}
        level={level}
      />
    </Box>
  );
};

export default Revenue;
