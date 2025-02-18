import React, { useEffect, useState } from "react";
import * as moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import filterIcon from "../../../../Assets/Images/filterIcon.png";

import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../Components/AjFilters/AjFilters";
import AjInputBase from "../../../../Components/AjInputBase";
import AssociationSaleListing from "../../AssociationSaleListing/AssociationSaleListing";
import FarmerInfoListing from "../../FarmerInfoListing/FarmerInfoListing";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

import AjExportExcelCsv from "../../../../Components/AjExportExcelCsv/AjExportExcelCsv";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";
import {
  getAssociationSaleListAction,
  getFarmerInfoListAction,
} from "../../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";
import { refreeListingStyles } from "../../../Admin/UserManagement/FarmingAssociation/AssociationDetails/FarmingRefereeListingManagement/FarmingRefereeListing/FarmingRefereeListingStyles";
import { styles as customSeachFilterStyles } from "../../../Admin/MasterManagement/MasterManagementStyles";

const AdditionalDetailsRequestedView = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const [dataInfo, setDataInfo] = useState(null);
  const [onSearchClick, setOnSearchClick] = useState(true);
  const [searchedData, setSearchedData] = useState("");
  const [openFilter, setOpenFilter] = useState(false);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const farmerInfoList = useSelector(
    (state) => state.financeCompanyRequests.farmerInfoList
  );
  const associationSaleList = useSelector(
    (state) => state.financeCompanyRequests.associationSaleList
  );
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
    };
    if (searchedData?.length) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        filterText: searchedData,
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
    if (dataInfo?.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(dataInfo?.startDate).format("L"),
        to: moment(dataInfo?.endDate).format("L"),
      };
    }
    if (activeTab !== 1) {
      dispatch(getAssociationSaleListAction(id, searchObject));
    } else {
      dispatch(getFarmerInfoListAction(id, searchObject));
    }
  }, [query, dataInfo, onSearchClick]);
  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
          ...commonStyles.justifyContentContainer,
        }}
      >
        <Grid
          sx={{
            ...refreeListingStyles.countSearchBox,
            ...commonStyles.fullWidth,
          }}
        >
          <Box
            sx={{
              ...customCommonStyles.headerBox,
              ...refreeListingStyles.countBox,
            }}
          >
            {activeTab !== 1 ? (
              <Typography sx={commonStyles.tableText}>
                Association Sales({associationSaleList?.totalCount})
              </Typography>
            ) : (
              <Typography sx={commonStyles.tableText}>
                Farmers({farmerInfoList?.totalCount})
              </Typography>
            )}
          </Box>
          <Box sx={[refreeListingStyles.searchTable, commonStyles.marginTop0]}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                "@media(max-width: 600px)": {
                  flexDirection: "column",
                },
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
                  value={searchedData}
                  onKeyPress={onEnterKeyPress}
                  onChange={handleTextChange}
                  styleData={{
                    ...customCommonStyles.filterInputBaseStyle,
                    ...customSeachFilterStyles.customWidth,
                    ...customSeachFilterStyles.customHeight,
                  }}
                  placeholder={
                    activeTab !== 1
                      ? "Search by product name"
                      : "Search by name"
                  }
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
                {activeTab !== 1 && (
                  <>
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
                )}
              </Grid>
              <AjExportExcelCsv
                url={
                  activeTab !== 1
                    ? `/api/export/additional-details/${id}`
                    : `/api/export/finance-request/${id}/association/farmer`
                }
                searchData={searchedData}
                dataInfo={dataInfo}
                totalCount={
                  activeTab === 1
                    ? farmerInfoList?.totalCount
                    : associationSaleList?.totalCount
                }
              />
            </Box>

            {activeTab !== 1 ? (
              <AssociationSaleListing
                query={query}
                setQuery={setQuery}
                dataInfo={dataInfo}
                searchClick={onSearchClick}
                searchedData={searchedData}
                activeTab={activeTab}
              />
            ) : (
              <FarmerInfoListing
                query={query}
                setQuery={setQuery}
                dataInfo={dataInfo}
                searchClick={onSearchClick}
                searchedData={searchedData}
                activeTab={activeTab}
              />
            )}
          </Box>
        </Grid>
      </Grid>
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={dataInfo}
          productFilter={true}
          dateFilter={true}
        />
      </AjDialog>
    </>
  );
};

export default AdditionalDetailsRequestedView;
