import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Grid, Box, Divider } from "@mui/material";
import * as _ from "lodash";

import AjDetailTypography from "../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjDetailData from "../../../../../Components/AjDetailData/AjDetailData";
import AjTypography from "../../../../../Components/AjTypography";
import TableActions from "../../../../../Components/TableActions/TableActions";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjDocumentDownloader from "../../../../../Components/AjDocumentDownloader";
import {
  getTruckDetailsByIdAction,
  toggleTruckStatusAction,
} from "../../../../../Redux/Logistics/logisticsActions";
import {
  getMasterData,
  getMasterDataAction,
} from "../../../../../Redux/common/GetMasterData/getMasterDataActions";
import { getBooleanStatus } from "../../../../../Services/commonService/commonService";
import { viewProfileStyles } from "../../../../Profile/ViewProfile/ViewProfileStyle";
import { styles as batchDetailsStyles } from "../../../../FarmingAssociation/Inventory/Batches/BatchDetailView/BatchDetails/BatchDetailsStyle";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../../Style/CommonStyle";

const TruckDetails = () => {
  const [certifications, setCertifications] = useState();
  const [typeOfTruckName, setTypeOfTruckName] = useState();

  const dispatch = useDispatch();
  const { id } = useParams();

  const truckDetails = useSelector((state) => state.logistics.truckDetails);

  const typeOfTruckMasterData = useSelector(
    (state) => state.masterData.masterData
  );
  useEffect(() => {
    dispatch(getTruckDetailsByIdAction(id));
    dispatch(getMasterDataAction({ itemType: "TYPE_OF_TRUCK" }));
    return () => dispatch(getMasterData(null));
  }, []);

  useEffect(() => {
    if (typeOfTruckMasterData && truckDetails) {
      const truckTypeName = _.find(typeOfTruckMasterData, {
        id: truckDetails?.truckDetail?.type_of_truck,
      }).name;
      setTypeOfTruckName(truckTypeName);
    }
  }, [typeOfTruckMasterData]);

  useEffect(() => {
    let certData = [];
    if (truckDetails?.roadWorthinessCertificateId?.length) {
      certData = [
        ...certData,
        {
          id: truckDetails?.roadWorthinessCertificateId[0]?.id,
          name: "Road worthiness certificate",
          file_name: truckDetails?.roadWorthinessCertificateId[0]?.file_name,
        },
      ];
    }
    if (truckDetails?.vehicleInsuranceId?.length) {
      certData = [
        ...certData,
        {
          id: truckDetails?.roadWorthinessCertificateId[0]?.id,
          name: "Vehicle Insurance certificate",
          file_name: truckDetails?.vehicleInsuranceId[0]?.file_name,
        },
      ];
    }
    setCertifications(certData);
  }, [truckDetails]);

  const options = [
    {
      name: "Active",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, true)),
    },
    {
      name: "Inactive",
      actionClickHandler: (truckId) =>
        dispatch(toggleTruckStatusAction(truckId, false)),
    },
  ];

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
        <Box
          sx={{
            ...commonStyles.detailsContainer,
            ...batchDetailsStyles.boxMarginTop,
          }}
        >
          <AjDetailTypography
            styleData2={{
              ...commonStyles.customHeaderStyle,
            }}
            displayText1={truckDetails?.truckDetail?.model}
            displayText2={typeOfTruckName}
          />
          <Grid item sx={batchDetailsStyles.detailMainContainer}>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Registration number"
                displayText2={
                  truckDetails?.truckDetail?.registered_plate_number
                }
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Colour of truck"
                displayText2={truckDetails?.truckDetail?.color}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <AjInputLabel
                displayText="License certificate (Front View)"
                styleData={{
                  ...commonStyles.detailTypographyStyle,
                  ...commonStyles.detailTypographyStyleHead,
                }}
              />
              <AjDocumentDownloader
                docId={truckDetails?.driverLicenseCertificateId[0]?.id}
                docName={truckDetails?.driverLicenseCertificateId[0]?.file_name}
                showIcon={false}
                downloadWrapper={viewProfileStyles.downloadWrapper}
                changeBtnStyle={viewProfileStyles.changeBtnStyle}
                docTextStyle={viewProfileStyles.docTextStyle}
              />
            </Grid>
            <Grid item sm={3} xs={12}>
              <AjInputLabel
                displayText="License certificate (Back View)"
                styleData={{
                  ...commonStyles.detailTypographyStyle,
                  ...commonStyles.detailTypographyStyleHead,
                }}
              />
              <AjDocumentDownloader
                docId={truckDetails?.driverLicenseCertificateId[1]?.id}
                docName={truckDetails?.driverLicenseCertificateId[1]?.file_name}
                showIcon={false}
                downloadWrapper={viewProfileStyles.downloadWrapper}
                changeBtnStyle={viewProfileStyles.changeBtnStyle}
                docTextStyle={viewProfileStyles.docTextStyle}
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
                id={truckDetails?.truckDetail?.id}
                isActive={getBooleanStatus(
                  truckDetails?.truckDetail?.is_active
                )}
                isConfirmModalRequired={true}
                modalConfirmationMessage="Are you sure you want to change the status of the truck?"
              />
            </Grid>
          </Grid>
          {!!certifications?.length && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box
                sx={{
                  ...commonStyles.customWidth,
                  ...batchDetailsStyles.responsiveWidth,
                }}
              >
                <AjTypography
                  displayText="Certifications"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {certifications?.map((item) => (
                  <AjDetailData
                    documentDownloader
                    metaData={item?.name}
                    fileName={item?.file_name}
                    fileId={item?.id}
                  />
                ))}
              </Box>
            </>
          )}
          <Divider sx={commonStyles.dividerStyle} />
          <Box
            sx={{
              ...commonStyles.customWidth,
              ...batchDetailsStyles.responsiveWidth,
            }}
          >
            <AjTypography
              displayText="Photos of Truck"
              styleData={viewProfileStyles.addressMainHeading}
            />
            {truckDetails?.photoIdDetails?.map((item, index) => (
              <AjDetailData
                documentDownloader
                metaData={`Photo ${index + 1}`}
                fileName={item?.file_name}
                fileId={item?.id}
              />
            ))}
          </Box>
        </Box>
      </Grid>
    </>
  );
};

export default TruckDetails;
