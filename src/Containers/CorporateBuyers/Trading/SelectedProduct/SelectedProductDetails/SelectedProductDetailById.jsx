import React, { useEffect, useState } from "react";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../../../Services/localStorageService";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjBuyProductModal from "../../../../../Components/AjBuyProductModal/AjBuyProductModal";
import { getTradingActiveAdDetailByIdAction } from '../../../../../Redux/PublicMarket/Trading/tradingActions'

const SelectedProductDetailById = ({setOpenModal, openModal, id}) => {
  const sp = {
      container: {
        fontWeight: "500",
        fontSize: "0.875rem",
        color: "LIGHT_GREY",
        margin: "1.25rem auto",
        textAlign: "center",
      }
  }
  const dispatch = useDispatch();
  const userData = getUserData();
  const tradingActiveAdDetail = useSelector(
    (state) => state.tradingActiveAds.tradingActiveAdDetail
  );

  useEffect(() => {
    if (sessionStorage.getItem("productSelected") !== null) {
      dispatch(getTradingActiveAdDetailByIdAction(id));
    }
  }, [id]);

  return (
    <>
      <AjDialog
        open={openModal}
        closeModal={() => setOpenModal(false)}
        title="Buy"
        styleData={commonStyles.buyDialogModalContainer}
      >
        <p 
          style={
            sp.container
          }
        >
          Here is the product that you selected, click on Buy button to complete your transaction.
        </p>
        <AjBuyProductModal
          closeModal={() => setOpenModal(false)}
          data={tradingActiveAdDetail?.AdvertisemetDetail}
          type="Product"
          isDisable={
            tradingActiveAdDetail?.AdvertisemetDetail?.batch_type ===
            "WHOLESALE"
              ? true
              : false
          }
        />
      </AjDialog>
    </>
  );
};

export default SelectedProductDetailById;
