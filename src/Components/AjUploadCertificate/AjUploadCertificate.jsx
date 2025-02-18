import React, { useState, useEffect } from "react";
import { Box } from "@mui/system";
import { useLocation } from "react-router-dom";

import { commonStyles } from "../../Style/CommonStyle";
import AjInputLabel from "../AjInputLabel";
import AjDocumentUploader from "../AjDocumentUploader";
import AjDocumentDownloader from "../AjDocumentDownloader";
import AjDropDown from "../AjDropdown/AjDropDown";
import { styles } from "./AjUploadCertificateStyles.js";

const AjUploadCertificate = (props) => {
  const location = useLocation();
  const [particularDocument, setParticularDocument] = useState();
  const [particularDocumentType, setParticularDocumentType] = useState();
  const isFarmersDetailPage =
    location.pathname.includes("farmers/detail") ||
    location.pathname.includes("farmers/edit");

  const getItemType = (certificateType) => {
    let type;
    switch (certificateType) {
      case "farmer_certificate":
        type = "Farmer Certificate : (JPEG, PNG or PDF only)";
        break;
      case "qa_certificate":
        type = "QA Certificate : (JPEG, PNG or PDF only)";
        break;
      default:
        type = "Warehouse Certificate : (JPEG, PNG or PDF only)";
    }

    return type;
  };

  useEffect(() => {
    if (props.defaultValue?.documentDataType) {
      setParticularDocumentType(props.defaultValue.documentDataType);
      setParticularDocument(props.defaultValue.documentData);
    } else if (props.masterData && props.masterData.length) {
      setParticularDocumentType(props.masterData[0]);
      props.onChange(
        {
          documentData: null,
          documentDataType: props.masterData[0],
        },
        props.index
      );
    }
  }, []);

  const CertificateCodeChangeHandler = (selectedDocument) => {
    setParticularDocumentType(selectedDocument.target.value);
    props.onChange(
      {
        documentData: particularDocument,
        documentDataType: selectedDocument.target.value,
      },
      props.index
    );
  };

  const uploadCertificate = (data) => {
    setParticularDocument(data);
    props.onChange(
      {
        documentData: data,
        documentDataType: particularDocumentType,
      },
      props.index
    );
  };

  const deleteHandler = () => {
    if (props.index === 0 && props.length === 1) {
      setParticularDocument(null);
      props.onChange({
        documentData: null,
        documentDataType: particularDocumentType,
      });
    } else {
      props.onDelete();
    }
  };

  return (
    <>
      <Box
        sx={{
          ...(isFarmersDetailPage
            ? commonStyles.certificateFieldContainerNEWfarmerdetailpage
            : commonStyles.certificateFieldContainer),
          ...(typeof props.isDisable !== "undefined" &&
            commonStyles.certificateFieldContainerCustom),
        }}
      >
        {props.type != "product_order_qa_report" && (
          <Box
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...commonStyles.fieldTopMargin,
              ...styles.responsiveField,
            }}
          >
            {props.isLabel ? (
              <AjInputLabel
                displayText={getItemType(props.type)}
                required={props.isRequired}
                styleData={commonStyles.inputLabel}
              />
            ) : (
              ""
            )}
            <AjDropDown
              options={props.masterData}
              value={particularDocumentType}
              defaultValue={particularDocumentType?.name}
              onChange={CertificateCodeChangeHandler}
              source="name"
              styleData={{
                ...styles.responsiveDropdown,
                ...commonStyles.ajDropDownEllipsiss,
              }}
              placeHolder={`Select ${getItemType(props.type)}`}
              disableSourceForValue
              readOnly={
                particularDocument?.id ? true : props.isDisable ? true : false
              }
            />
          </Box>
        )}
        <Box
          sx={[
            commonStyles.signupFormFieldContainer,
            commonStyles.fieldTopMargin,
            styles.responsiveField,
            props.index === 0 && styles.uploadMarginTop,
          ]}
        >
          {particularDocument && particularDocument.id ? (
            <AjDocumentDownloader
              docId={particularDocument.id}
              origin={props.type}
              docName={particularDocument.file_name}
              changeDocument={deleteHandler}
              displayText={"DELETE"}
              showIcon={true}
              readOnly={props.isDisable}
              downloadWrapper={styles.downloadWrapper}
            />
          ) : (
            <AjDocumentUploader
              type="image"
              origin={props.type}
              width={props.width}
              setIsUpload={props.setIsUpload}
              docType={"CERTIFICATION"}
              onUpload={uploadCertificate}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default AjUploadCertificate;
