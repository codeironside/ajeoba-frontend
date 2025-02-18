import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../../Components/AjTypography";
import { commonStyles } from "../../../../../Style/CommonStyle";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import {
  getFarmingAssociationListAction,
  editFarmingAssociationAction,
} from "../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { getStatus } from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import { signInWithId } from "../../../../../Redux/SignIn/signInPasswordActions";

const FarmingAssociationListing = (props) => {
  const { searchClick, searchText, dataInfo } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const farmingAssociationList = useSelector(
    (state) => state.farmingAssociation.farmingAssociationList
  );
  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const roleId = getUserData().role_id;
  let tableHead = [
    { field: "Association Name", ellipsisClass: true },
    { field: "Association reg. no.", ellipsisClass: true },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];
  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [
      ...tableHead,
      { field: "", cellRenderer: true },
      { field: "", cellRenderer: true },
    ];
  }

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(
          editFarmingAssociationAction(id, "ACTIVE", {
            ...query,
            name: searchText,
          })
        ),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(
          editFarmingAssociationAction(id, "INACTIVE", {
            ...query,
            name: searchText,
          })
        ),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(
          editFarmingAssociationAction(id, "ONHOLD", {
            ...query,
            name: searchText,
          })
        ),
    },
  ];
  const edit = (id) => {
    navigate(`/admin/user-management/farming-association/edit/${id}`);
  };

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/farming-association/detail/${id}`);
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
      {
        name: "Log in",
        type: "Log In",
        actionClickHandler: (_id, userData) => {
          dispatch(
            signInWithId(userData.user_id,navigate)
          );
        },
      },
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchText,
      };
    }
    dispatch(getFarmingAssociationListAction(searchObject));
  }, [query, searchClick, dataInfo]);

  useEffect(() => {
    const dataSet = farmingAssociationList?.result?.map((item) => {
      return {
        "Association Name": item.association_name,
        "Association reg. no.": item.registration_number || "N/A",
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        user_id: item.user_id
      };
    });
    setData(dataSet);
  }, [farmingAssociationList]);

  return (
    <>
      {farmingAssociationList?.result?.length === 0 ? (
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
          actions={actionsArray}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={farmingAssociationList?.totalcount}
          options={options}
        />
      )}
    </>
  );
};

export default FarmingAssociationListing;
