import React, { useEffect, useState } from "react";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../../../../Services/localStorageService";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjBuyProductModal from "../../../../../Components/AjBuyProductModal/AjBuyProductModal";
import { getInputActiveAdDetailByIdAction } from '../../../../../Redux/FarmingAssociation/Input/inputActions'

const SelectedInputDetailById = ({setOpenModal, openModal, id, type}) => {
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
  const inputDetail = useSelector(
    (state) => state.input?.inputActiveAdDetail
  );

  useEffect(() => {
    if (sessionStorage.getItem("inputSelected") !== null) {
      dispatch(getInputActiveAdDetailByIdAction(id));
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
          Here is the {type} that you selected, click on Buy button to complete your transaction.
        </p>
        <AjBuyProductModal
          closeModal={() => setOpenModal(false)}
          data={inputDetail?.advertisementDetail}
          type="Input"
          isDisable={
            inputDetail?.advertisementDetail?.batch_type ===
            "WHOLESALE"
              ? true
              : false
          }
        />
      </AjDialog>
    </>
  );
};

export default SelectedInputDetailById;
