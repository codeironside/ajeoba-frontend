import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import AjTab from "../../../Components/AjTab/AjTab";
import ProductInput from "./ProductInput/ProductInput";

import openAdsActiveIcon from "../../../Assets/Images/megaphone1.svg";
import { OPEN_ADS } from "../../../Routes/Routes";
import { LIMIT, SKIP, orderTypeOptions } from "../../../Constant/AppConstant";
import { getAdsProductInputListAction } from "../../../Redux/Logistics/logisticsActions";

import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles";

const OpenSpecificAds = (props) => {
  const { currentRoute } = props;
  const adRequested = currentRoute === OPEN_ADS ? "1" : "2";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const adsInputList = useSelector((state) => state.logistics.adsInputList);
  const adsProductList = useSelector((state) => state.logistics.adsProductList);

  useEffect(() => {
    let searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(
      getAdsProductInputListAction({
        ...searchObject,
        requestType: adRequested,
        requestFor: orderTypeOptions[0]?.productOrders,
      })
    );
    dispatch(
      getAdsProductInputListAction({
        ...searchObject,
        requestType: adRequested,
        requestFor: orderTypeOptions[0]?.inputOrders,
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
        {adsProductList && adsInputList && (
          <AjTab
            components={[
              {
                component: (
                  <ProductInput activeTab={0} adRequested={adRequested} />
                ),
                index: 0,
                label: `Product (${adsProductList?.totalcount})`,
                icon: <img src={openAdsActiveIcon} />,
              },
              {
                component: (
                  <ProductInput activeTab={1} adRequested={adRequested} />
                ),
                index: 1,
                label: `Input (${adsInputList?.totalcount})`,
              },
            ]}
            onChange={(currIndex) =>
              navigate(`${currentRoute}?activeTab=${currIndex}`)
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

export default OpenSpecificAds;
