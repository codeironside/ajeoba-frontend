import React, { useState, useEffect } from "react";
import { commonStyles } from "../../Style/CommonStyle";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Box } from "@mui/material";
import {
  getMasterData,
  getMasterDataAction,
} from "../../Redux/common/GetMasterData/getMasterDataActions";
import AjUploadCertificate from "../AjUploadCertificate/AjUploadCertificate";
import AjButton from "../AjButton";
import { showToast } from "../../Services/toast";
import * as _ from "lodash";

const AjUploadMultipleCertificate = (props) => {
  const dispatch = useDispatch();

  const [temporaryMasterData, setTemporaryMasterData] = useState();
  const [certificates, setCertificates] = useState([]);

  const [disableButton, setDisableButton] = useState(false);

  const masterData = useSelector((state) => state.masterData.masterData);

  const getItemType = (certificateType) => {
    let type;
    switch (certificateType) {
      case "farmer_certificate":
        type = "FARMER_CERTIFICATE";
        break;
      case "qa_certificate":
        type = "QA_CERTIFICATE";
        break;
      default:
        type = "WAREHOUSE_CERTIFICATE";
    }

    return type;
  };

  useEffect(() => {
    dispatch(
      getMasterDataAction({
        itemType: getItemType(props?.type)
      })
    );
    return () => dispatch(getMasterData(null));
  }, [props.type]);

  useEffect(() => {
    if (props.submit) {
      isDataValid();
    }
  }, [props.submit]);

  useEffect(() => {
    if (temporaryMasterData?.length === 1 || masterData?.length === 1) {
      setDisableButton(true);
    }
  }, [temporaryMasterData]);

  useEffect(() => {
    if (props.reset) setDisableButton(false);
  }, [props.reset]);

  useEffect(() => {
    if (props.defaultValue) {
      setCertificates(props.defaultValue);
    } else {
      addCertificateDropDown();
    }
  }, [props.defaultValue]);

  useEffect(() => {
    if (masterData) {
      if (props.addedCert) {
        const tempAddedCertIds = props.addedCert?.map(
          (document) => document?.certification_type_id
        );
        const data = masterData?.filter(
          (temp) => !tempAddedCertIds.includes(temp.id)
        );
        setTemporaryMasterData(data);
      } else {
        setTemporaryMasterData(masterData);
      }
    }
  }, [masterData]);

  const isDataValid = () => {
    let cert = null;
    cert = certificates.slice();
    let isInvalid = null;
    if (props.isRequired) {
      _.forEach(cert, function (item) {
        if (!item.documentData || !item.documentDataType) {
          isInvalid = true;
          return;
        }
      });
      if (isInvalid) {
        return props.data(null);
      } else {
        return props.data(cert);
      }
    } else {
      props.isUpdated(true);
      return props.data(cert);
    }
  };

  const addMoreCertificateHandler = () => {
    const cert = certificates.slice();
    const lastItem = _.last(cert);
    if (!cert.length || (lastItem.documentData && lastItem.documentDataType)) {
      addCertificateDropDown();
    } else {
      showToast("Certificate is required", "error");
    }
  };

  const getData = (data, index) => {
    certificates[index] = data;
    setCertificates(certificates);
  };

  const addCertificateDropDown = () => {
    const cert = certificates.slice();
    const tempArr = cert?.map((document) => document?.documentDataType?.id);
    let defaultMasterData = masterData?.filter(
      (temp) => !tempArr.includes(temp.id)
    );
    if (props.addedCert) {
      const tempAddedCertIds = props.addedCert?.map(
        (document) => document?.certification_type_id
      );
      defaultMasterData = defaultMasterData?.filter(
        (temp) => !tempAddedCertIds.includes(temp.id)
      );
    }
    setTemporaryMasterData(defaultMasterData);
    cert.push({});
    setCertificates(cert);
    if (props.setUploadedCertificates) {
      props.setUploadedCertificates(cert);
    }
  };

  const deleteItem = (index) => {
    const cert = certificates.slice();
    cert.splice(index, 1);
    setCertificates(cert);
    if (props.setUploadedCertificates) {
      props.setUploadedCertificates(cert);
    }
    setDisableButton(false);
  };

  return (
    <>
      {!props.isFarmersDetailPage && !props.isFarmersDetaileditPage && (
        <Grid container>
          {certificates?.map((item, index) => {
            return (
              <Grid item key={index}>
                <AjUploadCertificate
                  key={index}
                  width={props?.size}
                  masterData={temporaryMasterData}
                  isDisable={props?.isDisable}
                  setIsUpload={props?.setIsUpload}
                  onChange={(data) => getData(data, index)}
                  onDelete={() => deleteItem(index)}
                  isLabel={index === 0 ? true : false}
                  index={index}
                  length={certificates?.length}
                  defaultValue={item}
                  type={props?.type}
                  isRequired={props?.isRequired}
                />
              </Grid>
            );
          })}

          <Grid item>
            {props.type !== "product_order_qa_report" && (
              <AjButton
                variant="text"
                displayText={
                  !!certificates?.slice()?.length
                    ? "Add More Certificate"
                    : "Add Certificate"
                }
                styleData={{
                  ...commonStyles.underlineStyle,
                  ...commonStyles.moreCertificateButton,
                  ...props.alignAddMoreCertificateButton,
                }}
                isDisable={props.isDisable || disableButton}
                onClick={addMoreCertificateHandler}
              />
            )}
          </Grid>
        </Grid>
      )}
      {props.isFarmersDetailPage && (
        <Grid
          container
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1.5rem 0",
            "@media(max-width: 1100px)": {
              flexDirection: "column",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "flex-start",
            },
          }}
        >
          {certificates?.map((item, index) => {
            return (
              <Box
                item
                key={index}
                sx={{
                  width: "45%",
                  "@media(max-width: 1100px)": { width: "100%" },
                }}
              >
                <AjUploadCertificate
                  key={index}
                  width={props.size}
                  masterData={temporaryMasterData}
                  isDisable={props.isDisable}
                  setIsUpload={props.setIsUpload}
                  isLabel={index === 0 ? true : false}
                  index={index}
                  length={certificates.length}
                  defaultValue={item}
                  type={props.type}
                  isRequired={props.isRequired}
                />
              </Box>
            );
          })}
        </Grid>
      )}
      {props.isFarmersDetaileditPage && (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1.5rem 0",
              "@media(max-width: 1100px)": {
                flexDirection: "column",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "flex-start",
              },
            }}
          >
            {certificates?.map((item, index) => {
              return (
                <Box
                  item
                  key={index}
                  sx={{
                    width: "45%",
                    "@media(max-width: 1100px)": { width: "100%" },
                  }}
                >
                  <AjUploadCertificate
                    key={index}
                    width={props.size}
                    masterData={temporaryMasterData}
                    isDisable={props.isDisable}
                    setIsUpload={props.setIsUpload}
                    onChange={(data) => getData(data, index)}
                    onDelete={() => deleteItem(index)}
                    isLabel={index === 0 ? true : false}
                    index={index}
                    length={certificates.length}
                    defaultValue={item}
                    type={props.type}
                    isRequired={props.isRequired}
                  />
                </Box>
              );
            })}
          </Grid>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "1rem",
            }}
          >
            {props.type !== "product_order_qa_report" && (
              <AjButton
                variant="text"
                displayText={
                  !!certificates?.slice()?.length
                    ? "Add More Certificate"
                    : "Add Certificate"
                }
                styleData={{
                  ...commonStyles.underlineStyleeditfarmerpage,
                  ...commonStyles.moreCertificateButton,
                  ...props.alignAddMoreCertificateButton,
                }}
                isDisable={props.isDisable || disableButton}
                onClick={addMoreCertificateHandler}
              />
            )}
          </Box>
        </>
      )}

      {/* {!isFarmersDetailPage && !isFarmersDetaileditPage && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          {props.type !== "product_order_qa_report" && (
            <AjButton
              variant="text"
              displayText={
                !!certificates?.slice()?.length
                  ? "Add More Certificate"
                  : "Add Certificate"
              }
              styleData={{
                ...commonStyles.underlineStyleeditfarmerpage,
                ...commonStyles.moreCertificateButton,
                ...props.alignAddMoreCertificateButton,
              }}
              isDisable={props.isDisable || disableButton}
              onClick={addMoreCertificateHandler}
            />
          )}
        </Box>
      )} */}
    </>
  );
};

export default AjUploadMultipleCertificate;