import React, { useEffect, useState } from "react";
import { Grid, Box, Divider } from "@mui/material";
import { styles as refereeStyles } from "../../../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import defaultImage from "../../../../../../Assets/Images/defaultPhoto.png";
import { styles as cardStyle } from "../../../../../../Components/AjTradingActiveAdsCard/AjTradingActiveCardStyles";
import { useDispatch, useSelector } from "react-redux";
import { getTradingActiveAdDetailByIdAction } from "../../../../../../Redux/CorporateBuyer/Trading/tradingActions";
import { useParams } from "react-router-dom";
import { styles } from "./TradingActiveAdDetailsByIdStyles.js";
import { styles as activeDetailStyle } from "../../../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../../Services/localStorageService";
import AjTypography from "../../../../../../Components/AjTypography";
import AjDetailData from "../../../../../../Components/AjDetailData/AjDetailData";
import { viewProfileStyles } from "../../../../../Profile/ViewProfile/ViewProfileStyle";
import { AjRating } from "../../../../../../Components/AjRating";
import AjButton from "../../../../../../Components/AjButton";
import AjDialog from "../../../../../../Components/AjDialog/AjDialog";
import AjBuyProductModal from "../../../../../../Components/AjBuyProductModal/AjBuyProductModal";

const TradingActiveAdDetailById = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const userData = getUserData();
  const [openModal, setOpenModal] = useState();
  const tradingActiveAdDetail = useSelector(
    (state) => state.tradingActiveAds.tradingActiveAdDetail
  );

  useEffect(() => {
    dispatch(getTradingActiveAdDetailByIdAction(id));
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
        <Box sx={[commonStyles.detailsContainer]}>
          <Box sx={styles.imageBox}>
            <Box
              sx={{
                ...commonStyles.imageBox,
                ...{
                  backgroundImage: tradingActiveAdDetail?.AdvertisemetDetail
                    ?.file_path
                    ? `url('${process.env.REACT_APP_IMAGE_URL}/${tradingActiveAdDetail?.AdvertisemetDetail?.file_path}')`
                    : `url('${defaultImage}')`,
                },
                ...cardStyle.imageContainer,
              }}
            />
          </Box>
          <Grid item sx={refereeStyles.refereeDetailUpperContainer}>
            <Grid item sm={12} xs={12}>
              <AjDetailTypography
                displayText1={
                  tradingActiveAdDetail?.AdvertisemetDetail?.product_name
                }
                displayText2={
                  tradingActiveAdDetail?.AdvertisemetDetail?.product_type
                }
                styleData2={{
                  ...commonStyles.customHeaderStyle,
                }}
              />
            </Grid>
            <Box sx={activeDetailStyle.detailContainer}>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Batch Type"
                  displayText2={textCapitalize(
                    tradingActiveAdDetail?.AdvertisemetDetail?.batch_type
                  )}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity"
                  displayText2={`${
                    tradingActiveAdDetail?.AdvertisemetDetail
                      ?.available_quantity
                  } ${textCapitalize(
                    tradingActiveAdDetail?.AdvertisemetDetail
                      ?.unit_of_measurement
                  )}`}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1={`Price per ${tradingActiveAdDetail?.AdvertisemetDetail?.unit_of_measurement}`}
                  displayText2={numberWithCommas(
                    tradingActiveAdDetail?.AdvertisemetDetail?.price_per_unit,
                    tradingActiveAdDetail?.AdvertisemetDetail?.currency
                    // userData?.currency
                  )}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Seller's Name"
                  displayText2={
                    tradingActiveAdDetail?.AdvertisemetDetail?.association_name
                      ? tradingActiveAdDetail?.AdvertisemetDetail
                          ?.association_name
                      : ` ${tradingActiveAdDetail?.AdvertisemetDetail?.first_name} ${tradingActiveAdDetail?.AdvertisemetDetail?.last_name}`
                  }
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Seller's Rating"
                  displayText2={
                    <AjRating
                      readOnly={true}
                      defaultValue={
                        tradingActiveAdDetail?.AdvertisemetDetail?.rating
                      }
                    />
                  }
                />
              </Grid>
            </Box>
            <AjButton
              variant="contained"
              displayText="Buy"
              onClick={() => setOpenModal(true)}
              isDisable={userData?.status === "ACTIVE" ? false : true}
            />
          </Grid>
          {!!tradingActiveAdDetail?.certificateDetail?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="QA Certifications"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {tradingActiveAdDetail?.certificateDetail?.map((item) => (
                  <AjDetailData
                    documentDownloader
                    metaData={item?.item_name}
                    fileName={item?.file_name}
                    fileId={item?.certification_type_id}
                  />
                ))}
              </Box>
            </>
          )}
          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={commonStyles.customWidth}>
            <AjTypography
              displayText="Warehouse distribution"
              styleData={viewProfileStyles.addressMainHeading}
            />
            {tradingActiveAdDetail?.warehouseDetail?.map((item) => (
              <AjDetailData
                metaData={item.warehouse_name}
                data={`${item.available_quantity} ${textCapitalize(
                  tradingActiveAdDetail?.AdvertisemetDetail?.unit_of_measurement
                )}`}
              />
            ))}
          </Box>

          {tradingActiveAdDetail?.warehouseCertificate.length > 0 && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box
                sx={{ ...commonStyles.customWidth, ...styles.responsiveWidth }}
              >
                <AjTypography
                  displayText="Warehouse Certificate"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {tradingActiveAdDetail?.warehouseCertificate?.map(
                  (item, index) => (
                    <AjDetailData
                      documentDownloader
                      metaData={item?.name}
                      fileName={item?.file_name}
                      fileId={item?.certificate_document_id}
                    />
                  )
                )}
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <AjDialog
        open={openModal}
        closeModal={setOpenModal}
        title="Buy"
        styleData={commonStyles.buyDialogModalContainer}
      >
        <AjBuyProductModal
          closeModal={setOpenModal}
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

export default TradingActiveAdDetailById;