import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";
import AjTypography from "../../../../Components/AjTypography";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  getSupportRequestsListAction,
  changeSupportRequestStatusAction,
} from "../../../../Redux/HelpAndSupport/HelpAndSupportActions";
import {
  SKIP,
  LIMIT,
  userRoleTypeListingOptions,
} from "../../../../Constant/AppConstant";
import { ROLES } from "../../../../Constant/RoleConstant";
import { MANAGE_SUPPORT } from "../../../../Routes/Routes";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles } from "../../MasterManagement/MasterManangementItemListing/MasterManangementItemListingStyles";

const ManageSupportListing = (props) => {
  const { searchClick, searchText, userRoleType } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestList = useSelector(
    (state) => state.helpAndSupport.supportRequestsList
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Request raised by", ellipsisClass: true, width: "15%" },
    { field: "User Role", width: "18%" },
    { field: "Subject", ellipsisClass: true, width: "18%" },
    { field: "Date and time", width: "18%" },
    { field: "Status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  const options = [
    {
      name: "Pending",
      actionClickHandler: (id) => {
        dispatch(changeSupportRequestStatusAction(id, { status: "PENDING" }));
      },
    },
    {
      name: "Under Review",
      actionClickHandler: (id) =>
        dispatch(
          changeSupportRequestStatusAction(id, { status: "UNDER_REVIEW" })
        ),
    },
    {
      name: "Resolved",
      actionClickHandler: (id) =>
        dispatch(changeSupportRequestStatusAction(id, { status: "RESOLVED" })),
    },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`${MANAGE_SUPPORT}/detail/${id}`);
      },
    },
  ];

  const getStatus = (itemStatus) => {
    if (itemStatus === "PENDING") return "Pending";
    if (itemStatus === "UNDER_REVIEW") return "Under Review";
    else return "Resolved";
  };

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        filterText: searchText,
        skip: SKIP,
      };
    }
    if (userRoleType) {
      const foundVal = userRoleType.find((item) => item !== undefined);
      const foundKey = Object.keys(ROLES).find((key) => {
        if (key === foundVal) {
          return key;
        }
      });

      searchObject = {
        ...searchObject,
        skip: SKIP,
        limit: LIMIT,
        roleId: ROLES[foundKey],
      };
    }
    dispatch(getSupportRequestsListAction(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = requestList?.result?.map((item) => {
      const foundUserRoleVal = userRoleTypeListingOptions.find(
        (datas) => datas.roleId === item.role_id
      );

      const itemData = {
        "Request raised by": item.first_name + " " + item.last_name,
        "User Role": foundUserRoleVal.label,
        id: item.id,
        Subject: item.subject,
        "Date and time": `${moment(item.date_and_time).format("DD/MM/YYYY")}
         ${moment(item.date_and_time).format("LT")}`,
        status: getStatus(item.support_request_status),
      };
      return itemData;
    });
    setData(dataSet);
  }, [requestList]);

  return (
    <>
      {requestList?.result?.length === 0 ? (
        <Box sx={{ ...commonStyles.noContentBox, ...styles.masterNocontent }}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          actions={actionsArray}
          rowData={data}
          query={query}
          pagination={true}
          setQuery={setQuery}
          totalCount={requestList?.totalCount}
          options={options}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
    </>
  );
};

export default ManageSupportListing;
