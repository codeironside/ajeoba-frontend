import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, Box } from "@mui/material";

import AjDetailTypography from "../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../Components/AjTypography";
import { AjRating } from "../../../../Components/AjRating";
import AjButton from "../../../../Components/AjButton";
import AjDetailData from "../../../../Components/AjDetailData/AjDetailData";
import AjDocumentDownloader from "../../../../Components/AjDocumentDownloader";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import AjConfirmModal from "../../../../Components/AjConfirmModal/AjConfirmModal";

import { styles as orderDetailstyles } from "../../../CorporateBuyers/Trading/Orders/OrderDetailView/OrderDetails/OrderDetailStyle";
import { commonStyles } from "../../../../Style/CommonStyle";
import { viewProfileStyles } from "../../../Profile/ViewProfile/ViewProfileStyle";
import AjAddressDetail from "../../../../Components/AjAddressDetail/AjAddressDetail";
import { styles as batchDetailsStyles } from "../../../FarmingAssociation/Inventory/Batches/BatchDetailView/BatchDetails/BatchDetailsStyle";
import { styles as btnStyles } from "../../../FarmingAssociation/Logistics/LogisticDetails/LogiticDetailsStyles";
import styles from "./FinanceRequestCompanyStyle";
import {
  getFinanceRequestDetailByIdAction,
  updateFinanceRequestStatusAction,
  updateFinanceRequestAdditionalDetailAction,
} from "../../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";
import { FINANCE_REQUESTS } from "../../../../Routes/Routes";

export default function FinanceCompanyRequestDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const financeRequestDetail = useSelector(
    (state) => state.financeCompanyRequests.financeRequestDetail
  );

  useEffect(() => {
    dispatch(getFinanceRequestDetailByIdAction(id));
  }, [id]);

  const requestUpdateHandler = () => {
    const status =
      financeRequestDetail?.financeRequestDetail?.requested_additional_details;
    if (status === "PENDING") {
      setOpenDialog(true);
    }
    if (status === "GRANTED") {
      navigate(`${FINANCE_REQUESTS}/additional-detail/${id}`);
    }
    if (status === null) {
      dispatch(updateFinanceRequestAdditionalDetailAction(id));
    }
  };

  const handleConfirm = () => {
    dispatch(updateFinanceRequestStatusAction(id));
  };

  const productName = financeRequestDetail?.financeRequestDetail?.product_name;
  const inputName = financeRequestDetail?.financeRequestDetail?.input_name;
  const requested_additional_details =
    financeRequestDetail?.financeRequestDetail?.requested_additional_details;

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
        ...styles.layoutOverflow,
      }}
    >
      <Box
        sx={{
          ...commonStyles.detailsContainer,
          ...orderDetailstyles.boxMarginTop,
        }}
      >
        <AjTypography
          styleData={{
            ...viewProfileStyles.userName,
            ...viewProfileStyles.textEllipsis,
          }}
          align="center"
          displayText="Seller's Rating"
        />
        <AjRating
          readOnly={true}
          styleData={orderDetailstyles.ratingStyles}
          defaultValue={
            financeRequestDetail?.associationDetails?.rating
              ? parseInt(financeRequestDetail?.associationDetails?.rating)
              : "0"
          }
        />
        <Grid item sx={orderDetailstyles.orderMainContainer}>
          <Grid item sm={3} xs={12}>
            <AjDetailTypography
              displayText1={productName ? "Product name" : "Input name"}
              displayText2={productName || inputName}
            />
          </Grid>
          {productName && (
            <Grid item sm={3} xs={12}>
              <AjDetailTypography
                displayText1="Storage type"
                displayText2={
                  financeRequestDetail?.financeRequestDetail?.product_type
                }
              />
            </Grid>
          )}

          <Grid item sm={3} xs={12}>
            <AjDetailTypography displayText1="CAC documents : (JPEG, PNG or PDF only) " />
            <AjDocumentDownloader
              docId={financeRequestDetail?.associationDetails?.cac_document}
              docName={financeRequestDetail?.associationDetails?.file_name}
              showIcon={false}
              downloadWrapper={viewProfileStyles.downloadWrapper}
              changeBtnStyle={viewProfileStyles.changeBtnStyle}
              docTextStyle={viewProfileStyles.docTextStyle}
            />
          </Grid>
          <Grid item sm={3} xs={12}>
            <AjDetailTypography
              displayText1="Farmers Onboarded"
              displayText2={
                financeRequestDetail?.associationDetails?.farmersCount
              }
            />
          </Grid>
        </Grid>
        <Divider sx={commonStyles.dividerStyle} />

        <Box
          sx={{
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          <AjTypography
            displayText="Association details"
            styleData={{
              ...viewProfileStyles.addressMainHeading,
              ...styles.boxMarginLeft,
            }}
          />
          <AjDetailData
            metaData="Association name"
            data={financeRequestDetail?.associationDetails?.association_name}
            styleData={styles.boxMarginLeft}
          />
          <AjDetailData
            metaData="Association Registration number"
            data={financeRequestDetail?.associationDetails?.registration_number}
            Address
            secondryMetaData="TIN Number"
            secondryData={
              financeRequestDetail?.associationDetails?.org_verification_number
            }
            styleData={{
              ...styles.boxMarginLeft,
              ...commonStyles.addressStyle,
            }}
          />
        </Box>
        <Divider sx={commonStyles.dividerStyle} />
        <Box
          sx={{
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          <AjTypography
            displayText="Request details"
            styleData={{
              ...viewProfileStyles.addressMainHeading,
              ...styles.boxMarginLeft,
            }}
          />
          <Box
            sx={{
              ...viewProfileStyles.addressHeading,
              ...commonStyles.customWidth,
              ...batchDetailsStyles.responsiveWidth,
              ...styles.boxMarginLeft,
            }}
          >
            <Box sx={viewProfileStyles.addressLineHeading}>Subject- </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {financeRequestDetail?.financeRequestDetail?.subject}
            </Box>
          </Box>

          <Box
            sx={{
              ...viewProfileStyles.addressHeading,
              ...commonStyles.customWidth,
              ...batchDetailsStyles.responsiveWidth,
              ...styles.requestSentMargin,
            }}
          >
            <Box sx={viewProfileStyles.addressLineHeading}>Description - </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {financeRequestDetail?.financeRequestDetail?.description}
            </Box>
          </Box>
        </Box>
        {financeRequestDetail?.financeRequestDetail?.status !== "CLOSED" && (
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {requested_additional_details === "PENDING" && (
              <AjTypography
                displayText="Request sent"
                styleData={{
                  ...viewProfileStyles.addressMainHeading,
                  ...styles.boxMarginLeft,
                  ...styles.closeRequestStyle,
                }}
              />
            )}
            {requested_additional_details === "REVOKED" ||
            requested_additional_details === "DENIED" ? (
              <AjTypography
                displayText={
                  requested_additional_details === "REVOKED"
                    ? "Your access has been revoked"
                    : "Access Denied"
                }
                styleData={{
                  ...styles.boxMarginLeft,
                  ...styles.revokedStyle,
                }}
              />
            ) : (
              <AjButton
                displayText={
                  requested_additional_details === "PENDING"
                    ? "Close request"
                    : requested_additional_details === "GRANTED"
                    ? "View additional details"
                    : requested_additional_details === null
                    ? "Request additional details"
                    : ""
                }
                onClick={requestUpdateHandler}
                styleData={{
                  ...commonStyles.editBtn,
                  ...btnStyles.listingBtn,
                  ...styles.btnWidth,
                  ...(requested_additional_details === "PENDING"
                    ? {
                        ...btnStyles.revokeBtnStyling,
                        ...styles.closeRequestBtnWidth,
                      }
                    : requested_additional_details === "DENIED"
                    ? btnStyles.rejectedBtnStyling
                    : ""),
                }}
                isDisable={
                  requested_additional_details === "DENIED" ? true : false
                }
              />
            )}
          </Box>
        )}
        <Divider sx={commonStyles.dividerStyle} />

        <Box
          sx={{
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          <AjAddressDetail
            address1={financeRequestDetail?.associationDetails?.address_1}
            address2={financeRequestDetail?.associationDetails?.address_2}
            country={financeRequestDetail?.associationDetails?.country_name}
            state={financeRequestDetail?.associationDetails?.state_name}
            zipCode={financeRequestDetail?.associationDetails?.zip_code}
            city={financeRequestDetail?.associationDetails?.city}
          />
        </Box>
        <AjDialog
          open={openDialog}
          closeModal={setOpenDialog}
          styleData={commonStyles.deleteDialogModal}
        >
          <AjConfirmModal
            displayText="Are you sure, you want to close the request?"
            closeModal={setOpenDialog}
            onConfirm={handleConfirm}
          />
        </AjDialog>
      </Box>
    </Grid>
  );
}
