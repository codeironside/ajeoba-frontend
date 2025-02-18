import React from "react";
import AjOrderTrackerContainer from "../../../../../Components/AjOrderTracker/AjOrderTracker";
import AjTab from "../../../../../Components/AjTab/AjTab";
import CorporateBuyerDetail from "./CorporateBuyerDetailView/CorporateBuyerDetail";

const CorporateBuyerDetailView = () => {
  return (
    <AjTab
      components={[
        {
          component: <CorporateBuyerDetail />,
          index: 0,
          label: "Corporate details",
        },
      ]}
      displayMyProfile={false}
      isTabPanelDisplay={true}
    />
  );
};

export default CorporateBuyerDetailView;
