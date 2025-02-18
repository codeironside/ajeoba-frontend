import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid, Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import AjInputBase from "../../../../Components/AjInputBase";
import ProductInputListing from "../ProductInputListing/ProductInputListing";
import CustomPagination from "../../../../Components/CustomPagination/CustomPagination";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";

import * as _ from "lodash";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import { isTextValid } from "../../../../Services/commonService/commonService";
import { getAdsProductInputListAction } from "../../../../Redux/Logistics/logisticsActions";
import {
  distanceOptions,
  LIMIT,
  orderTypeOptions,
  SKIP,
} from "../../../../Constant/AppConstant";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";
import { styles } from "../OpenSpecificAdsStyles.js";

const ProductInput = (props) => {
  const { adRequested, activeTab } = props;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [productInputListData, setProductInputListData] = useState();
  const [totalCount, setTotalCount] = useState();
  const dispatch = useDispatch();

  const adsInputList = useSelector((state) => state.logistics.adsInputList);
  const adsProductList = useSelector((state) => state.logistics.adsProductList);

  useEffect(() => {
    if (activeTab !== 1) {
      setProductInputListData(adsProductList?.result);
      setTotalCount(adsProductList?.totalcount);
    } else {
      setProductInputListData(adsInputList?.result);
      setTotalCount(adsInputList?.totalcount);
    }
  }, [activeTab, adsInputList, adsProductList]);

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      requestType: adRequested,
      requestFor:
        activeTab !== 1
          ? orderTypeOptions[0]?.productOrders
          : orderTypeOptions[0]?.inputOrders,
    };
    if (searchText?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        name: searchText,
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
    if (dataInfo?.inputs?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        inputs: JSON.stringify(dataInfo.inputs),
      };
    }
    if (dataInfo?.distance?.length > 0) {
      const distanceType = _.find(distanceOptions, {
        label: dataInfo?.distance,
      });
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        distanceMin: distanceType?.distanceMin,
      };
      if (distanceType?.distanceMax) {
        searchObject["distanceMax"] = distanceType?.distanceMax;
      }
    }
    dispatch(getAdsProductInputListAction(searchObject));
  }, [query, searchClick, dataInfo]);

  const onEnterPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const handleSearchFilter = () => {
    setSearchClick((prev) => !prev);
  };

  const handleTextChange = (e) => {
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
      <Box
        sx={{
          ...customCommonStyles.subContentBox,
          ...inventoryStyles.listingMargin,
          ...inventoryStyles.cardsBox,
          ...styles.gridContainer,
        }}
      >
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...customSeachFilterStyles.paddingStyle,
          }}
        >
          <AjInputBase
            value={searchText}
            onKeyPress={onEnterPress}
            onChange={handleTextChange}
            styleData={{
              ...customCommonStyles.filterInputBaseStyle,
              ...customSeachFilterStyles.customHeight,
              ...customSeachFilterStyles.customWidth,
            }}
            placeholder="Search by name"
            name="search by name"
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
            onClick={handleClearFilter}
          >
            Clear all filter
          </Typography>
        </Grid>
        <Box sx={customCommonStyles.tableHeightNoBackgroundTabsSingleFilter}>
          <ProductInputListing
            dataToList={productInputListData}
            adRequested={adRequested}
            itemRequestedFor={
              activeTab !== 1
                ? orderTypeOptions[0]?.productOrders
                : orderTypeOptions[0]?.inputOrders
            }
          />
        </Box>
        {totalCount !== 0 && (
          <CustomPagination
            query={query}
            setQuery={setQuery}
            totalCount={totalCount}
          />
        )}
      </Box>
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dataInfo}
          distanceFilter={true}
          productFilter={activeTab !== 1 ? true : false}
          productLabelStyle={commonStyles.productLabelStyle}
          inputLabelStyle={commonStyles.productLabelStyle}
          productTypeStyle={commonStyles.productTypeStyle}
          inputFilter={activeTab !== 1 ? false : true}
        />
      </AjDialog>
    </>
  );
};

export default ProductInput;
