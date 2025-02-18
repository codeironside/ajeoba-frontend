import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import AjInputBase from "../../../../Components/AjInputBase";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";
import {
  LIMIT,
  SKIP,
  orderTypeOptions,
  distanceOptions,
} from "../../../../Constant/AppConstant";
import { isTextValid } from "../../../../Services/commonService/commonService";
import {
  customCommonStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles.js";
import { styles as inventoryStyles } from "../../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles.js";
import SearchIcon from "@mui/icons-material/Search";
import TransitProductInputListing from "../TransitProductInputListing/TransitProductInputListing";
import { getTransitProductInputListAction } from "../../../../Redux/Logistics/logisticsActions";
import * as _ from "lodash";

const TransitProductInput = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [transitProductInputListData, setTransitProductInputListData] =
    useState();
  const [totalCount, setTotalCount] = useState();

  const transitProductList = useSelector(
    (state) => state.logistics.transitProductList
  );
  const transitInputList = useSelector(
    (state) => state.logistics.transitInputList
  );
  useEffect(() => {
    if (activeTab !== 1) {
      setTransitProductInputListData(transitProductList?.result);
      setTotalCount(transitProductList?.totalCount);
    } else {
      setTransitProductInputListData(transitInputList?.result);
      setTotalCount(transitInputList?.totalCount);
    }
  }, [activeTab, transitProductList, transitInputList]);

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
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
    dispatch(getTransitProductInputListAction(searchObject));
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
        <TransitProductInputListing
          dataToList={transitProductInputListData}
          query={query}
          setQuery={setQuery}
          totalCount={totalCount}
          activeTab={activeTab}
        />
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

export default TransitProductInput;
