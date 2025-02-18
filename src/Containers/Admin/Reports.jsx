import React from "react";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";
import FarmingAssociationReports from "../FarmingAssociation/FarmingAssociationReports/FarmingAssociationReports";
import AdminReports from "./AdminReports/AdminReports";
import InputSupplierReport from "../InputSupplier/InputSupplierReport/InputSupplierReport";

export default function Reports() {
  const userData = getUserData();
  return (
    <>
      {(userData?.role_id === ROLES.FARMING_ASSOCIATION ||
        userData?.role_id === ROLES.PRODUCT_AGGREGATOR) && (
        <FarmingAssociationReports />
      )}
      {(userData?.role_id === ROLES.ADMIN ||
        userData?.role_id === ROLES.SUPER_ADMIN) && <AdminReports />}
      {userData?.role_id === ROLES.INPUT_SUPPLIER && <InputSupplierReport />}
    </>
  );
}
