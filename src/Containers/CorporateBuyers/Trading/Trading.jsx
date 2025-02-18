import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { commonStyles, customCommonStyles } from "../../../Style/CommonStyle";

import { useNavigate, useSearchParams } from "react-router-dom";
import tradingActiveIcon from "../../../Assets/Images/tradingActiveIcon.svg";
import AjTab from "../../../Components/AjTab/AjTab";
import SelectedProductDetailById from "./SelectedProduct/SelectedProductDetails/SelectedProductDetailById";
import ActiveAds from "./ActiveAds/ActiveAds";
import Orders from "./Orders/Orders";
import Input from "./Orders/Input"

import { TRADING } from "../../../Routes/Routes";
import { useDispatch, useSelector } from "react-redux";
import {
  getTradingActiveAdsAction,
  getTradingOrderListAction,
  getTradingInputOrderListAction,
} from "../../../Redux/CorporateBuyer/Trading/tradingActions";
import { CARD_LIMIT, LIMIT, SKIP } from "../../../Constant/AppConstant";

const Trading = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState();
  let isOpenModal = false;

  const tradingActiveAdsData = useSelector(
    (state) => state.tradingActiveAds.tradingActiveAdsData
  );

  useEffect(() => {
    if (sessionStorage.getItem("isProductSelected") !== null) {
      setId(parseInt(sessionStorage.getItem("productSelected")));
      setOpenModal(true);
      isOpenModal = true;
    }
    sessionStorage.removeItem("isProductSelected");
  }, []);

  const orderList = useSelector(
    (state) => state.tradingActiveAds.tradingOrderList
  );

  const inputOrderList = useSelector(
    (state) => state.tradingActiveAds.tradingInputOrderList
  );

  useEffect(() => {
    let searchObject = {
      limit: CARD_LIMIT,
      skip: SKIP,
    };
    dispatch(getTradingActiveAdsAction(searchObject));
    dispatch(getTradingOrderListAction({ limit: LIMIT, skip: SKIP }));
    dispatch(getTradingInputOrderListAction({ limit: LIMIT, skip: SKIP }));
  }, []);
  return (
    <>
      <Grid
        container
        sx={{
          ...customCommonStyles.mainCorporateContainer,
          ...commonStyles.signupFormMainGridContainer,
          ...commonStyles.relativePosition,
          ...customCommonStyles.tableWrap,
          ...customCommonStyles.noBackgroundTab,
        }}
      >
        {tradingActiveAdsData && orderList && (
          <AjTab
            components={[
              {
                component: <ActiveAds activeTab={0} />,
                index: 0,
                label: `Active ads (${tradingActiveAdsData?.totalCount})`,
                icon: <img src={tradingActiveIcon} />,
              },
              {
                component: <Orders activeTab={1} />,
                index: 1,
                label: `Product (${orderList?.totalCount})`,
              },
              {
                component: <Input activeTab={2} />,
                index: 2,
                label: `Input (${inputOrderList?.totalCount})`,
              }
            ]}
            onChange={(currIndex) =>
              navigate(`${TRADING}?activeTab=${currIndex}`)
            }
            defaultIndex={Number.parseInt(activeTab || 0)}
            backgroundTabs={false}
            displayMyProfile={false}
            isTabPanelDisplay={true}
          />
        )}
        {isOpenModal && (
          <SelectedProductDetailById
            setOpenModal={setOpenModal}
            openModal={openModal}
            id={id}
            type={'product'}
          />
        )}
      </Grid>
    </>
  );
};

export default Trading;
