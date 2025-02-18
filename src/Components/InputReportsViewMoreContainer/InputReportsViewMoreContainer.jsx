import React from "react";
import { getUserData } from "../../Services/localStorageService";
import InputPurchasedListingView from "../../Containers/Admin/AdminReports/InputPurchasedListing/InputPurchasedListingView";
import InputPurchasedAssociation from "../../Containers/FarmingAssociation/FarmingAssociationReports/InputPurchasedAssociation/InputPurchasedAssociation";
import { ROLES } from "../../Constant/RoleConstant";
const InputReportsViewMoreContainer = () => {
  const roleId = getUserData().role_id;
  return (
    <>
      {roleId === ROLES.FARMING_ASSOCIATION ? (
        <InputPurchasedAssociation />
      ) : (
        <InputPurchasedListingView />
      )}
    </>
  );
};

export default InputReportsViewMoreContainer;
