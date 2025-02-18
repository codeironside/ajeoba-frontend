import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment";
import * as _ from "lodash";

import { Box, Divider, Grid, InputBase, Typography } from "@mui/material";

import AjButton from "../../../../Components/AjButton";
import AjDocumentDownloader from "../../../../Components/AjDocumentDownloader";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjTypography from "../../../../Components/AjTypography";

import {
  getProfileDetails,
  userBankDetails,
} from "../../../../Redux/Profile/profileActions";
import { getCountries } from "../../../../Redux/common/Countries/getCountriesActions";
import { personalProfileDetailsSchema } from "../../../../validationSchema/personalProfileDetailsSchema";
import { getUserData } from "../../../../Services/localStorageService";
import { getPhoneCodeSymbol } from "../../../../Services/commonService/commonService";
import { commonStyles } from "../../../../Style/CommonStyle";
import { viewProfileStyles } from "../ViewProfileStyle";
import { styles } from "./PersonalDetailsStyles";
import { ROLES } from "../../../../Constant/RoleConstant";
import { useValidateBankDetails } from "../../../../Hooks/validateBankDetails";
import AjSearchInput from "../../../../Components/AjSearchInput";

const PersonalDetails = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(personalProfileDetailsSchema),
    mode: "onChange",
  });

  const [validateBankReqm, bankPayload, getBanklist, getBank] =
    useValidateBankDetails();

  const [myBank, setMyBank] = useState(null);
  const [accountNumber, setAccountNumber] = useState(null);

  const bankChangeHandler = (_event, selectedBank) => {
    setMyBank(selectedBank);
  };

  const handleAccountNumberChange = (event) => {
    setAccountNumber(event.target?.value);
  };

  useEffect(() => {
    if (myBank?.bankCode && accountNumber && accountNumber?.length === 10) {
      dispatch(validateBankReqm({ bankCode: myBank?.bankCode, accountNumber }));
    }
  }, [accountNumber, myBank?.bankCode]);

  useEffect(() => {
    if (bankPayload?.status === "success") {
      setValue("accountHolderName", bankPayload?.data?.account_name, {
        shouldValidate: true,
      });

      setValue("bankName", myBank?.label, { shouldValidate: true });

      setValue("accountNumber", bankPayload?.data?.account_number, {
        shouldValidate: true,
      });
    }
  }, [bankPayload]);

  const [personalDetails, setPersonalDetails] = useState(null);
  const [bankDetails, setBankDetails] = useState(null);
  const [fillBankingDetails, setFillBankingDetails] = useState(false);
  const [detailsFilled, setDetailsFilled] = useState(false);
  const [userRoleId, setUserRoleId] = useState(null);
  const [countryOfBirth, setCountryOfBirth] = useState("");
  const [citizenShip, setCitizenShip] = useState("");

  const userProfileDetails = useSelector(
    (state) => state.profile.userProfileDetails
  );
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  useEffect(() => {
    dispatch(getProfileDetails());
    dispatch(getCountries());
  }, []);

  useEffect(() => {
    if (userProfileDetails) {
      setPersonalDetails(userProfileDetails?.personalDetails);
      setBankDetails(userProfileDetails?.bankDetails);
      getCountryName();
    }
  }, [userProfileDetails]);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, [detailsFilled]);

  const handleCancel = (e, value) => {
    setFillBankingDetails(false);
  };

  useEffect(() => {
    const userData = getUserData();
    setUserRoleId(userData.role_id);
  }, []);

  const handleBankingDetails = (e, value) => {
    setFillBankingDetails(true);
  };

  const formatDate = (date) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const onSubmit = (data) => {
    const bankingDetails = {
      accountHolderName: data.accountHolderName,
      bankName: data.bankName,
      accountNumber: data.accountNumber,
    };
    dispatch(
      userBankDetails(bankingDetails, setFillBankingDetails, setDetailsFilled)
    );
  };

  const getCountryName = () => {
    let userAccountDetails = userProfileDetails?.accountDetails;
    if (userAccountDetails?.country_of_birth) {
      const countryName = _.find(countryMenuOptions, {
        countryId: userAccountDetails?.country_of_birth,
      }).countryName;
      setCountryOfBirth(countryName);
    }
    if (userProfileDetails?.accountDetails?.citizenship) {
      const countryName = _.find(countryMenuOptions, {
        countryId: userAccountDetails?.citizenship,
      }).countryName;
      setCitizenShip(countryName);
    }
  };

  return (
    <Grid container sx={[commonStyles.signupFormMainGridContainer]}>
      <Grid
        container
        item
        sx={[
          commonStyles.signupFormMainContentContainer,
          styles.centerContentContainer,
          commonStyles.customSrollBar,
        ]}
      >
        <Box sx={{ ...viewProfileStyles.associationDetailsContainer }}>
            <Box sx={viewProfileStyles.productsCorporateContainer}>
              <Box sx={viewProfileStyles.pcc_top}>
                <AjTypography 
                  displayText={"My Profile"}
                  sx={[commonStyles.inputStyleProfile, styles.disableInput]}
                />
              </Box>
              <Box sx={viewProfileStyles.productsCorporateDetailContainer}>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <AjTypography
                      required
                      readOnly={0}
                      fullWidth
                      displayText={personalDetails && `${personalDetails?.first_name} ${personalDetails?.last_name}`}
                      placeholder="Full name"
                      sx={[commonStyles.inputStyle, styles.disableInput]}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                  <AjTypography
                      required
                      readOnly={0}
                      fullWidth
                      displayText={personalDetails && `${0}${personalDetails?.mobile_no}`}
                      placeholder="Phone number"
                      sx={[commonStyles.inputStyle, styles.disableInput]}
                    />
                  </Box>
                </Box>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <AjTypography
                      required
                      readOnly={0}
                      fullWidth
                      displayText={personalDetails && `${personalDetails?.email}`}
                      placeholder="Email"
                      sx={[commonStyles.inputStyle, styles.disableInput]}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                        <AjInputLabel
                          styleData={[
                            commonStyles.inputLabel,
                            viewProfileStyles.itemLabel,
                          ]}
                          displayText="CAC document"
                        />

                        <AjDocumentDownloader
                          docName={personalDetails?.file_name}
                          changeBtnStyle={viewProfileStyles.changeBtnStyle}
                          downloadWrapper={viewProfileStyles.downloadWrapper}
                          docId={personalDetails?.cac_document}
                          docTextStyle={viewProfileStyles.docTextStyle}
                          showIcon={false}
                        />
                      </Grid>
                  </Box>
                </Box>
              </Box>
            </Box>
        </Box>
        {userRoleId !== ROLES.CORPORATE_BUYER  && personalDetails && (
          <>
            <Box sx={styles.personalDetailsContainer}>
              <AjTypography
                styleData={{
                  ...viewProfileStyles.userName,
                  ...viewProfileStyles.textEllipsis,
                }}
                align="center"
                displayText={`${personalDetails.first_name} ${personalDetails.last_name}`}
              />
              <AjTypography
                styleData={viewProfileStyles.roleHeading}
                align="center"
                displayText={personalDetails.role_name}
              />
            </Box>
            <Grid
              sx={[
                viewProfileStyles.associationDetails,
                viewProfileStyles.personalDetailsContainerWidth,
                userRoleId !== 2 && viewProfileStyles.associationDetailsCustom,
              ]}
            >
              <Grid item xs={12}>
                <AjInputLabel
                  displayText="Gender"
                  styleData={{
                    ...commonStyles.inputLabel,
                    ...viewProfileStyles.itemLabel,
                  }}
                />
                <AjTypography
                  align="center"
                  displayText={personalDetails.gender}
                  styleData={viewProfileStyles.subHeadingColor}
                />
              </Grid>
              <Grid item xs={12}>
                <AjInputLabel
                  displayText="DOB"
                  styleData={{
                    ...commonStyles.inputLabel,
                    ...viewProfileStyles.itemLabel,
                  }}
                />
                <AjTypography
                  align="center"
                  styleData={viewProfileStyles.subHeadingColor}
                  displayText={formatDate(personalDetails.date_of_birth)}
                />
              </Grid>
              <Grid item xs={12}>
                <AjInputLabel
                  displayText="Email"
                  styleData={{
                    ...commonStyles.inputLabel,
                    ...viewProfileStyles.itemLabel,
                  }}
                />
                <AjTypography
                  align="center"
                  displayText={personalDetails.email}
                  styleData={{
                    ...viewProfileStyles.subHeadingColor,
                    ...viewProfileStyles.setWidth,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <AjInputLabel
                  displayText="Phone Number"
                  styleData={{
                    ...commonStyles.inputLabel,
                    ...viewProfileStyles.itemLabel,
                  }}
                />
                <AjTypography
                  align="center"
                  displayText={`${getPhoneCodeSymbol(
                    personalDetails.phone_code
                  )} ${personalDetails.mobile_no}`}
                  styleData={viewProfileStyles.subHeadingColor}
                />
              </Grid>
              {userRoleId === ROLES.PRODUCT_AGGREGATOR && (
                <>
                  <Grid item xs={12}>
                    <AjInputLabel
                      displayText="Country of Birth"
                      styleData={[
                        commonStyles.inputLabel,
                        viewProfileStyles.itemLabel,
                      ]}
                    />
                    <AjTypography
                      align="center"
                      displayText={countryOfBirth}
                      styleData={viewProfileStyles.subHeadingColor}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <AjInputLabel
                      displayText="Citizenship"
                      styleData={[
                        commonStyles.inputLabel,
                        viewProfileStyles.itemLabel,
                      ]}
                    />
                    <AjTypography
                      align="center"
                      displayText={citizenShip}
                      styleData={viewProfileStyles.subHeadingColor}
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12}>
                <AjInputLabel
                  displayText="Passport Photo: (JPEG, PNG or PDF only)"
                  styleData={{
                    ...commonStyles.inputLabel,
                    ...viewProfileStyles.itemLabel,
                  }}
                />
                {personalDetails.file_name ? (
                  <AjDocumentDownloader
                    docId={personalDetails.passport_photo_id}
                    docName={personalDetails.file_name}
                    showIcon={false}
                    downloadWrapper={viewProfileStyles.downloadWrapper}
                    changeBtnStyle={viewProfileStyles.changeBtnStyle}
                    docTextStyle={viewProfileStyles.docTextStyle}
                  />
                ) : (
                  <AjTypography
                    align="center"
                    displayText="N/A"
                    styleData={viewProfileStyles.subHeadingColor}
                  />
                )}
              </Grid>
            </Grid>
          </>
        )}
        <Divider sx={commonStyles.dividerStyle} />
        {bankDetails && (
          <Box sx={styles.bankingDetails}>
            <AjTypography
              displayText="Banking Details"
              styleData={viewProfileStyles.addressMainHeading}
            />
            <Box sx={viewProfileStyles.addressHeading}>
              <Box sx={viewProfileStyles.addressLineHeading}>
                Account holder name -{" "}
              </Box>
              <Box
                sx={[
                  viewProfileStyles.subHeadingColor,
                  viewProfileStyles.addressContent,
                ]}
              >
                {bankDetails.account_name}
              </Box>
            </Box>
            <Grid sx={styles.bankingContent}>
              <Box
                sx={[viewProfileStyles.addressHeading, styles.widthContainer]}
              >
                <Box sx={viewProfileStyles.addressLineHeading}>
                  Bank Name -{" "}
                </Box>
                <Box
                  sx={[
                    viewProfileStyles.subHeadingColor,
                    styles.bankDetails,
                    viewProfileStyles.addressContent,
                  ]}
                >
                  {bankDetails.bank_name}
                </Box>
              </Box>
              <Box
                sx={[viewProfileStyles.addressHeading, styles.widthContainer]}
              >
                <Box sx={viewProfileStyles.addressLineHeading}>
                  Account Number -{" "}
                </Box>
                <Box
                  sx={[
                    viewProfileStyles.subHeadingColor,
                    viewProfileStyles.addressContent,
                  ]}
                >
                  {bankDetails.account_number}
                </Box>
              </Box>
            </Grid>
          </Box>
        )}

        {!bankDetails &&
          !fillBankingDetails &&
          userRoleId !== ROLES.QA_COMPANY &&
          userRoleId !== ROLES.CORPORATE_BUYER &&
          userRoleId !== ROLES.LOGISTICS_COMPANY &&
          userRoleId !== ROLES.FINANCE_COMPANY && (
            <Box sx={styles.bankingDetailsContainer}>
              <AjTypography
                displayText="Fill your banking details"
                styleData={viewProfileStyles.addressMainHeading}
              />
              <AjTypography
                displayText="You won't be able to change anything once you've filled out the information"
                styleData={viewProfileStyles.addressHeading}
              />
              <AjButton
                onClick={handleBankingDetails}
                variant="contained"
                displayText="Add Banking Details"
                styleData={commonStyles.marginBottomRoot}
              />
            </Box>
          )}
        {fillBankingDetails && (
          <Box sx={viewProfileStyles.productsContainer}>
            <Grid sx={styles.bankingDetails}>
              <Box sx={styles.bankingDetailsContainer}>
                <AjTypography
                  displayText="Fill your banking details"
                  styleData={viewProfileStyles.addressMainHeading}
                />
                <AjTypography
                  displayText="You won't be able to change anything once you've filled out the information"
                  styleData={viewProfileStyles.addressHeading}
                />
              </Box>

              <Grid
                container
                columnSpacing={"1.25rem"}
                sx={commonStyles.marginTop20}
              >
                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Bank name"
                    required
                    styleData={commonStyles.inputLabel}
                  />

                  <AjSearchInput
                    clearIcon={<></>}
                    id="bankName"
                    name="bankName"
                    value={myBank}
                    displayText="Type to search"
                    styleData={{
                      ...commonStyles.searchDropdownInput,
                    }}
                    onChange={bankChangeHandler}
                    source="label"
                    options={getBanklist()}
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.bankName?.message}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} lg={6}>
                  <AjInputLabel
                    displayText="Account number"
                    required
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    required
                    fullWidth
                    id="accountNumber"
                    name="accountNumber"
                    sx={commonStyles.inputStyle}
                    value={accountNumber}
                    error={errors.accountNumber ? true : false}
                    onChange={handleAccountNumberChange}
                    placeholder="Please enter Account Number"
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={errors.accountNumber?.message}
                  />
                </Grid>
                <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
                  <AjInputLabel
                    displayText="Account holder name"
                    required={true}
                    styleData={commonStyles.inputLabel}
                  />
                  <InputBase
                    required
                    id="accountHolderName"
                    name="accountHolderName"
                    sx={commonStyles.inputStyle}
                    readOnly={true}
                    value={
                      bankPayload?.isError
                        ? ""
                        : bankPayload?.data?.account_name
                    }
                    error={
                      errors.accountHolderName || bankPayload?.isError
                        ? true
                        : false
                    }
                    placeholder=""
                  />
                  <AjTypography
                    styleData={commonStyles.errorText}
                    displayText={
                      errors.accountHolderName?.message ||
                      (bankPayload?.isError && bankPayload?.message)
                    }
                  />
                </Grid>
              </Grid>
              <Grid sx={viewProfileStyles.btnContainer} container>
                <AjButton
                  onClick={handleCancel}
                  styleData={viewProfileStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  displayText="Save Changes"
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default PersonalDetails;
