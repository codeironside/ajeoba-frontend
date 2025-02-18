import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../../../Assets/Images/filterIcon.png";
import {
  customCommonStyles,
  commonStyles,
} from "../../../../../Style/CommonStyle";
import AjInputBase from "../../../../../Components/AjInputBase";
import AjFilters from "../../../../../Components/AjFilters/AjFilters";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import InputPurchasedInfoListing from "../../../../../Components/InputPurchasedInfoListing/InputPurchasedInfoListing";
import { useSelector } from "react-redux";
import AjExportExcelCsv from "../../../../../Components/AjExportExcelCsv/AjExportExcelCsv";
import { useParams } from "react-router-dom";

//input purchased view more container farming association
const InputPurchasedDetailViewAssociation = () => {
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dateData, setDateData] = useState({});
  const { id } = useParams();

  const supplierInfoList = useSelector((state) => state.reports.inputList);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearchClick((prev) => !prev);
  };
  const handleTextChange = (e) => {
    setSearchedData(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleClearFilter = () => {
    setSearchedData("");
    setDateData({});
  };

  const filterChanged = (data) => {
    setDateData(data);
  };

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
        ...commonStyles.flexStart,
      }}
    >
      <Box
        sx={{
          ...customCommonStyles.subContentBox,
          ...customCommonStyles.reportsSubContentBox,
        }}
      >
        <Typography
          sx={{
            ...commonStyles.tableText,
            ...commonStyles.reportsTableText,
          }}
        >
          {`Supplier level info (${supplierInfoList?.data?.totalCount || ""})`}
        </Typography>
        <Box sx={customCommonStyles.spaceBetweenFlex}>
          <Box
            item
            sx={{
              ...customCommonStyles.subHeaderStyle,
              ...commonStyles.reportsMarginPadding,
            }}
          >
            <AjInputBase
              value={searchedData}
              onKeyPress={onEnterKeyPress}
              onChange={handleTextChange}
              styleData={{
                ...customCommonStyles.filterInputBaseStyle,
                ...customCommonStyles.responsiveWidthInputBase,
              }}
              placeholder="Search by name"
              name="search by name"
              endIcon={
                <Box
                  sx={{
                    ...customCommonStyles.iconBox,
                  }}
                  onClick={handleSearch}
                >
                  <SearchIcon sx={customCommonStyles.searchIcon} />
                </Box>
              }
            />
            <Typography
              component="img"
              src={filterIcon}
              sx={customCommonStyles.filterIcon}
              onClick={() => setOpenFilter(true)}
            />
            <Typography
              sx={customCommonStyles.clearFilterStyle}
              onClick={handleClearFilter}
            >
              Clear all filter
            </Typography>
          </Box>
          <AjExportExcelCsv
            totalCount={supplierInfoList?.data?.totalCount}
            url={`/api/export/report/input-purchased`}
            dataInfo={dateData}
            searchData={searchedData}
            reqBody={{ isSupplierLevel: true, inputId: id }}
          />
        </Box>
        <InputPurchasedInfoListing
          dataInfo={dateData}
          searchClick={onSearchClick}
          searchText={searchedData}
        />
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            dateFilter={true}
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dateData}
            inputSupplierNameFilter={true}
          />
        </AjDialog>
      </Box>
    </Grid>
  );
};

export default InputPurchasedDetailViewAssociation;
