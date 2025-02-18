import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as moment from "moment";
import { Box } from "@mui/material";

import {
  LIMIT,
  qualityOptions,
  SKIP,
} from "../../../../../../Constant/AppConstant";
import {
  getAdminReportsList,
  getAdminReportUsersAction,
} from "../../../../../../Redux/SuperAdmin/ReportsAdmin/reportsAdminAction";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../../../Style/CommonStyle";
import AjTypography from "../../../../../../Components/AjTypography";
import AjCustomTable from "../../../../../../Components/AjCustomTable/AjCustomTable";

const TotalAndActiveUsersListing = ({
  searchClick,
  searchText,
  type,
  filterData,
}) => {
  const dispatch = useDispatch();
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const usersList = useSelector(
    (state) => state.reportsAdmin.adminReportsUsersList
  );
  let tableHead = [
    { field: "User Role" },
    { field: "Users" },
    { field: "Active Users" },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (filterData?.startDate) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        from: moment(filterData?.startDate).format("L"),
        to: moment(filterData?.endDate).format("L"),
      };
    }
    dispatch(getAdminReportUsersAction(searchObject, type));
    return () => dispatch(getAdminReportsList(null));
  }, [query, searchClick, filterData]);

  useEffect(() => {
    const dataSet = usersList?.data?.result?.map((item) => {
      return {
        "User Role": item?.user_roles,
        Users: item?.users,
        "Active Users": item?.activeusers,
      };
    });
    setData(dataSet);
  }, [usersList, qualityOptions]);

  return (
    <>
      {usersList?.data?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.reportsHeight,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={usersList?.data?.totalCount}
          tableWrapperStyles={{
            ...customCommonStyles.reportsTableHeight,
          }}
        />
      )}
    </>
  );
};

export default TotalAndActiveUsersListing;
