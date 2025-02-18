import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import * as moment from "moment";
import { yupResolver } from "@hookform/resolvers/yup";
import { InputBase, IconButton, Box, Grid, Typography } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import toolTipIcon from "../../../../Assets/Images/toolTipIcon.svg";
import AjSearchDropDown from "../../../../Components/AjSearchDropDown";
import AjSearchInput from "../../../../Components/AjSearchInput";
import AjRadioOptions from "../../../../Components/AjRadioOptions";
import AjDatePicker from "../../../../Components/AjDatePicker";
import AjButton from "../../../../Components/AjButton";
import AjTypography from "../../../../Components/AjTypography";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjStepper from "../../../../Components/AjStepper/AjStepper";
import { addRefereeAction } from "../../../../Redux/FarmingAssociation/Refrees/refereesActions";
import {
  genderOptions,
  signUpStepOptions,
} from "../../../../Constant/AppConstant";
import {
  setCountryCode,
  setCountryId,
  getCountries,
} from "../../../../Redux/common/Countries/getCountriesActions";
import { AddRefereeSchema } from "../../../../validationSchema/addRefree";
import { styles } from "./AddRefereesStyles";
import { commonStyles } from "../../../../Style/CommonStyle";
import { REFEREES } from "../../../../Routes/Routes";
import { getProfileVerificationDataAction } from "../../../../Redux/common/ProfileVerification/profileVerificationActions";
import { replaceWithUnderScore } from "../../../../Services/commonService/commonService";
import AjDialog from "../../../../Components/AjDialog/AjDialog";
import VninModalContent from "../../../../Components/VninHow/VninModal";
import { HtmlTooltip } from "../../../../Components/AjSignupAggregatorDetails/AjSignupAggregatorDetailsStyles";
import AjState from "../../../../Components/AjState/AjState";
import AjLocalGovernment from "../../../../Components/AjLGAs/AjLocalGovernment";

const AddReferees = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openvninModal, setOpenvninModal] = useState(false);

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddRefereeSchema),
    mode: "onChange",
  });

  const handleModal = () => setOpenvninModal((prev) => !prev);

  const [gender, setGender] = useState(genderOptions[0].value);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [countryValue, setCountryValue] = useState(null);
  const [myUinPinType, setMyUinPinType] = useState(null);
  const [stateReset, setStateReset] = useState(false);
  const [nigState, setNigState] = useState(null);
  const [cancel, setCancel] = useState(false);
  const [displayNigState, setDisplayNigState] = useState(false);
  const [lgas, setLgas] = useState(null);
  const [displayLga, setdisplayLga] = useState(false);
  

  const countryId = useSelector((state) => state.countries.countryId || "");
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const addRefereeData = useSelector(
    (state) => state.referee.addRefereeData || null
  );

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const orgUINOptions = profileVerificationData?.orgUINOptions;

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (countryId) {
      dispatch(
        getProfileVerificationDataAction({
          countryId: countryId,
          isCountryIdRequired: true,
        })
      );
    }
  }, [countryId]);

  useEffect(() => {
    if (profileVerificationData) {
      setMyUinPinType(orgUINOptions[0]);
    }
  }, [profileVerificationData]);

  useEffect(() => {
    if (dateOfBirth !== null) {
      setValue("refereeDateOfBirth", dateOfBirth, { shouldValidate: true });
    }
    setValue("refereeGender", gender, { shouldValidate: true });
  }, [gender, dateOfBirth]);

  useEffect(() => {
    if (addRefereeData) {
      setValue("refereeFirstName", addRefereeData.firstName);
      setValue("refereeLastName", addRefereeData.lastName);
      setValue("mobileNumber", addRefereeData.mobileNumber);
      setValue("UINNumber", addRefereeData.uniqueIdentificationNumber);
      setDateOfBirth(moment(addRefereeData.dateOfBirth));
      setGender(addRefereeData.gender);
    }
  }, [addRefereeData]);

  useEffect(() => {
    if (countryMenuOptions && countryMenuOptions.length) {
      let countryIndex = -1;
      if (!countryId) {
        countryIndex = _.findIndex(countryMenuOptions, { countryCode: "+234" });
      } else {
        countryIndex = _.findIndex(countryMenuOptions, {
          countryId: countryId,
        });
      }
      dispatch(setCountryCode(countryMenuOptions[countryIndex].countryCode));
      dispatch(setCountryId(countryMenuOptions[countryIndex].countryId));
      setCountryValue(countryMenuOptions[countryIndex]);
    }
  }, [countryMenuOptions]);

  const countryCodeChangeHandler = (_event, selectedCountry) => {
    dispatch(setCountryCode(selectedCountry.countryCode));
    dispatch(setCountryId(selectedCountry.countryId));
    const countryIndex = _.findIndex(countryMenuOptions, {
      countryId: selectedCountry.countryId,
    });
    setCountryValue(countryMenuOptions[countryIndex]);
  };

  const countryStateIdHandler = (selectedState) => {
    setNigState(selectedState.stateName);
    setStateReset(false);
    setdisplayLga(true)
  };

  const localGovtHandler = (selectedLga)=>{
    setLgas(selectedLga)
    setStateReset(false);
  }

  const UINPinTypeChangeHandler = (e, selectedUINPinType) => {
    if (selectedUINPinType.label === 'VOTERS IDENTIFICATION NUMBER') {
      setDisplayNigState(true)
    } else {
      setDisplayNigState(false)
      setdisplayLga(false)
      setNigState(null);
    }
    setMyUinPinType(selectedUINPinType);
  };

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
  const onSubmit = (data) => {
    if ((displayNigState && nigState) || !displayNigState) {
    const dataToSend = {
      firstName: data.refereeFirstName,
      lastName: data.refereeLastName,
      gender: data.refereeGender,
      dateOfBirth: moment(data.refereeDateOfBirth).toISOString(true),
      countryId,
      mobileNumber: data.mobileNumber.toString(),
      uinTypeValue: replaceWithUnderScore(myUinPinType.label),
      uniqueIdentificationNumber: data.UINNumber.trim(), 
    };
    if (nigState && lgas) {
      dataToSend.uniqueIdentificationState = nigState;
      dataToSend.lga = lgas.value;
    }
    dispatch(addRefereeAction(dataToSend, navigate));
    }
  };

  const backArrowHandler = () => {
    navigate(REFEREES);
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
        >
          {" "}
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText="Add Referee"
            styleData={commonStyles.signupHeadingStyle}
          />
          <Box sx={{ width: "100%" }}>
            <AjStepper
              stepOptions={[signUpStepOptions[0], signUpStepOptions[2]]}
              activeStep={0}
            />
          </Box>
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.mobileScreenFormContainer,
            }}
          >
            <AjInputLabel
              required={true}
              styleData={commonStyles.inputLabel}
              displayText="Phone Number"
            />
            <Box sx={commonStyles.fullWidth}>
              <Box sx={commonStyles.flexFullWidth}>
                <AjSearchDropDown
                  id="combo-box-demo"
                  options={countryMenuOptions || []}
                  value={countryValue}
                  onChange={countryCodeChangeHandler}
                />
                <InputBase
                  fullWidth={true}
                  required
                  id="mobileNumber"
                  name="mobileNumber"
                  placeholder="Enter your phone number"
                  sx={[commonStyles.inputStyle, styles.phoneNumberInput]}
                  {...register("mobileNumber")}
                  error={errors.mobileNumber ? true : false}
                />
              </Box>
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.mobileNumber?.message}
              />
            </Box>
            <Box sx={commonStyles.signupFormFieldContainer}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="First name"
              />
              <InputBase
                required
                id="refereeFirstName"
                name="refereeFirstName"
                placeholder="Enter your first name"
                sx={commonStyles.inputStyle}
                {...register("refereeFirstName")}
                error={errors.refereeFirstName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.refereeFirstName?.message}
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
                id="refereeLastName"
                name="refereeLastName"
                placeholder="Enter your last name"
                sx={commonStyles.inputStyle}
                {...register("refereeLastName")}
                error={errors.refereeLastName ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.refereeLastName?.message}
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
                displayText={errors.refereeGender?.message}
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
                agePicker
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.refereeDateOfBirth?.message}
              />
            </Box>
            <Box sx={commonStyles.fullWidth}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Unique identification type"
              />
              <AjSearchInput
                clearIcon={<></>}
                id="UINPinType"
                name="UINPinType"
                value={myUinPinType}
                displayText="Type to search"
                styleData={styles.searchInput}
                onChange={UINPinTypeChangeHandler}
                source="label"
                options={profileVerificationData?.orgUINOptions}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.UINPinType?.message}
              />
            </Box>
            <Box sx={{ ...commonStyles.fullWidth, flexDirection: "column" }}>
              <Box
                sx={{
                  width: "100%",
                  flexWrap: "wrap",
                  flexDirection: "row",
                  justifyContent: "space-between",

                  display: "flex",
                }}
              >
                <AjInputLabel
                  displayText="Unique identification number"
                  required
                  styleData={{ ...commonStyles.inputLabel, width: "50%" }}
                />
                <Box
                  sx={{
                    display: "flex",
                    cursor: "pointer",
                    alignItems: "center",
                  }}
                  onClick={handleModal}
                >
                  <HtmlTooltip
                    title={
                      <React.Fragment>
                        <Typography color="inherit" sx={styles.toolTipText}>
                          vNIN, Voter's Identification Number
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <Typography
                      component="img"
                      src={toolTipIcon}
                      sx={{ mr: "4px" }}
                    />
                  </HtmlTooltip>

                  <AjTypography
                    sx={{
                      fontWeight: "600",
                      textAlign: "center",
                      fontSize: "0.875rem",
                      lineHeight: "1.313rem",
                      textDecoration: "underline",
                    }}
                    displayText="How to get vNIN"
                  />
                </Box>
              </Box>

              <AjDialog
                open={openvninModal}
                closeModal={setOpenvninModal}
                title="VNIN"
                styleData={commonStyles.buyDialogModalContainer}
              >
                <VninModalContent />
              </AjDialog>

              <InputBase
                required
                fullWidth
                id="UINNumber"
                name="UINNumber"
                placeholder="Enter UIN number"
                sx={commonStyles.inputStyle}
                {...register("UINNumber")}
                error={errors.UINNumber ? true : false}
                inputProps={{ maxLength: 21 }}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.UINNumber?.message}
              />
            </Box>
            {displayNigState && (
              <Box
                sx={{
                  ...commonStyles.fullWidth,
                  // ...props.customStyle,
                }}
              >
                <AjState
                  displayText="Voters Identity State"
                  defaultValue={null}
                  onStateSelect={countryStateIdHandler}
                  codeOfCountry="NG"
                  reset={stateReset}
                  readOnly={false}
                  cancel={cancel}
                 
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={(displayNigState && nigState === null) && 'Voters identity state is required' }
                />
              </Box>
            )}
            {displayLga && 
              <Box
                sx={{
                  ...commonStyles.fullWidth,
                  // ...props.customStyle,
                }}
              >
                <AjLocalGovernment
                  displayText="Voters Local govt"
                  defaultValue={null}
                  onLgaSelect={localGovtHandler}
                  stateName={nigState}
                  reset={stateReset}
                  readOnly={false}
                  cancel={cancel}
                 
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={(displayNigState && lgas === null) && 'Voters local goverment is required' }
                />
              </Box>
            }
          </Box>
          <AjButton
            variant="contained"
            styleData={styles.nextBtnStyle}
            displayText=" Proceed to KYC"
            onClick={handleSubmit(onSubmit)}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export default AddReferees;
