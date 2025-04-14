import React, { useEffect, useState, useRef } from "react";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Box, Grid, Typography, Divider, Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useForm } from "react-hook-form";
import * as moment from "moment";
import AjButton from "../../../../../../Components/AjButton";
import AjFarmerDetailInput from "../FarmerDetails/AjFarmerDetailInput";
import { getFarmerRefereeDetailsByIdAction } from "../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailActions.";
import AjTypography from "../../../../../../Components/AjTypography";
import TableActions from "../../../../../../Components/TableActions/TableActions";
import AjDetailTypography from "../../../../../../Components/AjDetailTypography/AjDetailTypography";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjAddressNew from "../../../../../../Components/AjAdress/AjAddressNew";
import AjBankDetails from "../../../../../../Components/AjBankDetails/AjBankDetails";
import AjEmploymentDetails from "../../../../../../Components/AjEmploymentDetails/AjEmploymentDetails";
import AjAddFarmerLandDetails from "../../../../../../Components/AjAddFarmerLandDetails/AjAddFarmerLandDetails";
import AjAddFarmerProduct from "../../../../../../Components/AjAddFarmerProduct/AjAddFarmerProduct";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjDialog from "../../../../../../Components/AjDialog/AjDialog";
import AjConfirmModal from "../../../../../../Components/AjConfirmModal/AjConfirmModal";
import {
  getFarmerDetailsByIdAction,
  updateFarmerDetailsByIdAction,
} from "../../../../../../Redux/SuperAdmin/UserManagement/FarmingAssociationDetails/farmingAssociationDetailActions.";
import {
  getMasterDataSecond,
  getMasterDataSecondAction,
} from "../../../../../../Redux/common/GetMasterData/getMasterDataActions";
import {
  setLandDataById,
  setProductDataByFarmerId,
  toggleFarmerStatusAction,
} from "../../../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_FARMING_ASSOCIATION,
  COMPLETE_KYC_VNIN,
  FARMERS,
} from "../../../../../../Routes/Routes";
import { getAccountDetailsAction } from "../../../../../../Redux/FarmingAssociation/Dashboard/dashboardActions";
import { getUserData } from "../../../../../../Services/localStorageService";
import { ROLES } from "../../../../../../Constant/RoleConstant";
import {
  formatDate,
  getPhoneCodeSymbol,
  replaceWithUnderScore,
  getCurrencySymbol,
} from "../../../../../../Services/commonService/commonService";
import {
  commonStyles,
  dashboardStyles,
} from "../../../../../../Style/CommonStyle";
import { getStates } from "../../../../../../Redux/common/States/getStateActions";
import { getAllCountriesSignUpBuyerActions } from "../../../../../../Redux/common/Countries/getCountriesActions";
import { styles } from "../../Referee/RefereeDetails/RefereeDetailsStyles";
import { styles as detailsstyle } from "../../../../../../Components/LandingPage/ProductListing/ProductListingExpanded/ProductList";
import { getProducts } from "../../../../../../Redux/common/Products/productsActions";
import { showToast } from "../../../../../../Services/toast";
import AjUploadMultipleCertificate from "../../../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";
import { getFarmerInfoDetailAction } from "../../../../../../Redux/FinanceCompany/FinanceRequests/financeRequestsActions";
import AjPersonalDetailsNew from "../../../../../../Components/AjPersonalDetails/AjPersonalDetailsNew";
import AjEmploymentDetailsNew from "../../../../../../Components/AjEmploymentDetails/AjEmploymentDetailsNew";
import cardIcon from "../../../../../../Assets/Images/cardnotfound.png";


const FarmerDetails = ({ activeTab }) => {
  const [edit, setEdit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [editData, setEditData] = useState({});
  const [balanceVisible, setbalanceVisible] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [cardReq, setCardReq] = useState(false);

  const dispatch = useDispatch();
  const { id, farmerId, associationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const editDataRef = useRef(editData);
  const roleId = getUserData().role_id;
  const userData = getUserData();

  const userRole =
    roleId === ROLES.FARMING_ASSOCIATION
      ? "farming_association"
      : roleId === ROLES.PRODUCT_AGGREGATOR
      ? "aggregator"
      : null;

  const { accountDetails, loadingFarmerDetails: bankdetailsLoading } =
    useSelector((state) => {
      return {
        accountDetails: state.dashboard.accountDetails,
        loadingFarmerDetails: state.dashboard.loadingFarmerDetails,
      };
    });

  const farmersDetailsData = useSelector((state) => {
    if (farmerId) return state.financeCompanyRequests.farmerInfoDetail;
    else return state.userManagementAssociationDetails.farmerDetails;
  });

  const allCountries = useSelector(
    (state) => state.countries.allCountries || null
  );
  const stateMenuOptions = useSelector(
    (state) => state.states.stateMenuOptions || null
  );

  const soilTypeOptions = useSelector(
    (state) => state.masterData.masterDataSecond
  );
  const { landData, productData } = useSelector((state) => state.farmers);
  const farmerProducts = useSelector((state) => state.products.products);
  const { handleSubmit } = useForm({
    mode: "onChange",
  });

  const completeKYC = () => {
    navigate(`complete-kyc-vnin`);
  };

  useEffect(() => {
    if (farmerId) {
      dispatch(getFarmerInfoDetailAction(id, farmerId));
    } else {
      dispatch(getFarmerDetailsByIdAction(id));
      dispatch(getProducts());
      dispatch(getAccountDetailsAction(userRole, id));
      dispatch(getAllCountriesSignUpBuyerActions());
      dispatch(getStates("NG"));
    }
    dispatch(getMasterDataSecondAction({ itemType: "SOIL_TYPE" }));

    if (location.pathname.includes("edit")) {
      setEdit(true);
    }
    return () => dispatch(getMasterDataSecond(null));
  }, [id, farmerId]);

  const findCountryById = (countryid) => {
    const foundCountry = allCountries?.find(
      (country) => country.id === countryid
    );
    return foundCountry ? foundCountry?.name : null;
  };

  const findStateById = (stateid) => {
    const foundState = stateMenuOptions?.find(
      (state) => state.stateId === stateid
    );
    return foundState ? foundState?.stateName : null;
  };

  useEffect(() => {
    getLandDetails();
  }, [soilTypeOptions]);

  useEffect(() => {
    getProductDetails();
  }, [farmerProducts]);

  useEffect(() => {
    if (cancel) {
      getLandDetails();
      getProductDetails();
    }
  }, [cancel]);

  useEffect(() => {
    const { addressData, personalData, employmentData, certificateData } =
      editData;

    if (addressData && personalData && employmentData && certificateData) {
      handleSubmit(onSubmit)();
      setIsSubmit(false);
    }
  }, [editData]);

  const updateState = (newState) => {
    editDataRef.current = newState;
    setEditData(newState);
    setIsSubmit(false);
  };

  const getLandDetails = () => {
    if (!soilTypeOptions || !farmersDetailsData) return;
    const { landDetails } = farmersDetailsData;
    const landListingDetailsData = landDetails?.map((item, index) => {
      let soilItem = _.find(soilTypeOptions, {
        id: item.soil_type[0],
      });
      return {
        typeOfSoil: soilItem.name,
        landSize: item.land_size,
        id: index,
        geo_mapping_land: item.geo_mapping_land,
      };
    });

    const landDataToSet = {
      landListing: landListingDetailsData,
    };
    dispatch(setLandDataById(landDataToSet));
  };

  const getProductDetails = () => {
    const prodListing = farmersDetailsData?.productDetails?.map((item) => {
      if (farmerProducts != null) {
        let prodItem = _.find(farmerProducts, {
          id: item.product_id,
        });
        return {
          productName: prodItem?.productName,
          yield: item.yield,
          unit_of_measurement: prodItem?.unit_of_measurement,
        };
      }
    });
    const productDataToSet = {
      singleProduct: null,
      productListing: prodListing,
    };
    dispatch(setProductDataByFarmerId(productDataToSet));
  };

  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
    navigate(
      roleId === ROLES.SUPER_ADMIN
        ? `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/farmer/${associationId}/edit/${id}?activeTab=${activeTab}`
        : `${FARMERS}/edit/${id}`
    );
  };

  const saveChanges = () => {
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    updateState({ ...editDataRef.current, addressData: data });
  };

  const getPersonalDetails = (data) => {
    updateState({ ...editDataRef.current, personalData: data });
  };

  const getEmploymentDetails = (data) => {
    updateState({ ...editDataRef.current, employmentData: data });
  };

  const getCertificatesDetails = (data) => {
    if (data) {
      updateState({ ...editDataRef.current, certificateData: data });
    } else {
      showToast("Certificate is required", "error");
      updateState({ ...editDataRef.current, certificateData: null });
    }
  };

  const onSubmit = () => {
    const { addressData, personalData, employmentData, certificateData } =
      editData;
    if (!addressData || !personalData || !employmentData || !certificateData) {
      return;
    }
    let requiredData = {};

    const productListingData = productData?.productListing?.map((item) => {
      return {
        productId: _.find(farmerProducts, { productName: item.productName })
          .productId,
        yield: parseInt(item.yield),
      };
    });

    if (!!productListingData?.length) {
      requiredData = {
        ...requiredData,
        productDetails: productListingData,
      };
    } else {
      showToast("Add product", "error");
      return;
    }

    let certificateDataToSend = [];
    if (certificateData?.length && certificateData[0]?.documentData?.id) {
      certificateDataToSend = certificateData?.map((item) => {
        return {
          certificationTypeId: item.documentDataType.id,
          certificationDocumentId: item.documentData.id,
        };
      });
    } else {
      showToast("Certificate is required", "error");
      return;
    }

    const landListingData = landData?.landListing?.map((item) => {
      const soilTypeArray = [];
      soilTypeArray.push(
        _.find(soilTypeOptions, {
          name: item.typeOfSoil,
        }).id
      );
      return {
        soilType: soilTypeArray,
        landSize: parseInt(item.landSize),
        geoMappingLand: item.geo_mapping_land,
      };
    });

    requiredData = {
      ...requiredData,
      personalDetails: {
        firstName: personalData.firstName,
        lastName: personalData.lastName,
        gender: personalData.gender,
        dateOfBirth: moment(personalData.dateOfBirth).toISOString(true),
        employmentType: employmentData.employmentTypeToSend,
        experienceYears: employmentData.experience,
        birthCountry: parseInt(employmentData.countryOfBirth),
        citizenship: parseInt(employmentData.citizenship),
        taxCountry: parseInt(employmentData.countryOfTax),
        uinTypeValue: replaceWithUnderScore(employmentData.UinPinTypeToSend),
        uniqueIdentificationNumber: employmentData.uniqueIdentificationNumber,
        taxId:
          employmentData.taxOption === "yes"
            ? parseInt(employmentData?.taxId)
            : null,
        address1: addressData.addressLine1,
        country: parseInt(addressData.country),
        state: parseInt(addressData.state),
        city: addressData.city,
        zipCode: parseInt(addressData.zipCode),
        address2: addressData.addressLine2,
      },
      certificationDetails: certificateDataToSend,
    };

    if (employmentData.uniqueIdentificationState) {
      requiredData.personalDetails.uniqueIdentificationState =
        employmentData.uniqueIdentificationState;
    }

    if (landData?.landListing?.length > 0) {
      requiredData = {
        ...requiredData,
        landDetails: landListingData,
      };
    }
    dispatch(
      updateFarmerDetailsByIdAction(
        id,
        { farmer: requiredData },
        navigate,
        setEdit,
        roleId === ROLES.SUPER_ADMIN,
        associationId
      )
    );
  };

  const handleCancel = (e, value) => {
    setEdit(false);
    setCancel(true);
    navigate(
      roleId === ROLES.SUPER_ADMIN
        ? `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/farmer/${associationId}/detail/${id}?activeTab=${activeTab}`
        : `${FARMERS}/detail/${id}`
    );
  };

  const certDefaultdata = () => {
    return farmersDetailsData?.certificationDetails?.map((certificate) => {
      const {
        certification_document_id,
        certification_type_id,
        file_name,
        item_name,
      } = certificate;
      return {
        documentData: {
          id: certification_document_id,
          file_name: file_name,
        },
        documentDataType: {
          id: certification_type_id,
          name: item_name,
        },
      };
    });
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (farmerIds) =>
        dispatch(toggleFarmerStatusAction(farmerIds, true)),
    },

    {
      name: "Inactive",
      actionClickHandler: (farmId) =>
        dispatch(toggleFarmerStatusAction(farmId, false)),
    },
  ];

  const changeToggle = () => {
    setbalanceVisible(!balanceVisible);
  };

  const handleReqCard = () => {
    setOpenDialog(true);
  };

  const handleConfirmReqCard = () => {
    setCardReq(true);
  };

  const handleConfirmBlockCard = () => {
    setCardReq(false);
  };

  return (
    <>
      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabsfarmerDetais,
          ...commonStyles.customSrollBar,
          padding: "3rem 1.5rem",
          "@media(max-width: 768px)": {
            padding: "1.5rem",
          },
          "@media(max-width: 300px)": {
            padding: "1rem",
          },
        }}
      >
        {bankdetailsLoading ? (
          <Skeleton
            sx={{
              ...dashboardStyles.dashboardWalletContainerFarmerDetailsSkeleton,
            }}
            variant="rectangular"
          />
        ) : (
          <Grid sx={{ width: "100%", borderRadius: "8px" }}>
            {farmersDetailsData?.personalDetails
              ?.is_kyc_verified ? //             }} //               fontWeight: "200", //               fontSize: "12px", //             style={{ //           <span //         {balanceVisible ? ( //       > //         sx={{ ...dashboardStyles.dashboardWalletCardAmtAvailBal }} //       <Typography //     <Box sx={{ ...dashboardStyles.dashboardacctdet }}> //   <Box sx={{ ...dashboardStyles.dashboardWalletCardBal }}> // {Object.keys(accountDetails).length !== 0 ? // > //   }} //     ...dashboardStyles.dashboardWalletContainerFarmerDetails, //   sx={{ // <Box // > //   }} //     ...dashboardStyles.dashboardWalletContainerFarmerDetails, //   sx={{ // <Box
            //           >
            //             {getCurrencySymbol(userData?.currency)}
            //           </span>
            //         ) : null}

            //         <span>
            //           {balanceVisible ? "60,000" : "*******"}

            //           {/* use this for the balance
            //           {numberWithCommassNoCurrency(
            //             accountDetails?.account_balance
            //             userData?.currency
            //           )} */}
            //         </span>
            //       </Typography>
            //       <Typography
            //         sx={{
            //           ...dashboardStyles.dashboardWalletBalanceFarmerDetails,
            //           ...dashboardStyles.dashboardWalletBalanceFarmerDetailsAvailableBal,
            //         }}
            //       >
            //         Available balance
            //         <InputAdornment position="start">
            //           <IconButton
            //             aria-label="toggle balance visibility"
            //             onClick={changeToggle}
            //             edge="end"
            //             sx={{ color: "white" }}
            //           >
            //             {balanceVisible ? <VisibilityOff /> : <Visibility />}
            //           </IconButton>
            //         </InputAdornment>
            //       </Typography>
            //     </Box>
            //     <Box
            //       sx={{
            //         ...(cardReq
            //           ? dashboardStyles.dashboardWalletcardreqbutontrue
            //           : dashboardStyles.dashboardWalletcardreqbuton),
            //       }}
            //       onClick={handleReqCard}
            //     >
            //       <Typography
            //         sx={{ ...dashboardStyles.dashboardWalletcardreq }}
            //       >
            //         {cardReq ? "Block card" : "Request card"}
            //       </Typography>
            //     </Box>
            //   </Box>
            //   <Box sx={{ ...dashboardStyles.dashboardWalletName }}>
            //     <Box sx={{ ...dashboardStyles.dashboardacctdet }}>
            //       <Typography sx={{ ...dashboardStyles.dashboardacctnumb }}>
            //         {accountDetails?.account_number}
            //       </Typography>
            //       <Typography
            //         sx={{
            //           ...dashboardStyles.dashboardWalletBalanceFarmerDetails,
            //         }}
            //       >
            //         Account Number
            //       </Typography>
            //     </Box>
            //     <Box
            //       sx={{
            //         ...dashboardStyles.dashboardWalletstatusContainer,
            //       }}
            //     >
            //       <Typography sx={dashboardStyles.dashboardWalletstatus}>
            //         Status:
            //       </Typography>
            //       <Typography sx={dashboardStyles.dashboardWalletstatus}>
            //         {userData?.status}
            //       </Typography>
            //     </Box>
            //   </Box>
            // </Box>
            null : (
              <Box
                sx={{
                  ...dashboardStyles.dashboardWalletContainerFarmerDetailsNobankFound,
                }}
              >
                <Box
                  sx={{
                    ...dashboardStyles.dashboardWalletContainerNobankFound,
                  }}
                >
                  <img src={cardIcon} alt="card" />
                  <Typography
                    sx={{
                      ...dashboardStyles.dashboardWalletContainerNobankFoundHeader,
                    }}
                  >
                    Complete KYC Verification to generate bank account
                  </Typography>
                  <Typography
                    onClick={completeKYC}
                    sx={{
                      ...dashboardStyles.dashboardWalletContainerNobankFoundbutton,
                    }}
                  >
                    Complete KYC
                  </Typography>
                </Box>
              </Box>
            )}
          </Grid>
        )}
        <Box
          sx={{
            // (accountDetails).length !== 0 ?
            ...(farmersDetailsData?.personalDetails?.is_kyc_verified
              ? detailsstyle.viewMoreContainerfarmerdetailscontainerNowallet
              : detailsstyle.viewMoreContainerfarmerdetailscontainer),
          }}
        >
          <Box
            sx={{
              ...detailsstyle.viewMoreContainerfarmerdetails,
            }}
          >
            <Typography sx={{ ...detailsstyle.farmerdetailsheaderleft }}>
              Farmer Details
            </Typography>

            <Box
              sx={{
                ...dashboardStyles.dashboardWalletcardreqbuton,
                textAlign: "center",
              }}
            >
              {!edit
                ? (roleId === ROLES.FARMING_ASSOCIATION ||
                    roleId === ROLES.SUPER_ADMIN) && (
                    <Typography
                      onClick={handleEdit}
                      sx={{ ...dashboardStyles.dashboardWalletcardreq }}
                    >
                      Edit Details
                    </Typography>
                  )
                : (roleId === ROLES.FARMING_ASSOCIATION ||
                    roleId === ROLES.SUPER_ADMIN) && (
                    <Typography
                      onClick={handleEdit}
                      sx={{ ...dashboardStyles.dashboardWalletcardreq }}
                    >
                      Edit mode
                    </Typography>
                  )}
            </Box>
          </Box>
          <Box
            sx={{ ...detailsstyle.viewMoreContainerfarmerdetailstableheader }}
          >
            <Box
              sx={{
                borderRadius: "8px",
                background: "white",
              }}
            >
              <Box
                sx={{
                  ...detailsstyle.viewMoreContainerfarmerdetailstable,
                }}
              >
                <Typography sx={{ ...detailsstyle.farmerdetailsheaderleft }}>
                  Farmer’s Personal Information
                </Typography>
                <Typography
                  sx={{
                    ...detailsstyle.farmerdetailsheaderright,
                  }}
                >
                  <Typography
                    sx={{
                      ...detailsstyle.farmerdetailsheaderrightdatekey,
                    }}
                  >
                    Date added:
                  </Typography>
                  <Typography
                    sx={{
                      ...detailsstyle.farmerdetailsheaderrightdateval,
                    }}
                  >
                    {formatDate(
                      farmersDetailsData?.personalDetails?.created_at
                    )}
                  </Typography>
                </Typography>
              </Box>
              <Divider />

              <Box>
                <AjPersonalDetailsNew
                  data={getPersonalDetails}
                  submit={isSubmit}
                  defaultFirstName={
                    farmersDetailsData?.personalDetails?.first_name
                  }
                  defaultLastName={
                    farmersDetailsData?.personalDetails?.last_name
                  }
                  defaultGender={farmersDetailsData?.personalDetails?.gender}
                  defaultDateOfBirth={
                    farmersDetailsData?.personalDetails?.date_of_birth
                  }
                />
              </Box>
              <Box
                sx={{
                  ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
                }}
              >
                <AjFarmerDetailInput
                  label="Phone Number:"
                  value={
                    farmersDetailsData?.personalDetails?.phone_code &&
                    `${getPhoneCodeSymbol(
                      farmersDetailsData?.personalDetails?.phone_code
                    )} ${farmersDetailsData?.personalDetails?.mobile_no}`
                  }
                  styles={{
                    ...detailsstyle.farmerdetailsheadetabledetailpair,
                    key: {
                      ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                    },
                    value: {
                      ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                    },
                  }}
                />
                <AjFarmerDetailInput
                  label="KYC status:"
                  value={
                    farmersDetailsData?.personalDetails?.is_kyc_verified ===
                    true
                      ? "Verified"
                      : "Not Verified"
                  }
                  styles={{
                    ...detailsstyle.farmerdetailsheadetabledetailpair,
                    key: {
                      ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                    },
                    value: {
                      ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                    },
                  }}
                />
              </Box>

              <AjEmploymentDetailsNew
                submit={isSubmit}
                data={getEmploymentDetails}
                findCountryById={findCountryById}
                findStateById={findStateById}
                defaultEmploymentType={
                  farmersDetailsData?.personalDetails?.employment_type
                }
                defaultExperience={
                  farmersDetailsData?.personalDetails?.experience_years
                }
                defaultCountryOfBirth={
                  farmersDetailsData?.personalDetails?.birth_country
                }
                defaultCitizenship={
                  farmersDetailsData?.personalDetails?.citizenship
                }
                defaultCountryOfTax={
                  farmersDetailsData?.personalDetails?.tax_country
                }
                defaultUINPinType={
                  farmersDetailsData?.personalDetails?.uin_type
                }
                defaultUniqueIdentificationNumber={
                  farmersDetailsData?.personalDetails?.uin
                }
                countryId={farmersDetailsData?.personalDetails?.country_id}
                defaultTaxId={farmersDetailsData?.personalDetails?.tax_id}
                defaultTaxOption={
                  farmersDetailsData?.personalDetails?.tax_id === null
                    ? "no"
                    : "yes"
                }
              />

              {!!farmersDetailsData?.personalDetails?.reference_referees_id
                ?.length && (
                <Box
                  sx={{
                    ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
                  }}
                >
                  <AjFarmerDetailInput
                    label="Referee 1"
                    value={farmersDetailsData?.refereeName?.[0]?.first_name}
                    styles={{
                      ...detailsstyle.farmerdetailsheadetabledetailpair,
                      key: {
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                      },
                      value: {
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                      },
                    }}
                  />
                  <AjFarmerDetailInput
                    label="  Referee 2"
                    value={farmersDetailsData?.refereeName?.[1]?.first_name}
                    styles={{
                      ...detailsstyle.farmerdetailsheadetabledetailpair,
                      key: {
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                      },
                      value: {
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                      },
                    }}
                  />
                </Box>
              )}

              <Box
                sx={{
                  padding: "0 1.5rem",
                }}
              >
                <AjUploadMultipleCertificate
                  submit={isSubmit}
                  data={getCertificatesDetails}
                  isDisable={!edit}
                  defaultValue={certDefaultdata}
                  isRequired={true}
                  type="farmer_certificate"
                />
              </Box>
            </Box>
          </Box>
          <Box
            sx={{ ...detailsstyle.viewMoreContainerfarmerdetailstableheader }}
          >
            <Box
              sx={{
                borderRadius: "8px",
                background: "white",
                marginTop: "2rem",
              }}
            >
              <Box
                sx={{
                  ...detailsstyle.viewMoreContainerfarmerdetailstable,
                }}
              >
                <Typography sx={{ ...detailsstyle.farmerdetailsheaderleft }}>
                  Farmer’s Address Information
                </Typography>
              </Box>
              <Divider />
              {edit ? (
                <Box>
                  <AjAddressNew
                    isDisable={!edit}
                    submit={isSubmit}
                    data={getAddressData}
                    reset={cancel}
                    defaultAddressLine1={
                      farmersDetailsData?.personalDetails?.address_1
                    }
                    defaultAddressLine2={
                      farmersDetailsData?.personalDetails?.address_2
                    }
                    defaultCity={farmersDetailsData?.personalDetails?.city}
                    defaultZipCode={
                      farmersDetailsData?.personalDetails?.zip_code
                    }
                    defaultCountry={
                      farmersDetailsData?.personalDetails?.country
                    }
                    defaultState={farmersDetailsData?.personalDetails?.state}
                  />
                </Box>
              ) : (
                <>
                  <Box
                    sx={{
                      ...detailsstyle.farmerdetailsheadetablecontainer,
                    }}
                  >
                    <Box
                      sx={{
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
                      }}
                    >
                      <AjFarmerDetailInput
                        label="Address 1"
                        value={farmersDetailsData?.personalDetails?.address_1}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                      <AjFarmerDetailInput
                        label="Address 2"
                        value={farmersDetailsData?.personalDetails?.address_2}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
                      }}
                    >
                      <AjFarmerDetailInput
                        label="Country"
                        value={findCountryById(
                          farmersDetailsData?.personalDetails?.country_id
                        )}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                      <AjFarmerDetailInput
                        label="State"
                        value={findStateById(
                          farmersDetailsData?.personalDetails?.state
                        )}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        ...detailsstyle.farmerdetailsheadetablecontainerdetailpair,
                      }}
                    >
                      <AjFarmerDetailInput
                        label="City"
                        value={farmersDetailsData?.personalDetails?.city}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                      <AjFarmerDetailInput
                        label="Zipcode"
                        value={farmersDetailsData?.personalDetails?.zip_code}
                        styles={{
                          ...detailsstyle.farmerdetailsheadetabledetailpair,
                          key: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailkey,
                          },
                          value: {
                            ...detailsstyle.farmerdetailsheadetablecontainerdetailvalue,
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {(!!farmersDetailsData?.productDetails?.length || edit) && (
            <Box
              sx={{ ...detailsstyle.viewMoreContainerfarmerdetailstableheader }}
            >
              <Box
                sx={{
                  borderRadius: "8px",
                  background: "white",
                  marginTop: "2rem",
                }}
              >
                <Box
                  sx={{
                    ...detailsstyle.viewMoreContainerfarmerdetailstable,
                  }}
                >
                  <AjInputLabel
                    styleData={{
                      ...detailsstyle.farmerdetailsheaderleft,
                    }}
                    displayText="Product Listing"
                  />
                </Box>
                <Divider />
                <Box
                  sx={{
                    ...detailsstyle.farmerdetailsheadetablecontainerprodList,
                  }}
                >
                  <AjAddFarmerProduct isRequired={true} forView={edit} />
                </Box>
              </Box>
            </Box>
          )}

          {(!!farmersDetailsData?.landDetails?.length || edit) && (
            <Box
              sx={{ ...detailsstyle.viewMoreContainerfarmerdetailstableheader }}
            >
              <Box
                sx={{
                  borderRadius: "8px",
                  background: "white",
                  marginTop: "2rem",
                }}
              >
                <Box
                  sx={{
                    ...detailsstyle.viewMoreContainerfarmerdetailstable,
                  }}
                >
                  <AjInputLabel
                    styleData={{
                      ...detailsstyle.farmerdetailsheaderleft,
                    }}
                    displayText="Land Listing"
                  />
                </Box>
                <Divider />
                <AjAddFarmerLandDetails
                  forView={!edit}
                  customStyleData={commonStyles.inputLabel}
                />
              </Box>
            </Box>
          )}
        </Box>

        {edit && (
          <Grid sx={styles.btnContainereditpage} container>
            <AjButton
              onClick={handleCancel}
              styleData={commonStyles.cancelBtnStyle}
              variant="outlined"
              displayText="Cancel"
            />
            <AjButton
              onClick={saveChanges}
              variant="contained"
              displayText="Save Changes"
            />
          </Grid>
        )}
      </Grid>
      <AjDialog
        open={openDialog}
        closeModal={setOpenDialog}
        styleData={commonStyles.dialogContainer}
      >
        {cardReq ? (
          <AjConfirmModal
            displayText="Are you sure you want to block your card ?"
            closeModal={setOpenDialog}
            onConfirm={() => handleConfirmBlockCard()}
            icon={
              <img
                src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/website-images/cardblock.png?Expires=1703880906&OSSAccessKeyId=TMP.3KkLSD9bvuJbMJ7w73dyVtLJoYH6oSCQZgt1bV2iE1VmiFDvxCKn3Ayo8f6pwJrY3k88vHXMKor7hbCnXzJ391RUFBbRyA&Signature=cZ%2FhH81fzdBbh0Qtob3BkToorQw%3D"
                alt="cardblock"
              />
            }
          />
        ) : (
          <AjConfirmModal
            displayText="Do you want to request for a bank card ?"
            closeModal={setOpenDialog}
            onConfirm={() => handleConfirmReqCard()}
            icon={
              <img
                src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/website-images/cardreq.png?Expires=1703880747&OSSAccessKeyId=TMP.3KkLSD9bvuJbMJ7w73dyVtLJoYH6oSCQZgt1bV2iE1VmiFDvxCKn3Ayo8f6pwJrY3k88vHXMKor7hbCnXzJ391RUFBbRyA&Signature=OhlnM8xA0KUhAsGjWptWSWCPmWY%3D"
                alt="cardreq"
              />
            }
          />
        )}
      </AjDialog>
    </>
  );
};

export default FarmerDetails;
