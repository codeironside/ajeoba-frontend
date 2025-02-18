import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Grid, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import AggregationListing from "../Aggregation/AggregationListing/AggregationListing";

import aggregation_listing from "../../../Assets/Images/aggregation_listing.svg";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import { ADD_AGGREGATION } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./AggregationListing/AggregationListingStyle";
import { getUserData } from "../../../Services/localStorageService";
import { ROLES } from "../../../Constant/RoleConstant";

const Aggregation = () => {
  const navigate = useNavigate();
  const userData = getUserData();

  const [searchByName, setSearchByName] = useState("");
  const [searchByClick, setSearchByClick] = useState(true);
  const [openFilters, setOpenFilters] = useState(false);
  const [dateInformation, setDateInformation] = useState({});
  const aggregationList = useSelector(
    (state) => state.aggregation.aggregationList
  );
  const aggregationInputList = useSelector(
    (state) => state.aggregation.aggregationInputList
  );

  const handleResetFilters = () => {
    setSearchByName("");
    setDateInformation({});
  };

  const changedFilters = (data) => {
    setDateInformation(data);
  };

  const handleKeyPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchByClick((prev) => !prev);
    }
  };
  const handleSearched = () => {
    setSearchByClick((prev) => !prev);
  };
  const handleNameChanged = (e) => {
    setSearchByName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchByClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img
              src={aggregation_listing}
              style={{ marginBottom: "0.375rem" }}
            />
            <Typography sx={commonStyles.tableText}>
              Aggregations(
              {userData.role_id !== ROLES.INPUT_SUPPLIER
                ? aggregationList?.result?.totalcount
                : aggregationInputList?.result?.totalcount}
              )
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...styles.customBtnWidth,
            }}
            displayText="Add aggregation"
            onClick={() => navigate(ADD_AGGREGATION)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              placeholder={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? "Search by input"
                  : "Search by farmer"
              }
              value={searchByName}
              onKeyPress={handleKeyPressed}
              onChange={handleNameChanged}
              styleData={customCommonStyles.filterInputBaseStyle}
              name="search by name"
              endIcon={
                <Box sx={customCommonStyles.iconBox} onClick={handleSearched}>
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
            <Grid>
              <Typography
                component="img"
                src={filterIcon}
                sx={customCommonStyles.filterIcon}
                onClick={() => setOpenFilters(true)}
              />
            </Grid>
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleResetFilters}
            >
              Clear all filter
            </Typography>
          </Grid>
          <AggregationListing
            dataInfo={dateInformation}
            searchByName={searchByName}
            onClick={searchByClick}
          />
        </Box>
      </Grid>
      <AjDialog
        open={openFilters}
        closeModal={setOpenFilters}
        title={"Filter"}
        styleData={{ height: "calc(100vh - 3.125rem)" }}
      >
        <AjFilters
          dateFilter
          productFilter={
            userData.role_id === ROLES.INPUT_SUPPLIER ? false : true
          }
          qualityFilter={
            userData.role_id === ROLES.INPUT_SUPPLIER ? false : true
          }
          inputFilter={userData.role_id === ROLES.INPUT_SUPPLIER ? true : false}
          countryFilter
          stateFilter
          filterSelected={changedFilters}
          cancel={setOpenFilters}
          filterData={dateInformation}
        />
      </AjDialog>
    </>
  );
};

export default Aggregation;
