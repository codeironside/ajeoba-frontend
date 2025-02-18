import React, { useState, useEffect } from "react";
import AjQaOpenAds from "../../Components/AjQaOpenAds/AjQaOpenAds";
import AjLogisticsOpenAds from "../../Components/AjLogisticsOpenAds/AjLogisticsOpenAds";
import { ROLES } from "../../Constant/RoleConstant";
import { getUserData } from "../../Services/localStorageService";

const OpenAds = () => {
  const [roleId, setRoleId] = useState();

  useEffect(() => {
    const userData = getUserData();
    setRoleId(userData.role_id);
  }, [roleId]);

  return (
    <>
      {roleId === ROLES.QA_COMPANY && <AjQaOpenAds />}
      {roleId === ROLES.LOGISTICS_COMPANY && <AjLogisticsOpenAds />}
    </>
  );
};

export default OpenAds;
