import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import FarmingAssociationListing from "./FarmingAssociationListing/FarmingAssociationListing";
import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import { ADMIN_ADD_FARMING_ASSOCIATION } from "../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../Style/CommonStyle";

export default function FarmingAssociation() {
  const farmingAssociationList = useSelector(
    (state) => state.farmingAssociation.farmingAssociationList
  );
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setSearchClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchValue(e.target.value);
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
              Associations({farmingAssociationList?.totalcount})
            </Typography>
          </Box>
          <Typography sx={commonStyles.tableText}>
          Farming Association's Subscription List
            </Typography>
        </Grid>

        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              value={searchValue}
              onKeyPress={onEnterKeyPress}
              onChange={handleTextChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by association name"
              name="search by name"
              endIcon={
                <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <FarmingAssociationListing
            searchText={searchValue}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
    </>
  );
}
