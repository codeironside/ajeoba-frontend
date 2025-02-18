import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Divider } from "@mui/material";
import * as _ from "lodash";

import AjDetailTypography from "../../../../Components/AjDetailTypography/AjDetailTypography";

import { getFinanceRequestDetailsByIdAction } from "../../../../Redux/FarmingAssociation/Finance/FinanceActions";
import { productTypeOptions } from "../../../../Constant/AppConstant";

import { commonStyles } from "../../../../Style/CommonStyle";
import { styles as refereeStyles } from "../../../Admin/UserManagement/FarmingAssociation/Referee/RefereeDetails/RefereeDetailsStyles";
import { styles as activeDetailStyle } from "../../../FarmingAssociation/Marketplace/MarketplaceDetail/ActiveAdsDetail/ActiveDetailStyles";
import { viewProfileStyles } from "../../../Profile/ViewProfile/ViewProfileStyle";
import { styles as batchDetailsStyles } from "../../../FarmingAssociation/Inventory/Batches/BatchDetailView/BatchDetails/BatchDetailsStyle";
import { styles as FinanceRequestDetailStyle } from "./FinanceRequestDetailStyle";

const FinanceRequestDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const financeRequestDetailByIdSelector = useSelector(
    (state) => state.financeRequests.financeRequestDetailById
  );

  useEffect(() => {
    dispatch(getFinanceRequestDetailsByIdAction(id));
  }, []);

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      <Box sx={[commonStyles.detailsContainer]}>
        <Grid
          item
          sx={{
            ...refereeStyles.refereeDetailUpperContainer,
            ...commonStyles.fullWidth,
          }}
        >
          <Box sx={activeDetailStyle.detailContainer}>
            {financeRequestDetailByIdSelector?.financeRequestDetail
              ?.product_type ? (
              <Grid item sm={4} xs={12}>
                <AjDetailTypography
                  displayText1={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.product_name
                      ? "Product Name"
                      : "Input Name"
                  }
                  displayText2={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.product_name
                      ? financeRequestDetailByIdSelector?.financeRequestDetail
                          ?.product_name
                      : financeRequestDetailByIdSelector?.financeRequestDetail
                          ?.input_name
                  }
                  styleData2={{
                    ...commonStyles.customHeaderStyle,
                  }}
                />
              </Grid>
            ) : (
              <Grid
                item
                sm={6}
                xs={12}
                sx={{ ...FinanceRequestDetailStyle.inputPaddingLeft }}
              >
                <AjDetailTypography
                  displayText1={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.product_name
                      ? "Product Name"
                      : "Input Name"
                  }
                  displayText2={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.product_name
                      ? financeRequestDetailByIdSelector?.financeRequestDetail
                          ?.product_name
                      : financeRequestDetailByIdSelector?.financeRequestDetail
                          ?.input_name
                  }
                  styleData2={{
                    ...commonStyles.customHeaderStyle,
                  }}
                />
              </Grid>
            )}

            {financeRequestDetailByIdSelector?.financeRequestDetail
              ?.product_type && (
              <Grid item sm={4} xs={12}>
                <AjDetailTypography
                  displayText1="Storage type"
                  displayText2={
                    _.find(productTypeOptions, {
                      value:
                        financeRequestDetailByIdSelector?.financeRequestDetail
                          ?.product_type,
                    }).label
                  }
                />
              </Grid>
            )}

            {financeRequestDetailByIdSelector?.financeRequestDetail
              ?.product_type ? (
              <Grid
                item
                sm={4}
                xs={12}
                sx={{ ...FinanceRequestDetailStyle.reqPaddingRight }}
              >
                <AjDetailTypography
                  displayText1="Request Sent to"
                  displayText2={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.finance_company_name
                  }
                  styleData2={FinanceRequestDetailStyle.widthellipse}
                />
              </Grid>
            ) : (
              <Grid
                item
                sm={6}
                xs={12}
                sx={{ ...FinanceRequestDetailStyle.requestPaddingRight }}
              >
                <AjDetailTypography
                  displayText1="Request Sent to"
                  displayText2={
                    financeRequestDetailByIdSelector?.financeRequestDetail
                      ?.finance_company_name
                  }
                  styleData2={FinanceRequestDetailStyle.widthellipse}
                />
              </Grid>
            )}
          </Box>

          <Divider sx={commonStyles.dividerStyle} />

          <Box
            sx={{
              ...viewProfileStyles.addressHeading,
              ...commonStyles.customWidth,
              ...batchDetailsStyles.responsiveWidth,
            }}
          >
            <Box sx={viewProfileStyles.addressLineHeading}>Subject- </Box>
            <Box
              sx={[
                viewProfileStyles.subHeadingColor,
                viewProfileStyles.addressContent,
              ]}
            >
              {financeRequestDetailByIdSelector?.financeRequestDetail?.subject}
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
              {
                financeRequestDetailByIdSelector?.financeRequestDetail
                  ?.description
              }
            </Box>
          </Box>
        </Grid>
      </Box>
    </Grid>
  );
};

export default FinanceRequestDetail;
