import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { LIMIT, SKIP } from "../../../../../Constant/AppConstant";
import * as moment from "moment";

import { Box } from "@mui/material";
import AjTypography from "../../../../../Components/AjTypography";
import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { FARMER_SUBSCRIPTION } from "../../../../../Routes/Routes";
import { getFarmerListAction } from "../../../../../Redux/FarmingAssociation/Farmers/farmersActions";

const SubscriptionList = ({ dataInfo, searchClick, searchText }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const isSubscriptionActive = null;

  const farmerList = useSelector((state) => state.farmers.farmerList);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const tableHead = [
    { field: "First name" },
    { field: "Last name" },
    { field: "Added On" },
    { field: "Due Date" },
    { field: "Subscription Status" },
    { field: "Phone Number" },
    { field: "", cellRenderer: true },
  ];

  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`${FARMER_SUBSCRIPTION}/detail/${id}`);
      },
    },
  ];

  useEffect(() => {
    let searchObject = {
      limit: query.limit,
      skip: query.skip,
      type: "FARMER",
      // isSubscriptionActive: isSubscriptionActive,
    };

    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
        type: "FARMER",
      };
    }

    // if (typeof dataInfo?.isSubscriptionActive === "boolean") {
    //   searchObject = {
    //     ...searchObject,
    //     limit: LIMIT,
    //     skip: SKIP,
    //     isSubscriptionActive: JSON.stringify(dataInfo?.isSubscriptionActive),
    //   };
    // }
    dispatch(getFarmerListAction(searchObject));
  }, [query, dataInfo, searchClick]);

  useEffect(() => {
    const dataSet = farmerList?.result?.map((item) => {
      const subData = {
        "First name": item.first_name,
        "Last name": item.last_name,
        "Due Date": moment(item.subscription_expiry_date).format("DD/MM/YYYY"),
        "Added On": moment(item.created_at).format("DD/MM/YYYY"),
        "Phone Number": item.mobile_no,
        "Subscription Status": item.is_expired ? "InActive" : "Active",
        id: item.id,
      };
      return subData;
    });
    setData(dataSet);
  }, [farmerList]);

  return (
    <>
      {farmerList?.result?.length === 0 ? (
        <Box sx={commonStyles.noContentBox}>
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          actions={actionsArray}
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={farmerList.totalCount}
        />
      )}
    </>
  );
};

export default SubscriptionList;
