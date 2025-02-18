import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";

import { Box, Divider, Grid, InputBase } from "@mui/material";

import AjButton from "../../../../Components/AjButton";
import AjChipDropdown from "../../../../Components/AjChipDropdown";
import AjMultipleTruck from "../../../../Components/AjMultipleTruck/AjMultipleTruck";
import AjDocumentDownloader from "../../../../Components/AjDocumentDownloader";
import AjInputLabel from "../../../../Components/AjInputLabel";
import { AjRating } from "../../../../Components/AjRating";
import AjTypography from "../../../../Components/AjTypography";
import AjSearchInput from "../../../../Components/AjSearchInput";
import call from "../../../../API";
import { refreshPage } from "../../../../Redux/common/otp/otpActions";
import { getProducts } from "../../../../Redux/common/Products/productsActions";
import { showToast } from "../../../../Services/toast";
import {
  getProfileDetails,
  updateUserProfileData,
  updateAggregatorProfileData,
  updateQaProfileData,
  updateLogisticProfileData,
  updateInputSupplierProfileData,
} from "../../../../Redux/Profile/profileActions";
import { getCountries } from "../../../../Redux/common/Countries/getCountriesActions";
import {
  getMasterData,
  getMasterDataAction,
} from "../../../../Redux/common/GetMasterData/getMasterDataActions";
import { associationProfileSchema } from "../../../../validationSchema/associationProfileSchema";
import { getUserData } from "../../../../Services/localStorageService";
import { employmentOption } from "../../../../Constant/AppConstant";
import { commonStyles } from "../../../../Style/CommonStyle";
import { viewProfileStyles } from "../ViewProfileStyle";
import { styles } from "./AssociationDetailsStyles";
import AjAddressDetail from "../../../../Components/AjAddressDetail/AjAddressDetail";
import { ROLES } from "../../../../Constant/RoleConstant";
import * as types from "../../../../Redux/Profile/types";
import AjViewCorporateBuyerDetails from "../../../../Components/AjViewCorporateBuyerDetails/AjViewCorporateBuyerDetails";
import { getInputListAction } from "../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { getProfileVerificationDataAction } from "../../../../Redux/common/ProfileVerification/profileVerificationActions";

const AssociationDetails = () => {
  const dispatch = useDispatch();
  const userData = getUserData();

  const [tinNumber, setTinNumber] = useState(null);
  const [workDetails, setWorkDetails] = useState(null);
  const [personalDetails, setPersonalDetails] = useState(null);
  const [chipValue, setChipValue] = useState([]);
  const [edit, setEdit] = useState(false);
  const [userRoleId, setUserRoleId] = useState(null);
  const [countryOfTaxValue, setCountryOfTaxValue] = useState(null);
  const [myCountryOfTax, setMyCountryOfTax] = useState(null);
  const [employmentType, setEmploymentType] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [truckData, setTruckData] = useState({});
  const [selectedTrucks, setSelectedTrucks] = useState([]);
  const truckDataRef = useRef(truckData);

  const products = useSelector((state) => state.products.products || "");
  const userProfileDetails = useSelector(
    (state) => state.profile.userProfileDetails
  );
  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );
  const certificatesMasterData = useSelector(
    (state) => state.masterData.masterData
  );

  const inputsMasterData = useSelector(
    (state) => state.inputMaster.inputList
  ).result;

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = profileVerificationData?.orgVerificationType[0];

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(associationProfileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getInputListAction());
    dispatch(getProfileDetails());
    dispatch(getCountries());
    dispatch(getProducts());
    if (ROLES.SUPER_ADMIN !== userData.role_id) {
      dispatch(getProfileVerificationDataAction());
    }
    dispatch(getMasterDataAction({ itemType: "QA_CERTIFICATE" }));
    return () => {
      dispatch({
        type: types.GET_USER_PROFILE_DETAILS,
        payload: {},
      });
      dispatch(getMasterData(null));
    };
  }, []);

  useEffect(() => {
    const newSelectedItems = [];
    if (
      userRoleId === ROLES.FARMING_ASSOCIATION ||
      userRoleId === ROLES.PRODUCT_AGGREGATOR
    ) {
      chipValue.map((item) => {
        newSelectedItems.push(
          _.find(products, { productName: item }).productId
        );
      });
      setValue("typeOfProducts", newSelectedItems, { shouldValidate: true });
    }
    if (userRoleId === ROLES.QA_COMPANY) {
      chipValue.map((item) => {
        newSelectedItems.push(
          _.find(certificatesMasterData, { name: item }).id
        );
      });
      setValue("certificates", newSelectedItems, { shouldValidate: true });
    }
    if (userRoleId === ROLES.INPUT_SUPPLIER) {
      chipValue.map((item) => {
        newSelectedItems.push(_.find(inputsMasterData, { name: item }).id);
      });
      setValue("inputs", newSelectedItems, { shouldValidate: true });
    }
    if (countryOfTaxValue !== null) {
      setValue("countryOfTax", countryOfTaxValue, { shouldValidate: true });
    }
  }, [chipValue, countryOfTaxValue, certificatesMasterData]);

  useEffect(() => {
    if (userProfileDetails) {
      setWorkDetails(userProfileDetails?.accountDetails);
      setPersonalDetails(userProfileDetails?.personalDetails);
    }
    if (products && userProfileDetails && inputsMasterData) {
      setTimeout(() => {
        updateProductChipValue();
        if (userRoleId === ROLES.PRODUCT_AGGREGATOR) {
          updateCountryTaxValue();
          updateEmploymentType();
        }
      });
    }
  }, [products, userProfileDetails, inputsMasterData]);

  useEffect(() => {
    setValue("option", userData.role_id);
    setUserRoleId(userData.role_id);
  }, [userRoleId]);

  const updateProductChipValue = () => {
    if (userProfileDetails?.accountDetails?.products) {
      const productItems = [];
      userProfileDetails.accountDetails.products.map((item) => {
        productItems.push(_.find(products, { productId: item }).productName);
      });
      setChipValue(productItems);
    }
    if (userProfileDetails?.accountDetails?.certificates) {
      const certificateItems = [];
      userProfileDetails.accountDetails.certificates.map((item) => {
        certificateItems.push(
          _.find(certificatesMasterData, { id: item }).name
        );
      });
      setChipValue(certificateItems);
    }
    if (userProfileDetails?.accountDetails?.inputs) {
      const inputsItem = [];
      userProfileDetails.accountDetails.inputs.forEach((item) => {
        inputsItem.push(_.find(inputsMasterData, { id: item }).name);
      });
      setChipValue(inputsItem);
    }
  };

  const updateCountryTaxValue = () => {
    if (userProfileDetails?.accountDetails?.tax_country) {
      const country = _.find(countryMenuOptions, {
        countryId: userProfileDetails?.accountDetails?.tax_country,
      });
      setCountryOfTaxValue(country.countryId);
      setMyCountryOfTax(country);
    }
  };

  const updateEmploymentType = () => {
    if (userProfileDetails?.accountDetails?.employment_type) {
      const empType = _.find(employmentOption, {
        value: userProfileDetails?.accountDetails?.employment_type,
      });
      setEmploymentType(empType);
    }
  };
  useEffect(() => {
    if (userProfileDetails?.accountDetails?.employment_type) {
      setEmploymentType(userProfileDetails?.accountDetails?.employment_type);
    }
  }, []);

  useEffect(() => {
    const { truckDetails } = truckData;
    if (truckDetails) {
      handleSubmit(onSubmit)();
    }
  }, [truckData]);

  useEffect(() => {
    setSelectedTruckDetails();
  }, [userProfileDetails?.claimedTruckDetails?.truckDetails]);

  const setSelectedTruckDetails = () => {
    if (userProfileDetails?.claimedTruckDetails?.truckDetails) {
      const temporaryTruck =
        userProfileDetails?.claimedTruckDetails?.truckDetails?.map((truck) => ({
          truckCount: truck?.no_of_trucks,
          truckData: { id: truck?.item_id, name: truck?.name },
        }));
      setSelectedTrucks(temporaryTruck.reverse());
    } else {
      setSelectedTrucks([{}]);
    }
  };
  const updateState = (newState) => {
    truckDataRef.current = newState;
    setTruckData(newState);
    setIsSubmit(false);
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setChipValue(value);
  };
  const handleDelete = (value) => {
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const countryOfTaxChangeHandler = (e, selectedCountry) => {
    setCountryOfTaxValue(selectedCountry.countryId);
    setMyCountryOfTax(selectedCountry);
  };
  const onChangeEmployeeHandler = (e, selectedEmploymentType) => {
    setEmploymentType(selectedEmploymentType);
  };

  const handleEdit = (e) => {
    setEdit(true);
  };

  const handleCancel = (e, value) => {
    setEdit(false);
    updateProductChipValue();
    if (userRoleId === ROLES.FARMING_ASSOCIATION) {
      setValue("memberSize", workDetails.member_size);
    }
    if (userRoleId === ROLES.LOGISTICS_COMPANY) {
      setSelectedTruckDetails();
    }

    if (userRoleId === 2) {
      updateCountryTaxValue();
      updateEmploymentType();
    }
  };

  const formatOnboardedMembers = (member) => {
    return member.toLocaleString("en-US");
  };

  const displayCompanyName = (roleId) => {
    if (roleId === ROLES.FARMING_ASSOCIATION) {
      return `${workDetails.association_name}`;
    } else if (roleId === ROLES.QA_COMPANY) {
      return `${workDetails.company_name}`;
    } else if (roleId === ROLES.CORPORATE_BUYER) {
      return `${workDetails.corporate_name}`;
    } else if (roleId === ROLES.LOGISTICS_COMPANY) {
      return `${workDetails.company_name}`;
    } else if (roleId === ROLES.INPUT_SUPPLIER) {
      return `${workDetails.input_supplier_name}`;
    } else if (roleId === ROLES.FINANCE_COMPANY) {
      return `${workDetails.finance_company_name}`;
    } else return `${personalDetails.first_name} ${personalDetails.last_name}`;
  };

  const editDetailsButtonStyle = (roleId) => {
    if (roleId === ROLES.FARMING_ASSOCIATION) {
      return styles.responsiveBtnTop;
    } else {
      if (workDetails.tax_id) {
        return styles.responsiveBtnTopRole;
      } else {
        if (roleId === ROLES.QA_COMPANY) {
          return styles.responsiveBtnQa;
        } else if (roleId === ROLES.CORPORATE_BUYER) {
          return styles.responsiveEditCorporate;
        } else if (roleId === ROLES.LOGISTICS_COMPANY) {
          return styles.responsiveEditLogistics;
        }
      }
    }
  };

  const companyDetailsContainerStyle = (roleId) => {
    if (
      roleId === ROLES.FARMING_ASSOCIATION ||
      ROLES.LOGISTICS_COMPANY ||
      ROLES.CORPORATE_BUYER
    ) {
      return viewProfileStyles.associationDetailsContainerWidth;
    } else {
      if (roleId === ROLES.QA_COMPANY) {
        return viewProfileStyles.customAssociationDetailsStyle;
      } else {
        return viewProfileStyles.associationDetailsContainerWidthRole;
      }
    }
  };

  const getTruckDetails = (data) => {
    const lastItem = _.last(data);
    if (lastItem?.truckCount > 0) {
      updateState({
        ...truckDataRef.current,
        truckDetails: data?.map((truck) => ({
          no_of_trucks: parseInt(truck.truckCount),
          item_id: truck.truckData.id,
        })),
      });
    } else {
      showToast("Number of trucks is required", "error");
      setIsSubmit(false);
    }
  };

  const onSubmit = (data) => {
    setIsSubmit(true);
    if (userRoleId === ROLES.FARMING_ASSOCIATION) {
      const edittedData = {
        products: data.typeOfProducts,
        memberSize: parseInt(data.memberSize),
      };
      dispatch(updateUserProfileData(edittedData));
    }
    if (userRoleId === ROLES.PRODUCT_AGGREGATOR) {
      const edittedData = {
        products: data.typeOfProducts,
        taxCountry: parseInt(data.countryOfTax),
        employmentType: employmentType.value,
      };
      dispatch(updateAggregatorProfileData(edittedData));
    }
    if (userRoleId === ROLES.QA_COMPANY) {
      const edittedData = {
        certificates: data.certificates,
      };
      dispatch(updateQaProfileData(edittedData));
    }

    if (userRoleId === ROLES.CORPORATE_BUYER) {
      console.log("Corporate Buyer");
    }

    if (userRoleId === ROLES.LOGISTICS_COMPANY) {
      if (!truckData?.truckDetails) {
        return;
      }
      const edittedData = {
        truckDetails: truckData.truckDetails,
      };
      let flag = true;
      if (truckData?.truckDetails) {
        truckData.truckDetails.forEach((item) => {
          if (item?.no_of_trucks > 1000) {
            flag = false;
          }
        });
      }

      if (flag) {
        dispatch(updateLogisticProfileData(edittedData));
        setEdit(false);
      }
      setIsSubmit(false);
      setTruckData({});
    }
    if (userRoleId !== ROLES.LOGISTICS_COMPANY) {
      setEdit(false);
    }
    if (userRoleId === ROLES.INPUT_SUPPLIER) {
      const editedData = {
        inputs: data.inputs,
      };
      dispatch(updateInputSupplierProfileData(editedData));
    }
  };

  const updateKYC = () => {
    const data = {
      orgVerificationNumber: tinNumber,
      orgVerificationType: "TIN",
    };

    call({
      method: "post",
      endpoint: "api/users/profile/updateAssociationKYCDetails",
      payload: data,
      dispatch,
    })
      .then((res) => {
        if (res.status === 200) {
          showToast("KYC updated successfully", "success");
          refreshPage();
        }
      })
      .catch((err) => {
        showToast(err.message, "error");
      });
  };

  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Grid
        container
        item
        sx={[
          commonStyles.signupFormMainContentContainer,
          styles.centerContentContainer,
        ]}
      >
        <Box sx={{ ...viewProfileStyles.associationDetailsContainer }}>
          {personalDetails && workDetails && (
            <>
              {userRoleId !== ROLES.CORPORATE_BUYER && !edit && (
                <AjButton
                  onClick={handleEdit}
                  styleData={{
                    ...styles.editBtn,
                    ...editDetailsButtonStyle(userRoleId),
                  }}
                  variant="outlined"
                  displayText="Edit Details"
                />
              )}
              {userRoleId !== ROLES.CORPORATE_BUYER && (
                <AjTypography
                  styleData={{
                    ...viewProfileStyles.userName,
                    ...viewProfileStyles.textEllipsis,
                  }}
                  align="center"
                  displayText={displayCompanyName(userRoleId)}
                />
              )}
              {(userRoleId === ROLES.FARMING_ASSOCIATION ||
                userRoleId === ROLES.PRODUCT_AGGREGATOR ||
                userRoleId === ROLES.LOGISTICS_COMPANY ||
                userRoleId === ROLES.INPUT_SUPPLIER) && (
                <AjRating
                  readOnly={true}
                  styleData={styles.ratingStyles}
                  defaultValue={
                    personalDetails?.avg_rating
                      ? personalDetails?.avg_rating
                      : "0"
                  }
                />
              )}
              <Grid
                sx={{
                  ...viewProfileStyles.associationDetails,
                  ...companyDetailsContainerStyle(userRoleId),
                  ...(userRoleId === ROLES.PRODUCT_AGGREGATOR &&
                    viewProfileStyles.centerContent),
                }}
              >
                {(userRoleId === ROLES.FARMING_ASSOCIATION ||
                  userRoleId === ROLES.LOGISTICS_COMPANY ||
                  userRoleId === ROLES.INPUT_SUPPLIER ||
                  userRoleId === ROLES.FINANCE_COMPANY) && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText="Registered number"
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      <AjTypography
                        align="center"
                        displayText={workDetails.registration_number || "N/A"}
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText={`${verificationText} number`}
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      <AjTypography
                        align="center"
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                        displayText={
                          workDetails.org_verification_number || "N/A"
                        }
                      />
                    </Grid>
                  </>
                )}
                {userRoleId === ROLES.FARMING_ASSOCIATION && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText="Members Onboarded"
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      <AjTypography
                        align="center"
                        displayText={formatOnboardedMembers(
                          workDetails.member_size
                        )}
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                      />
                    </Grid>
                  </>
                )}
                {userRoleId === ROLES.LOGISTICS_COMPANY && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText="Count of Trucks"
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      <AjTypography
                        align="center"
                        displayText={
                          userProfileDetails?.accountDetails?.total_truck_count
                        }
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                      />
                    </Grid>
                  </>
                )}
                {(userRoleId === ROLES.FARMING_ASSOCIATION ||
                  userRoleId === ROLES.LOGISTICS_COMPANY ||
                  userRoleId === ROLES.INPUT_SUPPLIER ||
                  userRoleId === ROLES.FINANCE_COMPANY) && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText="CAC document : (JPEG, PNG or PDF only)"
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      {workDetails.cac_document ? (
                        <AjDocumentDownloader
                          docId={workDetails.cac_document}
                          docName={workDetails.file_name}
                          showIcon={false}
                          downloadWrapper={viewProfileStyles.downloadWrapper}
                          changeBtnStyle={viewProfileStyles.changeBtnStyle}
                          docTextStyle={viewProfileStyles.docTextStyle}
                        />
                      ) : (
                        <AjTypography
                          align="center"
                          displayText="N/A"
                          styleData={{
                            ...viewProfileStyles.subHeadingColor,
                          }}
                        />
                      )}
                    </Grid>
                  </>
                )}
                {userRoleId === ROLES.PRODUCT_AGGREGATOR && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        displayText="Unique Identification Number"
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                      />
                      <AjTypography
                        align="center"
                        displayText={workDetails.uin}
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                      />
                    </Grid>
                    {workDetails.tax_id && (
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <AjInputLabel
                          displayText="Tax ID"
                          styleData={[
                            commonStyles.inputLabel,
                            viewProfileStyles.itemLabel,
                          ]}
                        />
                        <AjTypography
                          align="center"
                          styleData={viewProfileStyles.subHeadingColor}
                          displayText={workDetails.tax_id}
                        />
                      </Grid>
                    )}
                  </>
                )}
                {userRoleId === ROLES.QA_COMPANY && (
                  <>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                        displayText={`${verificationText} number`}
                      />
                      <AjTypography
                        displayText={workDetails.org_verification_number}
                        styleData={{
                          ...viewProfileStyles.subHeadingColor,
                          ...viewProfileStyles.setWidth,
                        }}
                        align="center"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                      <AjInputLabel
                        styleData={[
                          commonStyles.inputLabel,
                          viewProfileStyles.itemLabel,
                        ]}
                        displayText="CAC document : (JPEG, PNG or PDF only)"
                      />

                      <AjDocumentDownloader
                        docName={workDetails.file_name}
                        changeBtnStyle={viewProfileStyles.changeBtnStyle}
                        downloadWrapper={viewProfileStyles.downloadWrapper}
                        docId={workDetails.cac_document}
                        docTextStyle={viewProfileStyles.docTextStyle}
                        showIcon={false}
                      />
                    </Grid>
                  </>
                )}
                {/* {userRoleId === ROLES.CORPORATE_BUYER && (
                  <AjViewCorporateBuyerDetails
                    workDetails={workDetails}
                    verificationText={verificationText}
                  />
                )} */}
              </Grid>
            </>
          )}
        </Box>
        {workDetails && userRoleId === ROLES.CORPORATE_BUYER && (
          <Box sx={{ ...viewProfileStyles.associationDetailsContainer }}>
            <Box sx={viewProfileStyles.productsCorporateContainer}>
              <Box sx={viewProfileStyles.pcc_top}>
                {/*
                {!edit && <AjButton
                    onClick={handleEdit}
                    styleData={{
                      ...styles.editCorporateBtn,
                      ...editDetailsButtonStyle(userRoleId),
                    }}
                    variant="plain"
                    displayText="Edit Details"
                  />}
                  */}
              </Box>
              <Box sx={viewProfileStyles.productsCorporateDetailContainer}>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.corporate_name}
                      id="corporateName"
                      name="corporateName"
                      placeholder="Full name"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("corporateName")}
                      error={errors.corporateName ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.corporateName?.message}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.phone_code}
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="Phone number"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("phoneNumber")}
                      error={errors.phoneNumber ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.phoneNumber?.message}
                    />
                  </Box>
                </Box>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.org_verification_number}
                      id="TinNumber"
                      name="TinNumber"
                      placeholder="TIN number"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("TinNumber")}
                      error={errors.TinNumber ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.TinNumber?.message}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.corporate_registration_number}
                      id="registeredNumber"
                      name="registeredNumber"
                      placeholder="Registered number"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("registeredNumber")}
                      error={errors.registeredNumber ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.registeredNumber?.message}
                    />
                  </Box>
                </Box>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.address_1}
                      id="addressOne"
                      name="addressOne"
                      placeholder="Address line 1"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("addressOne")}
                      error={errors.addressOne ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.addressOne?.message}
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
                        docName={workDetails.file_name}
                        changeBtnStyle={viewProfileStyles.changeBtnStyle}
                        downloadWrapper={viewProfileStyles.downloadWrapper}
                        docId={workDetails.cac_document}
                        docTextStyle={viewProfileStyles.docTextStyle}
                        showIcon={false}
                      />
                    </Grid>
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.cacDocument?.message}
                    />
                  </Box>
                </Box>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.country_name}
                      id="countryName"
                      name="countryName"
                      placeholder="Country"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("countryName")}
                      error={errors.countryName ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.countryName?.message}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.state_name}
                      id="stateName"
                      name="stateName"
                      placeholder="State"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("stateName")}
                      error={errors.stateName ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.stateName?.message}
                    />
                  </Box>
                </Box>
                <Box sx={styles.pcc_box}>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.city}
                      id="cityName"
                      name="cityName"
                      placeholder="City"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("cityName")}
                      error={errors.cityName ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.cityName?.message}
                    />
                  </Box>
                  <Box sx={styles.pcc_box_inside}>
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.zip_code}
                      id="zipCode"
                      name="zipCode"
                      placeholder="Zip code"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("zipCode")}
                      error={errors.zipCode ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.zipCode?.message}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        )}
        {userRoleId !== ROLES.CORPORATE_BUYER && (
          <Divider sx={commonStyles.dividerStyle} />
        )}
        {userRoleId !== ROLES.CORPORATE_BUYER && workDetails && (
          <AjAddressDetail
            address1={workDetails.address_1}
            address2={workDetails.address_2}
            country={workDetails.country_name}
            state={workDetails.state_name}
            zipCode={workDetails.zip_code}
            city={workDetails.city}
          />
        )}
        {userRoleId !== ROLES.CORPORATE_BUYER && (
          <Divider style={commonStyles.dividerStyle} />
        )}
        {workDetails && (
          <Box sx={viewProfileStyles.productsContainer}>
            <Grid sx={commonStyles.signupFormContainer}>
              {(userRoleId === ROLES.FARMING_ASSOCIATION ||
                userRoleId === ROLES.PRODUCT_AGGREGATOR) && (
                <>
                  <Grid item xs={12} sm={12}>
                    <AjInputLabel
                      displayText="Type of Products"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjChipDropdown
                      id="typeOfProducts"
                      name="typeOfProducts"
                      value={chipValue}
                      onChange={onChangeDropdownChipHandler}
                      fullWidth
                      onDelete={handleDelete}
                      options={products}
                      styleData={
                        !edit
                          ? [styles.chipDropDown, styles.disableInput]
                          : styles.chipDropDown
                      }
                      isReadOnly={!edit}
                    />
                  </Grid>
                  <AjTypography
                    styleData={{
                      ...commonStyles.errorText,
                      ...styles.productsMemberStyles,
                    }}
                    displayText={errors.typeOfProducts?.message}
                  />
                </>
              )}
              {userRoleId === ROLES.QA_COMPANY && (
                <>
                  <Grid item xs={12} sm={12}>
                    <AjInputLabel
                      displayText="certificates"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjChipDropdown
                      id="certificates"
                      name="certificates"
                      value={chipValue}
                      onChange={onChangeDropdownChipHandler}
                      fullWidth
                      source="name"
                      onDelete={handleDelete}
                      options={certificatesMasterData}
                      styleData={
                        !edit
                          ? [styles.chipDropDown, styles.disableInput]
                          : styles.chipDropDown
                      }
                      isReadOnly={!edit}
                    />
                  </Grid>
                  <AjTypography
                    styleData={{
                      ...commonStyles.errorText,
                    }}
                    displayText={errors.certificates?.message}
                  />
                </>
              )}
              {userRoleId === ROLES.INPUT_SUPPLIER && (
                <>
                  <Grid item xs={12} sm={12}>
                    <AjInputLabel
                      displayText="Inputs"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjChipDropdown
                      id="inputs"
                      name="inputs"
                      value={chipValue}
                      onChange={onChangeDropdownChipHandler}
                      fullWidth
                      source="name"
                      onDelete={handleDelete}
                      options={inputsMasterData}
                      styleData={
                        !edit
                          ? [styles.chipDropDown, styles.disableInput]
                          : styles.chipDropDown
                      }
                      isReadOnly={!edit}
                    />
                  </Grid>
                  <AjTypography
                    styleData={{
                      ...commonStyles.errorText,
                    }}
                    displayText={errors.inputs?.message}
                  />
                </>
              )}
              {userRoleId === ROLES.FARMING_ASSOCIATION && (
                <>
                  <Grid item xs={12} sm={12} sx={styles.productsMemberStyles}>
                    <AjInputLabel
                      displayText="Member size"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <InputBase
                      required
                      readOnly={!edit}
                      fullWidth
                      defaultValue={workDetails.member_size}
                      id="memberSize"
                      name="memberSize"
                      placeholder="Enter Member Size"
                      sx={
                        !edit
                          ? [commonStyles.inputStyle, styles.disableInput]
                          : commonStyles.inputStyle
                      }
                      {...register("memberSize")}
                      error={errors.memberSize ? true : false}
                    />
                    <AjTypography
                      styleData={commonStyles.errorText}
                      displayText={edit && errors.memberSize?.message}
                    />
                  </Grid>

                  {!userData.is_kyc_verified && (
                    <Grid>
                      <Grid>
                        <AjTypography
                          styleData={{ ...commonStyles.errorText }}
                          displayText="Please update your KYC details to add products"
                        />

                        <AjInputLabel
                          displayText="TIN Number"
                          required
                          styleData={commonStyles.inputLabel}
                        />
                        <InputBase
                          required
                          readOnly={edit}
                          fullWidth
                          defaultValue=""
                          id="tinNumber"
                          name="tinNumber"
                          placeholder="Enter TIN Number"
                          onChange={(e) => setTinNumber(e.target.value)}
                          value={tinNumber}
                          sx={
                            !edit
                              ? [commonStyles.inputStyle, styles.disableInput]
                              : commonStyles.inputStyle
                          }
                        />
                      </Grid>
                      {!edit && (
                        <AjButton
                          onClick={updateKYC}
                          // styleData={viewProfileStyles.cancelBtnStyle}
                          variant="contained"
                          displayText="Update KYC"
                        />
                      )}
                    </Grid>
                  )}
                </>
              )}
              {userRoleId === ROLES.PRODUCT_AGGREGATOR && (
                <Grid container columnSpacing={"1.25rem"}>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AjInputLabel
                      displayText="Country of tax"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjSearchInput
                      id="countryOfTax"
                      name="countryOfTax"
                      value={myCountryOfTax}
                      source="countryName"
                      options={countryMenuOptions || []}
                      onChange={countryOfTaxChangeHandler}
                      styleData={
                        !edit
                          ? [
                              styles.searchInput,
                              styles.disableInput,
                              styles.disableIconColor,
                            ]
                          : styles.searchInput
                      }
                      disabled={!edit}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={6} lg={6}>
                    <AjInputLabel
                      displayText="Employment type"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjSearchInput
                      id="employmentType"
                      name="employmentType"
                      value={employmentType}
                      onChange={onChangeEmployeeHandler}
                      styleData={
                        !edit
                          ? [
                              styles.searchInput,
                              styles.disableInput,
                              styles.disableIconColor,
                            ]
                          : styles.searchInput
                      }
                      source="label"
                      options={employmentOption || []}
                      disabled={!edit}
                    />
                  </Grid>
                </Grid>
              )}
              {userRoleId === ROLES.LOGISTICS_COMPANY && (
                <AjMultipleTruck
                  submit={isSubmit}
                  data={getTruckDetails}
                  defaultValue={selectedTrucks}
                  disableReq={!edit}
                />
              )}
              <Grid sx={viewProfileStyles.btnContainer} container>
                {edit && (
                  <>
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
                  </>
                )}
              </Grid>
            </Grid>
          </Box>
        )}
      </Grid>
    </Grid>
  );
};

export default AssociationDetails;
