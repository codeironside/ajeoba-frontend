import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, InputBase } from "@mui/material";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { styles } from "../Containers/SignUp/SignUpAccountDetails/SignUpAccountDetailsStyles";
import { getProducts } from "../Redux/common/Products/productsActions";
import { getProfileVerificationDataAction } from "../Redux/common/ProfileVerification/profileVerificationActions";
import { signUpAssociationDetails } from "../Redux/signUpFarmingAssociationDetails/signUpFarmingAssociationDetailsActions";
import {
  getUserAccountData,
  getUserData,
} from "../Services/localStorageService";
import { commonStyles, customCommonStyles } from "../Style/CommonStyle";
import { signUpFarmingAssociationDetails } from "../validationSchema/signUpFarmingAssociationDetails";
import AjAdress from "./AjAdress/AjAdress";
import AjButton from "./AjButton";
import AjChipDropdown from "./AjChipDropdown";
import AjDocumentDownloader from "./AjDocumentDownloader";
import AjDocumentUploader from "./AjDocumentUploader";
import AjInputLabel from "./AjInputLabel";
import AjTnCLink from "./AjTnCLink/AjTnCLink";
import AjTypography from "./AjTypography";

function AjSignUpAssociationFarmingDetails(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAccountData = getUserAccountData();
  const userData = getUserData();
  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [CACDocument, setCACDocument] = useState(null);
  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);

  const products = useSelector((state) => state.products.products || "");

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = profileVerificationData && profileVerificationData.orgVerificationType ? profileVerificationData.orgVerificationType[0] : '';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpFarmingAssociationDetails(verificationText)),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getProfileVerificationDataAction());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (CACDocument !== null) {
      setValue("CACDocument", CACDocument?.id, {
        shouldValidate: true,
      });
    }
    if (isChipValueUpdated) {
      const productItems = [];
      chipValue.map((item) => {
        productItems.push(_.find(products, { productName: item }).productId);
      });
      setValue("typeOfProducts", productItems, { shouldValidate: true });
    }
  }, [CACDocument, chipValue]);

  useEffect(() => {
    if (!products || !userAccountData) {
      return;
    }
    if (userData.is_account_detail_filled) {
      setValue("associationName", userAccountData.association_name || '', {
        shouldValidate: true,
      });
      setValue("associationRegNumber", userAccountData.registration_number || '', {
        shouldValidate: true,
      });
      setValue(
        "orgVerificationNumber",
        userAccountData.org_verification_number || '',
        {
          shouldValidate: true,
        }
      );

      const productItems = [];
      userAccountData.products && userAccountData.products.map((item) => {
        const foundProduct = _.find(products, { productId: item });
        if (foundProduct) {
          productItems.push(foundProduct.productName);
        }
      });
      setChipValue(productItems);
      setValue("typeOfProducts", userAccountData.products || [], {
        shouldValidate: true,
      });

      setValue("memberSize", userAccountData.member_size || '', {
        shouldValidate: true,
      });

      setCACDocument({
        file_name: userAccountData.file_name || "CAC Document",
        id: userAccountData.cac_document || null,
      });
    }

  }, [products]);

  const addFarmingAssociation = () => {
    setIsSubmit(true);
  };

  const getAddressData = (data) => {
    addressData = data;
    setIsSubmit(false);
    handleSubmit(onSubmit)();
  };

  const onSubmit = (data) => {
    if (!addressData) {
      return;
    }
    const userAssociatonDetails = {
      associationName: data.associationName,
      registrationNumber: data.associationRegNumber,
      orgVerificationNumber: data.orgVerificationNumber,
      orgVerificationType: verificationText,
      products: data.typeOfProducts,
      cacDocumentId: parseInt(data.CACDocument),
      memberSize: parseInt(data.memberSize),
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || "",
      countryId: parseInt(addressData.country),
      stateId: parseInt(addressData.state),
      city: addressData.city,
      hasKYC: data.hasKYC,
    };
    if (addressData.zipCode) {
      userAssociatonDetails["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(signUpAssociationDetails(userAssociatonDetails, navigate));
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setIsChipValueUpdated(true);
    setChipValue(value);
  };

  const uploadImage = (data) => {
    setCACDocument(data);
  };

  const changeImageData = (e) => {
    e.preventDefault();
    setCACDocument("");
  };

  const handleDelete = (value) => {
    setIsChipValueUpdated(true);
    setChipValue(chipValue.filter((name) => name !== value));
  };

  const hasKYC = watch("hasKYC");

  return (
    <>
      <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
        <AjInputLabel
          displayText="Association name"
          required={true}
          styleData={commonStyles.inputLabel}
        />
        <InputBase
          required
          placeholder="Enter association name"
          id="associationName"
          name="associationName"
          sx={commonStyles.inputStyle}
          {...register("associationName")}
          error={errors.associationName ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.associationName?.message}
        />
      </Grid>
      <Grid container columnSpacing={"3.5rem"} sx={commonStyles.marginTop20}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText="Association registration number"
            required
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            placeholder="Enter associate registration number"
            id="associationRegNumber"
            name="associationRegNumber"
            sx={commonStyles.inputStyle}
            {...register("associationRegNumber")}
            error={errors.associationRegNumber ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.associationRegNumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText="Do you have a TIN document?"
            required
            styleData={commonStyles.inputLabel}
          />
          <label style={{ display: "inline-flex", alignItems: "center" }}>
            <input
              {...register("hasKYC")}
              type="radio"
              value="true"
              style={{ marginRight: "0.5rem" }}
            />
            <span>Yes</span>
          </label>
          <label style={{ display: "inline-flex", alignItems: "center" }}>
            <input
              {...register("hasKYC")}
              type="radio"
              value="false"
              style={{ marginRight: "0.5rem" }}
            />
            <span>No</span>
          </label>

          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.hasKYC?.message}
          />
        </Grid>

        {hasKYC === "true" && (
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <AjInputLabel
              displayText={verificationText + " Number"}
              required
              styleData={[commonStyles.inputLabel, commonStyles.marginTop2]}
            />
            <InputBase
              required
              fullWidth
              placeholder={`Enter ${verificationText} Number`}
              sx={commonStyles.inputStyle}
              {...register("orgVerificationNumber")}
              error={errors.orgVerificationNumber ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.orgVerificationNumber?.message}
            />
          </Grid>
        )}
      </Grid>

      <Grid item xs={12} sm={12} sx={commonStyles.marginTop2}>
        <AjInputLabel
          displayText="Type of Products"
          required
          id="typeOfProducts"
          name="typeOfProducts"
          styleData={commonStyles.inputLabel}
        />
        <AjChipDropdown
          value={chipValue}
          onChange={onChangeDropdownChipHandler}
          fullWidth
          onDelete={handleDelete}
          options={products}
          styleData={styles.chipDropDown}
        />
      </Grid>
      <AjTypography
        styleData={commonStyles.errorText}
        displayText={errors.typeOfProducts?.message}
      />

      <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText="Member size"
            required
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            id="memberSize"
            name="memberSize"
            placeholder="Enter member size"
            sx={commonStyles.inputStyle}
            {...register("memberSize")}
            error={errors.memberSize ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.memberSize?.message}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText="CAC document : (JPEG, PNG or PDF only)"
            required
            id="CACDocument"
            name="CACDocument"
            styleData={commonStyles.inputLabel}
          />
          {CACDocument && CACDocument.id ? (
            <AjDocumentDownloader
              docId={CACDocument.id}
              docName={CACDocument.file_name}
              changeDocument={changeImageData}
              showIcon={true}
            />
          ) : (
            <AjDocumentUploader
              type="image"
              docType="CAC_PHOTO"
              onUpload={uploadImage}
            />
          )}
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.CACDocument?.message}
          />
        </Grid>
      </Grid>
      <AjAdress
        submit={isSubmit}
        data={getAddressData}
        defaultAddressLine1={userAccountData?.address_1}
        defaultAddressLine2={userAccountData?.address_2}
        defaultCity={userAccountData?.city}
        defaultZipCode={userAccountData?.zip_code}
        defaultCountry={userAccountData?.country || userData?.country_id}
        defaultState={userAccountData?.state}
      />

      <Grid
        sx={customCommonStyles.proceedToKycButton}
        container
        columnSpacing={"1.25rem"}
      >
        <AjButton
          onClick={addFarmingAssociation}
          variant="contained"
          displayText="Proceed to KYC"
          isDisable={!isChecked}
        />
        <AjTnCLink setIsChecked={setIsChecked} />
      </Grid>
    </>
  );
}

export default AjSignUpAssociationFarmingDetails;
