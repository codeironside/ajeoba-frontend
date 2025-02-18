import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Divider, Box } from "@mui/material";
import AjButton from "../../../../../../Components/AjButton";
import * as _ from "lodash";

import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjDetailData from "../../../../../../Components/AjDetailData/AjDetailData";
import AjTypography from "../../../../../../Components/AjTypography";
import AjUploadMultipleCertificate from "../../../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";

import {
  addProductCertificateAction,
  getbatchDetailAction,
} from "../../../../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import styles from "./BatchDetailsStyle";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { viewProfileStyles } from "../../../../../Profile/ViewProfile/ViewProfileStyle";
import { showToast } from "../../../../../../Services/toast";
import { textCapitalize } from "../../../../../../Services/commonService/commonService";

export default function BatchDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const [uploadedCertificates, setUploadedCertificates] = useState([]);
  const [isNewDataAdded, setIsNewDataAdded] = useState(false);
  const [addMoreCertificates, setAddMoreCertificates] = useState(false);

  const batchDetail = useSelector((state) => state.inventory.batchDetail);
  const masterData = useSelector((state) => state.masterData.masterData);

  const unitOfMeasurement = batchDetail?.batchDetail[0]?.unit_of_measurement;

  useEffect(() => {
    dispatch(getbatchDetailAction(id));
  }, [id, isNewDataAdded]);

  const saveChanges = () => {
    const lastItem = _.last(uploadedCertificates);
    if (lastItem.documentData && lastItem.documentDataType) {
      const newUploadedCertficates = uploadedCertificates?.map(
        (certificate) => ({
          certificationTypeId: certificate.documentDataType.id,
          certificationDocumentId: certificate.documentData.id,
        })
      );
      setIsNewDataAdded(true);
      setAddMoreCertificates(false);
      dispatch(
        addProductCertificateAction(
          { certificationDetails: newUploadedCertficates },
          id,
          setIsNewDataAdded
        )
      );
    } else {
      showToast("Certificate is required", "error");
    }
  };

  const addCertificate = () => {
    setAddMoreCertificates(true);
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
        <Box sx={{ ...commonStyles.detailsContainer, ...styles.boxMarginTop }}>
          <AjDetailTypography
            styleData2={{
              ...commonStyles.customHeaderStyle,
            }}
            displayText1={batchDetail?.batchDetail[0]?.batch_id}
            displayText2={`${textCapitalize(
              batchDetail?.batchDetail[0]?.batch_type
            )} Batch`}
          />
          <Grid item sx={styles.detailMainContainer}>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Product name"
                displayText2={batchDetail?.batchDetail[0]?.product_name}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Product type"
                displayText2={textCapitalize(
                  batchDetail?.batchDetail[0]?.product_type
                )}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Initial quantity"
                displayText2={`${
                  batchDetail?.batchDetail[0]?.initial_quantity
                } ${textCapitalize(unitOfMeasurement)}`}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Remaining quantity"
                displayText2={`${batchDetail?.batchDetail[0]?.available_quantity} ${unitOfMeasurement}`}
              />
            </Grid>
            <Grid item sm={2} xs={12}>
              <AjDetailTypography
                displayText1="Status"
                displayText2={
                  batchDetail?.batchDetail[0]?.status === "PENDING"
                    ? "Ad not placed"
                    : "Ad placed"
                }
              />
            </Grid>
          </Grid>
          <Divider sx={commonStyles.dividerStyle} />
          <Box
            sx={{
              ...commonStyles.customWidth,
              ...styles.responsiveWidth,
            }}
          >
            <AjTypography
              displayText="QA Certifications"
              styleData={viewProfileStyles.addressMainHeading}
            />
            {batchDetail?.certificateDetail?.map((item, index) => {
              return (
                <AjDetailData
                  documentDownloader
                  metaData={item?.item_name}
                  fileName={item?.file_name}
                  fileId={item?.certification_document_id}
                />
              );
            })}
            {addMoreCertificates ? (
              <Box>
                <AjUploadMultipleCertificate
                  addedCert={batchDetail.certificateDetail}
                  setUploadedCertificates={setUploadedCertificates}
                  alignAddMoreCertificateButton={styles.btnPosition}
                  type="qa_certificate"
                  isRequired={true}
                />
                <AjButton
                  onClick={saveChanges}
                  variant="contained"
                  displayText="Save changes"
                  btnStyle={commonStyles.marginTop0}
                />
              </Box>
            ) : (
              <AjButton
                onClick={addCertificate}
                variant="text"
                isDisable={
                  batchDetail?.certificateDetail.length === masterData?.length
                }
                displayText={
                  batchDetail?.certificateDetail.length
                    ? "Add more certificate"
                    : "Add certificate"
                }
                styleData={{
                  ...commonStyles.underlineStyle,
                  ...commonStyles.moreCertificateButton,
                  ...styles.btnPosition,
                }}
              />
            )}
          </Box>
          {batchDetail?.warehouseDetail.length > 0 && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box
                sx={{ ...commonStyles.customWidth, ...styles.responsiveWidth }}
              >
                <AjTypography
                  displayText="Warehouse distribution"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {batchDetail?.warehouseDetail?.map((item) => (
                  <AjDetailData
                    metaData={item?.warehouse_name}
                    data={`${item?.available_quantity} ${unitOfMeasurement}`}
                  />
                ))}
              </Box>
            </>
          )}

          {batchDetail?.warehouseCertificate.length > 0 && (
            <>
              <Divider sx={commonStyles.dividerStyle} />
              <Box
                sx={{ ...commonStyles.customWidth, ...styles.responsiveWidth }}
              >
                <AjTypography
                  displayText="Warehouse Certificate"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                {batchDetail?.warehouseCertificate?.map((item, index) => (
                  <AjDetailData
                    documentDownloader
                    metaData={item?.name}
                    fileName={item?.file_name}
                    fileId={item?.certificate_document_id}
                  />
                ))}
              </Box>
            </>
          )}
        </Box>
      </Grid>
    </>
  );
}
