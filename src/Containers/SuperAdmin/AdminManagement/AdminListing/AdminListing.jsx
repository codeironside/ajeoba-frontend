import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import AjTypography from "../../../../Components/AjTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

import {
  editAdminAction,
  getAdminListAction,
} from "../../../../Redux/SuperAdmin/AdminManagement/adminManagementActions";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";

const AdminListing = (props) => {
  const adminList = useSelector((state) => state.adminManagement.adminList);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const tableHeader = [
    { field: "User Id", style: "normal" },
    { field: "First name" },
    { field: "Last name" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];
  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(editAdminAction(id, { status: "ACTIVE" }, navigate)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editAdminAction(id, { status: "INACTIVE" }, navigate)),
    },
  ];

  const edit = (id) => {
    navigate(`/admin/admin-management/edit/${id}`);
  };
  const actionsArray = [
    {
      name: "Edit",
      type: "anchor",
      actionClickHandler: (id) => edit(id),
    },
  ];

  useEffect(() => {
    dispatch(getAdminListAction());
  }, []);

  useEffect(() => {
    const dataSet = adminList?.result?.map((item) => {
      const adminData = {
        "User Id": item.user_name,
        "First name": item.first_name,
        "Last name": item.last_name,
        id: item.id,
        status: item.status === "ACTIVE" ? "Active" : "Inactive",
      };
      return adminData;
    });
    setData(dataSet);
  }, [adminList]);

  return (
    <>
      {adminList?.result?.length === 0 ? (
        <Box sx={{...commonStyles.noContentBox,...customCommonStyles.tableHeightNoDataFoundNoFilter}}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHeader}
          rowData={data}
          pagination={false}
          actions={actionsArray}
          options={options}
          tableWrapperStyles={
            customCommonStyles.noPaginationNoFilterTableStyles
          }
        />
      )}
    </>
  );
};

export default AdminListing;
