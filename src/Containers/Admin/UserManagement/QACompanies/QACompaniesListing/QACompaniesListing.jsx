import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import * as moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { getStatus } from "../../../../../Services/commonService/commonService";

import { getUserData } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { getCompaniesAction } from "../../../../../Redux/common/QACompany/companyActions";
import { editQACompanyStatusAction } from "../../../../../Redux/SuperAdmin/UserManagement/QACompany/qaCompanyActions";

const QACompaniesListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = getUserData().role_id;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [qaData, setQAData] = useState(null);

  const qaCompaniesList = useSelector((state) => state.companies.companies);

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchText,
      };
    }
    dispatch(getCompaniesAction(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "QA Company Name", ellipsisClass: true },
    { field: "QA Company Reg. No.", ellipsisClass: true, width: "23%" },
    { field: "Added On", width: "15%" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];
  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }

  useEffect(() => {
    const dataSet = qaCompaniesList?.result?.map((item) => {
      return {
        "QA Company Name": item.company_name,
        "QA Company Reg. No.": item.registration_number || "N/A",
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
      };
    });
    setQAData(dataSet);
  }, [qaCompaniesList]);

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(editQACompanyStatusAction(id, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editQACompanyStatusAction(id, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(editQACompanyStatusAction(id, "ONHOLD")),
    },
  ];

  const edit = (id) => {
    navigate(`/admin/user-management/qa-companies/edit/${id}`);
  };

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/qa-companies/detail/${id}`);
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: edit,
      },
      ...actionsArray,
    ];
  }

  return (
    <>
      {qaCompaniesList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={qaData}
          actions={actionsArray}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={qaCompaniesList?.totalcount}
          options={options}
        />
      )}
    </>
  );
};

export default QACompaniesListing;
