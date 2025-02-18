import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../Components/AjInputBase";
import { customCommonStyles } from "../../../../Style/CommonStyle";
import { ADMIN_ADD_CORPORATE_BUYER } from "../../../../Routes/Routes";
import CorporateBuyerListing from "./CorporateBuyerListing/CorporateBuyerListing";
import AjHeaderTextButton from "../../../../Components/AjHeaderTextButton/AjHeaderTextButton";

export default function CorporateBuyer() {
  const corporateBuyersList = useSelector(
    (state) => state.corporateBuyer.corporateBuyersList
  );

  const [searchValueText, setSearchValueText] = useState("");
  const [searchTextClick, setSearchTextClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchTextClick((prev) => !prev);
    }
  };
  const handleSearchClick = () => {
    setSearchTextClick((prev) => !prev);
  };
  const handleOnTextChange = (e) => {
    setSearchValueText(e.target.value);
    if (e.target.value.length === 0) {
      setSearchTextClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <AjHeaderTextButton
          changeNavigate={ADMIN_ADD_CORPORATE_BUYER}
          displayText="Corporate Buyers"
          displayTextButton="Add Corporate Buyer"
          displayTextButtonStyle={{
            ...customCommonStyles.addButtonStyle,
            ...customCommonStyles.widthNone,
          }}
          length={corporateBuyersList?.totalcount}
        />
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              onKeyPress={onEnterKeyPress}
              value={searchValueText}
              onChange={handleOnTextChange}
              name="search by name"
              placeholder="Search name"
              styleData={customCommonStyles.filterInputBaseStyle}
              endIcon={
                <Box
                  sx={customCommonStyles.iconBox}
                  onClick={handleSearchClick}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
          </Grid>
          <CorporateBuyerListing
            searchText={searchValueText}
            searchClick={searchTextClick}
          />
        </Box>
      </Grid>
    </>
  );
}
