import { InputBase, IconButton } from "@mui/material";
import AjRadioOptions from "../../../Components/AjRadioOptions";
import AjDatePicker from "../../../Components/AjDatePicker";
import AjButton from "../../../Components/AjButton";
import AjTypography from "../../../Components/AjTypography";
import * as React from "react";
import { styles } from "./SignUpPersonalDetailsStyle";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import AjInputLabel from "../../../Components/AjInputLabel";
import { useState, useEffect } from "react";
import AjStepper from "../../../Components/AjStepper/AjStepper";
import * as moment from "moment";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postPersonalDetails } from "../../../Redux/SignUpPersonalDetails/signUpPersonalDetailsActions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { commonStyles } from "../../../Style/CommonStyle";
import { PersonalDetailsSchema } from "../../../validationSchema/personalDetails";
import AjDocumentUploader from "../../../Components/AjDocumentUploader";
import { getText } from "../../../Services/utils";
import AjDocumentDownloader from "../../../Components/AjDocumentDownloader";
import {
  genderOptions,
  signUpStepOptions,
} from "../../../Constant/AppConstant";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { USERROLESELECTIONFIRST } from "../../../Routes/Routes";
import { getUserData } from "../../../Services/localStorageService";
import {
  getCustomSignUpOption,
  logoRedirection,
} from "../../../Services/commonService/commonService";

const SignUpPersonalDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(PersonalDetailsSchema),
    mode: "onChange",
  });

  const [gender, setGender] = useState(genderOptions[0].value);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [passportImageData, setPassportImageData] = useState(null);
  const [userRoleId, setUserRoleId] = useState(null);

  useEffect(() => {
    const userData = getUserData();
    setUserRoleId(userData?.role_id);
    if (userData.is_personal_detail_filled) {
      setValue("firstName", userData.first_name, { shouldValidate: true });
      setValue("lastName", userData.last_name, { shouldValidate: true });
      setGender(userData.gender);
      setDateOfBirth(moment(userData.date_of_birth));
      setPassportImageData({
        file_name: userData.file_name,
        id: userData.passport_photo_id,
      });
    }
  }, []);

  useEffect(() => {
    if (dateOfBirth !== null) {
      setValue("dateOfBirth", dateOfBirth, { shouldValidate: true });
    }
    if (passportImageData != null) {
      setValue("passportPhotoId", passportImageData?.id, {
        shouldValidate: true,
      });
    }
    setValue("gender", gender, { shouldValidate: true });
  }, [gender, dateOfBirth, passportImageData]);

  const genderSelectHandler = (option) => {
    setGender(option);
  };

  const dateSelectionHandler = (date) => {
    if (date === null) {
      setDateOfBirth("");
    } else {
      setDateOfBirth(date);
    }
  };

  const passportUpload = (data) => {
    setPassportImageData(data);
  };

  const changePassportImage = (e) => {
    e.preventDefault();
    setPassportImageData("");
  };

  const onSubmit = (data) => {
    data.dateOfBirth = moment(data.dateOfBirth).toISOString(true);
    data.passportPhotoId = parseInt(data.passportPhotoId);
    dispatch(postPersonalDetails(data, navigate));
  };

  const arrowHandler = () => {
    navigate(USERROLESELECTIONFIRST);
  };

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainGridContainer,
        ...commonStyles.mainContainerHeight,
      }}
    >
      <CssBaseline />
      <Grid
        item
        sx={{
          ...commonStyles.logoImageContainer,
          ...styles.logoPersonalDetails,
        }}
        onClick={() => logoRedirection()}
      ></Grid>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.subRegistrationContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <IconButton sx={commonStyles.backArrow} onClick={arrowHandler}>
          <ArrowBackRoundedIcon />
        </IconButton>
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText={`Registration process for ${getText(userRoleId)} `}
            styleData={commonStyles.signupHeadingStyle}
          />
          <AjStepper
            stepOptions={[
              signUpStepOptions[0],
              getCustomSignUpOption(userRoleId),
              signUpStepOptions[2],
            ]}
            activeStep={0}
          />
          <Box component="form" sx={commonStyles.signupFormContainer}>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="First name"
              />
              <InputBase
                required
                id="firstName"
                name="firstName"
                placeholder="Enter your first name"
                sx={commonStyles.inputStyle}
                {...register("firstName")}
                error={errors.firstName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.firstName?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Last name"
              />
              <InputBase
                required
                id="lastName"
                name="lastName"
                placeholder="Enter your last name"
                sx={commonStyles.inputStyle}
                {...register("lastName")}
                error={errors.lastName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.lastName?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Gender"
              />
              <AjRadioOptions
                items={genderOptions}
                defaultValue={gender}
                onSelect={genderSelectHandler}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.gender?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Date of birth"
              />
              <AjDatePicker
                value={dateOfBirth ? dateOfBirth : null}
                dateSelectHandler={dateSelectionHandler}
                customIconSize={styles.calIconSize}
                agePicker
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.dateOfBirth?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Passport photo: (JPEG, PNG or PDF only)"
              />
              {passportImageData && passportImageData.id ? (
                <AjDocumentDownloader
                  docId={passportImageData.id}
                  docName={passportImageData.file_name}
                  showIcon={true}
                  changeDocument={changePassportImage}
                />
              ) : (
                <AjDocumentUploader
                  type="image"
                  docType="PASSPORT_PHOTO"
                  onUpload={passportUpload}
                />
              )}
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.passportPhotoId?.message}
              />
            </Box>
          </Box>
          <AjButton
            variant="contained"
            styleData={styles.nextBtnStyle}
            displayText=" Next"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUpPersonalDetails;
