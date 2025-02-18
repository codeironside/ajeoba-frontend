import React, { useEffect } from "react";
import { Box, Divider, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

import AjAddressDetail from "../../../../Components/AjAddressDetail/AjAddressDetail";
import AjDetailTypography from "../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../Components/AjTypography";

import TableActions from "../../../../Components/TableActions/TableActions";
import { orderTypeOptions } from "../../../../Constant/AppConstant";
import {
  getRecievedTransitOrderDetailsByIdAction, getTransitOrderInputById,
  getTransitOrderProductById,
  toggleTransitOrderStatusAction
} from "../../../../Redux/Logistics/logisticsActions";
import {
  getOrderStatus, getPhoneCodeSymbol, numberWithCommas, textCapitalize
} from "../../../../Services/commonService/commonService";

import {
  commonStyles,
  customCommonStyles
} from "../../../../Style/CommonStyle";
import { styles as refereeStyles } from "../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { styles as activeDetailStyle } from "../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import { styles as TransitOrderDetailStyle } from "./TransitOrderDetailStyle";

const TransitOrderDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");

  const recievedTransitOrderDetailById = useSelector((state) => {
    if (activeTab === "1") return state.logistics.transitOrderInputById;
    else return state.logistics.transitOrderDetailById;
  });

  useEffect(() => {
    if (activeTab === "0") {
      dispatch(
        getRecievedTransitOrderDetailsByIdAction(id, {
          requestFor: orderTypeOptions[0].productOrders,
        })
      );
    }
    if (activeTab === "1") {
      dispatch(
        getRecievedTransitOrderDetailsByIdAction(id, {
          requestFor: orderTypeOptions[0].inputOrders,
        })
      );
    }
    return () => {
      dispatch(getTransitOrderProductById(null));
      dispatch(getTransitOrderInputById(null));
    };
  }, [id, activeTab]);


  const options = [
    {
      name: "Ongoing",
      actionClickHandler: () =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "ONGOING" })),
    },
    {
      name: "In-transit",
      actionClickHandler: () =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "IN-TRANSIT" })),
    },
    {
      name: "Completed",
      actionClickHandler: () =>
        dispatch(toggleTransitOrderStatusAction(id, { status: "COMPLETED" })),
    },
  ];

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box sx={[commonStyles.detailsContainer]}>
        <Grid
          item
          sx={{
            ...refereeStyles.refereeDetailUpperContainer,
            ...commonStyles.fullWidth,
          }}
        >
          <Grid
            item
            sm={6}
            xs={12}
            sx={{ ...TransitOrderDetailStyle.orderIdStyle }}
          >
            <AjDetailTypography
              displayText1={"Order Id"}
              displayText2={
                recievedTransitOrderDetailById?.orderDetails?.order_id
              }
              styleData2={{
                ...commonStyles.customHeaderStyle,
              }}
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
            sx={TransitOrderDetailStyle.productNameStyle}
          >
            <AjDetailTypography
              displayText1={
                activeTab === "0"
                  ? "Product Name"
                  : "Input Name"
              }
              displayText2={activeTab === "0" ?
                recievedTransitOrderDetailById?.orderDetails?.product_name :
                recievedTransitOrderDetailById?.orderDetails?.input_name
              }
              styleData2={{
                ...commonStyles.customHeaderStyle,
              }}
            />
          </Grid>

          <Box sx={activeDetailStyle.detailContainer}>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Add posted by"
                displayText2={
                  recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                    ?.add_posted_by
                }
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Price"
                displayText2={`${numberWithCommas(
                  recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                    ?.price,
                  "USD"
                )}`}
              />
            </Grid>

            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Quantity"
                displayText2={`${
                  recievedTransitOrderDetailById?.orderDetails?.quantity
                } ${textCapitalize(
                  recievedTransitOrderDetailById?.orderDetails
                    ?.unit_of_measurement
                )}`}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Distance"
                displayText2={`
                   ${recievedTransitOrderDetailById?.logisticsAdvertisementDetails?.distance} Km
                  `}
              />
            </Grid>

            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Contact no"
                displayText2={`${getPhoneCodeSymbol(
                  recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                    ?.seller_phone_code
                )} ${
                  recievedTransitOrderDetailById?.orderDetails
                    ?.buyer_contact_number
                }`}
              />
            </Grid>

            <Grid item sm={2} xs={12} sx={customCommonStyles.statusContainer}>
              <AjTypography
                styleData={{
                  ...commonStyles.detailTypographyStyle,
                  ...commonStyles.detailTypographyStyleHead,
                }}
                displayText="Status"
              />
              <TableActions
                options={options}
                id={recievedTransitOrderDetailById?.orderDetails?.user_id}
                isActive={getOrderStatus(
                  recievedTransitOrderDetailById?.orderDetails?.status
                )}
                isConfirmModalRequired={true}
                modalConfirmationMessage="Are you sure you want to change the transit status of the order?"
              />
            </Grid>
          </Box>

          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={commonStyles.customWidth}>
            <AjAddressDetail
              addressHeading="Seller's Address"
              address1={
                recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                  ?.seller_address_1
              }
              address2={
                recievedTransitOrderDetailById?.orderDetail?.delivery_address_2
              }
              country={
                recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                  ?.seller_country
              }
              state={
                recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                  ?.seller_state
              }
              zipCode={
                recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                  ?.seller_zip_code
              }
              city={
                recievedTransitOrderDetailById?.logisticsAdvertisementDetails
                  ?.seller_city
              }
              customAddressDetailStyle={{
                ...commonStyles.containerpadding,
              }}
            />
            <Divider sx={commonStyles.dividerStyle} />

            <AjAddressDetail
              addressHeading="Buyer's Address"
              address1={
                recievedTransitOrderDetailById?.orderDetails?.delivery_address_1
              }
              address2={
                recievedTransitOrderDetailById?.orderDetail?.delivery_address_2
              }
              country={
                recievedTransitOrderDetailById?.orderDetails?.buyer_country
              }
              state={recievedTransitOrderDetailById?.orderDetails?.buyer_state}
              zipCode={
                recievedTransitOrderDetailById?.orderDetails?.buyer_zip_code
              }
              city={recievedTransitOrderDetailById?.orderDetails?.buyer_city}
              customAddressDetailStyle={{
                ...commonStyles.containerpadding,
              }}
            />
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default TransitOrderDetail;
