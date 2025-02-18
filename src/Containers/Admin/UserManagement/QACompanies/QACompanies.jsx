import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../../Components/AjButton";
import AjInputBase from "../../../../Components/AjInputBase";
import QACompaniesListing from "./QACompaniesListing/QACompaniesListing";

import { ADMIN_ADD_QA_COMPANIES } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const QACompanies = () => {
  const navigate = useNavigate();

  const qaCompaniesList = useSelector((state) => state.companies.companies);

  const [searchQAValue, setSearchQAValue] = useState("");
  const [searchQAClick, setSearchQAClick] = useState(true);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchQAClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setSearchQAClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchQAValue(e.target.value);
    if (e.target.value.length === 0) {
      setSearchQAClick((prev) => !prev);
    }
  };

  return (
    <Grid container sx={customCommonStyles.mainContainer}>
      <Grid item sx={customCommonStyles.subContainer}>
        <Box sx={customCommonStyles.headerBox}>
          <Typography sx={commonStyles.tableText}>
            QA Companies ({qaCompaniesList?.totalcount})
          </Typography>
        </Box>
        <AjButton
          variant="text"
          styleData={{
            ...customCommonStyles.addButtonStyle,
            ...customCommonStyles.widthNone,
          }}
          displayText="Add QA Company"
          onClick={() => navigate(ADMIN_ADD_QA_COMPANIES)}
        />
      </Grid>
      <Box sx={customCommonStyles.subContentBox}>
        <Grid item sx={customCommonStyles.subHeaderStyle}>
          <AjInputBase
            value={searchQAValue}
            onKeyPress={onEnterKeyPress}
            onChange={handleTextChange}
            styleData={customCommonStyles.filterInputBaseStyle}
            placeholder="Search by name"
            name="Search by QA company name"
            endIcon={
              <Box sx={customCommonStyles.iconBox} onClick={handleSearch}>
                <SearchIcon sx={customCommonStyles.searchIcon} />
              </Box>
            }
          />
        </Grid>
        <QACompaniesListing
          searchText={searchQAValue}
          searchClick={searchQAClick}
        />
      </Box>
    </Grid>
  );
};

export default QACompanies;
