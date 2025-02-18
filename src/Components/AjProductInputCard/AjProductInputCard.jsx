import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

import { Box } from "@mui/material";

import AjButton from "../AjButton";
import AjDetailData from "../AjDetailData/AjDetailData";

import { getUserData } from "../../Services/localStorageService";
import {
  getPhoneCodeSymbol,
  formatDate,
  numberWithCommas,
  textCapitalize,
} from "../../Services/commonService/commonService";

import { styles as cardStyles } from "../AjAdsCertificateReqPost/AjAdsCertificateReqPostStyles";
import { commonStyles } from "../../Style/CommonStyle";
import { LIMIT, orderTypeOptions, SKIP } from "../../Constant/AppConstant";

const AjProductInputCard = (props) => {
  const { data, adRequested, itemRequestedFor } = props;
  const userData = getUserData();
  const navigate = useNavigate();
  const [addressOfSeller, setAddressOfSeller] = useState();
  const [addressOfBuyer, setAddressOfBuyer] = useState();

  useEffect(() => {
    if (data) {
      let sellerAddress = `${data?.seller_address_1}`;
      if (data?.seller_address_2) {
        sellerAddress = `${sellerAddress}, ${data?.seller_address_2}`;
      }
      if (data?.seller_city) {
        sellerAddress = `${sellerAddress}, ${data?.seller_city}`;
      }
      if (data?.seller_zip_code) {
        sellerAddress = `${sellerAddress}, ${data?.seller_zip_code}`;
      }
      if (data?.seller_state_name) {
        sellerAddress = `${sellerAddress}, ${data?.seller_state_name}`;
      }
      if (data?.seller_country_name) {
        sellerAddress = `${sellerAddress}, ${data?.seller_country_name}`;
      }
      setAddressOfSeller(sellerAddress);
      let buyerAddress = `${data?.delivery_address_1}`;
      if (data?.delivery_address_2) {
        buyerAddress = `${buyerAddress}, ${data?.delivery_address_2}`;
      }
      if (data?.buyer_city) {
        buyerAddress = `${buyerAddress}, ${data?.buyer_city}`;
      }
      if (data?.buyer_zip_code) {
        buyerAddress = `${buyerAddress}, ${data?.buyer_zip_code}`;
      }
      if (data?.buyer_state_name) {
        buyerAddress = `${buyerAddress}, ${data?.buyer_state_name}`;
      }
      if (data?.buyer_country_name) {
        buyerAddress = `${buyerAddress}, ${data?.buyer_country_name}`;
      }
      setAddressOfBuyer(buyerAddress);
    }
  }, []);

  return (
    <>
      <Box sx={cardStyles.mainContainer}>
        <Box sx={cardStyles.insideMainContainer}>
          <Box sx={cardStyles.fieldContainer}>
            <Box sx={cardStyles.firstRow}>
              <AjDetailData
                metaData="Order id"
                data={data?.order_id}
                styleData={cardStyles.fieldGap}
              />
              {itemRequestedFor === orderTypeOptions[0].productOrders ? (
                <AjDetailData
                  metaData="Product name"
                  data={data?.product_name}
                  styleData={cardStyles.fieldGap}
                />
              ) : (
                <AjDetailData
                  metaData="Input name"
                  data={data?.input_name}
                  styleData={cardStyles.fieldGap}
                />
              )}

              <AjDetailData metaData="Distance" data={`${data?.distance} Km`} />
            </Box>
            <AjDetailData
              metaData="Posted on"
              data={`${formatDate(data?.created_at)}`}
            />
          </Box>
          <Box sx={cardStyles.firstRow}>
            <AjDetailData
              metaData="Price"
              data={`${numberWithCommas(data?.price, userData?.currency)}`}
              styleData={cardStyles.fieldGap}
            />
            <AjDetailData
              metaData="Quantity"
              data={`${data?.quantity} ${textCapitalize(
                data?.unit_of_measurement
              )}`}
              styleData={cardStyles.fieldGap}
            />
          </Box>
          <AjDetailData metaData="Ad posted by" data={data?.add_posted_by} />
          <AjDetailData metaData="Address" data={addressOfSeller} />
          <AjDetailData metaData="Delivery" data={addressOfBuyer} />
          <Box sx={cardStyles.fieldContainer}>
            <AjDetailData
              metaData="Contact number"
              data={`${getPhoneCodeSymbol(data?.buyer_phone_code)} ${
                data?.buyer_contact_number
              }`}
              styleData={commonStyles.marginBottom0}
            />
            {adRequested === "1" && (
              <AjButton
                variant="text"
                displayText="Request access"
                onClick={() => navigate(`quotation/${data.id}`)}
                isDisable={data?.logistics_request_id !== null ? true : false}
              />
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default AjProductInputCard;
