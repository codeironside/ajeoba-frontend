import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Grid, InputBase, IconButton } from "@mui/material";
import AjInputLabel from "../../../Components/AjInputLabel";
import AjTypography from "../../../Components/AjTypography";
import AjMultipleFileUpload from "../../../Components/AjMultipleFileUpload";
import AjButton from "../../../Components/AjButton";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { getSupportDetails } from "../../../Redux/HelpAndSupport/HelpAndSupportActions";
import { CreateSupportSchema } from "../../../validationSchema/SupportSchema";
import { commonStyles } from "../../../Style/CommonStyle";
import { styles } from "../ChangePassword/changePasswordStyles";
import { styles as viewSupportStyles } from "./ViewSupportStyles";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.css";

function ViewSupport() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateSupportSchema),
    mode: "onChange",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [certificates, setCertificates] = useState([]);
  const maxFilesAllowed = 5;

  const onSubmit = (data) => {
    let formData = {
      subject: data.supportPlaneName,
      description: data.supportDesc,
    };

    if (certificates.length > 0) {
      const certificateIds = [];
      certificates.forEach((item) => certificateIds.push(item.id));
      formData["attachment"] = certificateIds;
    }

    dispatch(getSupportDetails(formData, navigate));
  };

  const backArrowHandler = () => {
    navigate("/dashboard");
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={{
            ...commonStyles.backButtonPosition,
            ...viewSupportStyles.marginLeftZero,
          }}
          onClick={backArrowHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={{ ...viewSupportStyles.BackArrowSize }} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...viewSupportStyles.gridRadius,
          ...viewSupportStyles.ViewSupportMainContainer,
        }}
      >
        <Box
          sx={{
            ...commonStyles.mainHeadingContainer,
            ...commonStyles.fullWidth,
            ...viewSupportStyles.responsiveWidth,
          }}
        >
          <AjTypography
            styleData={{
              ...commonStyles.mainHeading,
              ...viewSupportStyles.MainHeadingTopMargin,
            }}
            displayText="Help & support"
          />
          <Box
            component="form"
            xs={12}
            sm={6}
            sx={[commonStyles.formDetailsContainer, commonStyles.marginTopRoot]}
          >
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Subject "
            />

            <InputBase
              required
              id="supportPlaneName"
              name="supportPlaneName"
              sx={commonStyles.inputStyle}
              placeholder="Enter Subject"
              {...register("supportPlaneName")}
              error={errors.supportPlaneName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.supportPlaneName?.message}
            />
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Description"
            />
            <InputBase
              required
              id="supportDesc"
              multiline
              rows={4}
              name="supportDesc"
              sx={{ ...viewSupportStyles.textAreaStyle }}
              placeholder="Enter Description"
              {...register("supportDesc")}
              error={errors.supportDesc ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.supportDesc?.message}
            />
            <AjInputLabel
              styleData={commonStyles.inputLabel}
              displayText="Add attachment"
            />
            <Box
              sx={{
                ...viewSupportStyles.boxFullWidth,
              }}
            >
              <Box
                sx={{
                  ...viewSupportStyles.halfWidth,
                  ...viewSupportStyles.uploadbtnstyle,
                }}
              >
                <AjMultipleFileUpload
                  maxNoOfFilesAllowed={maxFilesAllowed}
                  getCertificates={setCertificates}
                  sx={{ ...viewSupportStyles.fullWidth }}
                  docType="AJEOBA_DOCS"
                />
              </Box>
            </Box>
            <AjButton
              type="submit"
              variant="contained"
              displayText="Submit"
              onClick={handleSubmit(onSubmit)}
              styleData={{
                ...styles.buttonStyle,
                ...viewSupportStyles.SubmitBtnMarginTop,
              }}
            />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
export default ViewSupport;
