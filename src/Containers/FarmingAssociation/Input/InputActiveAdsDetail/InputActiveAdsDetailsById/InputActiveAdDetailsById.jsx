import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Divider, Grid } from "@mui/material";
import * as moment from "moment";

import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjButton from "../../../../../Components/AjButton";
import AjTypography from "../../../../../Components/AjTypography";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";
import { AjRating } from "../../../../../Components/AjRating";

import {
  getInputActiveAdDetailById,
  getInputActiveAdDetailByIdAction,
} from "../../../../../Redux/FarmingAssociation/Input/inputActions";
import {
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";

import { styles as imageStyle } from "../../../../CorporateBuyers/Trading/ActiveAds/TradingActiveAdDetails/TradingActiveAdDetailById/TradingActiveAdDetailsByIdStyles";
import defaultImage from '../../../../../Assets/Images/defaultPhoto.png'
import { styles as cardStyle } from "../../../../../Components/AjDetailsAndFeedback/AjDetailAndFeedbackStyles";
import { styles as refereeStyles } from "../../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { styles as activeDetailStyle } from "../../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { commonStyles } from "../../../../../Style/CommonStyle";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjBuyProductModal from "../../../../../Components/AjBuyProductModal/AjBuyProductModal";

const InputActiveAdDetailsById = () => {
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();

  const userData = getUserData();
  const inputActiveAdDetail = useSelector(
    (state) => state.input.inputActiveAdDetail
  );

  useEffect(() => {
    dispatch(getInputActiveAdDetailByIdAction(id));
    return () => {
      dispatch(getInputActiveAdDetailById(null));
    };
  }, [id]);

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
          <Box sx={imageStyle.imageBox}>
            <Box
              sx={{
                ...commonStyles.imageBox,
                ...{
                  backgroundImage: inputActiveAdDetail?.advertisementDetail?.url
                    ? `url('${process.env.REACT_APP_IMAGE_URL}/${inputActiveAdDetail?.advertisementDetail?.url}')`
                    : `url('${defaultImage}')`,
                },
                ...cardStyle.imageContainer,
              }}
            ></Box>
          </Box>
          <Grid item sx={refereeStyles.refereeDetailUpperContainer}>
            <Grid item sm={12} xs={12}>
              <AjDetailTypography
                displayText1={
                  inputActiveAdDetail?.advertisementDetail?.input_name
                }
                displayText2={
                  inputActiveAdDetail?.advertisementDetail?.input_subtype
                }
                styleData2={{
                  ...commonStyles.customHeaderStyle,
                }}
              />
            </Grid>
            <Box sx={activeDetailStyle.detailContainer}>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity available"
                  displayText2={`${
                    inputActiveAdDetail?.advertisementDetail?.available_quantity
                  } ${textCapitalize(
                    inputActiveAdDetail?.advertisementDetail
                      ?.unit_of_measurement
                  )}`}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1={`Selling price per ${textCapitalize(
                    inputActiveAdDetail?.advertisementDetail
                      ?.unit_of_measurement
                  )}`}
                  displayText2={numberWithCommas(
                    inputActiveAdDetail?.advertisementDetail?.price_per_unit,
                    userData?.currency
                  )}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Expiry Date"
                  displayText2={moment(
                    inputActiveAdDetail?.advertisementDetail?.expiry_date
                  ).format("MM/DD/YYYY")}
                />
              </Grid>
              <Grid item sm={2.4} xs={12}>
                <AjDetailTypography
                  displayText1="Seller's Name"
                  displayText2={
                    inputActiveAdDetail?.advertisementDetail
                      ?.input_supplier_name
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
                        inputActiveAdDetail?.advertisementDetail?.rating
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
          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={commonStyles.customWidth}>
            <AjTypography
              displayText="Warehouse distribution"
              styleData={viewProfileStyles.addressMainHeading}
            />
            <AjDetailData
              metaData={inputActiveAdDetail?.warehouseDetail?.warehouse_name}
              data={`${
                inputActiveAdDetail?.advertisementDetail?.available_quantity
              } ${textCapitalize(
                inputActiveAdDetail?.advertisementDetail?.unit_of_measurement
              )}`}
              Address
              secondryMetaData="Address"
              secondryData={`${
                inputActiveAdDetail?.warehouseDetail.address_1
              },  ${
                inputActiveAdDetail?.warehouseDetail?.addressLine2
                  ? `${
                      inputActiveAdDetail?.warehouseDetail?.addressLine2 + ","
                    }`
                  : ""
              }  ${inputActiveAdDetail?.warehouseDetail?.city},${
                inputActiveAdDetail?.warehouseDetail?.state_name
              }, ${inputActiveAdDetail?.warehouseDetail?.country_name} ${
                inputActiveAdDetail?.warehouseDetail?.zip_code
                  ? `${"," + inputActiveAdDetail?.warehouseDetail?.zip_code}`
                  : ""
              } `}
              styleData={{ ...commonStyles.addressStyle }}
            />
          </Box>
        </Box>
      </Grid>
      <AjDialog
        open={openModal}
        closeModal={setOpenModal}
        title="Buy"
        styleData={commonStyles.buyDialogModalContainer}
      >
        <AjBuyProductModal
          type="Input"
          closeModal={setOpenModal}
          data={inputActiveAdDetail?.advertisementDetail}
        />
      </AjDialog>
    </>
  );
};

export default InputActiveAdDetailsById;
