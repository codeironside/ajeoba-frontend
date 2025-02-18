import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../../../Assets/Images/filterIcon.png";
import ProductListing from "../../../../../Components/ProductsReport/ProductSoldDetailView/ProductSoldDetail/ProductDetailListing/ProductListing";

import AjInputBase from "../../../../../Components/AjInputBase";
import AjFilters from "../../../../../Components/AjFilters/AjFilters";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import {
  customCommonStyles,
  commonStyles,
} from "../../../../../Style/CommonStyle";
import AjExportExcelCsv from "../../../../../Components/AjExportExcelCsv/AjExportExcelCsv";
import { getUserData } from "../../../../../Services/localStorageService";
import { ROLES } from "../../../../../Constant/RoleConstant";

//product aggregation view more conatiner for productlisting that holds farmer level association level etc
const AggregatorListingDetailView = (props) => {
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const { id } = useParams();
  const roleId = getUserData().role_id;
  const reportViewMoreList = useSelector((state) =>
    roleId === ROLES.FARMING_ASSOCIATION
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

  const getExportUrl = () => {
    if (
      roleId === ROLES.FARMING_ASSOCIATION ||
      ROLES.PRODUCT_AGGREGATOR === roleId
    ) {
      if (props.isProductSold) {
        return "/api/export/report/product-sold";
      } else return "/api/export/report/product-aggregated";
    }
    if (roleId === ROLES.ADMIN || roleId === ROLES.SUPER_ADMIN) {
      if (props.isProductSold) {
        return "/api/export/admin/report/product-sold";
      } else return "/api/export/admin/report/product-aggregated";
    }
  };

  const getReqBodyForExport = () => {
    if (roleId === ROLES.FARMING_ASSOCIATION) {
      if (!props.isProductSold && props.activeTab === 2)
        return { isFarmerLevel: true, productId: id };
    }
    if (roleId === ROLES.ADMIN || roleId === ROLES.SUPER_ADMIN) {
      if (props.activeTab === 0)
        return { isAssociationLevel: true, productId: id };
      else if (props.activeTab === 1)
        return { isAggregationLevel: true, productId: id };
      else return { isFarmerLevel: true, productId: id };
    }
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
          {props.activeTab === 1
            ? `Aggregtors(${
                reportViewMoreList?.data?.totalCount
                  ? reportViewMoreList?.data?.totalCount
                  : 0
              })`
            : props.activeTab === 2
            ? `Farmer(${
                reportViewMoreList?.data?.totalCount
                  ? reportViewMoreList?.data?.totalCount
                  : 0
              })`
            : `Association(${
                reportViewMoreList?.data?.totalCount
                  ? reportViewMoreList?.data?.totalCount
                  : 0
              })`}
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
            totalCount={reportViewMoreList?.data?.totalCount}
            url={getExportUrl()}
            dataInfo={dataInfo}
            searchData={searchedData}
            reqBody={getReqBodyForExport()}
          />
        </Box>
        <ProductListing
          searchText={searchedData}
          searchClick={onSearchClick}
          activeTab={props.activeTab}
          dataInfo={dataInfo}
          type={props.isProductSold ? "productSold" : "productAggregated"}
        />
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            dateFilter={true}
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dataInfo}
            farmerNameFilter={props.activeTab === 2}
          />
        </AjDialog>
      </Box>
    </Grid>
  );
};

export default AggregatorListingDetailView;
