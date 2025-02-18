import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import CustomPagination from "../../../CustomPagination/CustomPagination.jsx";
import { Box, Grid, Typography, useMediaQuery } from "@mui/material";
import {
  getProductListLandingPageAction,
  getInputListLandingPageAction,
} from "../../../../Redux/CorporateBuyer/Trading/tradingActions.js";
import { getInputActiveAdsAction } from "../../../../Redux/FarmingAssociation/Input/inputActions.js";
import {
  customCommonStyles,
  commonStyles,
} from "../../../../Style/CommonStyle.js";
import { bannerStyles } from "../../NavBar/NavBar.js";
import { styles } from "../../../../Containers/FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles.js";
import { styles as customSeachFilterStyles } from "../../../../Containers/Admin/MasterManagement/MasterManagementStyles.js";
import { activeAdsStyles } from "../../../../Containers/CorporateBuyers/Trading/ActiveAds/ActiveAdsStyle.js";
import InputToListExpanded from "./InputToListExpanded.jsx";
import AjInputBase from "../../../AjInputBase.jsx";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import {
  MARKETPLACELIST_LIMIT,
  SKIP,
} from "../../../../Constant/AppConstant.js";
import NavBar from "../../NavBar/NavBar.jsx";
import Footer from "../../Footer/Footer.jsx";
import AjFilters from "../../../AjFilters/AjFilters.jsx";
import AjDialog from "../../../AjDialog/AjDialog.jsx";
import { isTextValid } from "../../../../Services/commonService/commonService.js";
import { Categoryls, Categorysm } from "../../Category/Category.jsx";

const InputListExpanded = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const category = searchParams.get("q");

  const isLargeViewport = useMediaQuery((theme) =>
    theme.breakpoints.down("md")
  );

  const [query, setQuery] = useState({
    limit: MARKETPLACELIST_LIMIT,
    skip: SKIP,
  });
  const [searchClick, setSearchClick] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});

  const inputActiveAdsList = useSelector(
    (state) => state.input.inputActiveAdsList
  );

  const productListLandingPage = useSelector(
    (state) => state.tradingActiveAds.productListLandingPage
  );
  const inputListLandingPage = useSelector(
    (state) => state.tradingActiveAds.inputListLandingPage
  );

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
    };
    if (dataInfo?.certificate?.length) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        certifications: JSON.stringify(dataInfo.certificate),
      };
    }
    if (dataInfo?.products?.length) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        products: JSON.stringify(dataInfo.products),
      };
    }
    if (dataInfo?.states?.length > 0) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        state: JSON.stringify(dataInfo.states),
      };
    }
    if (dataInfo?.country) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        country: [dataInfo.country],
      };
    }
    if (dataInfo?.productType) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        productType: dataInfo.productType,
      };
    }
    if (dataInfo?.rating) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        rating: dataInfo.rating,
      };
    }
    if (searchText.length || category) {
      searchObject = {
        ...searchObject,
        limit: MARKETPLACELIST_LIMIT,
        skip: SKIP,
        filterText: searchText || category,
      };
    }
    dispatch(getInputActiveAdsAction(searchObject));
    dispatch(getProductListLandingPageAction());
    dispatch(getInputListLandingPageAction());
  }, [query, dataInfo, searchClick, category]);

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
    <Box sx={{ ...customCommonStyles.productListingBackground }}>
      <NavBar />
      <Box sx={{ ...customCommonStyles.subContentBoxProductListExpanded }}>
        <Box>
          {!isLargeViewport ? (
            <Categoryls
              inputListLandingPage={inputListLandingPage}
              productListLandingPage={productListLandingPage}
            />
          ) : null}
        </Box>
        <Box
          sx={{
            ...customCommonStyles.subContentBoxLandingPAge,
            ...styles.listingMargin,
            ...activeAdsStyles.heightContainer,
          }}
        >
          <Grid
            item
            sx={{
              ...customCommonStyles.subHeaderStylelandingPage,
              ...styles.listingMarginTopProductListing,
              ...activeAdsStyles.searchContainer,
            }}
          >
            <AjInputBase
              name="search by name"
              value={searchText}
              onKeyPress={onEnterPress}
              onChange={handleSearchTextChange}
              styleData={{
                ...customCommonStyles.filterInputBaseStyleLandingPage,
                ...customSeachFilterStyles.customHeight,
                ...customSeachFilterStyles.customWidth,
                ...activeAdsStyles.customWidthStyle,
              }}
              placeholder="Search products..."
              endIcon={
                <Box
                  sx={{
                    ...customCommonStyles.iconBoxLandingPage,
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
              inputActiveAdsList?.totalCount &&
              activeAdsStyles.activeAdsContainerOpenMarket
            }
          >
            <InputToListExpanded inputActiveAdsList={inputActiveAdsList} />
          </Box>
          {!!inputActiveAdsList?.totalCount && (
            <CustomPagination
              totalCount={inputActiveAdsList?.totalCount}
              query={query}
              setQuery={setQuery}
              customLimit={MARKETPLACELIST_LIMIT}
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
      </Box>
      {isLargeViewport ? (
        <Box sx={{ marginTop: "5rem" }}>
          <Typography
            variant="h5"
            sx={{
              ...bannerStyles.categoryHeader,
            }}
          >
            Categories
          </Typography>
          <Categorysm
            inputListLandingPage={inputListLandingPage}
            productListLandingPage={productListLandingPage}
          />
        </Box>
      ) : null}
      <Footer />
    </Box>
  );
};

export default InputListExpanded;
