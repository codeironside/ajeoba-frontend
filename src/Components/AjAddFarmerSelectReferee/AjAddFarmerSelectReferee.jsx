import React, { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { commonStyles } from "../../Style/CommonStyle";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";
import { styles } from "./AjAddFarmerSelectRefereeStyles.js";
import AjButton from "../AjButton";
import { ADD_FARMER_KYC_VERIFICATION } from "../../Routes/Routes";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { getRefereeListAction } from "../../Redux/FarmingAssociation/Refrees/refereesActions";
import { useDispatch, useSelector } from "react-redux";
import { SelectRefereeSchema } from "../../validationSchema/selectRefereeSchema";
import AjTypography from "../AjTypography";
import { useNavigate } from "react-router-dom";
import { refereeSendOtp } from "../../Redux/common/otp/otpActions";

const AjAddFarmerSelectReferee = (props) => {

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(SelectRefereeSchema),
    mode: "onChange",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [refereeOption, setRefereeOption] = useState();
  const [firstRefereeName, setFirstRefereeName] = useState();
  const [secondRefereeName, setSecondRefereeName] = useState();

  const refereeList = useSelector((state) => state.referee.refereeList);
  const farmersDetailsData = useSelector(
    (state) => state.farmers.farmersDetailsData
  );

  const productData = useSelector(
    (state) => state.farmers.productData
  );

  const [tempFirstRefereeName, setTempFirstRefereeName] = useState(
    farmersDetailsData?.refereeOne || null
  );
  const [tempSecondRefereeName, setTempSecondRefereeName] = useState(
    farmersDetailsData?.refereeTwo || null
  );

  useEffect(() => {
    dispatch(getRefereeListAction());
  }, []);

  useEffect(() => {
    if (farmersDetailsData?.refereeOne) {
      setValue("refereeOne", farmersDetailsData?.refereeOne, {
        shouldValidate: true,
      });
      setFirstRefereeName(farmersDetailsData?.refereeOne);
    }
    if (farmersDetailsData?.refereeTwo) {
      setValue("refereeTwo", farmersDetailsData?.refereeTwo, {
        shouldValidate: true,
      });
      setSecondRefereeName(farmersDetailsData?.refereeTwo);
    }
    if (
      refereeList !== null &&
      !tempFirstRefereeName &&
      !tempSecondRefereeName
    ) {
      const activeRefereesOption = refereeList?.result?.filter(
        (ref) => ref.is_active === true
      );
      setRefereeOption(activeRefereesOption);
    }
    if (tempFirstRefereeName && tempSecondRefereeName) {
      let tempArr = refereeList?.result?.filter(
        (item) =>
          item.is_active === true &&
          item.id !== tempFirstRefereeName.id &&
          item.id !== tempSecondRefereeName.id
      );
      setRefereeOption(tempArr);
    } else {
      let newArray = refereeList?.result?.filter(
        (item) =>
          item.is_active === true &&
          item.id !== farmersDetailsData?.refereeOne?.id &&
          item.id !== farmersDetailsData?.refereeTwo?.id
      );
      setRefereeOption(newArray);
    }
  }, [refereeList, farmersDetailsData]);

  const firstRefereeChangeHandler = (selectedValue) => {
    setFirstRefereeName(selectedValue.target.value);
    setRefereeOption(
      secondRefereeName
        ? refereeList?.result?.filter(
            (ref) =>
              ref.is_active === true &&
              ref.id !== selectedValue.target.value.id &&
              ref.id !== secondRefereeName.id
          )
        : refereeList?.result?.filter(
            (ref) =>
              ref.is_active === true && ref.id !== selectedValue.target.value.id
          )
    );
    setValue("refereeOne", selectedValue.target.value, {
      shouldValidate: true,
    });
    setTempFirstRefereeName(null);
  };

  const secondRefereeChangeHandler = (selectedValue) => {
    setSecondRefereeName(selectedValue.target.value);
    setRefereeOption(
      firstRefereeName
        ? refereeList?.result?.filter(
            (ref) =>
              ref.is_active === true &&
              ref.id !== selectedValue.target.value.id &&
              ref.id !== firstRefereeName.id
          )
        : refereeList?.result?.filter(
            (ref) =>
              ref.is_active === true && ref.id !== selectedValue.target.value.id
          )
    );

    setValue("refereeTwo", selectedValue.target.value, {
      shouldValidate: true,
    });
    setTempSecondRefereeName(null);
  };

  const onSubmit = (data) => {
    const referees = [];
    referees.push(
      {
        id: data.refereeOne.id,
        mobileNumber: data.refereeOne.mobile_no,
        countryId: data.refereeOne.country_id,
      },
      {
        id: data.refereeTwo.id,
        mobileNumber: data.refereeTwo.mobile_no,
        countryId: data.refereeTwo.country_id,
      }
    );
    const dataToSend = { referees: referees };

    if (farmersDetailsData !== null) {
      farmersDetailsData["refereeOne"] = data.refereeOne;
      farmersDetailsData["refereeTwo"] = data.refereeTwo;
    }

    dispatch(
      refereeSendOtp(
        dataToSend,
        navigate,
        props.setSendOtpState,
        farmersDetailsData
      )
    );

};

  const skipReferee = () => {
    navigate(ADD_FARMER_KYC_VERIFICATION);
  }

  return (
    <>
      <Grid
        component="form"
        container
        columnSpacing={2}
        sx={{ ...commonStyles.maxWidth, ...commonStyles.marginTopRoot }}
      >
        <Grid item xs={12} sm={6}>
          <AjInputLabel
            required={false}
            styleData={commonStyles.inputLabel}
            displayText="Select Referee 1"
          />
          <AjDropDown
            options={refereeOption}
            value={firstRefereeName}
            onChange={firstRefereeChangeHandler}
            source="first_name"
            placeHolder="Select Referee 1"
            styleData={styles.customDropdownStyle}
            defaultValue={farmersDetailsData?.refereeOne?.first_name}
            disableSourceForValue
            isPlaceholder={true}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.refereeOne?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <AjInputLabel
            required={false}
            styleData={commonStyles.inputLabel}
            displayText="Select Referee 2"
          />
          <AjDropDown
            options={refereeOption}
            value={secondRefereeName}
            onChange={secondRefereeChangeHandler}
            source="first_name"
            placeHolder="Select Referee 2"
            styleData={styles.customDropdownStyle}
            defaultValue={farmersDetailsData?.refereeTwo?.first_name}
            disableSourceForValue
            isPlaceholder={true}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.refereeTwo?.message}
          />
        </Grid>
      </Grid>
      <Box sx={[styles.otpContainer, styles.horizontal]}>
        <AjButton
          variant="contained"
          displayText="Next"
          styleData={styles.buttonStyle}
          onClick={handleSubmit(onSubmit)}
        />
        {!props.isSkipButtonHidden && <AjButton
          variant="contained"
          displayText="Skip Referee"
          styleData={styles.buttonStyle}
          onClick={skipReferee}
        />}
      </Box>

    </>
  );
};
export default AjAddFarmerSelectReferee;
