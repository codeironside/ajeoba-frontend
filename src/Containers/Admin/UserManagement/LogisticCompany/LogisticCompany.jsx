import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Grid } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../Components/AjInputBase";
import { customCommonStyles } from "../../../../Style/CommonStyle";
import { ADMIN_ADD_LOGISTICS } from "../../../../Routes/Routes";
import LogisticCompanyListing from "./LogisticCompanyListing/LogisticCompanyListing";
import AjHeaderTextButton from "../../../../Components/AjHeaderTextButton/AjHeaderTextButton";

export default function LogisticCompany() {
  const logisticCompanyList = useSelector(
    (state) => state.logisticCommonData.logisticCompanies
  );

  const [searchName, setSearchName] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleSearchClick = () => {
    setOnSearchClick((prev) => !prev);
  };
  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <AjHeaderTextButton
          changeNavigate={ADMIN_ADD_LOGISTICS}
          displayText="Logistic Companies"
          displayTextButton="Add Logistic Company"
          displayTextButtonStyle={{
            ...customCommonStyles.addButtonStyle,
            ...customCommonStyles.widthNone,
          }}
          length={logisticCompanyList?.totalCount}
        />
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              onKeyPress={onEnterKeyPress}
              value={searchName}
              onChange={handleSearchNameChange}
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
          <LogisticCompanyListing
            searchText={searchName}
            searchClick={onSearchClick}
          />
        </Box>
      </Grid>
    </>
  );
}
