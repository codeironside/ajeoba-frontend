import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../../Components/AjTypography";
import { commonStyles } from "../../../../../Style/CommonStyle";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import { getStatus } from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import {
  editLogisticCompanyAction,
  getLogisticCompanyListAction,
} from "../../../../../Redux/common/LogisticCompany/logisticCompanyActions";

const LogisticCompanyListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleId = getUserData().role_id;

  const logisticCompanyList = useSelector(
    (state) => state.logisticCommonData.logisticCompanies
  );
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Logistic Company Name", ellipsisClass: true },
    { field: "Logistic Company reg. no.", ellipsisClass: true },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(editLogisticCompanyAction(id, { status: "ACTIVE" })),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editLogisticCompanyAction(id, { status: "INACTIVE" })),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(editLogisticCompanyAction(id, { status: "ONHOLD" })),
    },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/logistics/detail/${id}`);
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) =>
          navigate(`/admin/user-management/logistics/edit/${id}`),
      },
      ...actionsArray,
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getLogisticCompanyListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = logisticCompanyList?.result?.map((item) => {
      return {
        "Logistic Company Name": item.company_name,
        "Logistic Company reg. no.": item.registration_number || 'N/A',
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
      };
    });
    setData(dataSet);
  }, [logisticCompanyList]);

  return (
    <>
      {logisticCompanyList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
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
          options={options}
          actions={actionsArray}
          totalCount={logisticCompanyList?.totalCount}
        />
      )}
    </>
  );
};

export default LogisticCompanyListing;
