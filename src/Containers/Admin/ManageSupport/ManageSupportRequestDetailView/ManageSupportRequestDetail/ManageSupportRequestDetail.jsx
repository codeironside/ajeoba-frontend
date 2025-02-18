import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Divider } from "@mui/material";
import * as moment from "moment";

import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjTypography from "../../../../../Components/AjTypography";
import TableActions from "../../../../../Components/TableActions/TableActions";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";

import {
  getSupportDetailsByIdAction,
  changeSupportRequestStatusAction,
} from "../../../../../Redux/HelpAndSupport/HelpAndSupportActions";
import { userRoleTypeListingOptions } from "../../../../../Constant/AppConstant";
import { getPhoneCodeSymbol } from "../../../../../Services/commonService/commonService";

import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { styles as batchDetailsStyles } from "../../../../FarmingAssociation/Inventory/Batches/BatchDetailView/BatchDetails/BatchDetailsStyle";
import { styles as activeDetailStyle } from "../../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";

const ManageSupportRequestDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const requestDataById = useSelector(
    (state) => state.helpAndSupport.supportRequestDetailById
  );
  useEffect(() => {
    dispatch(getSupportDetailsByIdAction(id));
  }, []);

  const options = [
    {
      name: "Pending",
      actionClickHandler: () =>
        dispatch(changeSupportRequestStatusAction(id, { status: "PENDING" })),
    },
    {
      name: "Under Review",
      actionClickHandler: () =>
        dispatch(
          changeSupportRequestStatusAction(id, {
            status: "UNDER_REVIEW",
          })
        ),
    },
    {
      name: "Resolved",
      actionClickHandler: () =>
        dispatch(changeSupportRequestStatusAction(id, { status: "RESOLVED" })),
    },
  ];

  const getStatus = (itemStatus) => {
    if (itemStatus === "PENDING") return "Pending";
    if (itemStatus === "UNDER_REVIEW") return "Under Review";
    else return "Resolved";
  };

  const foundUserRoleVal = () =>
    userRoleTypeListingOptions.find(
      (data) => data.roleId === requestDataById?.userDetails.role_id
    );

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box
        sx={{
          ...commonStyles.detailsContainer,
          ...batchDetailsStyles.boxMarginTop,
        }}
      >
        <Grid item sx={batchDetailsStyles.detailMainContainer}>
          
          <Grid item sm={12} xs={12}>
            <AjDetailTypography
              displayText1="User Role"
              displayText2={foundUserRoleVal()?.label}
            />
          </Grid>
        </Grid>
        <Box sx={activeDetailStyle.detailContainer}>
          <Grid item sm={3} xs={12}>
            <AjDetailTypography
              displayText1="Date and time"
              displayText2={`${moment(
                requestDataById?.supportRequestDetails?.created_at
              ).format("DD/MM/YYYY")}
         ${moment(requestDataById?.supportRequestDetails?.created_at).format(
           "LT"
         )}`}
            />
          </Grid>
          <Grid item sm={2.4} xs={12}>
            <AjDetailTypography
              displayText1="Request raised by"
              displayText2={
                requestDataById?.userDetails?.first_name +
                " " +
                requestDataById?.userDetails?.last_name
              }
            />
          </Grid>
          <Grid item sm={2.4} xs={12}>
            <AjDetailTypography
              displayText1="Email id"
              displayText2={requestDataById?.userDetails?.email}
            />
          </Grid>
          <Grid item sm={2.4} xs={12}>
            <AjDetailTypography
              displayText1="Phone number"
              displayText2={`${getPhoneCodeSymbol(
                requestDataById?.userDetails?.phone_code
              )}
                ${requestDataById?.userDetails?.mobile_no}`}
            />
          </Grid>
          <Grid item sm={2.4} xs={12} sx={customCommonStyles.statusContainer}>
            <AjTypography
              styleData={{
                ...commonStyles.detailTypographyStyle,
                ...commonStyles.detailTypographyStyleHead,
              }}
              displayText="Status"
            />
            <TableActions
              options={options}
              id={requestDataById?.supportRequestDetails?.id}
              isActive={getStatus(
                requestDataById?.supportRequestDetails?.support_request_status
              )}
              isConfirmModalRequired={true}
              modalConfirmationMessage="Are you sure you want to change the status of the truck?"
            />
          </Grid>
        </Box>
        <Divider sx={commonStyles.dividerStyle} />

        <Box
          sx={{
            ...viewProfileStyles.addressHeading,
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          <Box sx={viewProfileStyles.addressLineHeading}>Subject - </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
            ]}
          >
            {requestDataById?.supportRequestDetails?.subject}
          </Box>
        </Box>

        <Box
          sx={{
            ...viewProfileStyles.addressHeading,
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          <Box sx={viewProfileStyles.addressLineHeading}>Description - </Box>
          <Box
            sx={[
              viewProfileStyles.subHeadingColor,
              viewProfileStyles.addressContent,
            ]}
          >
            {requestDataById?.supportRequestDetails?.description}
          </Box>
        </Box>

        <Divider sx={commonStyles.dividerStyle} />

        <Box
          sx={{
            ...commonStyles.customWidth,
            ...batchDetailsStyles.responsiveWidth,
          }}
        >
          {requestDataById?.documentDetails &&
            Object.keys(requestDataById?.documentDetails).length !== 0 && (
              <>
                <AjTypography
                  displayText="Attachments "
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {requestDataById?.documentDetails?.map((item, index) => (
                  <AjDetailData
                    documentDownloader
                    metaData={`Photo ${index + 1}`}
                    fileName={item?.file_name}
                    fileId={item?.document_id}
                  />
                ))}
              </>
            )}
        </Box>
      </Box>
    </Grid>
  );
};

export default ManageSupportRequestDetail;
