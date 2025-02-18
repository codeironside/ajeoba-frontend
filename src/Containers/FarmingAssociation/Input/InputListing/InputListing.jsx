import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AjInputBase from "../../../../Components/AjInputBase";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";
import AjInputActiveAdsListing from "../../../../Components/AjInputActiveAdsListing/AjInputActiveAdsListing";

import {
  LIMIT,
  SKIP,
  productOrderStatusOptions,
} from "../../../../Constant/AppConstant";
import filterIcon from "../../../../Assets/Images/filterIcon.png";

import {
  customCommonStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../Inventory/AvailableInventory/AvailableInventoryStyles";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";
import AjInputPurchasedOrdersListing from "../../../../Components/AjInputPurchasedOrdersListing/AjInputPurchasedOrdersListing";

const InputListing = (props) => {
  const { activeTab } = props;

  const [openFilter, setOpenFilter] = useState(false);
  const [searchedData, setSearchedData] = useState("");
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [dataInfo, setDataInfo] = useState(null);
  const [inputOrderStatus, setInputOrderStatus] = useState();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  localStorage.setItem("input_buyer", "input_buyer");

  const handleTextChange = (e) => {
    setSearchedData(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearchClick((prev) => !prev);
    }
  };

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearchClick((prev) => !prev);
    }
  };
  const handleSearch = () => {
    setOnSearchClick((prev) => !prev);
  };
  const handleResetFilter = () => {
    setDataInfo({});
    searchedData("");
  };
  const filterChanged = (data) => {
    setDataInfo(data);
  };
  const inputOrderStatusChangeHandler = (e, selectedStatus) => {
    if (selectedStatus.props.value !== "ALL") {
      let selectedValue = productOrderStatusOptions.find(
        (item) => item.value === selectedStatus.props.value.value
      );
      setInputOrderStatus(selectedValue);
    } else {
      setInputOrderStatus(null);
    }
  };

  return (
    <>
      <Box
        sx={[
          customCommonStyles.subContentBox,
          inventoryStyles.listingMargin,
          inventoryStyles.marketPlaceHeight,
          customCommonStyles.inputHeight,
        ]}
      >
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...customSeachFilterStyles.paddingStyle,
          }}
        >
          {activeTab === 0 ? (
            <>
              <AjInputBase
                value={searchedData}
                onKeyPress={onEnterKeyPress}
                onChange={handleTextChange}
                styleData={{
                  ...customCommonStyles.filterInputBaseStyle,
                  ...customSeachFilterStyles.customWidth,
                  ...customSeachFilterStyles.customHeight,
                }}
                placeholder="Search by name"
                name="search by name"
                endIcon={
                  <Box
                    sx={{
                      ...customCommonStyles.iconBox,
                      ...customSeachFilterStyles.customHeight,
                    }}
                    onClick={handleSearch}
                  >
                    <SearchIcon sx={customCommonStyles.searchIcon} />
                  </Box>
                }
              />
              <Grid>
                <Typography
                  component="img"
                  src={filterIcon}
                  onClick={() => setOpenFilter(true)}
                  sx={customCommonStyles.filterIcon}
                />
              </Grid>
              <Typography
                onClick={handleResetFilter}
                sx={customCommonStyles.clearFilterStyle}
              >
                Clear all filter
              </Typography>
            </>
          ) : (
            <Grid>
              <AjDropDown
                value={inputOrderStatus?.label}
                onChange={inputOrderStatusChangeHandler}
                options={productOrderStatusOptions}
                defaultValue="All"
                source="label"
                placeHolder="Select Status"
                styleData={{
                  ...inventoryStyles.filterDropdown,
                }}
                disableSourceForValue
              />
            </Grid>
          )}
        </Grid>
        {activeTab !== 1 && (
          <AjInputActiveAdsListing
            query={query}
            setQuery={setQuery}
            searchClick={onSearchClick}
            searchText={searchedData}
            dataInfo={dataInfo}
          />
        )}
        {activeTab === 1 && (
          <AjInputPurchasedOrdersListing
            query={query}
            setQuery={setQuery}
            inputOrderStatus={inputOrderStatus}
          />
        )}
        <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
          <AjFilters
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dataInfo}
            countryFilter={true}
            stateFilter={true}
            ratingFilter={true}
            countryLabelStyle={commonStyles.productLabelStyle}
          />
        </AjDialog>
      </Box>
    </>
  );
};

export default InputListing;
