import React from "react";
import OpenSpecificAds from "../../Containers/LogisticCompany/OpenSpecificAds/OpenSpecificAds";
import { OPEN_ADS } from "../../Routes/Routes";

const AjLogisticsOpenAds = () => {
  return (
    <>
      <OpenSpecificAds currentRoute={OPEN_ADS} />
    </>
  );
};

export default AjLogisticsOpenAds;
