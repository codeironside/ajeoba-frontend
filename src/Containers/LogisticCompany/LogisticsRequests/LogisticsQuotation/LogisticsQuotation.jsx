import React, { useEffect, useState } from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import AjTab from "../../../../Components/AjTab/AjTab";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { getAdsProductInputListAction } from "../../../../Redux/Logistics/logisticsActions";
import {
  LIMIT,
  SKIP,
  orderTypeOptions,
} from "../../../../Constant/AppConstant";
import LogisticsQuotationForm from "./LogisticsQuotationForm";
import { OPEN_ADS } from "../../../../Routes/Routes";

const LogisticsQuotation = () => {
  const currentRoute = OPEN_ADS;
  const typeofAdReq = currentRoute === OPEN_ADS ? "1" : "2";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id: adId } = params;

  const [listAds, setListAds] = useState(() => {
    const storedListAds = localStorage.getItem("listAds");
    return storedListAds ? JSON.parse(storedListAds) : null;
  });

  const adsInputList = useSelector((state) => state.logistics.adsInputList);
  const adsProductList = useSelector((state) => state.logistics.adsProductList);
  const requestForOptions = {
    productOrders: orderTypeOptions[0]?.productOrders,
    inputOrders: orderTypeOptions[0]?.inputOrders,
  };

  useEffect(() => {
    let searchObject = {
      limit: LIMIT,
      skip: SKIP,
    };
    dispatch(
      getAdsProductInputListAction({
        ...searchObject,
        requestType: typeofAdReq,
        requestFor: orderTypeOptions[0]?.productOrders,
      })
    );
    dispatch(
      getAdsProductInputListAction({
        ...searchObject,
        requestType: typeofAdReq,
        requestFor: orderTypeOptions[0]?.inputOrders,
      })
    );

    if (adsProductList?.result || adsInputList?.result) {
      const listAllAds = (adsProductList?.result || []).concat(
        adsInputList?.result || []
      );
      const listAllAd = listAllAds?.find((item) => item.id === Number(adId));
      setListAds(listAllAd || null);
      localStorage.setItem("listAds", JSON.stringify(listAllAd || null));
    }
  }, [adId]);

  const backArrowHandler = () => {
    navigate(OPEN_ADS);
  };

  return (
    <>
      <Grid
        container
        sx={{
          ...commonStyles.signupFormMainGridContainer,
          ...commonStyles.relativePosition,
          ...commonStyles.containerpadding,
        }}
      >
        <IconButton
          sx={commonStyles.whiteBackButtonPosition}
          onClick={backArrowHandler}
        >
          <ArrowBackRoundedIcon
            sx={commonStyles.backButtonBlackFont}
            onClick={backArrowHandler}
          />
        </IconButton>
        <AjTab
          components={[
            {
              component: (
                <LogisticsQuotationForm
                  listAds={listAds}
                  typeofAdReq={typeofAdReq}
                  requestFor={requestForOptions}
                />
              ),
              label: "Make quotation",
            },
          ]}
          displayMyProfile={false}
          isTabPanelDisplay={true}
        />
      </Grid>
    </>
  );
};

export default LogisticsQuotation;
