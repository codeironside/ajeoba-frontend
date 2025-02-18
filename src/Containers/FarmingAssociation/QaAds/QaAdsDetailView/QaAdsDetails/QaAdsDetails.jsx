import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Divider, Box } from "@mui/material";
import * as moment from "moment";
import { styles } from "./QaAdsDetailsStyles";
import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import {
  getQaAdsDetailsByIdAction,
  toggleQaAdsStatusAction,
} from "../../../../../Redux/FarmingAssociation/QaAds/qaAdsActions";
import AjTypography from "../../../../../Components/AjTypography";
import TableActions from "../../../../../Components/TableActions/TableActions";
import AjAddressDetail from "../../../../../Components/AjAddressDetail/AjAddressDetail";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";
import { getUserData } from "../../../../../Services/localStorageService";
import {
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";

const QaAdsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const qaAdsDetailData = useSelector((state) => state.qaAds.qaAdsDetailData);

  const userData = getUserData();
  const options = [
    {
      name: "Active",
      actionClickHandler: (qaAdId) =>
        dispatch(toggleQaAdsStatusAction(qaAdId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (qaAdId) =>
        dispatch(toggleQaAdsStatusAction(qaAdId, "INACTIVE")),
    },
  ];
  useEffect(() => {
    dispatch(getQaAdsDetailsByIdAction(id));
  }, []);

  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.customSrollBar,
        }}
      >
        <Grid
          sx={{
            ...commonStyles.detailsContainer,
            marginTop: "2.125rem",
          }}
        >
          <AjDetailTypography
            styleData2={{
              ...commonStyles.customHeaderStyle,
            }}
            displayText1={qaAdsDetailData?.advertisementDetail[0]?.product_name}
            displayText2={qaAdsDetailData?.advertisementDetail[0]?.product_type}
          />
          <Grid item sx={styles.detailMainContainer}>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="AD sent to"
                displayText2={
                  qaAdsDetailData?.advertisementDetail[0]?.request_type === 1
                    ? "Open Market"
                    : qaAdsDetailData?.advertisementDetail[0]?.company_name
                }
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Quantity"
                displayText2={`${qaAdsDetailData?.advertisementDetail[0]?.quantity} ${textCapitalize(qaAdsDetailData?.advertisementDetail[0]?.unit_of_measurement)}`}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Price"
                displayText2={`${numberWithCommas(
                  qaAdsDetailData?.advertisementDetail[0]?.cost_price,
                  userData?.currency
                )}`}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Added on"
                displayText2={moment(
                  qaAdsDetailData?.advertisementDetail[0]?.created_at
                ).format("DD/MM/YYYY")}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Contact number"
                displayText2={`${getPhoneCodeSymbol(
                  qaAdsDetailData?.advertisementDetail[0]?.phone_code
                )} ${qaAdsDetailData?.advertisementDetail[0]?.contact_number}`}
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
                id={id}
                isActive={
                  qaAdsDetailData?.advertisementDetail[0]?.status === "ACTIVE"
                    ? "Active"
                    : qaAdsDetailData?.advertisementDetail[0]?.status ===
                      "INACTIVE"
                    ? "Inactive"
                    : "Archived"
                }
                isConfirmModalRequired={true}
              />
            </Grid>
          </Grid>
          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={{ ...commonStyles.customWidth, ...styles.responsiveWidth }}>
            <AjAddressDetail
              address1={qaAdsDetailData?.advertisementDetail[0]?.address_1}
              address2={qaAdsDetailData?.advertisementDetail[0]?.address_2}
              country={qaAdsDetailData?.advertisementDetail[0]?.country_name}
              state={qaAdsDetailData?.advertisementDetail[0]?.state_name}
              zipCode={qaAdsDetailData?.advertisementDetail[0]?.zip_code}
              city={qaAdsDetailData?.advertisementDetail[0]?.city}
              customAddressDetailStyle={{
                padding: "0rem",
              }}
            />
            <AjTypography
              displayText="Requested certifications"
              styleData={viewProfileStyles.addressMainHeading}
            />
            {qaAdsDetailData?.certificateDetail?.map((item, index) => (
              <AjDetailData
                index={index + 1}
                metaData="Certificate"
                data={item?.certificate_name}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default QaAdsDetails;
