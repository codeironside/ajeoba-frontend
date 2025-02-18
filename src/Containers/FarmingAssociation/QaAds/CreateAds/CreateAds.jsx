import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as _ from "lodash";
import { useForm } from "react-hook-form";

import { Grid, Box, IconButton, InputBase } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import AjTypography from "../../../../Components/AjTypography";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AjAdress from "../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../Components/AjButton";

import { commonStyles } from "../../../../Style/CommonStyle";
import { styles } from "./CreateAdsStyle";
import AjChipDropdown from "../../../../Components/AjChipDropdown";
import { QAADS } from "../../../../Routes/Routes";
import { createAdsSchema } from "../../../../validationSchema/createAdsSchema";
import { getProducts } from "../../../../Redux/common/Products/productsActions";
import { getCompaniesAction } from "../../../../Redux/common/QACompany/companyActions";
import {
  productTypeOptions,
  qaCertificateListType,
  sendAdOption,
} from "../../../../Constant/AppConstant";
import { getItemListAction } from "../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import { getUserData } from "../../../../Services/localStorageService";
import { createAdsAction } from "../../../../Redux/FarmingAssociation/QaAds/qaAdsActions";
import {
  getCurrencySymbol,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import AjPhoneNumber from "../../../../Components/AjPhoneNumber/AjPhoneNumber";
import NumberFormat from "react-number-format";

function CreateAds() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = getUserData();

  const [productName, setProductName] = useState();
  const [productType, setProductType] = useState();
  const [certificationType, setCertificationType] = useState([]);
  const [isCertificationTypeUpdated, setIsCertificationTypeUpdated] =
    useState(false);
  const [sendAd, setSendAd] = useState();
  const [requestedFrom, setRequestedFrom] = useState();
  const [isSubmit, setIsSubmit] = useState(false);
  const [countryId, setCountryId] = useState(userData?.country_id);
  const [createData, setCreateData] = useState({});
  const createDataRef = useRef(createData);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAdsSchema),
    mode: "onChange",
  });

  const updateState = (newState) => {
    createDataRef.current = newState;
    setCreateData(newState);
    setIsSubmit(false);
  };

  const products = useSelector((state) => state.products.products);
  const certificationList = useSelector(
    (state) => state.masterManagement.itemList
  );
  const companies = useSelector((state) => state.companies.companies);

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCompaniesAction());
    dispatch(getItemListAction(qaCertificateListType));
  }, []);

  useEffect(() => {
    if (isCertificationTypeUpdated) {
      const certificationArray = certificationType.map(
        (item) => _.find(certificationList?.result, { name: item }).id
      );
      setValue("certificationType", certificationArray, {
        shouldValidate: true,
      });
    }
  }, [certificationType]);

  useEffect(() => {
    const { phoneDatas, addressDatas } = createData;

    if (phoneDatas && addressDatas) handleSubmit(onSubmit)();
  }, [createData]);

  const productNameChangeHandler = (_e, selectedProduct) => {
    let selectedValue = products.find((item) => {
      if (item.productName === selectedProduct.props.value) {
        return item;
      }
    });
    setProductName(selectedValue);
    setValue("productNameId", selectedValue.productId, {
      shouldValidate: true,
    });
  };

  const onCountryCodeSelect = (selectedCountry) => {
    setCountryId(selectedCountry.countryId);
  };

  const typeOfProductChangeHandler = (_e, selectedProductType) => {
    let selectedValue = productTypeOptions.find((item) => {
      if (item.label === selectedProductType.props.value) {
        return item.value;
      }
    });
    setValue("productType", selectedValue.value, {
      shouldValidate: true,
    });
    setProductType(selectedValue.label);
  };

  const sendAdChangeHandler = (_e, selectedAdType) => {
    let selectedValue = sendAdOption.find((item) => {
      if (item.label === selectedAdType.props.value) {
        return item.value;
      }
    });
    setValue("sendAd", selectedValue.value, {
      shouldValidate: true,
    });
    setSendAd(selectedValue.label);
  };
  const requestedFromChangeHandler = (_e, selectedCompany) => {
    let selectedValue = companies?.result?.find((item) => {
      if (item.company_name === selectedCompany.props.value) {
        return item;
      }
    });
    setRequestedFrom(selectedValue);
    setValue("requestedFrom", selectedValue.id, {
      shouldValidate: true,
    });
  };

  const certificationTypeChangeHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsCertificationTypeUpdated(true);
    setCertificationType(value);
  };
  const handleCertificationDelete = (value) => {
    setIsCertificationTypeUpdated(true);
    setCertificationType(certificationType.filter((name) => name !== value));
  };

  const getPhoneNumberDetails = (data) => {
    updateState({ ...createDataRef.current, phoneDatas: data });
  };

  const createAds = () => {
    if (!isCertificationTypeUpdated) handleSubmit(onSubmit)();
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    updateState({ ...createDataRef.current, addressDatas: data });
  };

  const onSubmit = (data) => {
    const { phoneDatas, addressDatas } = createData;

    if (!addressDatas || !phoneDatas) {
      return;
    }
    const createAdData = {
      productId: parseInt(data.productNameId),
      productType: data.productType,
      typeOfCertifications: data.certificationType,
      costPrice: parseFloat(getValues("price")),
      quantity: parseFloat(data.quantity),
      sendAdTo: data.sendAd.toString(),
      addressLine1: addressDatas.addressLine1,
      country: parseInt(addressDatas.country),
      state: parseInt(addressDatas.state),
      city: addressDatas.city,
      contactNumber: phoneDatas.mobileNumber,
      countryId: parseInt(phoneDatas.countryId),
    };
    if (data.requestedFrom) {
      createAdData["requestedTo"] = parseInt(data.requestedFrom);
    }
    if (addressDatas.addressLine2) {
      createAdData["addressLine2"] = addressDatas.addressLine2;
    }
    if (addressDatas.zipCode) {
      createAdData["zipCode"] = parseInt(addressDatas.zipCode);
    }
    dispatch(createAdsAction(createAdData, navigate));
    setIsSubmit(false);
  };

  const backArrowHandler = () => {
    navigate(QAADS);
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
            styleData={commonStyles.mainHeading}
            displayText="Create QA ad"
          />
          <Box
            component="form"
            sx={{
              ...commonStyles.signupFormContainer,
              ...commonStyles.mobileScreenFormContainer,
            }}
          >
            <Box sx={styles.createAdFormFieldContainer}>
              <AjInputLabel
                displayText="Product name"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={products}
                value={productName}
                placeholder="Enter product name"
                onChange={productNameChangeHandler}
                source="productName"
                styleData={styles.dropDownResponsive}
                placeHolder="Select product name"
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.productNameId?.message}
              />
            </Box>
            <Box sx={styles.createAdFormFieldContainer}>
              <AjInputLabel
                displayText="Product type"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                placeholder="Enter product type"
                options={productTypeOptions}
                value={productType}
                source="label"
                onChange={typeOfProductChangeHandler}
                styleData={styles.dropDownResponsive}
                placeHolder="Select product type"
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.productType?.message}
              />
            </Box>
            <Box
              sx={{
                ...styles.createAdFormFieldContainer,
                ...commonStyles.fullWidth,
              }}
            >
              <Box sx={commonStyles.fullWidth}>
                <AjInputLabel
                  displayText="Type of certifications"
                  required
                  id="certificationType"
                  name="certificationType"
                  styleData={commonStyles.inputLabel}
                />
                <AjChipDropdown
                  id="certificationType"
                  name="certificationType"
                  styleData={commonStyles.multiSelectChipDropDown}
                  fullWidth
                  options={certificationList?.result}
                  source="name"
                  value={certificationType}
                  onChange={certificationTypeChangeHandler}
                  onDelete={handleCertificationDelete}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.certificationType?.message}
                />
              </Box>
            </Box>
            <Box sx={styles.createAdFormFieldContainer}>
              <AjInputLabel
                displayText={`Price ${getCurrencySymbol(userData?.currency)}(${
                  userData?.currency
                })`}
                required
                styleData={commonStyles.inputLabel}
              />
              <NumberFormat
                customInput={InputBase}
                thousandSeparator={true}
                prefix={`${getCurrencySymbol(userData?.currency)} `}
                style={{
                  ...commonStyles.inputStyle,
                }}
                placeholder="Enter Price"
                decimalScale={2}
                onValueChange={(value) =>
                  setValue("price", value.value, { shouldValidate: true })
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.price?.message}
              />
            </Box>
            <Box sx={styles.createAdFormFieldContainer}>
              <AjInputLabel
                displayText={`Quantity ${
                  productName
                    ? `(${textCapitalize(productName?.unit_of_measurement)})`
                    : ""
                }`}
                required
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                fullWidth
                id="quantity"
                name="quantity"
                placeholder="Enter Quantity"
                sx={commonStyles.inputStyle}
                {...register("quantity")}
                error={errors.quantity ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.quantity?.message}
              />
            </Box>

            <Box sx={commonStyles.fullWidth}>
              <AjPhoneNumber
                label="Contact No."
                customStyle={commonStyles.marginTop20}
                defaultValue={userData?.mobile_no}
                submit={isSubmit}
                data={getPhoneNumberDetails}
                defaultCountryId={userData?.country_id}
                onCountryCodeSelect={onCountryCodeSelect}
              />
            </Box>
            <Box sx={styles.createAdFormFieldContainer}>
              <AjInputLabel
                displayText="Send Ad to"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={sendAdOption}
                value={sendAd}
                source="label"
                onChange={sendAdChangeHandler}
                styleData={styles.dropDownResponsive}
                placeHolder="Select Ad"
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.sendAd?.message}
              />
            </Box>
            {sendAd === "Specific company" ? (
              <Box sx={styles.createAdFormFieldContainer}>
                <AjInputLabel
                  displayText="Requested from"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjDropDown
                  options={companies.result}
                  value={requestedFrom}
                  source="company_name"
                  onChange={requestedFromChangeHandler}
                  styleData={styles.dropDownResponsive}
                  placeHolder="Requested from"
                  isPlaceholderCapiltalize={false}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.requestedFrom?.message}
                />
              </Box>
            ) : (
              ""
            )}
            <AjAdress
              customStyle={commonStyles.marginTop20}
              submit={isSubmit}
              data={getAddressData}
              defaultCountry={countryId}
              isStateReset={true}
            />
          </Box>
          <Grid sx={styles.createAdSaveBtnContainer}>
            <AjButton
              onClick={createAds}
              variant="contained"
              displayText="Create Ad"
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default CreateAds;
