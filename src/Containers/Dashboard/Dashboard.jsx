import React from "react";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";
import DashboardFarmingAssociation from "../FarmingAssociation/Dashboard/DashboardFarmingAssociation";
import AdminDashboard from "../Admin/AdminDashbaord/AdminDashboard";

const Dashboard = () => {
  const userData = getUserData();
  // console.log(userData);

  return (
    <>
      {(userData?.role_id === ROLES.FARMING_ASSOCIATION ||
        userData?.role_id === ROLES.PRODUCT_AGGREGATOR ||
        // userData?.role_id === ROLES.SINGLE_SELLER ||
        userData?.role_id === ROLES.INPUT_SUPPLIER) && (
        <DashboardFarmingAssociation />
      )}
      {(userData?.role_id === ROLES.SUPER_ADMIN ||
        userData?.role_id === ROLES.ADMIN) && <AdminDashboard />}
    </>
  );
};

export default Dashboard;
