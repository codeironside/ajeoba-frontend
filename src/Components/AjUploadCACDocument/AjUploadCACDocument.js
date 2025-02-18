import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import AjInputLabel from "../AjInputLabel";
import AjDocumentDownloader from "../AjDocumentDownloader";
import AjDocumentUploader from "../AjDocumentUploader";
import AjTypography from "../AjTypography";
import { commonStyles } from "../../Style/CommonStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export const cacDocumentSchema = (error, documentRequired) =>
  Yup.object().shape({
    CACDocument: documentRequired
      ? Yup.string().required(error || "CAC document is required")
      : Yup.string().notRequired(),
  });

const AjUploadCACDocument = (props) => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      cacDocumentSchema(props.error, props.documentRequired)
    ),
    mode: "onChange",
  });

  const [CACDocument, setCACDocument] = useState(null);

  useEffect(() => {
    if (props.submit) {
      handleSubmit(onSubmit, onError)();
    }
  }, [props.submit]);

  const onError = (err) => {
    props.data(null);
  };

  const onSubmit = (data) => {
    props.data(data);
  };

  useEffect(() => {
    setDocValues();
  }, []);

  useEffect(() => {
    if (props.reset) {
      setValue("CACDocument", props.defaultCACDocument?.id || "", {
        shouldValidate: false,
      });
      setCACDocument({
        file_name: props.defaultCACDocument?.file_name || "CAC Document",
        id: props.defaultCACDocument?.id || "",
      });
    }
  }, [props.reset]);

  const setDocValues = () => {
    if (props.defaultCACDocument?.id) {
      setValue("CACDocument", props.defaultCACDocument?.id, {
        shouldValidate: true,
      });
      setCACDocument({
        file_name: props.defaultCACDocument?.file_name || "CAC Document",
        id: props.defaultCACDocument?.id,
      });
    }
  };

  useEffect(() => {
    if (CACDocument !== null) {
      setValue("CACDocument", CACDocument?.id, {
        shouldValidate: true,
      });
    }
  }, [CACDocument]);

  const uploadImage = (data) => {
    setCACDocument(data);
  };

  const changeImageData = (e) => {
    e.preventDefault();
    setCACDocument("");
  };
  return (
    <>
      <Grid item xs={12} sm={12} md={6} lg={6} sx={props.styleData}>
        <AjInputLabel
          displayText={props.label || "CAC document"}
          required={props.documentRequired}
          id="CACDocument"
          name="CACDocument"
          styleData={commonStyles.inputLabel}
        />
        {CACDocument && CACDocument.id ? (
          <AjDocumentDownloader
            docId={CACDocument.id}
            docName={CACDocument.file_name || "CAC Document"}
            changeDocument={changeImageData}
            showIcon={true}
            readOnly={props.isDisable}
          />
        ) : (
          <AjDocumentUploader
            type="image"
            docType={props.docType}
            onUpload={uploadImage}
            readOnly={props.isDisable}
          />
        )}
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={!props.isDisable && errors?.CACDocument?.message}
        />
      </Grid>
    </>
  );
};

export default AjUploadCACDocument;
