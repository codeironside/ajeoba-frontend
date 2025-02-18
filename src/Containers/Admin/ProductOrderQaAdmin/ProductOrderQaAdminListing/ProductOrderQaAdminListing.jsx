import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  LIMIT,
  SKIP,
  productOrderStatusOptions,
} from "../../../../Constant/AppConstant";
import * as _ from "lodash";
import {
  textCapitalize,
  numberWithCommas,
  formatDate,
} from "../../../../Services/commonService/commonService";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { styles } from "../../MasterManagement/MasterManagementStyles";
import { styles as tableActionStyle } from "../../../../Components/TableActions/TableActionsStyles";
import { styles as customTableStyles } from "../../../../Components/AjCustomTable/AjCustomTableStyles";
import { getAdminProductOrderQaActions } from "../../../../Redux/common/Products/productsActions";

function ProductOrderQaAdminListing({ searchClick, searchText }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productOrderQaAdminList = useSelector((state) => state.products.prodOrders);

  const productOrderQaAdminListLength = useSelector(
    (state) => state.products.prodOrdersLength
  );

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getAdminProductOrderQaActions(searchObject));
  }, [query, searchClick]);

  let tableHead = [
    { field: "Order id", ellipsisClass: true },
    { field: "Product name" },
    { field: "Batch id" },
    { field: "Batch type" },
    { field: "Quantity sold" },
    { field: "Price" },
    { field: "Date of purchase" },
    {
      field: "Status",
      renderColumn: (row) => {
        let currentStatus = productOrderStatusOptions.find(
          (item) => item.value === row.productStatus
        );
        return (
          <Button
            sx={{
              ...tableActionStyle.inActiveStyle,
              ...(row?.productStatus === "COMPLETED" &&
                customTableStyles.btnStyle),
              ...(row?.productStatus === "IN-TRANSIT" &&
                customTableStyles.intransitStyle),
            }}
            disabled={true}
          >
            <Typography sx={customTableStyles.colorText}>
              {currentStatus?.label}
            </Typography>
          </Button>
        );
      },
    },
    {
      width: "10%",
      renderColumn: (row) => {
        return (
          <Button
            sx={{
              ...commonStyles.anchorButtonStyle,
            }}
            onClick={() => navigate(`detail/${row.id}`)}
          >
            <Typography sx={styles.viewMoreWidth}>View More</Typography>
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    const dataSet = productOrderQaAdminList?.result?.map((item) => {
      return {
        "Order id": item.order_id,
        "Product name": item.product_name,
        "Batch id": item.batch_id,
        "Batch type": item.batch_type,
        "Quantity sold": `${item.quantity} ${textCapitalize(
          item.unit_of_measurement
        )}`,
        Price: item.price
          ? `${numberWithCommas(item?.price, item?.seller_currency)}`
          : "-",
        "Date of purchase": `${formatDate(item.transaction_created_at)}`,
        id: item.id,
        productStatus: item.status,
      };
    });
    setData(dataSet);
  }, [productOrderQaAdminList]);

  return (
    <>
      {productOrderQaAdminList?.result?.length > 0 ? (
        <AjCustomTable
          columnDefs={tableHead}
          rowData={data}
          pagination={true}
          query={query}
          setQuery={setQuery}
          totalCount={productOrderQaAdminListLength}
          statusOptionsRequired={false}
          tableWrapperStyles={customCommonStyles.tableCreateButtonHeight}
          ellipsisMaxWidth={commonStyles.ellipsisMaxWidth}
        />
      ) : (
        <Box
          sx={{
            ...commonStyles.noContentBox,
            ...customCommonStyles.noDataPagination,
          }}
        >
          <AjTypography
            styleData={commonStyles.noDataText}
            displayText="No data found"
          />
        </Box>
      )}
    </>
  );
}

export default ProductOrderQaAdminListing;
