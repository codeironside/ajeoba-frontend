import React from "react";
import AjTab from "../../../../../Components/AjTab/AjTab";
import AggregatorDetails from "./UserManagementAggregatorDetails/UserManagementAggregatorDetails";
const AggregatorListingDetails = () => {
  return (
    <AjTab
      components={[
        {
          component: <AggregatorDetails />,
          index: 0,
          label: "Aggregator details",
        },
      ]}
      displayMyProfile={false}
      isTabPanelDisplay={true}
    />
  );
};

export default AggregatorListingDetails;
