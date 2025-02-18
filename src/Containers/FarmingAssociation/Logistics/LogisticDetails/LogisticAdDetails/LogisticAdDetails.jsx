import { Box, Divider, Grid, Typography } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";

import AjConfirmModal from "../../../../../Components/AjConfirmModal/AjConfirmModal";
import AjDialog from "../../../../../Components/AjDialog/AjDialog";
import AjAddressDetail from "../../../../../Components/AjAddressDetail/AjAddressDetail";
import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../../Components/AjTypography";

import {
  editLogisticAdStatusAction,
  getLogisticAdDetailsByIdAction,
  logisticAdRequestAction,
  logisticAdRequestRevokeAction,
} from "../../../../../Redux/FarmingAssociation/LogisticAds/logisticAdsActions";
import {
  getPhoneCodeSymbol,
  numberWithCommas,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../Services/localStorageService";

import AjButton from "../../../../../Components/AjButton";
import TableActions from "../../../../../Components/TableActions/TableActions";
import { productTypeOptions } from "../../../../../Constant/AppConstant";
import { ROLES } from "../../../../../Constant/RoleConstant";
import {
  bankCommonStyles,
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { styles } from "../LogiticDetailsStyles";

const LogisticAdDetails = () => {
  const params = useParams();
  const { id } = params;
  const userData = getUserData();
  const dispatch = useDispatch();
  let selectedLogisticCompany;
  let selectedLogisticCompanyId;

  const logisticAdDetail = useSelector(
    (state) => state.logisticAds.logisticAdDetails
  );
  const [openDialog, setOpenDialog] = useState(false);

  const [selectedLogisticCompanyName, setselectedLogisticCompanyName] =
    useState();

  const [logisticsDetails, setlogisticsDetails] = useState();

  useEffect(() => {
    dispatch(getLogisticAdDetailsByIdAction(id));
  }, [id]);
  console.log(logisticAdDetail, "logisticAdDetail");
  useEffect(() => {
    if (logisticAdDetail) {
      const islogisticsCompanyAssigned =
        logisticAdDetail?.logistics_company_name;
      setselectedLogisticCompanyName(islogisticsCompanyAssigned);
    }
  }, [logisticAdDetail]);

  const handleConfirmLogisticsCompany = (item) => {
    const comp = {
      companyId: item?.id,
      name: item?.company_name,
      status: item?.status,
      cost: numberWithCommas(
        item?.desired_price,
        logisticAdDetail.seller_currency
      ),
      delivery: formatEstimatedDelivery(item?.delivery_estimation),
    };
    setlogisticsDetails(comp);
    setOpenDialog(true);
  };

  const handleConfirmAssignLogisticsComapny = (
    logisticsDetails,
    selectedLogisticCompanyId,
    logisticAdId = id
  ) => {
    setOpenDialog(false);

    if (logisticsDetails.status === "PENDING") {
      dispatch(
        logisticAdRequestAction(logisticsDetails.companyId, logisticAdId)
      );
    } else if (logisticsDetails.status === "ACCEPTED") {
      dispatch(
        logisticAdRequestRevokeAction(selectedLogisticCompanyId, logisticAdId)
      );
    }
  };

  function formatEstimatedDelivery(deliveryDate) {
    const delDate = moment(deliveryDate).format("ddd, DD/MM/YYYY");
    return delDate;
  }

  const items = [
    {
      name: "Ad Placed",
      actionClickHandler: (logisticAdId) =>
        dispatch(editLogisticAdStatusAction(logisticAdId, "ACTIVE")),
    },
    {
      name: "Ad not Placed",
      actionClickHandler: (logisticAdId) =>
        dispatch(editLogisticAdStatusAction(logisticAdId, "INACTIVE")),
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
      <Grid
        sx={{
          ...commonStyles.detailsContainer,
        }}
      >
        {logisticAdDetail && (
          <>
            <AjDetailTypography
              displayText1="Order Id"
              styleData2={{
                ...commonStyles.customHeaderStyle,
              }}
              displayText2={logisticAdDetail.order_id}
            />

            <Grid item sx={styles.detailMainContainer}>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  styleData2={{
                    ...commonStyles.textEllipsis,
                    ...styles.textEllipsisWidth,
                  }}
                  displayText1={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? "Input Name"
                      : "Product Name"
                  }
                  displayText2={
                    userData.role_id === ROLES.INPUT_SUPPLIER
                      ? logisticAdDetail.input_name
                      : logisticAdDetail.product_name
                  }
                />
              </Grid>

              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Ad was sent to"
                  displayText2={
                    logisticAdDetail.logistics_company_name === null
                      ? "Open Market"
                      : logisticAdDetail.logistics_company_name
                  }
                  styleData2={commonStyles.responsiveTypoDetailFields}
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                {logisticAdDetail.seller_currency && (
                  <AjDetailTypography
                    displayText1="Price"
                    displayText2={`${numberWithCommas(
                      logisticAdDetail.price,
                      logisticAdDetail.seller_currency
                    )}`}
                  />
                )}
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Quantity"
                  displayText2={`${logisticAdDetail.quantity} ${textCapitalize(
                    logisticAdDetail.unit_of_measurement
                  )}`}
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
                      ? logisticAdDetail?.input_subtype
                      : _.find(productTypeOptions, {
                          value: logisticAdDetail?.product_type,
                        })?.label
                  }
                />
              </Grid>
              <Grid item sm={2} xs={12}>
                <AjDetailTypography
                  displayText1="Distance"
                  displayText2={`${logisticAdDetail.distance} KM`}
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
                {logisticAdDetail?.logistics_company_name !== null ? (
                  <AjTypography
                    styleData={{
                      ...commonStyles.detailTypographyStyle,
                      ...commonStyles.detailTypographyStyleData,
                    }}
                    displayText={
                      logisticAdDetail?.ad_status === "ACTIVE"
                        ? "Ad Placed"
                        : logisticAdDetail?.ad_status === "INACTIVE"
                        ? "Ad not Placed"
                        : "Archived"
                    }
                  />
                ) : (
                  <TableActions
                    items={items}
                    id={id}
                    modalConfirmationMessage="Are you sure, you want to change the status"
                    isActive={
                      logisticAdDetail?.ad_status === "ACTIVE"
                        ? "Ad Placed"
                        : logisticAdDetail?.ad_status === "INACTIVE"
                        ? "Ad not Placed"
                        : "Archived"
                    }
                    isConfirmModalRequired={true}
                  />
                )}
              </Grid>
            </Grid>

            <Divider sx={commonStyles.dividerStyle} />
            <AjTypography
              displayText="Seller's Information"
              styleData={{ ...commonStyles.mainHeading, ...styles.infoHeading }}
            />
            <Box sx={commonStyles.customWidth}>
              <AjAddressDetail
                addressHeading="Address & contact information"
                address1={logisticAdDetail.seller_address_1}
                address2={logisticAdDetail.seller_address_2}
                country={logisticAdDetail.seller_country}
                state={logisticAdDetail.seller_state}
                city={logisticAdDetail.seller_city}
                zipCode={logisticAdDetail.seller_zip_code}
                customAddressDetailStyle={styles.customAddressStyle}
              />
              <Grid sx={styles.contactDetails}>
                <Box>
                  <AjTypography
                    displayText="Contact Number - "
                    styleData={viewProfileStyles.addressHeading}
                  />
                </Box>
                <Box>
                  <AjTypography
                    displayText={`${getPhoneCodeSymbol(
                      logisticAdDetail.seller_phone_code
                    )} ${logisticAdDetail.seller_contact_number}`}
                    styleData={{
                      ...viewProfileStyles.subHeadingColor,
                      ...viewProfileStyles.addressContent,
                    }}
                  />
                </Box>
              </Grid>
            </Box>
            <Divider sx={commonStyles.dividerStyle} />
            <AjTypography
              displayText="Buyer's Information"
              styleData={{ ...commonStyles.mainHeading, ...styles.infoHeading }}
            />
            <Box sx={commonStyles.customWidth}>
              <AjAddressDetail
                addressHeading="Address & contact information"
                address1={logisticAdDetail.buyer_address_1}
                address2={logisticAdDetail.buyer_address_2}
                country={logisticAdDetail.buyer_country}
                state={logisticAdDetail.buyer_state}
                city={logisticAdDetail.buyer_city}
                zipCode={logisticAdDetail.buyer_zip_code}
                customAddressDetailStyle={{
                  padding: "0rem",
                }}
              />
              <Grid sx={styles.contactDetails}>
                <Box>
                  <AjTypography
                    displayText="Contact Number - "
                    styleData={viewProfileStyles.addressHeading}
                  />
                </Box>
                <Box>
                  <AjTypography
                    displayText={`${getPhoneCodeSymbol(
                      logisticAdDetail.buyer_phone_code
                    )} ${logisticAdDetail.buyer_contact_number}`}
                    styleData={{
                      ...viewProfileStyles.subHeadingColor,
                      ...viewProfileStyles.addressContent,
                    }}
                  />
                </Box>
              </Grid>
            </Box>

            {logisticAdDetail?.interestedCompanies &&
              !selectedLogisticCompanyName && (
                <>
                  <Divider sx={commonStyles.dividerStyle} />
                  <AjTypography
                    displayText="Interested Logistic Companies List"
                    styleData={{
                      ...commonStyles.mainHeading,
                      ...styles.infoHeading,
                    }}
                  />
                  {logisticAdDetail?.interestedCompanies?.length > 0 ? (
                    <Box sx={commonStyles.customWidth}>
                      <Box sx={commonStyles.logisticsListStyle}>
                        <AjTypography
                          displayText="Logistics Company"
                          styleData={viewProfileStyles.addressMainHeading}
                        />
                        <AjTypography
                          displayText="Logistics Cost"
                          styleData={viewProfileStyles.addressMainHeading}
                        />
                        <AjTypography
                          displayText="Estimated Delivery Date"
                          styleData={viewProfileStyles.addressMainHeading}
                        />
                      </Box>
                      {logisticAdDetail?.interestedCompanies?.map(
                        (item, index) => (
                          <Box key={index} sx={styles.companyListBox}>
                            <Box sx={styles.companyListBoxLogDetails}>
                              <Box style={styles.companyList}>
                                {`${index + 1}. ${item.company_name}`}
                              </Box>
                              <Box style={styles.companyList}>
                                {`${numberWithCommas(
                                  item?.desired_price,
                                  logisticAdDetail?.seller_currency
                                )}`}
                              </Box>
                              <Box style={styles.companyList}>
                                {formatEstimatedDelivery(
                                  item?.delivery_estimation
                                )}
                              </Box>
                            </Box>
                            <AjButton
                              variant="text"
                              displayText={
                                item.status === "PENDING"
                                  ? "Grant Access"
                                  : "Revoke Access"
                              }
                              onClick={() =>
                                handleConfirmLogisticsCompany(item)
                              }
                              styleData={{
                                ...commonStyles.editBtn,
                                ...styles.listingBtn,
                                ...(item.status === "PENDING"
                                  ? ""
                                  : styles.revokeBtnStyling),
                              }}
                            />
                          </Box>
                        )
                      )}
                    </Box>
                  ) : (
                    <AjTypography
                      styleData={bankCommonStyles.addressHeading}
                      displayText="No interested companies found yet!"
                    />
                  )}
                </>
              )}

            {selectedLogisticCompanyName && (
              <>
                <Divider sx={commonStyles.dividerStyle} />
                <AjTypography
                  displayText="Assigned Logistics Company"
                  styleData={{
                    ...commonStyles.mainHeading,
                    ...styles.infoHeading,
                  }}
                />
                <Box sx={commonStyles.customWidth}>
                  <Box sx={commonStyles.logisticsListStyle}>
                    <AjTypography
                      displayText="Logistics Company"
                      styleData={viewProfileStyles.addressMainHeading}
                    />
                    <AjTypography
                      displayText="Logistics Cost"
                      styleData={viewProfileStyles.addressMainHeading}
                    />
                    <AjTypography
                      displayText="Estimated Delivery Date"
                      styleData={viewProfileStyles.addressMainHeading}
                    />
                  </Box>

                  {logisticAdDetail?.interestedCompanies?.map((item, index) => {
                    if (item?.status === "ACCEPTED") {
                      selectedLogisticCompany = item?.company_name;
                      selectedLogisticCompanyId = item?.id;
                      return (
                        <Box key={index} sx={styles.companyListBox}>
                          <Box sx={styles.companyListBoxLogDetails}>
                            <Box style={styles.companyList}>
                              {item?.company_name}
                            </Box>
                            <Box style={styles.companyList}>
                              {`${numberWithCommas(
                                item?.desired_price,
                                logisticAdDetail?.seller_currency
                              )}`}
                            </Box>
                            <Box style={styles.companyList}>
                              {formatEstimatedDelivery(
                                item?.delivery_estimation
                              )}
                            </Box>
                          </Box>

                          <AjButton
                            variant="text"
                            displayText="Revoke Access"
                            onClick={() => handleConfirmLogisticsCompany(item)}
                            styleData={{
                              ...commonStyles.editBtn,
                              ...styles.listingBtn,
                              ...styles.revokeBtnStyling,
                            }}
                          />
                        </Box>
                      );
                    }
                  })}
                </Box>
              </>
            )}
          </>
        )}
      </Grid>
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        <AjConfirmModal
          displayText={
            !selectedLogisticCompanyName
              ? `Confirm to assign ${logisticsDetails?.name} logistics to your order?`
              : `Confirm to revoke ${selectedLogisticCompany} logistics from your order?`
          }
          closeModal={setOpenDialog}
          onConfirm={() =>
            handleConfirmAssignLogisticsComapny(
              logisticsDetails,
              selectedLogisticCompanyId
            )
          }
        />
      </AjDialog>
    </Grid>
  );
};

export default LogisticAdDetails;
