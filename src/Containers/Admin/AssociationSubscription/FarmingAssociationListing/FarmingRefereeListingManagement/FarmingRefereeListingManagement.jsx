import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../../../Components/AjInputBase";

import FarmingRefereeListing from "./FarmingRefereeListing/FarmingRefereeListing";
import { commonStyles,customCommonStyles } from "../../../../../../Style/CommonStyle";
import { refreeListingStyles } from "./FarmingRefereeListing/FarmingRefereeListingStyles";

const FarmingRefereeListingManagement = () => {
  
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);

  const farmingRefereeList = useSelector(
    (state) => state.userManagementAssociationDetails.farmerRefereeList
  );

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearchClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchedData(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchClick((prev) => !prev);
    }
  };

  return (
    <Grid
      sx={[
        refreeListingStyles.refereeListingContainer,
        refreeListingStyles.refereeContainer,
      ]}
    >

      <Grid sx={refreeListingStyles.countSearchBox}>
        <Box
          sx={{ ...customCommonStyles.headerBox, ...refreeListingStyles.countBox }}
        >
          <Typography sx={commonStyles.tableText}>
            Farmers({farmingRefereeList?.farmercount})
          </Typography>
          <Typography sx={commonStyles.tableText}>
            Referees({farmingRefereeList?.refereecount})
          </Typography>
        </Box>
        <Box sx={refreeListingStyles.searchTable}>
          <Grid container item sx={refreeListingStyles.searchBar}>
            <AjInputBase
              value={searchedData}
              onKeyPress={onEnterKeyPress}
              onChange={handleTextChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by farmer, referee name"
              name="search by name"
              endIcon={
                <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <FarmingRefereeListing
            searchText={searchedData}
            searchClick={onSearchClick}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default FarmingRefereeListingManagement;
