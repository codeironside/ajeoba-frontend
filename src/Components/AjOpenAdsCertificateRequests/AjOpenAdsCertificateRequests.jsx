import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { customCommonStyles, commonStyles } from "../../Style/CommonStyle";
import AjInputBase from "../AjInputBase";
import AjDialog from "../AjDialog/AjDialog";
import AjFilters from "../AjFilters/AjFilters";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../Assets/Images/filterIcon.png";
import CustomPagination from "../CustomPagination/CustomPagination";
import { isTextValid } from "../../Services/commonService/commonService";

const AjOpenAdsCertificateRequests = (props) => {
  const {
    pageHeading,
    children,
    logo,
    setDataInfo,
    setSearchClick,
    setSearchText,
    setOpenFilter,
    searchText,
    dataInfo,
    openFilter,
    containerHeight,
    pagination,
    totalCount,
    query,
    setQuery,
  } = props;

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
    if (isTextValid(e.target.value)) {
      setSearchText(e.target.value);
      if (e.target.value.length === 0) {
        setSearchClick((prev) => !prev);
      }
    }
  };
  const handleClearFilter = () => {
    setSearchText("");
    setDataInfo({});
  };
  const filterChanged = (data) => {
    setDataInfo(data);
  };

  return (
    <>
      <Grid container sx={customCommonStyles.mainContainer}>
        <Grid item sx={customCommonStyles.subContainer}>
          <Box sx={customCommonStyles.headerBox}>
            <img src={logo} style={{ marginRight: "0.75rem" }} />
            <Typography
              sx={commonStyles.tableText}
            >{`${pageHeading}(${totalCount})`}</Typography>
          </Box>
        </Grid>
        <Box
          sx={[
            customCommonStyles.subContentBox,
            customCommonStyles.subContentContainerCustom,
          ]}
        >
          <Grid item sx={customCommonStyles.subHeaderStyle}>
            <AjInputBase
              name="search by name"
              value={searchText}
              onKeyPress={onEnterPress}
              onChange={handleSearchTextChange}
              styleData={customCommonStyles.filterInputBaseStyle}
              placeholder="Search by product name"
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
          <Box sx={containerHeight}>{children}</Box>
          {pagination && !!totalCount && (
            <CustomPagination
              totalCount={totalCount}
              query={query}
              setQuery={setQuery}
            />
          )}
        </Box>
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dataInfo}
            certificateFilter={true}
            productFilter={true}
            productLabelStyle={commonStyles.productLabelStyle}
          />
        </AjDialog>
      </Grid>
    </>
  );
};

export default AjOpenAdsCertificateRequests;
