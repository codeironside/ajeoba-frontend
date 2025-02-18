import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../../Components/AjTypography";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import { ROLES } from "../../../../../Constant/RoleConstant";
import {
  getAggregatorsListAction,
  editAggregatorAction,
} from "../../../../../Redux/SuperAdmin/UserManagement/Aggregators/aggregatorsActions";
import { getStatus } from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";

const AggregatorListing = (props) => {
  const { onClick, searchName } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const aggregatorsList = useSelector(
    (state) => state.aggregators.aggregatorsList
  );
  const [data, setData] = useState(null);
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  const roleId = getUserData().role_id;

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(editAggregatorAction(id, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editAggregatorAction(id, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) => dispatch(editAggregatorAction(id, "ONHOLD")),
    },
  ];
  const edit = (id) => {
    navigate(`/admin/user-management/aggregators/edit/${id}`);
  };
  let tableHeader = [
    { field: "First Name", ellipsisClass: true },
    { field: "Last Name", ellipsisClass: true },
    { field: "DOB" },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    tableHeader = [...tableHeader, { field: "", cellRenderer: true }];
  }
  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/aggregators/detail/${id}`);
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) => edit(id),
      },
      ...actionsArray,
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchName.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchName,
      };
    }
    dispatch(getAggregatorsListAction(searchObject));
  }, [query, onClick]);

  useEffect(() => {
    const dataSet = aggregatorsList?.result?.map((item) => {
      const aggregatorsListData = {
        "First Name": item.first_name,
        "Last Name": item.last_name,
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        DOB: moment(item.date_of_birth).format("DD/MM/YYYY"),
      };
      return aggregatorsListData;
    });
    setData(dataSet);
  }, [aggregatorsList]);

  return (
    <>
      {aggregatorsList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          actions={actionsArray}
          columnDefs={tableHeader}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={aggregatorsList?.totalcount}
          options={options}
        />
      )}
    </>
  );
};

export default AggregatorListing;
