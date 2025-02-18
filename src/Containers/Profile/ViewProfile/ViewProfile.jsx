import React, { useEffect, useState } from "react";
import AjTab from "../../../Components/AjTab/AjTab";
import { getUserData, getRoleName } from "../../../Services/localStorageService";
import AssociationDetails from "./AssociationDetails/AssociationDetails";
import PersonalDetails from "./PersonalDetails/PersonalDetails";
import { ROLES } from '../../../Constant/RoleConstant';
import SuperAdmin from './SuperAdminProfile/SuperAdmin';

const ViewProfile = () => {

const [roleName, setRoleName] = useState("");
const [roleId, setRoleId] = useState(null);

useEffect(() => {
  const userData = getUserData();
  setRoleName(userData.role_name);
  setRoleId(userData.role_id);
}, []);

return (
  <>
  {
    ROLES.SUPER_ADMIN === roleId ? (
    <AjTab components={[
    {component: <SuperAdmin/>, index: 0, label: "" }
  ] } displayProfileText="My Profile" isTabPanelDisplay={false}/>
    ):(
      <AjTab components={[
        {component: <AssociationDetails/>, index: 0, label: getRoleName(roleName) },
        {component: <PersonalDetails/>, index:1, label: "Personal Details"}
      ]} isTabPanelDisplay={true} displayProfileText="My Profile"/>
    )
  }  
  </>
);
};

export default ViewProfile;