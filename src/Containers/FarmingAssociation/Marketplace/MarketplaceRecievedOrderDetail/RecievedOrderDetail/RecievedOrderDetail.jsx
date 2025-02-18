import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Box, Divider, Grid, InputBase, Typography } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import * as _ from "lodash";
import { useForm } from "react-hook-form";

import AjAddressDetail from "../../../../../Components/AjAddressDetail/AjAddressDetail";
import AjButton from "../../../../../Components/AjButton";
import AjConfirmModal from "../../../../../Components/AjConfirmModal/AjConfirmModal";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";
import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjTypography from "../../../../../Components/AjTypography";
import AjProductOrderQaReportDetails from "../../../../../Components/AjProductOrderQaReportDetails/AjProductOrderQaReportDetails";

import defaultImage from "../../../../../Assets/Images/defaultPhoto.png";
import { productOrderStatusOptions } from "../../../../../Constant/AppConstant";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { getInputOrderDetailsById } from "../../../../../Redux/FarmingAssociation/Input/inputActions";
import {
  getRecievedOrderDetailsByIdAction,
  updateRecievedOrderDetailsByIdAction,
} from "../../../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";

import { LOGISTICS } from "../../../../../Routes/Routes";
import {
  formatDate,
  getCurrencySymbol,
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";
import { updateActiveAdMarketPlaceDetailSchema } from "../../../../../validationSchema/updateActiveAdMarketplaceSchema";

import { styles as cardStyle } from "../../../../../Components/AjTradingActiveAdsCard/AjTradingActiveCardStyles";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles as refereeStyles } from "../../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { styles as imageStyle } from "../../../../CorporateBuyers/Trading/ActiveAds/TradingActiveAdDetails/TradingActiveAdDetailById/TradingActiveAdDetailsByIdStyles";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { styles } from "../../../Logistics/LogisticsStyles";
import { styles as activeDetailStyle } from "../../MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import { getCompaniesAction } from "../../../../../Redux/common/QACompany/companyActions";

const RecievedOrderDetail = (props) => {
  const {
    setValue,
    handleSubmit,
    clearErrors,
    getValues,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateActiveAdMarketPlaceDetailSchema),
    mode: "onChange",
  });

  const userData = getUserData();
  const { id: productOrderId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [logisticsCost, setLogisticsCost] = useState();
  const [productStatus, setProductStatus] = useState();
  const [qaCompany, setQaCompany] = useState();
  const [isQaReport, setIsQaReport] = useState(false);
  const [logisticModePreference, setLogisticModePreference] = useState();
  const [isLogisticAdPlaced, setIsLogisticAdPlaced] = useState(false);
  useState(null);

  const recievedOrderDetailById = useSelector((state) => {
    if (userData.role_id === ROLES.INPUT_SUPPLIER)
      return state.tradingActiveAds.orderDetailsById;
    else return state.marketplace.recievedOrderDetail;
  });
  const qaCompaniesList = useSelector((state) => state.companies.companies);

  useEffect(() => {
    if (userData.role_id === ROLES.INPUT_SUPPLIER) {
      dispatch(getInputOrderDetailsById(productOrderId));
    } else {
      dispatch(getRecievedOrderDetailsByIdAction(productOrderId));
    }
  }, [productOrderId]);

  useEffect(() => {
    dispatch(getCompaniesAction());

    const logisticsPref =
      recievedOrderDetailById?.orderDetail?.logistics_manage;
    if (logisticsPref === "POST_ADS") {
      setLogisticModePreference("Logistics Ad Posted by Buyer");
    } else if (logisticsPref === "SELF_MANAGE") {
      setLogisticModePreference("Logistics Provided by buyer");
    } else if (logisticsPref === "ALLOW_MERCHANT") {
      setLogisticModePreference("Logistics Ad Posted by Seller");
    } else return () => null
    // else return null;

    const isLogistisAdPlaced =
      recievedOrderDetailById?.orderDetail?.logistics_ad_placed;
    if (isLogistisAdPlaced === true) {
      setIsLogisticAdPlaced("Logistics Ad has been placed");
    } else if (isLogistisAdPlaced === false) {
      setIsLogisticAdPlaced("No logistics ad has been placed");
    }

    if (recievedOrderDetailById) {
      const currentStatus = _.find(productOrderStatusOptions, {
        value: recievedOrderDetailById?.orderDetail?.status,
      });
      setProductStatus(currentStatus.label);
      props.setOrderStatus(currentStatus.label);
      setLogisticsCost(
        recievedOrderDetailById?.orderDetail?.logistics_amount_paid
      );

      const qaCompanyId =
        recievedOrderDetailById?.orderDetail?.product_orders_qa?.qa_company_id;
      const qaCompanyName = _.find(qaCompaniesList?.result, {
        id: qaCompanyId,
      });
      setQaCompany(qaCompanyName?.company_name);
    }
    handleQaReportDisplay();
  }, [recievedOrderDetailById, isQaReport]);

  const handleQaReportDisplay = () => {
    const status =
      recievedOrderDetailById?.orderDetail?.product_orders_qa?.status;
    const isOrderQadPending = status === "PENDING";
    const isOrderQadPassed = status === "PASSED";
    const isOrderQadFailed = status === "FAILED";

    setIsQaReport(!isOrderQadPending && (isOrderQadPassed || isOrderQadFailed));
  };

  const handleConfirm = () => {
    handleSubmit(onSubmit)();
  };

  const cancelChanges = () => {
    setEdit(false);
    clearErrors();
    setValue("updateAdsMarketplacePrice", null);
    setLogisticsCost();
  };

  const saveChanges = () => {
    if (
      !errors?.updateAdsMarketplacePrice?.message &&
      !getValues("updateAdsMarketplacePrice")
    ) {
      setError("updateAdsMarketplacePrice", { message: "Price is required" });
    } else if (!errors?.updateAdsMarketplacePrice?.message) {
      setOpenModal(true);
    }
  };

  const onSubmit = (data) => {
    if (!data) {
      return;
    }
    const logisticsPriceData = {
      price: parseFloat(data?.updateAdsMarketplacePrice),
    };
    dispatch(
      updateRecievedOrderDetailsByIdAction(productOrderId, logisticsPriceData)
    );
    setEdit(false);
  };

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
          {userData.role_id !== ROLES.INPUT_SUPPLIER ? (
              <Box
                sx={{
                  ...imageStyle.imageBox,
                  ...{
                    backgroundImage: recievedOrderDetailById?.orderDetail?.url
                      ? `url('${process.env.REACT_APP_IMAGE_URL}/${recievedOrderDetailById?.orderDetail?.url}')`
                      : `url('${defaultImage}')`,
                  },
                  ...cardStyle.imageContainer,
                }}
              ></Box>
          ) : (
              <Box
                sx={{
                  ...imageStyle.imageBox,
                  ...{
                    backgroundImage: recievedOrderDetailById?.orderDetail?.url
                      ? `url('${process.env.REACT_APP_IMAGE_URL}/${recievedOrderDetailById?.orderDetail?.url}')`
                      : `url('${defaultImage}')`,
                  },
                  ...cardStyle.imageContainer,
                }}
              ></Box>
          )}
          <Grid item sx={refereeStyles.refereeDetailUpperContainer}>
            <Grid item sm={12} xs={12}>
              <AjDetailTypography
                displayText1="Order Id"
                displayText2={recievedOrderDetailById?.orderDetail?.order_id}
              />
            </Grid>
            <Box sx={activeDetailStyle.detailContainer}>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? "Input Name"
                      : "Product Name"
                  }
                  displayText2={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? recievedOrderDetailById?.orderDetail?.input_name
                      : recievedOrderDetailById?.orderDetail?.product_name
                  }
                  styleData2={{
                    ...commonStyles.textEllipsis,
                    ...styles.textEllipsisWidth,
                  }}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? "Input Subtype"
                      : "Product Type"
                  }
                  displayText2={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? recievedOrderDetailById?.orderDetail?.input_subtype
                      : recievedOrderDetailById?.orderDetail?.product_type
                  }
                />
              </Grid>
              {userData.role_id !== ROLES.INPUT_SUPPLIER && (
                <>
                  <Grid item sm={2} xs={12}>
                    <AjDetailTypography
                      displayText1="Batch id"
                      displayText2={
                        recievedOrderDetailById?.orderDetail?.batch_Id
                      }
                    />
                  </Grid>
                  <Grid item sm={2} xs={12}>
                    <AjDetailTypography
                      displayText1="Batch Type"
                      displayText2={
                        recievedOrderDetailById?.orderDetail?.batch_type
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity Sold"
                  displayText2={`${
                    recievedOrderDetailById?.orderDetail?.quantity
                  } ${textCapitalize(
                    recievedOrderDetailById?.orderDetail?.unit_of_measurement
                  )}`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Contact number"
                  displayText2={`${getPhoneCodeSymbol(
                    recievedOrderDetailById?.orderDetail?.phone_code
                  )} ${
                    recievedOrderDetailById?.orderDetail?.buyer_contact_number
                  }`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                {recievedOrderDetailById?.orderDetail?.buyer_currency && (
                  <AjDetailTypography
                    displayText1="Price"
                    displayText2={`${numberWithCommas(
                      recievedOrderDetailById?.orderDetail?.price,
                      recievedOrderDetailById?.orderDetail?.seller_currency
                    )}
`}
                    displayText3={`(${numberWithCommas(
                      recievedOrderDetailById?.orderDetail
                        ?.seller_price_per_unit,
                      recievedOrderDetailById?.orderDetail?.seller_currency
                    )} per ${
                      recievedOrderDetailById?.orderDetail?.unit_of_measurement
                    })`}
                  />
                )}
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Date of purchase"
                  displayText2={`${formatDate(
                    recievedOrderDetailById?.orderDetail?.transaction_created_at
                  )} `}
                />
              </Grid>

              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Status"
                  displayText2={productStatus}
                />
              </Grid>
            </Box>
            {productStatus === "Ongoing" &&
              !recievedOrderDetailById?.orderDetail?.logistics_ad_placed && (
                <AjButton
                  variant="contained"
                  displayText="Create Logistics Ad"
                  onClick={() =>
                    navigate(
                      `${LOGISTICS}/create-ad/${recievedOrderDetailById?.orderDetail?.id}`
                    )
                  }
                />
              )}
          </Grid>
          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={commonStyles.customWidth}>
            <AjAddressDetail
              address1={
                recievedOrderDetailById?.orderDetail?.delivery_address_1
              }
              address2={
                recievedOrderDetailById?.orderDetail?.delivery_address_2
              }
              country={recievedOrderDetailById?.orderDetail?.country_name}
              state={recievedOrderDetailById?.orderDetail?.state_name}
              zipCode={recievedOrderDetailById?.orderDetail?.zip_code}
              city={recievedOrderDetailById?.orderDetail?.city}
              customAddressDetailStyle={{
                padding: "0rem",
              }}
            />
          </Box>
          {!!recievedOrderDetailById?.certificationDetails?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="QA Certifications"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {recievedOrderDetailById?.certificationDetails?.map((item) => (
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
          {!!recievedOrderDetailById?.warehouseDetail?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="Warehouse distribution"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {userData.role_id !== ROLES.INPUT_SUPPLIER ? (
                  recievedOrderDetailById?.warehouseDetail?.map((item) => (
                    <AjDetailData
                      metaData={item.warehouse_name}
                      data={`${item.quantity} ${textCapitalize(
                        recievedOrderDetailById?.orderDetail
                          ?.unit_of_measurement
                      )}`}
                    />
                  ))
                ) : (
                  <AjDetailData
                    metaData={
                      recievedOrderDetailById?.warehouseDetail[0].warehouse_name
                    }
                    data={`${
                      recievedOrderDetailById?.orderDetail?.sold_quantity
                    } ${textCapitalize(
                      recievedOrderDetailById?.orderDetail?.unit_of_measurement
                    )}`}
                  />
                )}
              </Box>
            </>
          )}
          {qaCompany && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="QA Company Assigned"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                <Typography>{qaCompany} </Typography>
              </Box>
            </>
          )}

          {isQaReport && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjProductOrderQaReportDetails
                  label="QA Status Report"
                  statusLabel="QA Status"
                  labelDescription="Product description"
                  qaStatus={
                    recievedOrderDetailById?.orderDetail?.product_orders_qa
                      ?.status
                  }
                  description={
                    recievedOrderDetailById?.orderDetail?.product_orders_qa
                      ?.description
                  }
                  docId={
                    recievedOrderDetailById?.orderDetail?.product_orders_qa
                      ?.certification_document_id
                  }
                  showIcon={true}
                  downloadWrapper={styles.downloadWrapper}
                />
              </Box>
            </>
          )}
          {logisticModePreference && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
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

          {productStatus === "Completed" &&
            recievedOrderDetailById?.orderDetail?.logistics_ad_placed && (
              <>
                <Divider sx={commonStyles.dividerStyle} />
                <Box
                  sx={{
                    ...commonStyles.customWidth,
                    ...(!logisticsCost ? { textAlign: "center" } : null),
                  }}
                >
                  <AjTypography
                    displayText="Logistics cost"
                    styleData={viewProfileStyles.addressMainHeading}
                  />
                  {!edit && !logisticsCost && (
                    <AjButton
                      variant="contained"
                      displayText={
                        ROLES.INPUT_SUPPLIER === userData.role_id
                          ? "Add logistics cost"
                          : "Add logistics cost that was paid"
                      }
                      onClick={() => setEdit(true)}
                      styleData={{ marginTop: "0rem", marginBottom: "2rem" }}
                    />
                  )}
                </Box>
                {!logisticsCost ? (
                  edit && (
                    <>
                      <Box
                        sx={{
                          ...commonStyles.signupFormFieldContainer,
                          ...commonStyles.fieldTopMargin,
                        }}
                      >
                        <AjInputLabel
                          displayText={`Logistics Price (per ${recievedOrderDetailById?.orderDetail?.unit_of_measurement})`}
                          required
                          styleData={commonStyles.inputLabel}
                        />
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
                          onValueChange={(value) =>
                            setValue("updateAdsMarketplacePrice", value.value, {
                              shouldValidate: true,
                            })
                          }
                        />
                        <AjTypography
                          styleData={{
                            ...commonStyles.errorText,
                          }}
                          displayText={
                            errors?.updateAdsMarketplacePrice?.message
                          }
                        />
                      </Box>
                      <Grid
                        sx={{
                          ...refereeStyles.btnContainer,
                          ...commonStyles.marginBottomRoot,
                        }}
                        container
                      >
                        <AjButton
                          styleData={commonStyles.cancelBtnStyle}
                          variant="outlined"
                          displayText="Cancel"
                          onClick={cancelChanges}
                        />
                        <AjButton
                          onClick={saveChanges}
                          variant="contained"
                          displayText="Save Changes"
                        />
                      </Grid>
                    </>
                  )
                ) : (
                  <Box sx={commonStyles.customWidth}>
                    <AjDetailData
                      metaData="Logistics cost"
                      data={`${numberWithCommas(
                        logisticsCost,
                        userData?.currency
                      )}`}
                    />
                  </Box>
                )}
              </>
            )}
        </Box>
      </Grid>
      <AjDialog
        open={openModal}
        closeModal={setOpenModal}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText="Are you sure you want to add logistics cost?"
          closeModal={setOpenModal}
          onConfirm={() => handleConfirm(onSubmit())}
        />
      </AjDialog>
    </>
  );
};

export default RecievedOrderDetail;
