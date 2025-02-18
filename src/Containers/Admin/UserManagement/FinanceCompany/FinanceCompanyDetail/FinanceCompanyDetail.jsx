import React from "react";
import AjTab from "../../../../../Components/AjTab/AjTab";
import FinanceCompanyDetailView from "./FinanceCompanyDetailView";

const FinanceCompanyDetail = () => {
  return (
    <>
      <AjTab
        components={[
          {
            component: <FinanceCompanyDetailView />,
            index: 0,
            label: "Finance details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </>
  );
};

export default FinanceCompanyDetail;
