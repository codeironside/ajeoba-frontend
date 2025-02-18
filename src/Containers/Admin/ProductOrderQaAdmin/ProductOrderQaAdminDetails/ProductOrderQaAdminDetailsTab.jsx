import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Divider, Grid, Typography } from "@mui/material";
import * as _ from "lodash";

import AjAddressDetail from "../../../../Components/AjAddressDetail/AjAddressDetail";
import AjDetailData from "../../../../Components/AjDetailData/AjDetailData";
import AjDetailTypography from "../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../Components/AjTypography";
import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjProductOrderQaReportDetails from "../../../../Components/AjProductOrderQaReportDetails/AjProductOrderQaReportDetails";

import { getAdminProductOrderQaDetailsByIdActions } from "../../../../Redux/common/Products/productsActions";
import {
  getCompaniesAction,
  assignQaCompanyAction,
} from "../../../../Redux/common/QACompany/companyActions";

import { commonStyles } from "../../../../Style/CommonStyle";

import { styles as cardStyle } from "../../../../Components/AjTradingActiveAdsCard/AjTradingActiveCardStyles";
import { styles as imageStyle } from "../../../CorporateBuyers/Trading/ActiveAds/TradingActiveAdDetails/TradingActiveAdDetailById/TradingActiveAdDetailsByIdStyles";
import { styles as refereeStyles } from "../../UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { viewProfileStyles } from "../../../Profile/ViewProfile/ViewProfileStyle";

import { styles } from "../../../FarmingAssociation/Logistics/LogisticsStyles";
import { styles as activeDetailStyle } from "../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";

import defaultImage from "../../../../../src/Assets/Images/defaultPhoto.png";
import {
  formatDate,
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../../../Services/commonService/commonService";

function ProductOrderQaAdminDetailsTab() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id: productOrderId } = useParams();

  const [selectedQaCompany, setSelectedCompany] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isQaCompanyAssigned, setIsQaCompanyAssigned] = useState(false);

  const [confirmedQaCompanyName, setConfirmedQaCompanyName] = useState(null);

  const [isQaReport, setIsQaReport] = useState(false);

  const productOrder = useSelector((state) => state.products.prodOrderDetail);
  const qaCompaniesList = useSelector((state) => state.companies.companies);

  const qaCompanyOptions = qaCompaniesList?.result?.map((company) => ({
    qaCompanyNames: company.company_name,
    qaCompanyId: company.id.toString(),
  }));

  const handleAssignQaCompany = (selectedQaCompany) => {
    const selectedQACompany = selectedQaCompany.target.value;
    setSelectedCompany(selectedQACompany);
    setOpenDialog(true);
  };

  const handleConfirmAssignQaCompany = () => {
    const selectedQaCompanyOption = qaCompanyOptions.find(
      (option) => option.qaCompanyNames === selectedQaCompany
    );
    if ((selectedQaCompanyOption, productOrderId)) {
      const confirmedQACompanyId = selectedQaCompanyOption?.qaCompanyId;
      const reqBody = {
        productOrderId: productOrderId,
        qaCompanyId: confirmedQACompanyId,
      };
      dispatch(assignQaCompanyAction(reqBody, navigate));
      setOpenDialog(false);
    }
  };

  useEffect(() => {
    dispatch(getCompaniesAction());
    dispatch(getAdminProductOrderQaDetailsByIdActions(productOrderId));
  }, [productOrderId]);

  useEffect(() => {
    const isOrderAssigned =
      productOrder?.orderDetail?.product_orders_qa !== null;
    setIsQaCompanyAssigned(isOrderAssigned);

    const confirmedQACompanyId =
      productOrder?.orderDetail?.product_orders_qa?.qa_company_id;

    if (confirmedQACompanyId && qaCompanyOptions) {
      const selectedQaCompanyOption = qaCompanyOptions.find(
        (option) => option.qaCompanyId === confirmedQACompanyId.toString()
      );
      if (selectedQaCompanyOption) {
        setConfirmedQaCompanyName(selectedQaCompanyOption.qaCompanyNames);
      }
    }
    handleQaReportDisplay();
  }, [productOrder, isQaReport]);

  const handleQaReportDisplay = () => {
    const status = productOrder?.orderDetail?.product_orders_qa?.status;
    const isOrderQadPending = status === "PENDING";
    const isOrderQadPassed = status === "PASSED";
    const isOrderQadFailed = status === "FAILED";

    setIsQaReport(!isOrderQadPending && (isOrderQadPassed || isOrderQadFailed));
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
        <Box sx={[commonStyles.detailsContainer]}>
          <Box sx={imageStyle.imageBox}>
            <Box
              sx={{
                ...commonStyles.imageBox,
                ...{
                  backgroundImage: productOrder?.orderDetail?.url
                    ? `url('${process.env.REACT_APP_IMAGE_URL}/${productOrder?.orderDetail?.url}')`
                    : `url('${defaultImage}')`,
                },
                ...cardStyle.imageContainer,
              }}
            ></Box>
          </Box>

          <Grid item sx={refereeStyles.refereeDetailUpperContainer}>
            <Grid item sm={12} xs={12}>
              <AjDetailTypography
                displayText1={"Order Id"}
                displayText2={productOrder?.orderDetail?.order_id}
              />
            </Grid>
            <Box sx={activeDetailStyle.detailContainer}>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Product Name"
                  displayText2={productOrder?.orderDetail?.product_name}
                  styleData2={{
                    ...commonStyles.textEllipsis,
                    ...styles.textEllipsisWidth,
                  }}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1={"Product Type"}
                  displayText2={productOrder?.orderDetail?.product_type}
                />
              </Grid>
              <>
                <Grid item sm={2} xs={12}>
                  <AjDetailTypography
                    displayText1="Batch id"
                    displayText2={productOrder?.orderDetail?.batch_Id}
                  />
                </Grid>
                <Grid item sm={2} xs={12}>
                  <AjDetailTypography
                    displayText1="Batch Type"
                    displayText2={productOrder?.orderDetail?.batch_type}
                  />
                </Grid>
              </>

              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity Sold"
                  displayText2={`${
                    productOrder?.orderDetail?.quantity
                  } ${textCapitalize(
                    productOrder?.orderDetail?.unit_of_measurement
                  )}`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Contact number"
                  displayText2={`${getPhoneCodeSymbol(
                    productOrder?.orderDetail?.phone_code
                  )} ${productOrder?.orderDetail?.buyer_contact_number}`}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                {productOrder?.orderDetail?.buyer_currency && (
                  <AjDetailTypography
                    displayText1="Price"
                    displayText2={`${numberWithCommas(
                      productOrder?.orderDetail?.price,
                      productOrder?.orderDetail?.seller_currency
                    )}
`}
                    displayText3={`(${numberWithCommas(
                      productOrder?.orderDetail?.seller_price_per_unit,
                      productOrder?.orderDetail?.seller_currency
                    )} per ${productOrder?.orderDetail?.unit_of_measurement})`}
                  />
                )}
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Date of purchase"
                  displayText2={`${formatDate(
                    productOrder?.orderDetail?.transaction_created_at
                  )} `}
                />
              </Grid>

              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Status"
                  displayText2={productOrder?.orderDetail?.status}
                />
              </Grid>
            </Box>
          </Grid>
          <Divider sx={commonStyles.dividerStyle} />
          <Box sx={commonStyles.customWidth}>
            <AjAddressDetail
              address1={productOrder?.orderDetail?.delivery_address_1}
              address2={productOrder?.orderDetail?.delivery_address_2}
              country={productOrder?.orderDetail?.country_name}
              state={productOrder?.orderDetail?.state_name}
              zipCode={productOrder?.orderDetail?.zip_code}
              city={productOrder?.orderDetail?.city}
              customAddressDetailStyle={{
                padding: "0rem",
              }}
            />
          </Box>
          {!!productOrder?.certificationDetails?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="QA Certifications"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {productOrder?.certificationDetails?.map((item) => (
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

          {!!productOrder?.warehouseDetail?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjTypography
                  displayText="Warehouse distribution"
                  styleData={viewProfileStyles.addressMainHeading}
                />

                {productOrder?.warehouseDetail?.map((item) => (
                  <AjDetailData
                    metaData={item.warehouse_name}
                    data={`${item.quantity} ${textCapitalize(
                      productOrder?.orderDetail?.unit_of_measurement
                    )}`}
                  />
                ))}
              </Box>
            </>
          )}

          <>
            <Divider sx={commonStyles.dividerStyle} />
            <Box sx={commonStyles.customWidth}>
              {isQaCompanyAssigned ? (
                <>
                  <AjTypography
                    displayText="QA Company Assigned"
                    styleData={viewProfileStyles.addressMainHeading}
                  />
                  <Typography>{confirmedQaCompanyName} </Typography>
                </>
              ) : (
                <Box sx={{ width: "20rem", marginBottom: "1rem" }}>
                  <AjTypography
                    displayText="Assign QA company to order"
                    styleData={viewProfileStyles.addressMainHeading}
                  />
                  <AjDropDown
                    options={qaCompanyOptions}
                    value={selectedQaCompany}
                    onChange={handleAssignQaCompany}
                    source="qaCompanyNames"
                    id="qaCompanyId"
                    placeHolder="Select a QA company"
                    defaultValue="Select a QA company"
                    styleData={commonStyles.ajDropDownEllipsiss}
                  />
                </Box>
              )}
            </Box>
          </>
          {isQaReport && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box sx={commonStyles.customWidth}>
                <AjProductOrderQaReportDetails
                  label="QA Status Report"
                  statusLabel="QA Status"
                  labelDescription="Product description"
                  qaStatus={
                    productOrder?.orderDetail?.product_orders_qa?.status
                  }
                  description={
                    productOrder?.orderDetail?.product_orders_qa?.description
                  }
                  docId={
                    productOrder?.orderDetail?.product_orders_qa
                      ?.certification_document_id
                  }
                  showIcon={true}
                  downloadWrapper={styles.downloadWrapper}
                />
              </Box>
            </>
          )}
        </Box>
      </Grid>
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText={`Are you sure you want to assign ${selectedQaCompany} to the product order?`}
          closeModal={setOpenDialog}
          onConfirm={() => handleConfirmAssignQaCompany()}
        />
      </AjDialog>
    </>
  );
}

export default ProductOrderQaAdminDetailsTab;
