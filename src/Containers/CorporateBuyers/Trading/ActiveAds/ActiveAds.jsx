import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Skeleton } from "@mui/material";
import AjInputBase from "../../../../Components/AjInputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import { styles } from "../../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles.js";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";
import TradingActiveAdsListing from "./TradingActiveAdsListing/TradingActiveAdsListing";
import CustomPagination from "../../../../Components/CustomPagination/CustomPagination";
import { CARD_LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { activeAdsStyles } from "./ActiveAdsStyle";
import { useDispatch, useSelector } from "react-redux";
import { getTradingActiveAdsAction } from "../../../../Redux/CorporateBuyer/Trading/tradingActions";
import { isTextValid } from "../../../../Services/commonService/commonService";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";

const ActiveAds = () => {
  const [query, setQuery] = useState({ limit: CARD_LIMIT, skip: SKIP });
  const [searchClick, setSearchClick] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});

  const dispatch = useDispatch();

  const tradingActiveAdsData  = useSelector(
    (state) => state?.tradingActiveAds?.tradingActiveAdsData
  );

  const loading = useSelector(
    (state) => state?.tradingActiveAds.loading
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (dataInfo?.certificate?.length) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        certifications: JSON.stringify(dataInfo.certificate),
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (dataInfo?.states?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        state: JSON.stringify(dataInfo.states),
      };
    }
    if (dataInfo?.country) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        country: [dataInfo.country],
      };
    }
    if (dataInfo?.productType) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        productType: dataInfo.productType,
      };
    }
    if (dataInfo?.rating) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        rating: dataInfo.rating,
      };
    }
    if (searchText.length) {
      searchObject = {
        ...searchObject,
        limit: CARD_LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getTradingActiveAdsAction(searchObject));
  }, [query, dataInfo, searchClick]);

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
  const handleResetFilter = () => {
    setSearchText("");
    setDataInfo({});
  };
  const filterChanged = (data) => {
    setDataInfo(data);
  };

  return (
    <>
      <Box
        sx={{
          ...customCommonStyles.subContentCorporateBox,
          ...styles.listingMargin,
          // ...activeAdsStyles.heightContainerCorporate,
        }}
      >
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle2,
            ...styles.listingMarginTop,
            ...activeAdsStyles.searchContainer,
          }}
        >
          <AjInputBase
            name="search by name"
            value={searchText}
            onKeyPress={onEnterPress}
            onChange={handleSearchTextChange}
            styleData={{
              ...customCommonStyles.filterInputBaseStyle,
              ...customSeachFilterStyles.customHeight,
              ...customSeachFilterStyles.customWidth,
              ...activeAdsStyles.customWidthStyle,
            }}
            placeholder="Search by name or city"
            endIcon={
              <Box
                sx={{
                  ...customCommonStyles.iconBox,
                  ...customSeachFilterStyles.customHeight,
                }}
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
            onClick={handleResetFilter}
          >
            Clear all filter
          </Typography>
        </Grid>
        <Box
          sx={
            tradingActiveAdsData?.totalCount &&
            activeAdsStyles.activeAdsContainerCorporate
          }
        >
          <TradingActiveAdsListing dataToList={tradingActiveAdsData} loading={loading} />
        </Box>
        {loading ? 
          <Skeleton 
            sx={{
              bgcolor: "rgba(245, 245, 245, 1)",
              borderRadius: ".5rem",
              margin: "8px auto",
            }}
            variant="rectangular" 
            width={"30%"} 
            height={46} /> : !!tradingActiveAdsData?.totalCount && (
            <CustomPagination
              totalCount={tradingActiveAdsData?.totalCount}
              query={query}
              setQuery={setQuery}
              customLimit={CARD_LIMIT}
            />
        )}
        <AjDialog
          open={openFilter}
          closeModal={setOpenFilter}
          title={"Filter"}
          styleData={activeAdsStyles.dialogContainer}
        >
          <AjFilters
            filterSelected={filterChanged}
            cancel={setOpenFilter}
            filterData={dataInfo}
            certificateFilter={true}
            countryFilter={true}
            stateFilter={true}
            productTypeFilter={true}
            ratingFilter={true}
            productLabelStyle={commonStyles.productLabelStyle}
            productTypeStyle={commonStyles.productTypeStyle}
          />
        </AjDialog>
      </Box>
    </>
  );
};

export default ActiveAds;