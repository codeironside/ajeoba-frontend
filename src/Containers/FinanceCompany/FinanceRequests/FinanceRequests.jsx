import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";
import AjTab from "../../../Components/AjTab/AjTab";
import FinanceRequestListing from "../FinanceRequestListing/FinanceRequestListing";
import financeRequestActive from "../../../Assets/Images/financeRequestActive.svg";

import { FINANCE_REQUESTS } from "../../../Routes/Routes";
import { getFinanceRequestsListAction } from "../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";

import { customCommonStyles, commonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";

const FinanceRequests = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeRequestsList = useSelector(
    (state) => state.financeCompanyRequests.activeRequestsList
  );

  const closedRequestsList = useSelector(
    (state) => state.financeCompanyRequests.closedRequestsList
  );
  useEffect(() => {
    let searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(
      getFinanceRequestsListAction({
        ...searchObject,
        status: "ACTIVE",
      })
    );
    dispatch(
      getFinanceRequestsListAction({
        ...searchObject,
        status: "CLOSED",
      })
    );
  }, []);

  return (
    <>
      <Grid
        container
        sx={{
          ...customCommonStyles.mainContainer,
          ...commonStyles.signupFormMainGridContainer,
          ...commonStyles.relativePosition,
          ...customCommonStyles.noBackgroundTab,
          ...inventoryStyles.inventoryMainContainer,
        }}
      >
        {activeRequestsList && closedRequestsList && (
          <AjTab
            components={[
              {
                component: <FinanceRequestListing activeTab={0} />,
                index: 0,
                label: `Active requests (${activeRequestsList?.totalCount} )`,
                icon: <img src={financeRequestActive} />,
              },
              {
                component: <FinanceRequestListing activeTab={1} />,
                index: 1,
                label: `Closed requests (${closedRequestsList?.totalCount})`,
              },
            ]}
            onChange={(currIndex) =>
              navigate(`${FINANCE_REQUESTS}?activeTab=${currIndex}`)
            }
            defaultIndex={Number.parseInt(activeTab || 0)}
            backgroundTabs={false}
            displayMyProfile={false}
            isTabPanelDisplay={true}
          />
        )}
      </Grid>
    </>
  );
};

export default FinanceRequests;
