import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import * as moment from "moment";

import AjTypography from "../../../../Components/AjTypography";
import { commonStyles } from "../../../../Style/CommonStyle";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import {
  getFarmingAssociationListAction,
  editFarmingAssociationSubscriptionStatusAction,
} from "../../../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";
import { ROLES } from "../../../../Constant/RoleConstant";
import { getSubscriptionStatus } from "../../../../Services/commonService/commonService";
import { getUserData } from "../../../../Services/localStorageService";
import { LIMIT, SKIP } from "../../../../Constant/AppConstant";

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
    { field: "Number of Farmer", ellipsisClass: true },
  ];

  if (ROLES.SUPER_ADMIN === roleId) {
    tableHead = [
      ...tableHead,
      { field: "Status", cellRenderer: true },
    ];
  }

  const options = [
    {
      name: "waived",
      actionClickHandler: (id) => dispatch(
        editFarmingAssociationSubscriptionStatusAction(id, true, {
          ...query,
          name: searchText,
        })
      ),
    },
    {
      name: "unwaived",
      actionClickHandler: (id) =>
      dispatch(
        editFarmingAssociationSubscriptionStatusAction(id, false, {
          ...query,
          name: searchText,
        })
      ),
    }
  ];

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
      let d = {
        "Association Name": item.association_name,
        "Number of Farmer": item.farmer_count,
        id: item.id, 
        user_id: item.user_id
      };

      if (ROLES.SUPER_ADMIN === roleId) {
        d = {
          ...d,
          status: getSubscriptionStatus(item.waiver_status)
        };
      }

      return d;

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
          associationSubscriptionComponent={true}
          columnDefs={tableHead}
          rowData={data}
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
