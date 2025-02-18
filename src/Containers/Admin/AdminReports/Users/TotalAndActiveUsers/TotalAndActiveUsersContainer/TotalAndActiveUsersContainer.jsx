import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import filterIcon from "../../../../../../Assets/Images/filterIcon.png";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import AjInputBase from "../../../../../../Components/AjInputBase";
import AjExportExcelCsv from "../../../../../../Components/AjExportExcelCsv/AjExportExcelCsv";
import AjDialog from "../../../../../../Components/AjDialog/AjDialog";
import AjFilters from "../../../../../../Components/AjFilters/AjFilters";
import TotalAndActiveUsersListing from "../TotalAndActiveUsersListing/TotalAndActiveUsersListing";

const TotalAndActiveUsersContainer = (props) => {
  const [searchByUserRole, setSearchByUserRole] = useState("");
  const [onSearching, setOnSearching] = useState(true);
  const [openFilter, setOpenFilter] = useState(false);
  const [filterData, setFilterData] = useState({});

  const usersList = useSelector(
    (state) => state.reportsAdmin.adminReportsUsersList
  );

  const onEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setOnSearching((prev) => !prev);
    }
  };

  const handleSearch = () => {
    setOnSearching((prev) => !prev);
  };

  const handleTextChange = (e) => {
    setSearchByUserRole(e.target.value);
    if (e.target.value.length === 0) {
      setOnSearching((prev) => !prev);
    }
  };

  const handleClearFilter = () => {
    setSearchByUserRole("");
    setFilterData({});
  };

  const filterChanged = (data) => {
    setFilterData(data);
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
            value={searchByUserRole}
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
          totalCount={usersList?.data?.totalCount}
          url={`/api/export/admin/report/users`}
          filterData={filterData}
          searchData={searchByUserRole}
        />
      </Box>
      <TotalAndActiveUsersListing
        searchText={searchByUserRole}
        searchClick={onSearching}
        type={props.type}
        filterData={filterData}
      />
      <AjDialog open={openFilter} closeModal={setOpenFilter} title={"Filter"}>
        <AjFilters
          dateFilter={true}
          filterSelected={filterChanged}
          cancel={setOpenFilter}
          filterData={filterData}
        />
      </AjDialog>
    </Box>
  );
};

export default TotalAndActiveUsersContainer;
