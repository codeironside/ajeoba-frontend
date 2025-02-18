import React, { useState } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import filterIcon from "../../../Assets/Images/filterIcon.png";
import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjExportExcelCsv from "../../../Components/AjExportExcelCsv/AjExportExcelCsv";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import AjInputBase from "../../../Components/AjInputBase";
import HarvestListing from "./HarvestLisiting/HarvestListing";

import { useParams } from "react-router-dom";
import { FINANCE_REQUESTS } from "../../../Routes/Routes";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles } from "./HarvestInformationStyles";

const HarvestInformation = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { id, farmerId } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const harvestList = useSelector(
    (state) => state.financeCompanyRequests.financeRequestHarvestList
  );

  const [searchByProductName, setSearchByProductName] = useState("");
  const [searchByHarvestClick, setSearchByHarvestClick] = useState(true);
  const [openHarvestFilters, setOpenHarvestFilters] = useState(false);
  const [dateHarvestInformation, setDateHarvestInformation] = useState({});

  const handleResetHarvestFilters = () => {
    setSearchByProductName("");
    setDateHarvestInformation({});
  };

  const changedHarvestFilters = (data) => {
    setDateHarvestInformation(data);
  };

  const handleKeyHarvestPressed = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchByHarvestClick((prev) => !prev);
    }
  };
  const handleHarvestSearched = () => {
    setSearchByHarvestClick((prev) => !prev);
  };
  const handleNameHarvestChanged = (e) => {
    setSearchByProductName(e.target.value);
    if (e.target.value.length === 0) {
      setSearchByHarvestClick((prev) => !prev);
    }
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <IconButton
              disableRipple
              sx={{
                ...commonStyles.backButtonPosition,
                ...styles.backButtonHarvesting,
              }}
              onClick={() => {
                navigate(
                  `${FINANCE_REQUESTS}/additional-detail/${id}/farmer-detail/${farmerId}/?activeTab=${activeTab}`
                );
              }}
            >
              <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
            </IconButton>
            <Typography sx={commonStyles.tableText}>
              Harvest Information({harvestList?.totalCount})
            </Typography>
          </Box>
          <Box sx={styles.consistentLayoutHeight}></Box>
        </Grid>
        <Box sx={customCommonStyles.subContentBox}>
          <Box sx={styles.harvestInfoUpperContainer}>
            <Grid item sx={customCommonStyles.subHeaderStyle}>
              <AjInputBase
                name="search by name"
                value={searchByProductName}
                onKeyPress={handleKeyHarvestPressed}
                onChange={handleNameHarvestChanged}
                styleData={customCommonStyles.filterInputBaseStyle}
                placeholder="Search by product name"
                endIcon={
                  <Box
                    sx={customCommonStyles.iconBox}
                    onClick={handleHarvestSearched}
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
                  onClick={() => setOpenHarvestFilters(true)}
                />
              </Grid>
              <Typography
                sx={customCommonStyles.clearFilterStyle}
                onClick={handleResetHarvestFilters}
              >
                Clear all filter
              </Typography>
            </Grid>
            <AjExportExcelCsv
              totalCount={harvestList?.totalCount}
              url={`/api/export/finance-request/${id}/association/farmer/${farmerId}/harvest`}
              dataInfo={dateHarvestInformation}
              searchData={searchByProductName}
            />
          </Box>
          <HarvestListing
            id={id}
            farmerId={farmerId}
            dataInfo={dateHarvestInformation}
            searchByName={searchByProductName}
            onClick={searchByHarvestClick}
          />
        </Box>
      </Grid>
      <AjDialog
        open={openHarvestFilters}
        closeModal={setOpenHarvestFilters}
        title={"Filter"}
      >
        <AjFilters
          dateFilter={true}
          filterSelected={changedHarvestFilters}
          cancel={setOpenHarvestFilters}
          filterData={dateHarvestInformation}
          productFilter
        />
      </AjDialog>
    </>
  );
};

export default HarvestInformation;
