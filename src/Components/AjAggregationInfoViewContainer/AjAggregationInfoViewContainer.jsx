import React from "react";
import { ROLES } from "../../Constant/RoleConstant";
import AggregatorListingView from "../../Containers/Admin/AdminReports/AggregatorListing/AggregatorListingView";
import {
  PRODUCT_AGGREGATION_VIEW_MORE,
  PRODUCT_SOLD_VIEW_MORE,
} from "../../Routes/Routes";
import { getUserData } from "../../Services/localStorageService";

const AjAggregationInfoViewContainer = (props) => {
  const { path } = props;
  const roleId = getUserData()?.role_id;
  return (
    <>
      {path === PRODUCT_SOLD_VIEW_MORE && (
        <AggregatorListingView tabRequired={[1, 2]} type="productSold" />
      )}
      {path === PRODUCT_AGGREGATION_VIEW_MORE && (
        <AggregatorListingView
          tabRequired={
            roleId === ROLES.ADMIN || roleId === ROLES.SUPER_ADMIN
              ? [1, 2, 3]
              : [3]
          }
          type="productAggregated"
        />
      )}
    </>
  );
};

export default AjAggregationInfoViewContainer;
