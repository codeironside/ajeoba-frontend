import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";

import AjCustomTable from "../../../../Components/AjCustomTable/AjCustomTable";
import AjTypography from "../../../../Components/AjTypography";
import { commonStyles, customCommonStyles } from "../../../../Style/CommonStyle";
import { getProducts } from "../../../../Redux/common/Products/productsActions";
import { toggleProductStatusAction } from "../../../../Redux/SuperAdmin/ProductMaster/productMasterActions";
import { isEnabledOption, LIMIT, SKIP } from "../../../../Constant/AppConstant";
import { ROLES } from "../../../../Constant/RoleConstant";
import { getUserData } from "../../../../Services/localStorageService";
import { PRODUCT_MASTER } from "../../../../Routes/Routes";
import { textCapitalize } from "../../../../Services/commonService/commonService";

const ProductMasterListing = (props) => {
  const { searchClick, searchText } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const roleId = getUserData().role_id;

  const products = useSelector((state) => state.products.products);
  const productsLength = useSelector((state) => state.products.productsLength);

  const [query, setQuery] = useState({ limit: LIMIT, skip: SKIP });
  const [data, setData] = useState(null);

  let tableHead = [
    { field: "Product ID", width: "13%" },
    { field: "Product Name", ellipsisClass: true, width: "15%" },
    { field: "Unit of Measurement", width: "13%" },
    { field: "Minimum quantity", width: "13%" },
    { field: "Commission %", width: "13%" },
    { field: "Is commission enabled", width: "12%" },
    { field: "Status", cellRenderer: true },
  ];
  if (ROLES.ADMIN === roleId || ROLES.SUPER_ADMIN === roleId) {
    tableHead = [...tableHead, { field: "", cellRenderer: true }];
  }
  const options = [
    {
      name: "Active",
      actionClickHandler: (id) => dispatch(toggleProductStatusAction(id, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (id) =>
        dispatch(toggleProductStatusAction(id, false)),
    },
  ];
  const edit = (id) => {
    navigate(`${PRODUCT_MASTER}/product/edit/${id}`);
  };
  let actionsArray = [];
  if (ROLES.ADMIN === roleId || ROLES.SUPER_ADMIN === roleId) {
    actionsArray = [
      {
        name: "Edit",
        type: "anchor",
        actionClickHandler: (id) => edit(id),
      },
    ];
  }

  useEffect(() => {
    let searchObject = { limit: query.limit, skip: query.skip };
    if (searchText.length) {
      searchObject = {
        limit: LIMIT,
        skip: SKIP,
        filterText: searchText,
      };
    }
    dispatch(getProducts(searchObject));
  }, [query, searchClick]);

  useEffect(() => {
    const dataSet = products?.map((item) => {
      let isEnabled = _.find(isEnabledOption, {
        value: item.is_enabled,
      })?.label;
      return {
        "Product ID": item.product_id,
        "Product Name": item.productName,
        "Unit of Measurement": textCapitalize(item.unit_of_measurement),
        "Commission %": item.commission,
        "Minimum quantity": item.min_quantity_for_commission,
        "Is commission enabled": isEnabled,
        id: item.productId,
        status: item.is_active ? "Active" : "Inactive",
      };
    });
    setData(dataSet);
  }, [products]);

  return (
    <>
      {products?.length === 0 ? (
        <Box sx={{...commonStyles.noContentBox, ...customCommonStyles.tableHeightNoDataFoundSearchFilter}}>
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
          totalCount={productsLength}
          options={options}
        />
      )}
    </>
  );
};

export default ProductMasterListing;
