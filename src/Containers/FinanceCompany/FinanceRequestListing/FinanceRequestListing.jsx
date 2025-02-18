import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjDialog from "../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../Components/AjFilters/AjFilters";
import AjInputBase from "../../../Components/AjInputBase";
import ActiveClosedRequestsListing from "../ActiveClosedRequestsListing/ActiveClosedRequestsListing";

import filterIcon from "../../../Assets/Images/filterIcon.png";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import { getFinanceRequestsListAction } from "../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { styles as customSeachFilterStyles } from "../../Admin/MasterManagement/MasterManagementStyles";

const FinanceRequestListing = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();

  const [dataInfo, setDataInfo] = useState(null);
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [searchedData, setSearchedData] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
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
    setSearchedData("");
    setDataInfo({});
  };
  const filterChanged = (data) => {
    setDataInfo(data);
  };

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      status: activeTab !== 1 ? "ACTIVE" : "CLOSED",
    };
    if (dataInfo?.inputs?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo.inputs),
      };
    }

    if (searchedData?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        itemName: searchedData,
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }

    dispatch(getFinanceRequestsListAction(searchObject));
  }, [query, dataInfo, onSearchClick]);
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
          <AjInputBase
            value={searchedData}
            onKeyPress={onEnterKeyPress}
            onChange={handleTextChange}
            styleData={{
              ...customCommonStyles.filterInputBaseStyle,
              ...customSeachFilterStyles.customWidth,
              ...customSeachFilterStyles.customHeight,
            }}
            placeholder="Search by association,product or input name"
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
        </Grid>
        <ActiveClosedRequestsListing
          query={query}
          setQuery={setQuery}
          dataInfo={dataInfo}
          searchClick={onSearchClick}
          searchedData={searchedData}
          activeTab={activeTab}
        />
      </Box>
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dataInfo}
          productFilter={true}
          productLabelStyle={commonStyles.productLabelStyle}
          inputFilter={true}
        />
      </AjDialog>
    </>
  );
};
export default FinanceRequestListing;
