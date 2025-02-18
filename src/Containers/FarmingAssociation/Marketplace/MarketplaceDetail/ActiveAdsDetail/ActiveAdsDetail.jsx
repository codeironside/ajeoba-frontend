import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box, Divider, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AjButton from "../../../../../Components/AjButton";
import AjTypography from "../../../../../Components/AjTypography";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";
import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjDocumentUploader from "../../../../../Components/AjDocumentUploader";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import { MARKETPLACE } from "../../../../../Routes/Routes";
import {
  getCurrencySymbol,
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import {
  getActiveAdsDetailsByIdAction,
  updateActiveAdsDetailsByIdAction,
} from "../../../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";
import { showToast } from "../../../../../Services/toast";
import { styles } from "./ActiveDetailStyles";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles as refereeStyles } from "../../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { updateActiveAdMarketPlaceDetailSchema } from "../../../../../validationSchema/updateActiveAdMarketplaceSchema";
import NumberFormat from "react-number-format";

const ActiveAdsDetail = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateActiveAdMarketPlaceDetailSchema),
    mode: "onChange",
  });
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [productImage, setProductImage] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const userData = getUserData();

  const activeAdDetailData = useSelector(
    (state) => state.marketplace.activeAdDetail
  );
  
  useEffect(() => {
    dispatch(getActiveAdsDetailsByIdAction(id));
  }, []);

  useEffect(() => {
    if (activeAdDetailData) {
      setProductImage({
        file_name: activeAdDetailData?.marketplaceAdvertisemetDetail?.file_name,
        id: activeAdDetailData?.marketplaceAdvertisemetDetail?.product_image_id,
        file_path: activeAdDetailData?.marketplaceAdvertisemetDetail?.file_path
          ? `${activeAdDetailData?.marketplaceAdvertisemetDetail?.file_path}`
          : null,
      });
      setValue(
        "updateAdsMarketplacePrice",
        activeAdDetailData?.marketplaceAdvertisemetDetail?.price_per_unit,
        { shouldValidate: true }
      );
    }
  }, [activeAdDetailData, cancel]);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEdit(true);
    }
  }, [id]);

  const handleEdit = () => {
    setEdit(true);
    navigate(`${MARKETPLACE}/active-ads/edit/${id}`);
  };

  const handleCancel = () => {
    setCancel(true);
    setEdit(false);
    navigate(`${MARKETPLACE}/active-ads/detail/${id}`);
  };

  const changeImageData = (e) => {
    e.preventDefault();
    setProductImage("");
  };

  const onProductPhotoUpload = (data) => {
    setProductImage({
      file_name: data?.file_name,
      id: data?.id,
      file_path: `${data?.url}`,
    });
  };

  const onSubmit = (data) => {
    if (!productImage?.id) {
      showToast("Please upload product image", "error");
      return;
    }
    dispatch(
      updateActiveAdsDetailsByIdAction(id, {
        costPrice: parseInt(data?.updateAdsMarketplacePrice),
        imageId: productImage?.id,
      })
    );
    navigate(`${MARKETPLACE}/active-ads/detail/${id}`);
    setEdit(false);
  };
// start 1:20 to 2:20am
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
        <Box sx={[commonStyles.detailsContainerFarming]}>
          {!edit && (
            <AjButton
              onClick={handleEdit}
              styleData={{
                ...commonStyles.editBtn,
                ...commonStyles.editBtnCustom,
                ...styles.handleEditResponsive,
              }}
              variant="outlined"
              displayText="Edit Details"
            />
          )}
          <Grid
            item
            sx={{
              ...refereeStyles.refereeDetailUpperContainer,
              ...styles.upperContainer,
            }}
          >
            <Grid item sm={12} xs={12}>
              <AjDetailTypography
                displayText1={
                  activeAdDetailData?.marketplaceAdvertisemetDetail
                    ?.product_name
                }
                displayText2={
                  activeAdDetailData?.marketplaceAdvertisemetDetail
                    ?.product_type
                }
                styleData2={{
                  ...commonStyles.customHeaderStyle,
                }}
              />
            </Grid>
            <Box sx={styles.detailContainer}>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Batch Id"
                  displayText2={
                    activeAdDetailData?.marketplaceAdvertisemetDetail?.batch_id
                  }
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Batch Type"
                  displayText2={
                    activeAdDetailData?.marketplaceAdvertisemetDetail
                      ?.batch_type
                  }
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity"
                  displayText2={`${activeAdDetailData?.marketplaceAdvertisemetDetail?.available_quantity} ${textCapitalize(activeAdDetailData?.marketplaceAdvertisemetDetail?.unit_of_measurement)}`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Price"
                  displayText2={`${numberWithCommas(
                    activeAdDetailData?.marketplaceAdvertisemetDetail?.price,
                    userData?.currency
                  )}`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Contact number"
                  displayText2={`${getPhoneCodeSymbol(
                    activeAdDetailData?.marketplaceAdvertisemetDetail
                      ?.phone_code
                  )} ${
                    activeAdDetailData?.marketplaceAdvertisemetDetail?.mobile_no
                  }`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Status"
                  displayText2={
                    activeAdDetailData?.marketplaceAdvertisemetDetail?.price &&
                    "Ad placed"
                  }
                />
              </Grid>
            </Box>
          </Grid>
          {!!activeAdDetailData?.certificateDetail?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="QA Certifications"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {activeAdDetailData?.certificateDetail?.map((item) => (
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
            {activeAdDetailData?.warehouseDetail?.map((item) => (
              <AjDetailData
                metaData={item.warehouse_name}
                data={`${item.available_quantity} ${textCapitalize(activeAdDetailData?.marketplaceAdvertisemetDetail?.unit_of_measurement)}`}
              />
            ))}
          </Box>
          <Divider sx={commonStyles.dividerStyle} />
          <Box>
            {productImage ? (
              <AjDocumentDownloader
                docId={productImage?.id}
                docName={productImage?.file_name}
                docPath={productImage?.file_path}
                changeDocument={changeImageData}
                showIcon={false}
                showImage={true}
                displayText="Change photo"
                readOnly={!edit}
              />
            ) : (
              <AjDocumentUploader
                type="image"
                docType="PRODUCT_PHOTO"
                onUpload={onProductPhotoUpload}
              />
            )}
          </Box>
          <Box
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...commonStyles.fieldTopMargin,
            }}
          >
            <AjInputLabel
              displayText={`Price (per ${textCapitalize(activeAdDetailData?.marketplaceAdvertisemetDetail?.unit_of_measurement)})`}
              required
              styleData={commonStyles.inputLabel}
            />
            {activeAdDetailData?.marketplaceAdvertisemetDetail
              ?.price_per_unit && (
              <NumberFormat
                customInput={InputBase}
                thousandSeparator={true}
                prefix={`${getCurrencySymbol(userData?.currency)} `}
                style={{
                  ...commonStyles.inputStyle,
                  ...(!edit && commonStyles.disableInput),
                  ...(!edit && { pointerEvents: "none" }),
                }}
                placeholder="Enter Price"
                decimalScale={2}
                defaultValue={`${activeAdDetailData?.marketplaceAdvertisemetDetail?.price_per_unit}`}
                onValueChange={(value) =>
                  setValue("updateAdsMarketplacePrice", value.value, {
                    shouldValidate: true,
                  })
                }
              />
            )}
            <AjTypography
              styleData={{
                ...commonStyles.errorText,
              }}
              displayText={errors?.updateAdsMarketplacePrice?.message}
            />
          </Box>
          <Grid
            sx={{
              ...refereeStyles.btnContainer,
              ...commonStyles.marginBottomRoot,
            }}
            container
          >
            {edit && (
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default ActiveAdsDetail;
