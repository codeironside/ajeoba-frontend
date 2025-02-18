import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box } from "@mui/material";

import AjTypography from "../../../../Components/AjTypography";
import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";

import {
  formatDate,
  getOrderStatus,
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import { toggleTransitOrderStatusAction } from "../../../../Redux/Logistics/logisticsActions";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";

const TransitProductInputListing = (props) => {
  const { dataToList, query, setQuery, totalCount } = props;
  const [data, setData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let tableHead = [
    { field: "Order id", ellipsisClass: true },
    props.activeTab === 0 ? { field: "Product name" } : { field: "Input name" },
    { field: "Price" },
    { field: "Quantity" },
    { field: "Distance" },
    { field: "Posted on" },
    { field: "status", cellRenderer: true },
    { field: "", cellRenderer: true },
  ];

  useEffect(() => {
    const dataSet = dataToList?.map((item) => {
      return {
        "Order id": item.order_id,
        ...(props.activeTab === 0
          ? { "Product name": item.product_name }
          : { "Input name": item.input_name }),
        "Product name": item.product_name,
        Price: `${numberWithCommas(item?.price, item?.currency)}`,
        Quantity: `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )}`,
        Distance: `${item.distance} Km`,
        "Posted on": `${formatDate(item.created_at)}`,
        id: item.logistics_advertisement_id,
        status: getOrderStatus(item.status),
      };
    });

    setData(dataSet);
  }, [dataToList]);

  const options = [
    {
      name: "Ongoing",
      actionClickHandler: (id) =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "ONGOING" })),
    },
    {
      name: "In-transit",
      actionClickHandler: (id) =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "IN-TRANSIT" })),
    },
    {
      name: "Completed",
      actionClickHandler: (id) =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "COMPLETED" })),
    },
  ];
  let actionsArray = [
    {
      name: "View More",
      type: "anchor",
      actionClickHandler: (id) => {
        navigate(`transit-order/detail/${id}?activeTab=${props.activeTab}`);
      },
    },
  ];

  return (
    <>
      {totalCount === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.noDataContainer,
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
          actions={actionsArray}
          rowData={data}
          query={query}
          pagination={true}
          setQuery={setQuery}
          totalCount={totalCount}
          options={options}
          isConfirmModalRequired={true}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
          // tableWrapperStyles={{
          //   height: `calc(100vh -  21.75rem)`,
          // }}
        />
      )}
    </>
  );
};

export default TransitProductInputListing;
