import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import RefereesListing from "./RefereesListing/RefereesListing";
import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import refreeLogo from "../../../Assets/Images/refreeLogo.svg";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import { ADD_REFEREES } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

export default function Referees() {
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const [openFilter, setOpenFilter] = useState(false);
  const [dateData, setDateData] = useState({});

  const refereeList = useSelector((state) => state.referee.refereeList);

  const navigate = useNavigate();

  const handleClearFilter = () => {
    setSearchText("");
    setDateData({});
  };

  const filterChanged = (data) => {
    setDateData(data);
  };

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearchFilter = () => {
    setSearchClick((prev) => !prev);
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
    if (e.target.value.length === 0) {
      setSearchClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
              <img src={refreeLogo} style={{marginBottom:'0.375rem'}}/>
            <Typography sx={commonStyles.tableText}>
              Referees({refereeList.totalCount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={customCommonStyles.addButtonStyle}
            displayText="Add Referee"
            onClick={() => navigate(ADD_REFEREES)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              name="search by name"
              value={searchText}
              onKeyPress={onEnterPress}
              onChange={handleSearchTextChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by name"
              endIcon={
                <Box
                  sx={customCommonStyles.iconBox}
                  onClick={handleSearchFilter}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
            <Grid>
              <Typography
                component="img"
                src={filterIcon}
                sx={customCommonStyles.filterIcon}
                onClick={() => setOpenFilter(true)}
              />
            </Grid>
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleClearFilter}
            >
              Clear all filter
            </Typography>
          </Grid>
          <RefereesListing
            dateData={dateData}
            searchText={searchText}
            searchClick={searchClick}
          />
        </Box>
      </Grid>
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dateData}
        />
      </AjDialog>
    </>
  );
}
