import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import marketplaceGreen from "../../../Assets/Images/marketplaceActiveIcon.svg";

import AjButton from "../../../Components/AjButton";
import AjTab from "../../../Components/AjTab/AjTab";

import { RETAILMARKET_CREATEADS, RETAILMARKET } from "../../../Routes/Routes";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";
import {
  getActiveAdsListAction,
  getRecievedOrdersListAction,
} from "../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";
import { LIMIT, SKIP } from "../../../Constant/AppConstant";
import MarketplaceListing from "../../FarmingAssociation/Marketplace/MarketplaceListing/MarketplaceListing";
import RetailMarketListing from "../RetailMarketListing/RetailMarketListing";



function RetailMarket() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const activeTab = searchParams.get("activeTab");

  const activeAdsList = useSelector((state) => state.marketplace.activeAdsList);
  const recievedOrdersList = useSelector(
    (state) => state.marketplace.recievedOrdersList
  );

  useEffect(() => {
    dispatch(getActiveAdsListAction({ limit: LIMIT, skip: SKIP }));
    dispatch(getRecievedOrdersListAction({ limit: LIMIT, skip: SKIP }));
  }, []);

  return (
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
      <Grid item sx={inventoryStyles.createBatchContainer}>
        {activeTab !== "1" ? (
          <AjButton
            variant="text"
            textStyle={inventoryStyles.batchBtnTextResponsive}
            styleData={{
              ...customCommonStyles.addButtonStyle,
              ...inventoryStyles.createBatchButton,
            }}
            displayText="Create Ad"
            onClick={() => navigate(RETAILMARKET_CREATEADS)}
          />
        ) : (
          <Box sx={inventoryStyles.emptyBoxStyle}></Box>
        )}
      </Grid>
      {activeAdsList && recievedOrdersList && (
        <AjTab
          components={[
            {
              component: <RetailMarketListing activeTab={0} />,
              index: 0,
              label: `Active ads (${activeAdsList?.totalcount || 0})`,
              icon: <img src={marketplaceGreen} />,
            },
            {
              component: <RetailMarketListing activeTab={1} />,
              index: 1,
              label: `Received orders (${recievedOrdersList?.totalCount})`,
            },
          ]}
          onChange={(currIndex) =>
            navigate(`${RETAILMARKET}?activeTab=${currIndex}`)
          }
          defaultIndex={Number.parseInt(activeTab || 0)}
          backgroundTabs={false}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      )}
    </Grid>
  );
}

export default RetailMarket;
