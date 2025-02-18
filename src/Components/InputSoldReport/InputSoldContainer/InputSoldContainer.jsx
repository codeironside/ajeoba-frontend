import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../Assets/Images/filterIcon.png";

import InputSoldListing from "../InputSoldListing/InputSoldListing";
import AjInputBase from "../../AjInputBase";
import AjFilters from "../../AjFilters/AjFilters";
import AjDialog from "../../AjDialog/AjDialog";
import AjExportExcelCsv from "../../AjExportExcelCsv/AjExportExcelCsv";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import InputReportsListing from "../../InputListing/InputReportsListing";
import { ROLES } from "../../../Constant/RoleConstant";
import { getUserData } from "../../../Services/localStorageService";

//inputPurchased and InputSoldContainer
const InputSoldContainer = (props) => {
  const [searchedData, setSearchedData] = useState("");
  const [dataLength, setDataLength] = useState(0);
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const inputList = useSelector((state) => state.reports.inputList);
  const inputReportsList = useSelector(
    (state) => state.inputSupplierReports.inputSupplierReportsList
  );
  const roleId = getUserData().role_id;

  useEffect(() => {
    if (inputReportsList?.data) {
      setDataLength(inputReportsList?.data?.totalCount);
    } else {
      setDataLength(inputList?.data?.totalCount);
    }
  }, [inputReportsList, inputList]);

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
    setDataInfo({});
  };

  const filterChanged = (data) => {
    setDataInfo(data);
  };

  const getExportUrl = () => {
    if (
      roleId === ROLES.FARMING_ASSOCIATION &&
      props.type === "inputPurchased"
    ) {
      return "/api/export/report/input-purchased";
    }

    if (roleId === ROLES.INPUT_SUPPLIER) {
      if (props.type === "inputSold") return "/api/export/report/input-sold";
      else return "/api/export/report/input-aggregated";
    }
    if (roleId === ROLES.SUPER_ADMIN || roleId === ROLES.ADMIN) {
      if (props.type === "inputPurchased")
        return "/api/export/admin/report/input-purchased";
      else return "/api/export/admin/report/input-sold";
    }
  };

  return (
    <Box
      sx={{
        ...customCommonStyles.subContentBox,
        ...commonStyles.marginTop0,
        ...commonStyles.responsiveNegativeMargin,
      }}
    >
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
          totalCount={dataLength}
          url={getExportUrl()}
          dataInfo={dataInfo}
          searchData={searchedData}
        />
      </Box>

      {props.type === "inputSold" || props.type === "inputAggregated" ? (
        <InputSoldListing
          searchText={searchedData}
          searchClick={onSearchClick}
          type={props.type}
          name={props?.name}
          dataInfo={dataInfo}
        />
      ) : (
        <InputReportsListing
          searchText={searchedData}
          searchClick={onSearchClick}
          type={props.type}
          dataInfo={dataInfo}
        />
      )}
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dataInfo}
          inputFilter={true}
        />
      </AjDialog>
    </Box>
  );
};

export default InputSoldContainer;
