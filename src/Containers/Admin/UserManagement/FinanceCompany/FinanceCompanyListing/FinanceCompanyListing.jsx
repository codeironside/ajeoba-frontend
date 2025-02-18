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
  toggleFinanceCompanyStatusAction,
  getFinanceCompanyListAction,
} from "../../../../../Redux/SuperAdmin/UserManagement/FinanceCompany/financeCompanyAction";

const FinanceCompanyListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const roleId = getUserData().role_id;

  const financeCompanyList = useSelector(
    (state) => state.financeCompany.financeCompanyList
  );
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchText,
      };
    }
    dispatch(getFinanceCompanyListAction(searchObject,true));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = financeCompanyList?.result?.map((item) => {
      return {
        "Finance Company Name": item.finance_company_name,
        "Finance Company reg. no.": item.registration_number || 'N/A',
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
      };
    });
    setData(dataSet);
  }, [financeCompanyList]);

  let tableHead = [
    { field: "Finance Company Name", ellipsisClass: true },
    { field: "Finance Company reg. no.", ellipsisClass: true },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/finance/detail/${id}`);
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) =>
          navigate(`/admin/user-management/finance/edit/${id}`),
      },
      ...actionsArray,
    ];
  }

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(toggleFinanceCompanyStatusAction(id, { status: "ACTIVE" })),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleFinanceCompanyStatusAction(id, { status: "INACTIVE" })),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(toggleFinanceCompanyStatusAction(id, { status: "ONHOLD" })),
    },
  ];

  return (
    <>
      {financeCompanyList?.result?.length === 0 ? (
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
          totalCount={financeCompanyList?.totalcount}
        />
      )}
    </>
  );
};

export default FinanceCompanyListing;
