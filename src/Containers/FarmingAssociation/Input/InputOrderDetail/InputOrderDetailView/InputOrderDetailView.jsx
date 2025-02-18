import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, Box, Typography } from "@mui/material";
import * as _ from "lodash";
import moment from "moment";

import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjDetailsAndFeedback from "../../../../../Components/AjDetailsAndFeedback/AjDetailsAndFeedback";
import AjTypography from "../../../../../Components/AjTypography";
import styles from "../../../../CorporateBuyers/Trading/Orders/OrderDetailView/OrderDetails/OrderDetailStyle";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { getInputOrderDetailsById } from "../../../../../Redux/FarmingAssociation/Input/inputActions";
import { productOrderStatusOptions } from "../../../../../Constant/AppConstant";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { getUserData } from "../../../../../Services/localStorageService";

export default function InputOrderDetailView() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [status, setStatus] = useState();
  const [logisticFeedback, setLogisticFeedback] = useState(false);
  const userData = getUserData();
  const [logisticModePreference, setLogisticModePreference] = useState();
  const [isLogisticAdPlaced, setIsLogisticAdPlaced] = useState(false);

  // const [buyerPostLogisticsAd, setBuyerPostLogisticsAd] = useState(false);
  // const [logisticsAdPostRequestToSeller, setLogisticsAdPostRequestToSeller] =
  // useState();

  const inputOrderDetails = useSelector(
    (state) => state.input.inputOrderDetail
  );


  useEffect(() => {
    dispatch(getInputOrderDetailsById(id));
  }, [id]);

  const unitOfMeasurement = inputOrderDetails?.orderDetail?.unit_of_measurement;

  useEffect(() => {
    if (inputOrderDetails) {
      const stats = _.find(productOrderStatusOptions, {
        value: inputOrderDetails?.orderDetail?.status,
      });
      setStatus(stats?.label);
    }
    if (inputOrderDetails?.feedbackDetails) {
      const logisticsFeedbackExist =
        inputOrderDetails?.feedbackDetails[0]?.feedback_for === "LOGISTICS" ||
        inputOrderDetails?.feedbackDetails[1]?.feedback_for === "LOGISTICS";
      setLogisticFeedback(logisticsFeedbackExist);
    }
    handleLogisticPreference();
  }, [inputOrderDetails]);

  const handleLogisticPreference = () => {
    // const logisticsAdRequestStatus =
    //   inputOrderDetails?.orderDetail?.logistics_manage_request_status;
    // if (logisticsAdRequestStatus === "APPROVED") {
    //   setLogisticsAdPostRequestToSeller(true);
    // } else if (logisticsAdRequestStatus === "REJECTED") {
    //   setLogisticsAdPostRequestToSeller(false);
    // } else if (logisticsAdRequestStatus === null) {
    //   setLogisticsAdPostRequestToSeller(null);
    // }

    const isLogistisAdPlaced =
      inputOrderDetails?.orderDetail?.logistics_ad_placed;

    const logisticsPref = inputOrderDetails?.orderDetail?.logistics_manage;
    if (logisticsPref === "POST_ADS") {
      setLogisticModePreference("Logistics Ad Posted by Buyer");
      // setBuyerPostLogisticsAd(true);
    } else if (logisticsPref === "SELF_MANAGE") {
      setLogisticModePreference("Logistics Provided by buyer");
      // setBuyerPostLogisticsAd(false);
    } else if (logisticsPref === "ALLOW_MERCHANT") {
      setLogisticModePreference("Logistics Ad Posted by Seller");
      // setBuyerPostLogisticsAd(false);
    } else return null;

    if (logisticsPref === "SELF_MANAGE") {
      setIsLogisticAdPlaced(null);
    } else if (isLogistisAdPlaced === true) {
      setIsLogisticAdPlaced("Logistics Ad has been placed");
    } else if (isLogistisAdPlaced === false) {
      setIsLogisticAdPlaced("No logistics ad has been placed");
    }
  };

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box sx={{ ...commonStyles.detailsContainer, ...styles.boxMarginTop }}>
        <AjDetailTypography
          styleData2={{
            ...commonStyles.customHeaderStyle,
          }}
          displayText1="Order Id"
          displayText2={inputOrderDetails?.orderDetail?.order_id}
        />
        <Grid item sx={styles.orderMainContainer}>
          <Grid item sm={2} xs={12}>
            <AjDetailTypography
              displayText1="Input type"
              displayText2={inputOrderDetails?.orderDetail?.input_name}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <AjDetailTypography
              displayText1="Input subtype"
              displayText2={inputOrderDetails?.orderDetail?.input_subtype}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <AjDetailTypography
              displayText1="Quantity Purchased"
              displayText2={`${
                inputOrderDetails?.orderDetail?.quantity
              } ${textCapitalize(unitOfMeasurement)}`}
            />
          </Grid>
          {status === "Order Placed" && (
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Seller's name"
                displayText2={inputOrderDetails?.orderDetail?.seller_name}
              />
            </Grid>
          )}
          {inputOrderDetails?.orderDetail?.price && (
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Price"
                displayText2={numberWithCommas(
                  inputOrderDetails?.orderDetail?.price,
                  inputOrderDetails?.orderDetail?.seller_currency
                )}
              />
            </Grid>
          )}
          <Grid item sm={2} xs={12}>
            <AjDetailTypography
              displayText1="Date of purchase"
              displayText2={`${moment(
                inputOrderDetails?.orderDetail?.date_of_purchase
              ).format("DD/MM/YYYY")}`}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <AjDetailTypography
              displayText1=" Expiry date"
              displayText2={`${moment(
                inputOrderDetails?.orderDetail?.expiry_date
              ).format("DD/MM/YYYY")}`}
            />
          </Grid>
          <Grid item sm={2} xs={12}>
            <AjDetailTypography displayText1="Status" displayText2={status} />
          </Grid>
        </Grid>
        {status === "Completed" ||
          (inputOrderDetails?.orderDetail?.logistics_manage ===
            "SELF_MANAGE" && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <AjDetailsAndFeedback
                userData={userData}
                id={id}
                name="Seller"
                rating={
                  inputOrderDetails?.feedbackDetails[0]?.feedback_for ===
                  "SELLER"
                    ? inputOrderDetails?.feedbackDetails[0]?.rating
                    : inputOrderDetails?.feedbackDetails[1]?.rating
                }
                extraInformation={{
                  "Seller's name": inputOrderDetails?.orderDetail?.seller_name,
                  "Contact number": `+${inputOrderDetails?.orderDetail?.seller_phone_code} ${inputOrderDetails?.orderDetail?.seller_contact_number}`,
                }}
                orderId={inputOrderDetails?.orderDetail?.order_id}
                feedbackFor={"SELLER"}
                feedbackExist={
                  inputOrderDetails?.feedbackDetails
                    ? inputOrderDetails?.feedbackDetails[0]?.feedback_for ===
                        "SELLER" ||
                      inputOrderDetails?.feedbackDetails[1]?.feedback_for ===
                        "SELLER"
                    : false
                }
              />
            </>
          ))}
        {status === "Ongoing" && (
          <>
            <Divider sx={commonStyles.dividerStyle} />
            <AjDetailsAndFeedback
              userData={userData}
              name="Seller"
              extraInformation={{
                "Seller's name": inputOrderDetails?.orderDetail?.seller_name,
                "Contact number": `+${inputOrderDetails?.orderDetail?.seller_phone_code} ${inputOrderDetails?.orderDetail?.seller_contact_number}`,
              }}
            />
          </>
        )}
        {status === "Completed" && (
          <>
            <Divider sx={commonStyles.dividerStyle} />
            <AjDetailsAndFeedback
              userData={userData}
              id={id}
              name="Logistic"
              orderId={inputOrderDetails?.orderDetail?.order_id}
              rating={
                inputOrderDetails?.feedbackDetails[0]?.feedback_for ===
                "LOGISTICS"
                  ? inputOrderDetails?.feedbackDetails[0]?.rating
                  : inputOrderDetails?.feedbackDetails[1]?.rating
              }
              feedbackFor={"LOGISTICS"}
              feedbackExist={logisticFeedback}
            />
          </>
        )}

        {logisticModePreference && (
          <>
            <Divider sx={commonStyles.dividerStyle} />
            <Box
              sx={{ ...commonStyles.customWidth, ...styles.responsiveWidth }}
            >
              <AjTypography
                displayText="Logistics Preference"
                styleData={viewProfileStyles.addressMainHeading}
              />
              <Typography>{logisticModePreference}</Typography>
            </Box>
          </>
        )}

        {isLogisticAdPlaced && (
          <>
            <Divider sx={commonStyles.dividerStyle} />
            <Box sx={commonStyles.customWidth}>
              <AjTypography
                displayText="Logistics Ad status"
                styleData={viewProfileStyles.addressMainHeading}
              />
              <Typography>{isLogisticAdPlaced}</Typography>
            </Box>
          </>
        )}
      </Box>
    </Grid>
  );
}
