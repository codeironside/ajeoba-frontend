import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import { useSearchParams } from "react-router-dom";
import * as moment from "moment";
import { Box } from "@mui/material";

import AjCustomTable from "../../../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../../../Components/AjTypography";

import { ROLES } from "../../../../../../../Constant/RoleConstant";
import { toggleRefereeStatusAction } from "../../../../../../../Redux/FarmingAssociation/Refrees/refereesActions";
import { getFarmerRefereeListAction } from "../../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailActions.";
import {
  ADMIN_FARMING_ASSOCIATION,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../../../Routes/Routes";
import { getUserData } from "../../../../../../../Services/localStorageService";

import { commonStyles } from "../../../../../../../Style/CommonStyle";
import { refreeListingStyles } from "./FarmingRefereeListingStyles";
import { LIMIT, SKIP } from "../../../../../../../Constant/AppConstant";

const FarmingRefereeListing = ({ searchClick, searchText, ...restProps }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const { id } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const roleId = getUserData().role_id;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const farmingRefereeList = useSelector(
    (state) => state.userManagementAssociationDetails.farmerRefereeList
  );

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        name: searchText,
      };
    }
    dispatch(getFarmerRefereeListAction(id, searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = farmingRefereeList?.result?.map((item) => {
      const farmingAssociationData = {
        "First Name": item.first_name,
        "Last Name": item.last_name,
        DOB: moment(item.date_of_birth).format("DD/MM/YYYY"),
        Role: item.is_referee ? "Referee" : "Farmer",
        id: item.id,
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        status: item.is_active ? "Active" : "Inactive",
      };
      return farmingAssociationData;
    });
    setData(dataSet);
  }, [farmingRefereeList]);

  let tableHead = [
    { field: "First Name" },
    { field: "Last Name" },
    { field: "DOB" },
    { field: "Role" },
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
      actionClickHandler: (userId) =>
        dispatch(toggleRefereeStatusAction(userId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(toggleRefereeStatusAction(userId, false)),
    },
  ];

  const edit = (farmerRefereeEditId, row) => {
    if (row.Role === "Referee") {
      navigate(
        `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/referee/${id}/edit/${farmerRefereeEditId}?activeTab=${activeTab}`
      );
    } else {
      navigate(
        `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/farmer/${id}/edit/${farmerRefereeEditId}?activeTab=${activeTab}`
      );
    }
  };

  const viewMore = (farmerRefereeDetailId, row) => {
    if (row.Role === "Referee") {
      navigate(
        `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/referee/${id}/detail/${farmerRefereeDetailId}?activeTab=${activeTab}`
      );
    } else {
      navigate(
        `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/farmer/${id}/detail/${farmerRefereeDetailId}?activeTab=${activeTab}`
      );
    }
  };

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: viewMore,
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
      {farmingRefereeList?.result?.length === 0 ? (
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
          totalCount={farmingRefereeList?.totalcount}
          options={options}
          tableWrapperStyles={refreeListingStyles.tableWrapperStyles}
        />
      )}
    </>
  );
};

export default FarmingRefereeListing;
