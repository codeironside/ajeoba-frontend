import { Box } from "@mui/material";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";
import { ROLES } from "../../../../../Constant/RoleConstant";

import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import {
  editInputSupplierStatusAction,
  getInputSupplierListAction,
} from "../../../../../Redux/SuperAdmin/UserManagement/InputSupplier/inputSupplierActions";
import { getStatus } from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";

const InputSupplierListing = (props) => {
  const { onClick, searchName } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });

  const roleId = getUserData().role_id;

  const inputSupplierList = useSelector(
    (state) => state.inputSupplier.inputSupplierList
  );

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

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchName.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchName,
      };
    }
    dispatch(getInputSupplierListAction(searchObject, true));
  }, [query, onClick]);

  useEffect(() => {
    const dataSet = inputSupplierList?.result?.map((item) => {
      return {
        "First Name": item.first_name,
        "Last Name": item.last_name,
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        DOB: moment(item.date_of_birth).format("DD/MM/YYYY"),
      };
    });
    setData(dataSet);
  }, [inputSupplierList]);

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/input-supplier/detail/${id}`);
      },
    },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) =>
          navigate(`/admin/user-management/input-supplier/edit/${id}`),
      },
      ...actionsArray,
    ];
  }

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(editInputSupplierStatusAction(id, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editInputSupplierStatusAction(id, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(editInputSupplierStatusAction(id, "ONHOLD")),
    },
  ];

  return (
    <>
      {inputSupplierList?.result?.length === 0 ? (
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
          totalCount={inputSupplierList?.totalcount}
          options={options}
        />
      )}
    </>
  );
};

export default InputSupplierListing;
