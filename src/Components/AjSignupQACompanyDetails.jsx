import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, InputBase } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AjButton from "./AjButton";
import AjChipDropdown from "./AjChipDropdown";
import AjDocumentDownloader from "./AjDocumentDownloader";
import AjDocumentUploader from "./AjDocumentUploader";
import AjInputLabel from "./AjInputLabel";
import AjAdress from "./AjAdress/AjAdress";
import AjTypography from "./AjTypography";
import { styles } from "../Containers/SignUp/SignUpAccountDetails/SignUpAccountDetailsStyles";
import { signUpQACompanyDetails } from "../Redux/SignUpQACompanyDetails/signUpQACompanyDetailsActions";
import { commonStyles, customCommonStyles } from "../Style/CommonStyle";
import { signUpQADetails } from "../validationSchema/signUpQADetails";
import {
  getUserData,
  getUserAccountData,
} from "../Services/localStorageService";
import { getItemListAction } from "../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import AjTnCLink from "./AjTnCLink/AjTnCLink";
import { getProfileVerificationDataAction } from "../Redux/common/ProfileVerification/profileVerificationActions";

function AjSignupQACompanyDetails() {
  const userAccountData = getUserAccountData();
  const userData = getUserData();
  let addressData = null;

  const [isSubmit, setIsSubmit] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const [CACDocument, setCACDocument] = useState(null);
  const [chipValue, setChipValue] = useState([]);
  const [isChipValueUpdated, setIsChipValueUpdated] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const certificates = useSelector(
    (state) => state.masterManagement.itemList.result || ""
  );

  const profileVerificationData = useSelector(
    (state) => state.profileVerification.profileVerificationData
  );

  const verificationText = profileVerificationData && profileVerificationData.orgVerificationType ? profileVerificationData.orgVerificationType[0] : '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpQADetails(verificationText)),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getItemListAction({ itemType: "QA_CERTIFICATE" }));
    dispatch(getProfileVerificationDataAction());
  }, []);

  useEffect(() => {
    if (CACDocument !== null) {
      setValue("CACDocument", CACDocument?.id, {
        shouldValidate: true,
      });
    }
    if (isChipValueUpdated) {
      const certificatesItems = [];
      chipValue.map((item) => {
        certificatesItems.push(_.find(certificates, { name: item }).id);
      });
      setValue("qaCertifications", certificatesItems, { shouldValidate: true });
    }
  }, [CACDocument, chipValue]);

  useEffect(() => {
    if (!certificates || !userAccountData) {
      return;
    }
    if (userData.is_account_detail_filled) {
      setValue("companyName", userAccountData.company_name || '', {
        shouldValidate: true,
      });
      setValue("companyRegNumber", userAccountData.registration_number || '', {
        shouldValidate: true,
      });
      setValue(
        "orgVerificationNumber",
        userAccountData.org_verification_number || '',
        {
          shouldValidate: true,
        }
      );

      const certificatesItems = [];
      userAccountData.certificates && userAccountData.certificates.map((item) => {
        const foundCertificate = _.find(certificates, { id: item });
        if (foundCertificate) {
          certificatesItems.push(foundCertificate.name);
        }
      });
      setChipValue(certificatesItems);
      setValue("qaCertifications", userAccountData.certificates || [], {
        shouldValidate: true,
      });
      setCACDocument({
        file_name: userAccountData.file_name || "CAC Document",
        id: userAccountData.cac_document || null,
      });
    }
  }, [certificates]);

  const addQACompany = () => {
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
    const userQACompanyDetails = {
      companyName: data.companyName,
      registrationNumber: data.companyRegNumber,
      orgVerificationNumber: data.orgVerificationNumber,
      orgVerificationType: verificationText,
      certificates: data.qaCertifications,
      cacDocumentId: parseInt(data.CACDocument),
      addressLine1: addressData.addressLine1,
      addressLine2: addressData.addressLine2 || "",
      country: parseInt(addressData.country),
      state: parseInt(addressData.state),
      city: addressData.city,
    };
    if (addressData.zipCode) {
      userQACompanyDetails["zipCode"] = parseInt(addressData.zipCode);
    }
    dispatch(signUpQACompanyDetails(userQACompanyDetails, navigate));
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

  return (
    <>
      <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
        <AjInputLabel
          displayText="Company name"
          required={true}
          styleData={commonStyles.inputLabel}
        />
        <InputBase
          required
          placeholder="Enter company name"
          id="companyName"
          name="companyName"
          sx={commonStyles.inputStyle}
          {...register("companyName")}
          error={errors.companyName ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.companyName?.message}
        />
      </Grid>
      <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText="Company registration number"
            required
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            placeholder="Enter company registration number"
            id="companyRegNumber"
            name="companyRegNumber"
            sx={commonStyles.inputStyle}
            {...register("companyRegNumber")}
            error={errors.companyRegNumber ? true : false}
          />
          <AjTypography
            styleData={commonStyles.errorText}
            displayText={errors.companyRegNumber?.message}
          />
        </Grid>

        <Grid item xs={12} sm={12} md={6} lg={6}>
          <AjInputLabel
            displayText={verificationText + " Number"}
            required
            styleData={commonStyles.inputLabel}
          />
          <InputBase
            required
            fullWidth
            id="orgVerificationNumber"
            name="orgVerificationNumber"
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
      </Grid>

      <Grid item xs={12} sm={12} sx={commonStyles.marginTop20}>
        <AjInputLabel
          displayText="QA Certificates"
          required
          id="qaCertifications"
          name="qaCertifications"
          styleData={commonStyles.inputLabel}
        />
        <AjChipDropdown
          value={chipValue}
          onChange={onChangeDropdownChipHandler}
          fullWidth
          onDelete={handleDelete}
          source="name"
          options={certificates}
          styleData={styles.chipDropDown}
        />
      </Grid>
      <AjTypography
        styleData={commonStyles.errorText}
        displayText={errors.qaCertifications?.message}
      />

      <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
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
        style={customCommonStyles.proceedToKycButton}
        container
        columnSpacing={"1.25rem"}
      >
        <AjButton
          onClick={addQACompany}
          variant="contained"
          displayText="Proceed to KYC"
          isDisable={!isChecked}
        />
        <AjTnCLink setIsChecked={setIsChecked} />
      </Grid>
    </>
  );
}
export default AjSignupQACompanyDetails;
