import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjButton from "../../../Components/AjButton";
import AjInputBase from "../../../Components/AjInputBase";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import qaAdsLogo from "../../../Assets/Images/guarantee.svg";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import { CREATE_ADS } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import QaAdsListing from "./QaAdsListing/QaAdsListing";

export default function QaAds() {
  const [qaSearchText, setQaSearchText] = useState("");
  const [qaSearchClick, setQaSearchClick] = useState(true);

  const [qaOpenFilter, setQaOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});

  const qaAdsList = useSelector((state) => state.qaAds.qaAdsList);

  const navigate = useNavigate();
  const handleClearFilter = () => {
    setQaSearchText("");
    setDataInfo({});
  };

  const filterChanged = (data) => {
    setDataInfo(data);
  };

  const onQaEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setQaSearchClick((prev) => !prev);
    }
  };
  const handleSearchFilter = () => {
    setQaSearchClick((prev) => !prev);
  };

  const handleQaSearchTextChange = (e) => {
    setQaSearchText(e.target.value);
    if (e.target.value.length === 0) {
      setQaSearchClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img src={qaAdsLogo} alt="qa-ads" />
            <Typography sx={commonStyles.tableText}>
              QA ads({qaAdsList?.totalcount})
            </Typography>
          </Box>
          <AjButton
            variant="text"
            styleData={customCommonStyles.addButtonStyle}
            displayText="Create QA ad"
            onClick={() => navigate(CREATE_ADS)}
          />
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              name="search by name"
              value={qaSearchText}
              onKeyPress={onQaEnterPress}
              onChange={handleQaSearchTextChange}
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
                sx={customCommonStyles.filterIcon}
                src={filterIcon}
                component="img"
                onClick={() => setQaOpenFilter(true)}
              />
            </Grid>
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleClearFilter}
            >
              Clear all filter
            </Typography>
          </Grid>
          <QaAdsListing
            dataInfo={dataInfo}
            searchText={qaSearchText}
            searchClick={qaSearchClick}
          />
        </Box>
      </Grid>
      <AjDialog
        open={qaOpenFilter}
        closeModal={setQaOpenFilter}
        title={"Filter"}
      >
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setQaOpenFilter}
          filterData={dataInfo}
          certificateFilter={true}
          statusFilter={true}
          productTypeStyle={commonStyles.productTypeStyle}
        />
      </AjDialog>
    </>
  );
}
