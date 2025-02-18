import { Grid } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import AjTab from "../AjTab/AjTab";
import ProductsSoldContainer from "./ProductsSoldContainer/ProductsSoldContainer";

const ProductsReport = (props) => {
  const userData = getUserData();
  const reportList = useSelector((state) =>
    userData?.role_id === ROLES.FARMING_ASSOCIATION ||
    userData?.role_id === ROLES.PRODUCT_AGGREGATOR
      ? state.reports.productList
      : state.reportsAdmin.adminReportsList
  );

  return (
    <Grid
      container
      sx={{
        ...customCommonStyles.mainContainer,
        ...commonStyles.relativePosition,
        ...customCommonStyles.reportsMainContainer,
      }}
    >
      <AjTab
        components={[
          {
            component: <ProductsSoldContainer type={props.type} />,
            index: 0,
            label: `Total ${
              props.type === "productSold"
                ? "quantity of products sold"
                : "products aggregated"
            } (${reportList?.data ? reportList?.data?.totalCount : ""})`,
          },
        ]}
        backgroundTabs={false}
        displayMyProfile={false}
        isTabPanelDisplay={true}
        noIconTabStyle={true}
      />
    </Grid>
  );
};

export default ProductsReport;
