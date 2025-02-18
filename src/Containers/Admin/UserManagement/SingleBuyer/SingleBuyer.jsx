import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjButton from "../../../../Components/AjButton";
import AjInputBase from "../../../../Components/AjInputBase";

import { ADMIN_ADD_SINGLE_BUYER } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import SingleBuyerListing from "./SingleBuyerListing/SingleBuyerListing";

const SingleBuyer = () => {
  const navigate = useNavigate();

  const singleBuyerList = useSelector(
    (state) => state.singleBuyer.singleBuyerList
  );

  const [searchBuyerName, setSearchBuyerName] = useState("");
  const [searchBuyerClick, setSearchBuyerClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchBuyerClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setSearchBuyerClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchBuyerName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchBuyerClick((prev) => !prev);
    }
  };

  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Grid item sx={customCommonStyles.subContainer}>
        <Box sx={customCommonStyles.headerBox}>
          <Typography sx={commonStyles.tableText}>
            Single Buyer ({singleBuyerList?.totalcount})
          </Typography>
        </Box>
        <AjButton
          variant="text"
          styleData={{
            ...customCommonStyles.addButtonStyle,
            ...customCommonStyles.widthNone,
          }}
          displayText="Add Buyer"
          onClick={() => navigate(ADMIN_ADD_SINGLE_BUYER)}
        />
      </Grid>
      <Box sx={customCommonStyles.subContentBox}>
        <Grid item sx={customCommonStyles.subHeaderStyle}>
          <AjInputBase
            value={searchBuyerName}
            onKeyPress={onEnterKeyPress}
            onChange={handleTextChange}
            styleData={customCommonStyles.filterInputBaseStyle}
            placeholder="Search by name"
            name="Search by buyer name"
            endIcon={
              <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                <SearchIcon sx={customCommonStyles.searchIcon} />
              </Box>
            }
          />
        </Grid>
        <SingleBuyerListing
          searchText={searchBuyerName}
          searchClick={searchBuyerClick}
        />
      </Box>
    </Grid>
  );
};

export default SingleBuyer;
