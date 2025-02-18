import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import filterIcon from "../../../Assets/Images/filterIcon.png";
import logisticAdsLogo from "../../../Assets/Images/logisticsActiveGreen.svg";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import AjInputBase from "../../../Components/AjInputBase";
import { getUserData } from "../../../Services/localStorageService";
import LogisticAdsListing from "./LogisticAdsListing/LogisticAdsListing";

import { adTypeOptions } from "../../../Constant/AppConstant";
import { ROLES } from "../../../Constant/RoleConstant";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./LogisticsStyles";

const Logistics = () => {
  const userData = getUserData();

  const [logisticSearchText, setLogisticSearchText] = useState("");
  const [logisticSearchClick, setLogisticSearchClick] = useState(true);
  const [logisticOpenFilter, setLogisticOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});

  const logisticAdsList = useSelector(
    (state) => state.logisticAds.logisticAdsList
  );

  const handleClearFilter = () => {
    setLogisticSearchText("");
    setDataInfo({});
  };

  const filterChanged = (data) => {
    setDataInfo(data);
  };

  const onQaEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setLogisticSearchClick((prev) => !prev);
    }
  };
  const handleSearchFilter = () => {
    setLogisticSearchClick((prev) => !prev);
  };

  const handleQaSearchTextChange = (e) => {
    setLogisticSearchText(e.target.value);
    if (e.target.value.length === 0) {
      setLogisticSearchClick((prev) => !prev);
    }
  };
  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img
              src={logisticAdsLogo}
              alt="logistic-ads"
              style={styles.logisticAdsImage}
            />
            <Typography sx={commonStyles.tableText}>
              Logistic ads({logisticAdsList?.totalCount})
            </Typography>
          </Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              name="search by name"
              value={logisticSearchText}
              onKeyPress={onQaEnterPress}
              onChange={handleQaSearchTextChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by Order Id"
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
                sx={customCommonStyles.filterIcon}
                src={filterIcon}
                component="img"
                onClick={() => setLogisticOpenFilter(true)}
              />
            </Grid>
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleClearFilter}
            >
              Clear all filter
            </Typography>
          </Grid>
          <LogisticAdsListing
            dataInfo={dataInfo}
            searchText={logisticSearchText}
            searchClick={logisticSearchClick}
          />
        </Box>
      </Grid>
      <AjDialog
        open={logisticOpenFilter}
        closeModal={setLogisticOpenFilter}
        title={"Filter"}
      >
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setLogisticOpenFilter}
          filterData={dataInfo}
          productsBasedOnUserProfile={
            userData.role_id === ROLES.INPUT_SUPPLIER ? false : true
          }
          productFilter={
            userData.role_id === ROLES.INPUT_SUPPLIER ? false : true
          }
          statusFilter
          inputFilter={userData.role_id === ROLES.INPUT_SUPPLIER ? true : false}
          inputsBasedOnUserProfile={
            userData.role_id === ROLES.INPUT_SUPPLIER ? true : false
          }
          adTypeOptions={adTypeOptions}
          productTypeStyle={commonStyles.productTypeStyle}
        />
      </AjDialog>
    </>
  );
};

export default Logistics;
