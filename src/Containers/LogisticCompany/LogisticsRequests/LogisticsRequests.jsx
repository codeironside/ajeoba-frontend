import { React } from "react";
import { LOGISTICS_REQUESTS } from "../../../Routes/Routes";
import OpenSpecificAds from "../OpenSpecificAds/OpenSpecificAds";

const LogisticsRequests = () => {
  return (
    <>
      <OpenSpecificAds currentRoute={LOGISTICS_REQUESTS} />
    </>
  );
};

export default LogisticsRequests;
