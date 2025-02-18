import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../Assets/Images/filterIcon.png";
import ProductsSoldListing from "../ProductsSoldListing/ProductsSoldListing";
import AjInputBase from "../../AjInputBase";
import AjFilters from "../../AjFilters/AjFilters";
import AjDialog from "../../AjDialog/AjDialog";
import AjExportExcelCsv from "../../AjExportExcelCsv/AjExportExcelCsv";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { getUserData } from "../../../Services/localStorageService";
import { ROLES } from "../../../Constant/RoleConstant";

//productsSold and products aggregated in farming asociation
const ProductsSoldContainer = (props) => {
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const userData = getUserData();

  const reportList = useSelector((state) =>
    userData?.role_id === ROLES.FARMING_ASSOCIATION ||
    userData?.role_id === ROLES.PRODUCT_AGGREGATOR
      ? state.reports.productList
      : state.reportsAdmin.adminReportsList
  );

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

  const getExportUrl = (type) => {
    if (
      userData?.role_id === ROLES.FARMING_ASSOCIATION ||
      ROLES.PRODUCT_AGGREGATOR === userData?.role_id
    ) {
      if (type === "productSold") {
        return "/api/export/report/product-sold";
      } else return "/api/export/report/product-aggregated";
    }
    if (
      userData?.role_id === ROLES.ADMIN ||
      ROLES.SUPER_ADMIN === userData?.role_id
    ) {
      if (type === "productSold") {
        return "/api/export/admin/report/product-sold";
      } else return "/api/export/admin/report/product-aggregated";
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
          totalCount={reportList?.data?.totalCount}
          url={getExportUrl(props.type)}
          dataInfo={dataInfo}
          searchData={searchedData}
        />
      </Box>
      <ProductsSoldListing
        searchText={searchedData}
        searchClick={onSearchClick}
        type={props.type}
        dataInfo={dataInfo}
      />
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dataInfo}
          productFilter={true}
        />
      </AjDialog>
    </Box>
  );
};

export default ProductsSoldContainer;
