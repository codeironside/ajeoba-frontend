import { Box } from "@mui/system";
import * as moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";
import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { getStatus } from "../../../../../Services/commonService/commonService";

import { editSingleBuyerStatusAction, getSingleBuyerListAction } from "../../../../../Redux/SuperAdmin/UserManagement/SingleBuyer/singleBuyerActions";
import { getUserData } from "../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../Style/CommonStyle";

const SingleBuyerListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = getUserData().role_id;

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [qaData, setQAData] = useState(null);

  const singleBuyerList = useSelector(
    (state) => state.singleBuyer.singleBuyerList
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
    dispatch(getSingleBuyerListAction(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "First Name", ellipsisClass: true },
    { field: "Last Name", ellipsisClass: true },
    { field: "Added On" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];
  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }

  useEffect(() => {
    const dataSet = singleBuyerList?.result?.map((item) => {
      return {
        "First Name": `${item.first_name}`,
        "Last Name": `${item.last_name}`,
        id: item.id,
        status: getStatus(item.status),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
      };
    });
    setQAData(dataSet);
  }, [singleBuyerList]);

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(editSingleBuyerStatusAction(id, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(editSingleBuyerStatusAction(id, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (id) =>
        dispatch(editSingleBuyerStatusAction(id, "ONHOLD")),
    },
  ];

  const edit = (id) => {
    navigate(`/admin/user-management/single-buyer/edit/${id}`);
  };

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`/admin/user-management/single-buyer/detail/${id}`);
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
      {singleBuyerList?.result?.length === 0 ? (
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
          totalCount={singleBuyerList?.totalcount}
          options={options}
        />
      )}
    </>
  );
};

export default SingleBuyerListing;
