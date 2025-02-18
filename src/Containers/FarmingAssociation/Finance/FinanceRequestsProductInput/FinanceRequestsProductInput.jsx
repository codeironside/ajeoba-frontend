import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AjInputBase from "../../../../Components/AjInputBase";
import FinanceRequestsProductInputListing from "../FinanceRequestsProductInputListing/FinanceRequestsProductInputListing";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";
import { getFinanceReqProductOrInputListAction } from "../../../../Redux/FarmingAssociation/Finance/FinanceActions";
import {
  LIMIT,
  SKIP,
  typeOfRequestOptions,
} from "../../../../Constant/AppConstant";
import filterIcon from "../../../../Assets/Images/filterIcon.png";
import * as moment from "moment";
import { isTextValid } from "../../../../Services/commonService/commonService";
import { customCommonStyles } from "../../../../Style/CommonStyle";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles.js";
import { styles as inventoryStyles } from "../../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles.js";
import { styles } from "../FinanceRequestsProductInputListing/FinanceRequestsProductInputListingStyles";

const FinanceRequestsProductInput = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [searchText, setSearchText] = useState("");
  const [searchClick, setSearchClick] = useState(true);

  const [openFilter, setOpenFilter] = useState(false);
  const [dataInfo, setDataInfo] = useState({});
  const [
    financeRequestsProductOrInputList,
    setFinanceRequestsProductOrInputList,
  ] = useState([]);
  const [totalCount, setTotalCount] = useState();

  const financeReqByProductList = useSelector(
    (state) => state.financeRequests.financeRequestsForProductList
  );
  const financeReqByInputList = useSelector(
    (state) => state.financeRequests.financeRequestsForInputList
  );

  useEffect(() => {
    if (activeTab !== 1) {
      setFinanceRequestsProductOrInputList(financeReqByProductList?.result);
      setTotalCount(financeReqByProductList?.totalCount);
    } else {
      setFinanceRequestsProductOrInputList(financeReqByInputList?.result);
      setTotalCount(financeReqByInputList?.totalCount);
    }
  }, [activeTab, financeReqByProductList, financeReqByInputList]);

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      itemType:
        activeTab !== 1
          ? typeOfRequestOptions[0]?.value
          : typeOfRequestOptions[1]?.value,
    };

    if (searchText?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        itemName: searchText,
      };
    }

    if (dataInfo?.singleDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        date: moment(dataInfo.singleDate).format("L"),
      };
    }

    dispatch(getFinanceReqProductOrInputListAction(searchObject));
  }, [query, searchClick, dataInfo]);

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setSearchClick((prev) => !prev);
    }
  };
  const searchFilterHandler = () => {
    setSearchClick((prev) => !prev);
  };

  const textChangeHandler = (e) => {
    if (isTextValid(e.target.value)) {
      setSearchText(e.target.value);
      if (e.target.value.length === 0) {
        setSearchClick((prev) => !prev);
      }
    }
  };
  const clearFilterHandler = () => {
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
        }}
      >
        <Grid
          item
          sx={{
            ...customCommonStyles.subHeaderStyle,
            ...inventoryStyles.listingMarginTop,
            ...styles.searchAndFilterBoxResponsive,
          }}
        >
          <AjInputBase
            value={searchText}
            onKeyPress={onEnterKeyPress}
            onChange={textChangeHandler}
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
                onClick={searchFilterHandler}
              >
                <SearchIcon sx={{ ...customCommonStyles.searchIcon }} />
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
            onClick={clearFilterHandler}
          >
            Clear all filter
          </Typography>
        </Grid>
        <FinanceRequestsProductInputListing
          dataToList={financeRequestsProductOrInputList}
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
          singleDateFilter={true}
        />
      </AjDialog>
    </>
  );
};

export default FinanceRequestsProductInput;
