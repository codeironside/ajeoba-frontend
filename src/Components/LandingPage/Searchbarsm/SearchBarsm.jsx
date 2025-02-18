import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, styled, alpha, InputBase } from "@mui/material";
import { customCommonStyles } from "../../../Style/CommonStyle";
import { activeAdsStyles } from "../../../Containers/CorporateBuyers/Trading/ActiveAds/ActiveAdsStyle";
import { styles as customSeachFilterStyles } from "../../../Containers/Admin/MasterManagement/MasterManagementStyles";
import AjInputBase from "../../AjInputBase";

const SearchBarsm = ({
  searchText,
  onEnterPress,
  handleSearchTextChange,
  handleSearchFilter,
}) => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto",
          paddingTop: "1rem",
          width: "90%",
        }}
      >
        <AjInputBase
          name="search by name"
          value={searchText}
          onKeyPress={onEnterPress}
          onChange={handleSearchTextChange}
          styleData={{
            ...customCommonStyles.filterInputBaseStyleLandingSm,
            ...customSeachFilterStyles.customHeightLandingPagesm,
            ...customSeachFilterStyles.customWidth,
            ...activeAdsStyles.customWidthStyle,
          }}
          placeholder="Search products..."
          endIcon={
            <Box
              sx={{
                ...customCommonStyles.iconBoxLandingPageSm,
                ...customSeachFilterStyles.customHeightLandingPagesm,
              }}
              onClick={handleSearchFilter}
            >
              <SearchIcon sx={customCommonStyles.searchIconLanindingPage} />
            </Box>
          }
        />
      </Box>
    </div>
  );
};

export default SearchBarsm;
