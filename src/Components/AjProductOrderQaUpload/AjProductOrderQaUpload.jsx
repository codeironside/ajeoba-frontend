import React, { useState, useEffect } from "react";
import { commonStyles, customCommonStyles } from "../../Style/CommonStyle";
import AjButton from './../AjButton';
import * as _ from "lodash";
import AjSearchInput from "../AjSearchInput";
import AjInputLabel from "../AjInputLabel";
import { reportStatusOption } from "../../Constant/AppConstant";
import { Box, Grid, InputBase, Typography, IconButton } from "@mui/material";
import AjDialog from "../AjDialog/AjDialog";
import AjConfirmModal from "../AjConfirmModal/AjConfirmModal";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { showToast } from "../../Services/toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { extraStyle, styles, _styles as viewSupportStyles } from './AjProductOrderQaUploadStyle';
import AjUploadMultipleCertificate from "../AjUploadMultipleCertificate/AjUploadMultipleCertificate";
import { submitOrderedProductQA } from "../../Redux/common/Products/productsActions";
import { PRODUCT_ORDER_QA } from "../../Routes/Routes";

const AjProductOrderQaUpload = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productOrderQAId = useParams();
  const [reportStatus, setReportStatus] = useState("");

  const {
    register,
    setValue,
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });


  useEffect(() => {
    setValue("reportStatusType", props.defaultReportStatusType || "", {
        shouldValidate: false,
    });
    
    const reportStatusObject = _.find(reportStatusOption, {
        value: props.defaultReportStatusType? props.defaultReportStatusType : reportStatusOption,
    });

    setReportStatus(reportStatusObject);
  }, [reportStatusOption]);

  const [open, setOpen] = useState(false);
  const [isUpload, setIsUpload] = useState(false);

  const reportStatusChangeHandler = (e, selectedReportStatus) => {
    setReportStatus(selectedReportStatus);
    setValue("reportStatus", selectedReportStatus.value, {
      shouldValidate: true,
    });
  };

  let reportData = null;
  const [isSubmit, setIsSubmit] = useState(false);

  const submitProductOrderQaReport = () => {
    setIsSubmit(true);
  };

  const getQaReportDetails = (data) => {
    reportData = data;
    setIsSubmit(false);
    if (reportData) {
      handleSubmit(onSubmit)();
    } else {
      showToast("QA Report is required", "error");
    }
  };

  const handleOpenModal = () => {
    if (isUpload) {
      if (reportStatus) {
        setOpen(true);
      } else {
        showToast("Your have not selected report status.", "warning");
      }
    } else {
      showToast("QA Report is required.", "warning");
    }
  }

  const backArrowHandler = () => {
    navigate(PRODUCT_ORDER_QA);
  };

  const onSubmit = (data) => {

    if(!reportData) {
      return;
    }

    let dataToSend = {
      productOrderQAId: productOrderQAId.id,
      certification_document_id: reportData[0]["documentData"]?.id.toString(),
      status: reportStatus.value,
      description: data?.description === ""? "description" : data?.description,
    };

    dispatch(submitOrderedProductQA(dataToSend, navigate));
  }

  return (
    <Grid 
    container 
      sx={
        [
          commonStyles.signupFormMainGridContainer
        ]
      }
      >
        <Box 
        sx={[styles.productOrderContainer, 
          styles.qaContainer]}
        >
          <IconButton
            disableRipple
            sx={commonStyles.backButtonWhiteFont}
            onClick={backArrowHandler}
          >
            {" "}
            <ArrowBackRoundedIcon sx={commonStyles.backButtonWhiteFont} />
          </IconButton>
          
        </Box>
      
        <Grid
            container
            item
            sx={[
              customCommonStyles.productOrderQaContainer,
              commonStyles.qaMarginTop
            ]}
            >  
              <Box
                sx={{
                  ...commonStyles.halfWidth,
                  ...commonStyles.autoMarginQa,
                }}
              >
                <Typography 
                  sx={customCommonStyles.headerBoxQa} 
                  >
                    Product Order QA Report
                </Typography>
                
                <Box>
                    <Grid
                      sx={{
                        ...commonStyles.flexFullWidthQa,
                      }}
                    >
                      <Box
                        sx={{
                          ...commonStyles.flexDirection, 
                          ...commonStyles.flexGap
                        }}
                      >
                        <AjInputLabel
                          required={true}
                          styleData={commonStyles.inputLabel}
                          displayText="Report Status"
                        />
                        <AjSearchInput
                            source="label"
                            options={reportStatusOption}
                            value={reportStatus}
                            id="reportStatus"
                            type="product_order_qa_report"
                            displayText="Select report status"
                            readOnly={props.isDisable}
                            styleData={{
                              ...extraStyle.searchInputQa,
                              ...commonStyles.autoMarginQaDropdown,
                              ...(props.isDisable && commonStyles.disableInput),
                              ...(props.isDisable && commonStyles.disableSearchInputIconColor),
                            }}
                            onChange={reportStatusChangeHandler}
                            name="reportStatus"
                        />
                      </Box>
                      <Box
                        sx={{
                          ...commonStyles.flexDirection
                        }}
                      >
                        <AjInputLabel
                          required={true}
                          styleData={commonStyles.inputLabel}
                          displayText="Upload Report"
                        />
                        <Box
                          sx={{
                              ...extraStyle.marginTopQaUpload,
                              ...commonStyles.flexDirection,
                          }}
                        >
                          <AjUploadMultipleCertificate
                            size={{...commonStyles.resize70percent}}
                            submit={isSubmit}
                            setIsUpload={setIsUpload}
                            data={getQaReportDetails}
                            defaultValue={''}
                            isRequired={true}
                            type="product_order_qa_report"
                          />
                        </Box>
                      </Box>
                    </Grid>
                    <AjInputLabel
                      required={false}
                      styleData={commonStyles.inputLabel}
                      displayText="Description"
                    />
                    <InputBase
                      id="description"
                      multiline
                      rows={4}
                      name="description"
                      sx={{ ...viewSupportStyles.textAreaStyle }}
                      placeholder="Enter Description"
                      {...register("description")}
                    />
                </Box>
                 
                  <Box sx={{
                    ...commonStyles.autoMarginQaT
                  }}>
                  <AjButton 
                      styleData={{
                        ...commonStyles.autoMarginQaBtn,
                      }}
                      displayText="Submit QA Report"
                      variant="contained"
                      onClick={handleOpenModal}
                  /> 
                  </Box>
              </Box> 
              <AjDialog
                  open={open}
                  closeModal={setOpen}
                  styleData={{
                    ...commonStyles.dialogContainer
                  }}
                >
                  <AjConfirmModal
                    displayText="Please, confirm the document very well. This is because any document uploaded cannot be changed once submitted."
                    closeModal={setOpen}
                    onConfirm={submitProductOrderQaReport}
                  />
              </AjDialog>
        </Grid>
    </Grid>
  );
};

export default AjProductOrderQaUpload;
