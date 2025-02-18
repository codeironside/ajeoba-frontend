import { Box, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../../Components/AjInputBase";
import TruckListing from "../../../../../Components/TruckListing/TruckListing";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { styles } from "./TruckListingViewStyles";
import { refreeListingStyles } from "../../FarmingAssociation/AssociationDetails/FarmingRefereeListingManagement/FarmingRefereeListing/FarmingRefereeListingStyles";

const TruckListingView = () => {
  const [searchedTruckData, setSearchedTruckData] = useState("");
  const [onSearchTruckClick, setOnSearchTruckClick] = useState(true);

  const truckList = useSelector((state) => state.logistics.truckList);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchTruckClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearchTruckClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchedTruckData(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchTruckClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
        }}
      >
        <Grid sx={[styles.truckContainer, styles.truckListingContainer]}>
          <Grid sx={refreeListingStyles.countSearchBox}>
            <Box
              sx={{
                ...customCommonStyles.headerBox,
                ...refreeListingStyles.countBox,
              }}
            >
              <Typography sx={commonStyles.tableText}>
                Trucks({truckList?.totalCount})
              </Typography>
            </Box>
            <Box sx={refreeListingStyles.searchTable}>
              <Grid container item sx={refreeListingStyles.searchBar}>
                <AjInputBase
                  value={searchedTruckData}
                  onKeyPress={onEnterKeyPress}
                  onChange={handleTextChange}
                  styleData={customCommonStyles.filterInputBaseStyle}
                  placeholder="Search by truck model or registration number"
                  name="search by name"
                  endIcon={
                    <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                      <SearchIcon sx={customCommonStyles.searchIcon} />
                    </Box>
                  }
                />
              </Grid>
              <TruckListing
                searchByTruckInfo={searchedTruckData}
                onClick={onSearchTruckClick}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TruckListingView;
