import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { Box } from "@mui/material";

import AjCustomTable from "../../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../../Components/AjTypography";

import {
  LIMIT,
  qualityOptions,
  SKIP,
  productTypeOptions,
} from "../../../../../Constant/AppConstant";
import { getInventoryListAction } from "../../../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { styles } from "../AvailableInventoryStyles";
import { textCapitalize } from "../../../../../Services/commonService/commonService";

const AvailableInventoryListing = ({
  searchClick,
  searchText,
  wareHouseItem,
}) => {
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  const inventoryList = useSelector((state) => state.inventory.inventoryList);

  const tableHead = [
    { field: "Product Name", ellipsisClass: true },
    { field: "Product Type" },
    { field: "Warehouse", ellipsisClass: true },
    { field: "Quality" },
    { field: "On-hand" },
    { field: "Batched" },
    { field: "Awaiting Pickup" },
    { field: "Unit of Measurement", width: "15%" },
  ];

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    if (wareHouseItem) {
      searchObject = {
        ...searchObject,
        limit: LIMIT,
        skip: SKIP,
        warehouseId: wareHouseItem,
      };
    }
    dispatch(getInventoryListAction(searchObject));
  }, [query, searchClick, wareHouseItem]);

  useEffect(() => {
    const dataSet = inventoryList?.data?.result?.map((item) => {
      return {
        "Product Name": item.product_name,
        "Product Type": _.find(productTypeOptions, { value: item.product_type })
          .label,
        Warehouse: item.warehouse_name,
        Quality: _.find(qualityOptions, { value: String(item.quality) }).label,
        "On-hand": item.available_quantity,
        Batched: item.batched_quantity,
        "Awaiting Pickup": item?.awaiting_pickup,
        id: item.id,
        "Unit of Measurement": textCapitalize(item.unit_of_measurement),
      };
    });
    setData(dataSet);
  }, [inventoryList]);

  return (
    <>
      {inventoryList?.data?.result?.length === 0 ? (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...styles.noContentStyles,
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
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={inventoryList?.data?.totalcount}
          tableWrapperStyles={customCommonStyles.tableHeightNoBackgroundTabs}
        />
      )}
    </>
  );
};

export default AvailableInventoryListing;
