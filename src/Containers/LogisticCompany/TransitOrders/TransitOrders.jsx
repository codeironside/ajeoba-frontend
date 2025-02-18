import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Grid } from "@mui/material";

import { customCommonStyles, commonStyles } from "../../../Style/CommonStyle";
import { styles as inventoryStyles } from "../../FarmingAssociation/Inventory/AvailableInventory/AvailableInventoryStyles.js";
import AjTab from "../../../Components/AjTab/AjTab";
import { useNavigate, useSearchParams } from "react-router-dom";
import transitOrdersActiveIcon from "../../../Assets/Images/transitOrdersActiveIcon.svg";
import TransitProductInput from "./TransitProductInput/TransitProductInput";
import { TRANSIT_ORDERS } from "../../../Routes/Routes";
import { LIMIT, SKIP, orderTypeOptions } from "../../../Constant/AppConstant";
import { getTransitProductInputListAction } from "../../../Redux/Logistics/logisticsActions";

const TransitOrders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const transitProductList = useSelector(
    (state) => state.logistics.transitProductList
  );
  const transitInputList = useSelector(
    (state) => state.logistics.transitInputList
  );

  useEffect(() => {
    let searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(
      getTransitProductInputListAction({
        ...searchObject,
        requestFor: orderTypeOptions[0]?.productOrders,
      })
    );
    dispatch(
      getTransitProductInputListAction({
        ...searchObject,
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
        {transitProductList && transitInputList && (
          <AjTab
            components={[
              {
                component: <TransitProductInput activeTab={0} />,
                index: 0,
                label: `Product (${transitProductList?.totalCount})`,
                icon: <img src={transitOrdersActiveIcon} />,
              },
              {
                component: <TransitProductInput activeTab={1} />,
                index: 1,
                label: `Input (${transitInputList?.totalCount})`,
              },
            ]}
            onChange={(currIndex) =>
              navigate(`${TRANSIT_ORDERS}?activeTab=${currIndex}`)
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

export default TransitOrders;
