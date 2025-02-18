import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import AjTypography from "../../../../Components/AjTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscriptionStatusAction } from "../../../../Redux/SuperAdmin/Subscription/subscriptionActions";
import { numberWithCommas } from "../../../../Services/commonService/commonService";

const SubscriptionListing = (props) => {
  const dispatch = useDispatch();
  const [data, setData] = useState(null);
  const {allSubscriptions, subscriptionCurrency} = useSelector(
    (state) => state.subscription
  );
  let tableHead = [
    { field: "Name" },
    { field: "Cost" },
    { field: "Eligible User Role" },
    { field: "Duration" },
    { field: "Description", ellipsisClass: true, width: "23%" },
    { field: "status", cellRenderer: true },
  ];

  useEffect(() => {
    const dataSet = allSubscriptions?.map((item) => {
      return {
        Name: item.name,
        Cost: `${numberWithCommas(item.cost,subscriptionCurrency)}`,
        "Eligible User Role": item.role_name,
        Duration: `${item.duration} months`,
        id: item.id,
        status: item.is_active ? "Active" : "Inactive",
        Description: item.description,
      };
    });

    setData(dataSet);
  }, [allSubscriptions]);

  const options = [
    {
      name: "Active",
      actionClickHandler: (id) =>
        dispatch(toggleSubscriptionStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleSubscriptionStatusAction(id, false)),
    },
  ];

  return (
    <>
      {props?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.tableHeightNoDataFoundNoFilter,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      ) : (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          query={props.query}
          pagination={true}
          setQuery={props.setQuery}
          totalCount={props?.length}
          options={options}
          isConfirmModalRequired={true}
          tableWrapperStyles={customCommonStyles.tableHeightNoSearchFilter}
        />
      )}
    </>
  );
};

export default SubscriptionListing;
