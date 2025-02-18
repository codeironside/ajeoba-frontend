import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Grid,
  Checkbox,
  Typography,
  FormControlLabel,
} from "@mui/material";
import * as Yup from "yup";
import * as _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import AjDatePicker from "../AjDatePicker";
import AjButton from "../AjButton";
import AjTypography from "../AjTypography";
import AjChipDropdown from "../AjChipDropdown";
import AjInputLabel from "../AjInputLabel";
import AjCountry from "../AjCountry/AjCountry";
import AjDropdown from "../AjDropdown/AjDropDown";
import { AjRating } from "../AjRating";
import {
  getProducts,
  getProductsOPenMarketplace,
} from "../../Redux/common/Products/productsActions";
import { getStates } from "../../Redux/common/States/getStateActions";

import { getTodaysDate } from "../../Services/commonService/commonService";
import { styles } from "./AjFilterStyles";
import { commonStyles } from "../../Style/CommonStyle";
import {
  distanceOptions,
  productTypeOptions,
  allProductOptions,
  qualityOptions,
  statusOptions,
  kycStatusOptions,
  subStatusOptions,
} from "../../Constant/AppConstant";
import {
  getMasterDataAction,
} from "../../Redux/common/GetMasterData/getMasterDataActions";
import {
  getUserAccountData,
  getUserData,
} from "../../Services/localStorageService";
import { getInputListAction } from "../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { getFarmerListAction } from "../../Redux/FarmingAssociation/Farmers/farmersActions";
import { getFarmingAssociationListAction } from "../../Redux/SuperAdmin/UserManagement/FarmingAssociation/farmingAssociationActions";
import { getAggregatorsListAction } from "../../Redux/SuperAdmin/UserManagement/Aggregators/aggregatorsActions";
import { ROLES } from "../../Constant/RoleConstant";
import { getInputSupplierListAction } from "../../Redux/SuperAdmin/UserManagement/InputSupplier/inputSupplierActions";
import AjCheckbox from "../AjCheckBox";

const AjFilters = ({
  farmerNameFilter,
  associationNameFilter,
  aggregationNameFilter,
  inputSupplierNameFilter,
  dateFilter,
  productFilter,
  qualityFilter,
  certificateFilter,
  countryFilter,
  stateFilter,
  statusFilter,
  productTypeFilter,
  allproductTypeFilter, //for open marketplace
  ratingFilter,
  distanceFilter,
  inputFilter,
  kycStatusFilter,
  subscriptionStatusFilter,
  singleDateFilter,
  filterData,
  filterSelected,
  adTypeOptions = null,
  productsBasedOnUserProfile = false,
  inputsBasedOnUserProfile = false,
  ...props
}) => {
  let filterSchema = Yup.object({});
  const userAccountData = getUserAccountData();
  const userData = getUserData();

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [isInputValueUpdated, setIsInputValueUpdated] = useState(false);
  const [farmerValue, setFarmerValue] = useState([]);
  const [isFarmerValueUpdated, setIsFarmerValueUpdated] = useState(false);
  const [associationValue, setAssociationValue] = useState([]);
  const [isAssociationValueUpdated, setIsAssociationValueUpdated] =
    useState(false);
  const [aggregationValue, setAggregationValue] = useState([]);
  const [isAggregationValueUpdated, setIsAggregationValueUpdated] =
    useState(false);
  const [inputSupplierValue, setInputSupplierValue] = useState([]);
  const [isInputSupplierValueUpdated, setIsInputSupplierValueUpdated] =
    useState(false);
  const [qualityValue, setQualityValue] = useState([]);
  const [isQualityValueUpdated, setIsQualityValueUpdated] = useState(false);
  const [stateValue, setStateValue] = useState([]);
  const [isChipStateValueUpdated, setIsStateChipValueUpdated] = useState(false);
  const [country, setCountry] = useState(null);
  const [status, setStatus] = useState();
  const [productType, setProductType] = useState(null);
  const [rating, setRating] = useState(null);
  const [distance, setDistance] = useState(null);
  const [singleDate, setSingleDate] = useState(null);
  const [isKycVerified, setIsKycVerified] = useState(null);
  const [isSubscriptionActive, setIsSubscriptionActive] = useState(null);

  const [selectedCodeOfCountry, setSelectedCodeOfCountry] = useState(null);
  const [certificateValue, setCertificateValue] = useState([]);
  const [isCertificateValueUpdated, setIsCertificateValueUpdated] =
    useState(false);
  const [userProfileProducts, setUserProfileProducts] = useState(null);
  const [userProfileInputs, setUserProfileInputs] = useState(null);
  
  const tempUserId = useSelector((state) => state.otp.tempUserId);
  const products = useSelector((state) => state.products.products || "");
  const stateMenuOptions = useSelector(
    (state) => state.states.stateMenuOptions || null
  );

  const farmerList = useSelector((state) => state.farmers.farmerList);

  const associationList = useSelector(
    (state) => state.farmingAssociation.farmingAssociationList
  );

  const aggregationList = useSelector(
    (state) => state.aggregators.aggregatorsList
  );

  const inputSupplierList = useSelector(
    (state) => state.inputSupplier.inputSupplierList
  );

  const certificatesOptions = useSelector(
    (state) => state.masterData.masterData
  );

  const inputMasterData = useSelector(
    (state) => state.inputMaster.inputList
  ).result;

  const dispatch = useDispatch();

  useEffect(() => {
    if (startDate !== null) {
      setValue("startDate", startDate, { shouldValidate: true });
      setValue(
        "duration",
        { ...watch()?.duration, startDate },
        { shouldValidate: true }
      );
    } else if (filterData && filterData.startDate) {
      setStartDate(new Date(filterData.startDate));
    }

    if (endDate !== null) {
      setValue("endDate", endDate, { shouldValidate: true });
      setValue(
        "duration",
        { ...watch()?.duration, endDate },
        { shouldValidate: true }
      );
    } else if (filterData && filterData.endDate) {
      setEndDate(new Date(filterData.endDate));
    }

    if (isChipValueUpdated) {
      const productArray = chipValue.map(
        (item) => _.find(products, { productName: item }).productId
      );
      setValue("products", productArray, { shouldValidate: true });
    }

    if (isInputValueUpdated) {
      const inputArray = inputValue.map(
        (item) => _.find(inputMasterData, { name: item }).id
      );
      setValue("inputs", inputArray, { shouldValidate: true });
    }

    if (isFarmerValueUpdated) {
      const farmerArray = [];
      if (farmerValue) {
        farmerValue.forEach((item) => {
          farmerArray.push(item.id);
        });
      }
      setValue("farmers", farmerArray, { shouldValidate: true });
    }

    if (isAssociationValueUpdated) {
      const associationArray = [];
      if (associationValue) {
        associationValue.forEach((item) => {
          associationArray.push(item.id);
        });
      }
      setValue("associationName", associationArray, { shouldValidate: true });
    }

    if (isAggregationValueUpdated) {
      const aggregationArray = [];
      if (aggregationValue) {
        aggregationValue.forEach((item) => {
          aggregationArray.push(item.id);
        });
      }
      setValue("aggregationName", aggregationArray, { shouldValidate: true });
    }
    if (isInputSupplierValueUpdated) {
      const inputSupplierArray = [];
      if (inputSupplierValue) {
        inputSupplierValue.forEach((item) => {
          inputSupplierArray.push(item.user_id);
        });
      }
      setValue("inputSupplierName", inputSupplierArray, {
        shouldValidate: true,
      });
    }

    if (isQualityValueUpdated) {
      const qualityArray = qualityValue.map((item) =>
        parseInt(_.find(qualityOptions, { label: item }).value)
      );
      setValue("quality", qualityArray, { shouldValidate: true });
    }

    if (isCertificateValueUpdated) {
      const certificateArray = certificateValue.map((item) =>
        parseInt(_.find(certificatesOptions, { name: item }).id)
      );
      setValue("certificate", certificateArray, { shouldValidate: true });
    }
    if (isChipStateValueUpdated) {
      const stateVal = stateValue.map(
        (item) => _.find(stateMenuOptions, { stateName: item }).stateId
      );
      setValue("states", stateVal, { shouldValidate: true });
    }

    setValue("isKycVerified", isKycVerified, { shouldValidate: true });

    setValue("isSubscriptionActive", isSubscriptionActive, {
      shouldValidate: true,
    });

    if (singleDate !== null) {
      setValue("singleDate", singleDate, { shouldValidate: true });
    }
  }, [
    startDate,
    endDate,
    chipValue,
    stateValue,
    qualityValue,
    certificateValue,
    inputValue,
    singleDate,
    farmerValue,
    associationValue,
    aggregationValue,
    inputSupplierValue,
    ,
    isSubscriptionActive,
  ]);

  useEffect(() => {
    if (!products) return;
    if (productsBasedOnUserProfile) {
      const productItems = [];
      userAccountData.products.forEach((item) => {
        productItems.push(_.find(products, { productId: item }));
      });
      setUserProfileProducts(productItems);
    }
  }, [products]);

  useEffect(() => {
    if (!inputMasterData) return;
    if (inputsBasedOnUserProfile) {
      const inputItems = [];
      userAccountData.inputs.forEach((item) => {
        inputItems.push(_.find(inputMasterData, { id: item }));
      });
      setUserProfileInputs(inputItems);
    }
  }, [inputMasterData]);

  const getProductsBasedonSource = (productsSource) => {
    const productArray = [];
    const productNames = [];
    if (productsSource) {
      if (filterData?.products) {
        filterData.products.forEach((item) => {
          const { productId, productName } = _.find(productsSource, {
            productId: item,
          });
          productArray.push(productId);
          productNames.push(productName);
        });
      }
    }
    setChipValue(productNames);
    setValue("products", productArray, { shouldValidate: true });
  };

  const getInputsBasedonSource = (inputSource) => {
    const inputArray = [];
    const inputNames = [];
    if (inputSource) {
      if (filterData?.inputs) {
        filterData.inputs.forEach((item) => {
          const { id, name } = _.find(inputMasterData, {
            id: item,
          });
          inputArray.push(id);
          inputNames.push(name);
        });
      }
    }
    setInputValue(inputNames);
    setValue("inputs", inputArray, { shouldValidate: true });
  };

  useEffect(() => {
    if (productsBasedOnUserProfile) {
      getProductsBasedonSource(userProfileProducts);
    } else {
      getProductsBasedonSource(products);
    }

    if (inputsBasedOnUserProfile) {
      getInputsBasedonSource(userProfileInputs);
    } else {
      getInputsBasedonSource(inputMasterData);
    }

    const qualityArray = [];
    const qualityName = [];

    if (filterData?.quality) {
      filterData.quality.forEach((item) => {
        const { label, value } = _.find(qualityOptions, {
          value: item.toString(),
        });
        qualityArray.push(parseInt(value));
        qualityName.push(label);
      });
    }

    setQualityValue(qualityName);
    setValue("quality", qualityArray, { shouldValidate: true });
    const certificateArray = [];
    const certificateName = [];

    if (filterData?.certificate) {
      filterData.certificate.forEach((item) => {
        const { id, name } = _.find(certificatesOptions, {
          id: item,
        });
        certificateArray.push(id);
        certificateName.push(name);
      });
    }

    setCertificateValue(certificateName);
    setValue("certificate", certificateArray, { shouldValidate: true });

    if (filterData?.status) {
      const statusState = _.find(adTypeOptions || statusOptions, {
        value: filterData?.status,
      }).label;
      setStatus(statusState);
      setValue("status", filterData?.status, { shouldValidate: true });
    }
    if (filterData?.productType) {
      const productTypeState = _.find(productTypeOptions, {
        value: filterData?.productType,
      }).label;
      setProductType(productTypeState);
      setValue("productType", filterData?.productType, {
        shouldValidate: true,
      });
    }
    if (filterData?.allproductType) {
      const allproductTypeState = _.find(allProductOptions, {
        value: filterData?.allproductType,
      }).label;
      setProductType(allproductTypeState);
      setValue("productType", filterData?.allproductType, {
        shouldValidate: true,
      });
    }
    if (filterData?.rating) {
      setRating(filterData?.rating);
      setValue("rating", filterData?.rating, {
        shouldValidate: true,
      });
    }
    if (filterData?.distance) {
      const distanceTypeState = _.find(distanceOptions, {
        label: filterData?.distance,
      });
      setDistance(distanceTypeState.label);
      setValue("distance", filterData?.distance, { shouldValidate: true });
    }

    if (filterData?.singleDate) {
      setSingleDate(filterData?.singleDate);
      setValue("singleDate", filterData?.singleDate, { shouldValidate: true });
    }
    const farmerName = [];
    const farmerArray = [];
    if (filterData?.farmers) {
      filterData.farmers.forEach((item) => {
        const farmer = _.find(farmerList?.result, {
          id: item,
        });
        farmerArray.push(farmer.id);
        farmerName.push(farmer);
      });
    }
    setFarmerValue(farmerName);
    setValue("farmers", farmerArray, { shouldValidate: true });

    const associationName = [];
    const associationArray = [];
    if (filterData?.associationName) {
      filterData.associationName.forEach((item) => {
        const association = _.find(associationList?.result, {
          id: item,
        });
        associationArray.push(association.id);
        associationName.push(association);
      });
    }
    setAssociationValue(associationName);
    setValue("associationName", associationArray, { shouldValidate: true });

    const aggregationName = [];
    const aggregationArray = [];
    if (filterData?.aggregationName) {
      filterData.aggregationName.forEach((item) => {
        const aggregation = _.find(aggregationList?.result, {
          id: item,
        });
        aggregationArray.push(aggregation.id);
        aggregationName.push(aggregation);
      });
    }
    setAggregationValue(aggregationName);
    setValue("aggregationName", aggregationArray, { shouldValidate: true });

    const inputSupplierName = [];
    const inputSupplierArray = [];
    if (filterData?.inputSupplierName) {
      filterData.inputSupplierName.forEach((item) => {
        const inputSupplier = _.find(inputSupplierList?.result, {
          id: item,
        });
        inputSupplierArray.push(inputSupplier.id);
        inputSupplierName.push(inputSupplier);
      });
    }
    setInputSupplierValue(inputSupplierName);
    setValue("inputSupplierName", inputSupplierArray, { shouldValidate: true });
  }, []);

  useEffect(() => {
    const stateArray = [];
    const stateNames = [];

    if (filterData?.states) {
      filterData.states.forEach((id) => {
        const { stateId, stateName } = _.find(stateMenuOptions, {
          stateId: id,
        });
        stateArray.push(stateId);
        stateNames.push(stateName);
      });
    }

    setStateValue(stateNames);
    setValue("states", stateArray, { shouldValidate: true });
  }, [country]);

  useEffect(() => {
    if (
      userData?.role_id === ROLES.SUPER_ADMIN ||
      userData?.role_id === ROLES.ADMIN
    ) {
      dispatch(getFarmingAssociationListAction());
      dispatch(getAggregatorsListAction());
      //isAdmin key
      dispatch(getInputSupplierListAction(null, true));
    }
    if (userData?.role_id === ROLES.FARMING_ASSOCIATION) {
      dispatch(getInputSupplierListAction(null, false));
      dispatch(getFarmerListAction({ type: "FARMER" }));
    }
    if (tempUserId) {
      dispatch(getProducts());
      dispatch(getInputListAction());
    }
    dispatch(getMasterDataAction({itemType: "FARMER_CERTIFICATE"}));
  }, []);

  useEffect(() => {
    if (selectedCodeOfCountry) dispatch(getStates(selectedCodeOfCountry));
  }, [selectedCodeOfCountry]);

  if (dateFilter) {
    const dateFilterSchema = Yup.object().shape({
      duration: Yup.object().when(["startDate", "endDate"], {
        is: (startDateValue, endDateValue) => !startDateValue && !endDateValue,
        then: Yup.object().notRequired(),
        otherwise: Yup.object().shape({
          startDate: Yup.string().required("Start date is required"),
          endDate: Yup.string().required("End date is required"),
        }),
      }),
    });
    filterSchema = filterSchema.concat(dateFilterSchema);
  }
  if (productFilter) {
    const productFilterSchema = Yup.object({
      products: Yup.array(),
    });
    filterSchema = filterSchema.concat(productFilterSchema);
  }
  if (inputFilter) {
    const inputFilterSchema = Yup.object({
      inputs: Yup.array(),
    });
    filterSchema = filterSchema.concat(inputFilterSchema);
  }
  if (farmerNameFilter) {
    const farmerFilterSchema = Yup.object({
      farmers: Yup.array(),
    });
    filterSchema = filterSchema.concat(farmerFilterSchema);
  }
  if (associationNameFilter) {
    const associationFilterSchema = Yup.object({
      associationName: Yup.array(),
    });
    filterSchema = filterSchema.concat(associationFilterSchema);
  }
  if (aggregationNameFilter) {
    const aggregationFilterSchema = Yup.object({
      aggregationName: Yup.array(),
    });
    filterSchema = filterSchema.concat(aggregationFilterSchema);
  }
  if (inputSupplierNameFilter) {
    const inputSupplierFilterSchema = Yup.object({
      inputSupplierName: Yup.array(),
    });
    filterSchema = filterSchema.concat(inputSupplierFilterSchema);
  }
  if (countryFilter) {
    const countryFilterSchema = Yup.object({
      country: Yup.string(),
    });
    filterSchema = filterSchema.concat(countryFilterSchema);
  }
  if (stateFilter) {
    const stateFilterSchema = Yup.object({
      states: Yup.array(),
    });
    filterSchema = filterSchema.concat(stateFilterSchema);
  }
  if (kycStatusFilter) {
    const kycStatusFilterSchema = Yup.object({
      kyc: Yup.bool(),
    });
    filterSchema = filterSchema.concat(kycStatusFilterSchema);
  }
  if (subscriptionStatusFilter) {
    const subscriptionStatusFilterSchema = Yup.object({
      subscription: Yup.bool(),
    });
    filterSchema = filterSchema.concat(subscriptionStatusFilterSchema);
  }
  if (qualityFilter) {
    const qualityFilterSchema = Yup.object({
      quality: Yup.array(),
    });
    filterSchema = filterSchema.concat(qualityFilterSchema);
  }
  if (certificateFilter) {
    const certificateFilterSchema = Yup.object({
      certificate: Yup.array(),
    });
    filterSchema = filterSchema.concat(certificateFilterSchema);
  }
  if (statusFilter) {
    const statusFilterSchema = Yup.object({
      status: Yup.string(),
    });
    filterSchema = filterSchema.concat(statusFilterSchema);
  }
  if (productTypeFilter) {
    const productTypeFilterSchema = Yup.object({
      productType: Yup.string(),
    });
    filterSchema = filterSchema.concat(productTypeFilterSchema);
  }
  if (allproductTypeFilter) {
    const allproductTypeFilterSchema = Yup.object({
      allproductType: Yup.string(),
    });
    filterSchema = filterSchema.concat(allproductTypeFilterSchema);
  }
  if (ratingFilter) {
    const ratingFilterSchema = Yup.object({
      rating: Yup.string(),
    });
    filterSchema = filterSchema.concat(ratingFilterSchema);
  }
  if (distanceFilter) {
    const distanceFilterSchema = Yup.object({
      distance: Yup.string(),
    });
    filterSchema = filterSchema.concat(distanceFilterSchema);
  }
  if (singleDateFilter) {
    const singleDateFilterSchema = Yup.object().shape({
      singleDate: Yup.string().required("Date is required"),
    });
    filterSchema = filterSchema.concat(singleDateFilterSchema);
  }
  const {
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(filterSchema),
    mode: "onChange",
  });

  const startDateSelectionHandler = (date) => {
    if (date === null) {
      setStartDate("");
    } else {
      setStartDate(date);
    }
  };

  const endDateSelectionHandler = (date) => {
    if (date === null) {
      setEndDate("");
    } else {
      setEndDate(date);
    }
  };
  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsChipValueUpdated(true);
    setChipValue(value);
  };

  const onChangeDropdownInputHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsInputValueUpdated(true);
    setInputValue(value);
  };

  const onChangeDropdownQualityHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsQualityValueUpdated(true);
    setQualityValue(value);
  };

  const onChangeDropdownFarmersHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsFarmerValueUpdated(true);
    setFarmerValue(value);
  };

  const onChangeDropdownAssociationNameHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsAssociationValueUpdated(true);
    setAssociationValue(value);
  };

  const onChangeDropdownAggregationNameHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsAggregationValueUpdated(true);
    setAggregationValue(value);
  };
  const onChangeDropdownInputSupplierNameHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsInputSupplierValueUpdated(true);
    setInputSupplierValue(value);
  };

  const onChangeDropdownCertificateHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsCertificateValueUpdated(true);
    setCertificateValue(value);
  };

  const onChangeDropDownStateHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsStateChipValueUpdated(true);
    setStateValue(value);
  };

  const countryChangeHandler = (selectedCountry) => {
    setCountry(selectedCountry.countryId);
    setValue("country", selectedCountry.countryId, { shouldValidate: true });

    if (selectedCountry.countryId !== filterData?.country)
      filterSelected({ ...filterData, states: [] });

    setSelectedCodeOfCountry(selectedCountry.codeOfCountry);
  };

  const statusChangeHandler = (selecetedStatus) => {
    const statusValue = _.find(adTypeOptions || statusOptions, {
      label: selecetedStatus.target.value,
    }).value;
    setStatus(selecetedStatus.target.value);
    setValue("status", statusValue, { shouldValidate: true });
  };

  const productTypeChangeHandler = (selectedProductType) => {
    const productTypeValue = _.find(productTypeOptions, {
      label: selectedProductType.target.value,
    }).value;
    setProductType(selectedProductType.target.value);
    setValue("productType", productTypeValue, { shouldValidate: true });
  };
  const allproductTypeChangeHandler = (event) => {
    const selectedallProductType = event.target.value;
    const allproductTypeValue = _.find(allProductOptions, {
      label: selectedallProductType,
    });
    setProductType(selectedallProductType);
    setValue("allproductType", allproductTypeValue, { shouldValidate: true });
  };

  const ratingChangeHanlder = (selectedRatng) => {
    setRating(selectedRatng.target.value);
    setValue("rating", selectedRatng.target.value, { shouldValidate: true });
  };

  const distanceChangeHandler = (selectedDistance) => {
    const distanceType = _.find(distanceOptions, {
      label: selectedDistance.target.value,
    }).label;
    setDistance(selectedDistance.target.value);
    setValue("distance", distanceType, {
      shouldValidate: true,
    });
  };

  const singleDateSelectionHandler = (date) => {
    if (date === null) {
      setSingleDate("");
    } else {
      setSingleDate(date);
    }
  };

  useEffect(() => {
    if (isKycVerified === "Verified") {
      setValue("isKycVerified", true, { shouldValidate: true });
    } else if (isKycVerified === "UnVerified") {
      setValue("isKycVerified", false, { shouldValidate: true });
    }
  }, [isKycVerified]);

  useEffect(() => {
    if (isSubscriptionActive === "Active") {
      setValue("isSubscriptionActive", true, { shouldValidate: true });
    } else if (isSubscriptionActive === "InActive") {
      setValue("isSubscriptionActive", false, { shouldValidate: true });
    }
  }, [isSubscriptionActive]);

  const kycStatusHandler = (selectedKycStatus) => {
    const kycStatus = _.find(kycStatusOptions, {
      label: selectedKycStatus.target.value,
    }).value;
    setIsKycVerified(selectedKycStatus.target.value);
    setValue("kycStatus", kycStatus, { shouldValidate: true });
  };

  const subscriptionStatusHandler = (selectedSubStatus) => {
    const subStatus = _.find(subStatusOptions, {
      label: selectedSubStatus.target.value,
    }).value;
    setIsSubscriptionActive(selectedSubStatus.target.value);
    setValue("subStatus", subStatus, { shouldValidate: true });
  };

  const handleDelete = (value) => {
    setIsChipValueUpdated(true);
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const handleInputDelete = (value) => {
    setIsInputValueUpdated(true);
    setInputValue(inputValue.filter((name) => name !== value));
  };

  const handleQualityDelete = (value) => {
    setIsQualityValueUpdated(true);
    setQualityValue(qualityValue.filter((name) => name !== value));
  };
  const handleCertificateDelete = (value) => {
    setIsCertificateValueUpdated(true);
    setCertificateValue(certificateValue.filter((name) => name !== value));
  };

  const handleStateDelete = (value) => {
    setIsStateChipValueUpdated(true);
    setStateValue(stateValue.filter((name) => name !== value));
  };

  const handleFarmerDelete = (value) => {
    setIsFarmerValueUpdated(true);
    setFarmerValue(farmerValue.filter((first_name) => first_name !== value));
  };

  const handleAssociationDelete = (value) => {
    setIsAssociationValueUpdated(true);
    setAssociationValue(
      associationValue.filter((first_name) => first_name !== value)
    );
  };

  const handleAggregationDelete = (value) => {
    setIsAggregationValueUpdated(true);
    setAggregationValue(
      aggregationValue.filter((first_name) => first_name !== value)
    );
  };

  const handleInputSupplierDelete = (value) => {
    setIsInputSupplierValueUpdated(true);
    setInputSupplierValue(
      inputSupplierValue.filter((first_name) => first_name !== value)
    );
  };

  const onSubmit = (data) => {
    filterSelected({ ...filterData, ...data });
    props.cancel(false);
  };

  return (
    <>
      <Box sx={styles.mainBox}>
        {dateFilter ? (
          <Box sx={styles.filterScrollWrapper}>
            <Box>
              {" "}
              <AjTypography
                styleData={styles.headingLabel}
                displayText={"Select date range"}
              />
            </Box>
            <Box sx={styles.datesBox}>
              <Box sx={styles.dateWrapper}>
                {" "}
                <AjTypography
                  styleData={commonStyles.inputLabel}
                  displayText={"From"}
                />
                <AjDatePicker
                  value={startDate}
                  maxDate={endDate}
                  dateSelectHandler={startDateSelectionHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.duration?.startDate?.message}
                />
              </Box>

              <Box sx={styles.dateWrapper}>
                {" "}
                <AjTypography
                  styleData={commonStyles.inputLabel}
                  displayText={"To"}
                />
                <AjDatePicker
                  value={endDate}
                  minDate={startDate}
                  dateSelectHandler={endDateSelectionHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.duration?.endDate?.message}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
        {productTypeFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              ...styles.fieldMargin,
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Product Type"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={styles.dropdownStyle}
              options={productTypeOptions}
              source="label"
              onChange={productTypeChangeHandler}
              value={productType}
              placeHolder="Select product type"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )}
        {/* {allproductTypeFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              ...styles.fieldMargin,
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Product Type"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={styles.dropdownStyle}
              options={allProductOptions}
              source="label"
              onChange={allproductTypeChangeHandler}
              value={productType}
              placeHolder="Select product type"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )} */}
        {allproductTypeFilter && (
          <Grid
            sx={{
              // ...commonStyles.filtercheckboxmarkeplace,
              // ...styles.filterChildrenStyle,
              // ...styles.filterScrollWrapper,
              // ...styles.fieldMargin,
              // ...props.productLabelStyle,
            }}
          >
            {/* <Box sx={styles.headingLabel}>
              <Typography variant="h6">Product Type</Typography>
            </Box> */}
            {allProductOptions.map((option) => (
              <AjCheckbox
                key={option.value}
                label={option.label}
                id={option.id}
                name={option.name}
                value={option.value}
                onChange={(event) => allproductTypeChangeHandler(event)}
                headingLabel={option.headingLabel}
              />
            ))}
          </Grid>
        )}
        {productFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Products"
              id="products"
              name="products"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="products"
              name="products"
              value={chipValue}
              onChange={onChangeDropdownChipHandler}
              fullWidth
              onDelete={handleDelete}
              options={userProfileProducts || products}
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {farmerNameFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Farmers"
              id="farmers"
              name="farmers"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="farmers"
              name="farmers"
              value={farmerValue}
              disableSourceForValue={true}
              onChange={onChangeDropdownFarmersHandler}
              fullWidth
              onDelete={handleFarmerDelete}
              options={farmerList?.result}
              source="first_name"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {associationNameFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Association Name"
              id="associationName"
              name="associationName"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="associationName"
              name="associationName"
              value={associationValue}
              disableSourceForValue={true}
              onChange={onChangeDropdownAssociationNameHandler}
              fullWidth
              onDelete={handleAssociationDelete}
              options={associationList?.result}
              source="association_name"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {aggregationNameFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Aggregation Name"
              id="aggregationName"
              name="aggregationName"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="aggregationName"
              name="aggregationName"
              value={aggregationValue}
              disableSourceForValue={true}
              onChange={onChangeDropdownAggregationNameHandler}
              fullWidth
              onDelete={handleAggregationDelete}
              options={aggregationList?.result}
              source="first_name"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {inputSupplierNameFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.productLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Input Supplier Name"
              id="inputSupplierName"
              name="inputSupplierName"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="inputSupplierName"
              name="inputSupplierName"
              value={inputSupplierValue}
              disableSourceForValue={true}
              onChange={onChangeDropdownInputSupplierNameHandler}
              fullWidth
              onDelete={handleInputSupplierDelete}
              options={inputSupplierList?.result}
              source="input_supplier_name"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {inputFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
              ...props.inputLabelStyle,
            }}
          >
            <AjInputLabel
              displayText="Inputs"
              id="inputs"
              name="inputs"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="inputs"
              name="inputs"
              value={inputValue}
              onChange={onChangeDropdownInputHandler}
              fullWidth
              onDelete={handleInputDelete}
              options={userProfileInputs || inputMasterData}
              styleData={commonStyles.multiSelectChipDropDown}
              source="name"
            />
          </Grid>
        )}
        {qualityFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="Quality"
              id="quality"
              name="quality"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="quality"
              name="quality"
              value={qualityValue}
              onChange={onChangeDropdownQualityHandler}
              fullWidth
              onDelete={handleQualityDelete}
              options={qualityOptions}
              source="label"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {certificateFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="Certification"
              id="certificate"
              name="certificate"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="certificate"
              name="certificate"
              value={certificateValue}
              onChange={onChangeDropdownCertificateHandler}
              fullWidth
              onDelete={handleCertificateDelete}
              options={certificatesOptions}
              source="name"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}
        {countryFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              ...styles.fieldMargin,
              ...props.countryLabelStyle,
            }}
          >
            <AjCountry
              defaultValue={parseInt(filterData?.country)}
              displayText="Country"
              required={false}
              onCountrySelect={countryChangeHandler}
              labelStyle={styles.headingLabel}
            />
          </Grid>
        )}
        {stateFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="State"
              id="state"
              name="state"
              styleData={styles.headingLabel}
            />
            <AjChipDropdown
              id="state"
              name="state"
              onChange={onChangeDropDownStateHandler}
              fullWidth
              value={stateValue}
              onDelete={handleStateDelete}
              options={stateMenuOptions}
              source="stateName"
              styleData={commonStyles.multiSelectChipDropDown}
            />
          </Grid>
        )}

        {kycStatusFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="KYC Status"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={{
                "@media (max-width:37.5rem)": { maxWidth: "21.25rem" },
              }}
              options={kycStatusOptions}
              source="label"
              onChange={kycStatusHandler}
              value={isKycVerified}
              placeHolder="Select status"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )}

        {subscriptionStatusFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="Subscription Status"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={{
                "@media (max-width:37.5rem)": { maxWidth: "21.25rem" },
              }}
              options={subStatusOptions}
              source="label"
              onChange={subscriptionStatusHandler}
              value={isSubscriptionActive}
              placeHolder="Select status"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )}

        {statusFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              marginTop: "-3.125rem",
            }}
          >
            <AjInputLabel
              displayText="Status"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={{
                "@media (max-width:37.5rem)": { maxWidth: "21.25rem" },
              }}
              options={adTypeOptions || statusOptions}
              source="label"
              onChange={statusChangeHandler}
              value={status}
              placeHolder="Select status"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )}
        {ratingFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              ...styles.fieldMargin,
            }}
          >
            <AjInputLabel
              displayText="Rating"
              styleData={[styles.headingLabel, styles.ratingText]}
            />
            <AjRating
              defaultValue={rating}
              onChange={ratingChangeHanlder}
              styleData={styles.ratingStar}
            />
          </Grid>
        )}
        {distanceFilter && (
          <Grid
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.filterChildrenStyle,
              ...styles.filterScrollWrapper,
              ...styles.fieldMargin,
            }}
          >
            <AjInputLabel
              displayText="Distance"
              styleData={styles.headingLabel}
            />
            <AjDropdown
              styleData={styles.dropdownStyle}
              options={distanceOptions}
              source="label"
              onChange={distanceChangeHandler}
              value={distance}
              placeHolder="Select distance"
              productTypeStyle={props.productTypeStyle}
            />
          </Grid>
        )}
        {singleDateFilter ? (
          <Box sx={styles.filterScrollWrapper}>
            <Box>
              <AjTypography
                styleData={styles.headingLabel}
                displayText={"Select date "}
              />
            </Box>
            <Box sx={styles.datesBox}>
              <Box sx={styles.dateWrapper}>
                <AjDatePicker
                  value={singleDate}
                  maxDate={getTodaysDate()}
                  dateSelectHandler={singleDateSelectionHandler}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors?.singleDate?.message}
                />
              </Box>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
      <Box sx={commonStyles.buttonBox}>
        <AjButton
          variant="text"
          displayText="Cancel"
          styleData={{
            ...commonStyles.buttonStyle,
            ...commonStyles.cancelButton,
          }}
          onClick={() => props.cancel(false)}
        />

        <AjButton
          variant="text"
          styleData={{
            ...commonStyles.buttonStyle,
            ...commonStyles.applyFilterButton,
          }}
          displayText="Apply Filter"
          onClick={handleSubmit(onSubmit)}
        />
      </Box>
    </>
  );
};

export default AjFilters;
