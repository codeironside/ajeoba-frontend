import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../../Components/AjButton";
import AjInputBase from "../../../../Components/AjInputBase";
import { ADMIN_ADD_AGGREGATOR } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import AggregatorsListing from "./AggregatorListing/AggregatorListing";

export default function Aggregators() {
  const aggregatorsList = useSelector(
    (state) => state.aggregators.aggregatorsList
  );
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState("");
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
    setSearchName(e.target.value);
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
              Aggregators({aggregatorsList?.totalcount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...customCommonStyles.widthNone,
            }}
            displayText="Add Aggregator"
            onClick={() => navigate(ADMIN_ADD_AGGREGATOR)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              placeholder="Search by name"
              value={searchName}
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
          <AggregatorsListing onClick={searchClick} searchName={searchName} />
        </Box>
      </Grid>
    </>
  );
}
