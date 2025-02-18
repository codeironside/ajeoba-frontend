import React, { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDashboardHeaderListAction, getDashBoardlistAction } from "../../Redux/FarmingAssociation/Dashboard/dashboardActions";
import { getUserData } from "../../Services/localStorageService";
import { ROLES } from "../../Constant/RoleConstant";
import AjDashboardListCard from "./AjDashboardListCard";
import { FARMERS, REPORTS } from "../../Routes/Routes";
import { LIMIT, SKIP } from "../../Constant/AppConstant";

// TODO link
import {
  farmingAssociationDashboardHaeders,
  inputSupplierDashboardHaeders,
  productsAggregatorDashboardHeaders,
} from "../../Constant/AppConstant";

function AjDashboardHeaderList() {

  
  let dashboardHeaders = [];
  const userData = getUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (userData?.role_id === ROLES?.FARMING_ASSOCIATION) {
    dashboardHeaders = farmingAssociationDashboardHaeders;
  } else if (userData?.role_id === ROLES?.PRODUCT_AGGREGATOR) {
    dashboardHeaders = productsAggregatorDashboardHeaders;
  } else if (userData?.role_id === ROLES?.INPUT_SUPPLIER) {
    dashboardHeaders = inputSupplierDashboardHaeders;
  }

  let initialDashboardInfoBox = dashboardHeaders.map((item) => {
    return {
      heading: item.label,
    };
  });

  let dashboardHeaderList = useSelector(
    (state) => state.dashboard.headerList
  );

  

  useEffect(() => {
  async function fetchDashboardList() {
    try {
      const response = await dispatch(getDashBoardlistAction());
      if (response) {
        dispatch(getDashBoardlistAction());
      }
    } catch (error) {
    }
  }
  fetchDashboardList();
  }, []);

  const allFarmersList = useSelector((state) => state.dashboard.allfarmers);
  dashboardHeaderList['unverifiedFarmers'] = allFarmersList - Number(dashboardHeaderList.farmersOnboard);
     
  const [loading, setLoading] = useState(true);
  const [dashboardInfoBox, setDashboardInfoBox] = useState(
    initialDashboardInfoBox
  );

  useEffect(() => {
    dispatch(
      getDashboardHeaderListAction(
        userData.role_id === ROLES.INPUT_SUPPLIER ? true : false
      )
    );
  }, []);

  useEffect(() => {
    if (dashboardHeaderList) {
      setLoading(false);
      let headerList = dashboardHeaders.map((item) => {
        return {
          heading: item.label,
          key: item.key,
          count: dashboardHeaderList[item.key] || 0,
        };
      });
      setDashboardInfoBox(headerList);
     }
  }, [dashboardHeaderList]);

  
  const handleClickDashboardHeader = (_event, index) => {
    let params = { limit: LIMIT, skip: SKIP, type: "FARMER", isKycVerified: null };
    if (userData.role_id === ROLES.FARMING_ASSOCIATION) {
      if (index === 0) {
        params.isKycVerified = true
        navigate(FARMERS, {state : params});        
      } else if (index === 1) {
        params.isKycVerified = false
        navigate(FARMERS, {state : params});
      }else if (index === 2) {
        navigate(`${REPORTS}?activeTab=inputs-purchased`);
      } else if (index === 3) {
        navigate(`${REPORTS}?activeTab=aggregations`);
      } else {
        navigate(`${REPORTS}?activeTab=products`);
      }
    }
    
    if (userData.role_id === ROLES.PRODUCT_AGGREGATOR) {
      if (index === 0) {
        navigate(`${REPORTS}?activeTab=aggregations`);
      } else {
        navigate(`${REPORTS}?activeTab=products`);
      }
    }

    if (ROLES.INPUT_SUPPLIER === userData?.role_id) {
      if (index === 0) {
        navigate(`${REPORTS}?activeTab=input-aggregated`);
      } else {
        navigate(`${REPORTS}?activeTab=input-sold`);
      }
    }
  };

  return (
      <AjDashboardListCard
      dashboardInfoBox={dashboardInfoBox}
      loading={loading}
      getInfo={handleClickDashboardHeader}
    />
  );
}

export default AjDashboardHeaderList;
