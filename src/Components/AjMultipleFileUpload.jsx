import React, { useEffect, useState } from "react";
import AjDocumentDownloader from "./AjDocumentDownloader";
import AjDocumentUploader from "./AjDocumentUploader";
import { showToast } from "../Services/toast";
import { Box } from "@mui/material";
import { commonStyles } from "../Style/CommonStyle";
import { styles } from "./AjUploadCertificate/AjUploadCertificateStyles.js";

const AjMultipleFileUpload = ({
  maxNoOfFilesAllowed,
  getCertificates,
  docType,
  defaultValue,
  isDisable,
  reset,
}) => {
  const [certificates, setCertificates] = useState([]);

  const changeImageData = (deletedId) => {
    const newCertificate = certificates?.filter(
      (cert) => cert.id !== deletedId
    );
    showToast("Image deleted", "success");
    setCertificates(newCertificate);
    getCertificates(newCertificate);
  };

  const uploadCertificate = (data) => {
    if(certificates?.length)
    {
    setCertificates((prevState) => [...prevState, data]);
    getCertificates((prevState) => [...prevState, data]);
    }
    else
    {
      setCertificates([data])
      getCertificates([data])
    }
  };

  useEffect(() => {
    setCertificates(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    setCertificates(defaultValue);
  }, [reset]);

  return (
    <Box
      sx={{
        ...commonStyles.signupFormFieldContainer,
        ...commonStyles.fieldTopMargin,
        ...commonStyles.marginTop0,
        ...styles.responsiveField,
      }}
    >
      {!!certificates?.length &&
        certificates.map((doc) => (
          <AjDocumentDownloader
            docId={doc.id}
            docName={doc.file_name}
            changeDocument={() => changeImageData(doc.id)}
            showIcon={true}
            displayText="DELETE"
            readOnly={isDisable}
          />
        ))}

      {certificates?.length === maxNoOfFilesAllowed || isDisable ? (
        ""
      ) : (
        <AjDocumentUploader
          type="image"
          docType={docType}
          onUpload={uploadCertificate}
        />
      )}
    </Box>
  );
};

export default AjMultipleFileUpload;
