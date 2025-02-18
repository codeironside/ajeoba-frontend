import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getToken } from "../Auth/getToken";
import { PASSWORD_ENCRYPTION_SECRET } from "../Constant/AppConstant";
import { decrypt } from "../Services/localStorageService";
import {
  getDefaultPath,
  getDisabledPath,
} from "../Services/commonService/commonService";
import {
  USERROLESELECTION,
  SIGNUPACCOUNTDETAILS,
  SIGNUPPERSONALDETAILS,
  KYCVERIFICATION,
  DASHBOARD,
  TERMS_AND_CONDITIONS,
  ROOT,
  PRIVACY_POLICY,
} from "./Routes";

import { privateRoutes } from "./GetPrivateRoutes";

import _ from "lodash";

const getUserData = (userData, secretKey) => {
  const decryptUserData = decrypt(userData, secretKey);
  return JSON.parse(decryptUserData);
};
const PrivateRoute = () => {
  const location = useLocation();
  const data = localStorage.getItem("user");
  const userData = data && getUserData(data, PASSWORD_ENCRYPTION_SECRET);

  const isUserLoggedIn = getToken();
  if (
    location.pathname.includes(TERMS_AND_CONDITIONS) ||
    location.pathname.includes(PRIVACY_POLICY)
  ) {
    return <Outlet />;
  }
  if (!isUserLoggedIn) {
    return <Navigate to={ROOT} />;
  } else {
    if (!userData.role_id) {
      if (location.pathname !== USERROLESELECTION) {
        return <Navigate to={USERROLESELECTION} />;
      } else {
        return <Outlet />;
      }
    }
    if (!userData.role_id === 6) {
      if (!userData.is_personal_detail_filled) {
        const allowedPaths = [USERROLESELECTION, SIGNUPPERSONALDETAILS];
        if (!allowedPaths.includes(location.pathname)) {
          return <Navigate to={SIGNUPPERSONALDETAILS} />;
        } else {
          return <Outlet />;
        }
      }
    }
    if (!userData.role_id === 6) {
      if (!userData.is_account_detail_filled) {
        const allowedPaths = [
          USERROLESELECTION,
          SIGNUPPERSONALDETAILS,
          SIGNUPACCOUNTDETAILS,
        ];
        if (!allowedPaths.includes(location.pathname)) {
          return <Navigate to={SIGNUPACCOUNTDETAILS} />;
        } else {
          return <Outlet />;
        }
      }
    }
    // if (!userData.is_kyc_verified) {
    //   const allowedPaths = [
    //     USERROLESELECTION,
    //     SIGNUPPERSONALDETAILS,
    //     SIGNUPACCOUNTDETAILS,
    //     KYCVERIFICATION,
    //     DASHBOARD,
    //   ];
    //   if (!allowedPaths.includes(location.pathname)) {
    //     return <Navigate to={KYCVERIFICATION} />;
    //   } else {
    //     return <Outlet />;
    //   }
    // }
    if (
      userData.role_id &&
      userData.is_personal_detail_filled &&
      userData.is_account_detail_filled
    ) {
      const restrictPaths = [
        USERROLESELECTION,
        SIGNUPPERSONALDETAILS,
        SIGNUPACCOUNTDETAILS,
      ];
      if (restrictPaths.includes(location.pathname)) {
        return;
      }
      if (location.pathname === "/") {
        return (
          <Navigate
            to={getDefaultPath(
              userData.role_id,
              userData.status,
              userData?.subscription_expiry_date
            )}
          />
        );
      } else {
        const roleId = userData.role_id;
        const routes = _.find(privateRoutes, (route) => {
          return (
            location.pathname.includes(route.path) &&
            (route.rolesAllowed.includes(roleId) ||
              route.rolesAllowed.length < 1)
          );
        });
        if (
          routes &&
          !getDisabledPath(
            roleId,
            routes.path,
            userData.status,
            userData?.subscription_expiry_date
          )
        ) {
          return <Outlet />;
        } else {
          return (
            <Navigate
              to={getDefaultPath(
                userData.role_id,
                userData.status,
                userData?.subscription_expiry_date
              )}
            />
          );
        }
      }
    }
  }
  return <Outlet />;
};

export default PrivateRoute;
