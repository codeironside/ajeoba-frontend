import React, { useEffect, useState, useRef } from "react";
import * as moment from "moment";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Box, Divider, Grid, useMediaQuery } from "@mui/material";
import * as _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AjAdress from "../../../../../../Components/AjAdress/AjAdress";
import AjButton from "../../../../../../Components/AjButton";
import AjChipDropdown from "../../../../../../Components/AjChipDropdown";
import AjCompanyDetails from "../../../../../../Components/AjCompanyDetails/AjCompanyDetails";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import AjPersonalDetails from "../../../../../../Components/AjPersonalDetails/AjPersonalDetails";
import AjTypography from "../../../../../../Components/AjTypography";
import AjUploadCACDocument from "../../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import TableActions from "../../../../../../Components/TableActions/TableActions";

import { ROLES } from "../../../../../../Constant/RoleConstant";
import { getInputListAction } from "../../../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import {
  editInputSupplierDetailsAction,
  editInputSupplierStatusAction,
  getInputSupplierDetailsById,
  getInputSupplierDetailsByIdAction,
} from "../../../../../../Redux/SuperAdmin/UserManagement/InputSupplier/inputSupplierActions";
import {
  getPhoneCodeSymbol,
  getStatus,
} from "../../../../../../Services/commonService/commonService";
import { getUserData } from "../../../../../../Services/localStorageService";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_INPUT_SUPPLIER,
} from "../../../../../../Routes/Routes";

import { commonStyles } from "../../../../../../Style/CommonStyle";
import { styles as wareHouseStyles } from "../../../../../FarmingAssociation/WareHouses/WareHousesDetails/WareHouseDetail/WareHouseDetailStyles";
import { styles as qaCompanyStyles } from "../../../QACompanies/QACompaniesStyles";
import { styles } from "../../InputSupplierStyles";

export const inputSupplierDetailSchema = Yup.object().shape({
  inputSupplierType: Yup.array()
    .required("Input type is required")
    .min(1, "At least 1 input is required"),
});

const InputSupplierDetailView = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const roleId = getUserData().role_id;
  const { id } = params;
  const isDesktop = useMediaQuery("(min-width: 600px)");

  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(inputSupplierDetailSchema),
    mode: "onChange",
  });

  const inputSupplierDetailsById = useSelector(
    (state) => state.inputSupplier.inputSupplierDetails
  );

  const inputMasterList = useSelector((state) => state.inputMaster.inputList);

  const [edit, setEdit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [inputSupplierType, setInputSupplierType] = useState([]);
  const [inputSupplierData, setInputSupplierData] = useState({});

  useEffect(() => {
    if (location.pathname.includes("edit")) setEdit(true);
    dispatch(getInputListAction());
    dispatch(getInputSupplierDetailsByIdAction(id));
    return () => {
      dispatch(getInputSupplierDetailsById({}));
    };
  }, [id]);

  useEffect(() => {
    const inputSupplierItems = [];
    inputSupplierType.map((item) => {
      inputSupplierItems.push(
        _.find(inputMasterList?.result, { name: item }).id
      );
    });
    setValue("inputSupplierType", inputSupplierItems, {
      shouldValidate: true,
    });
  }, [inputSupplierType]);

  useEffect(() => {
    if (inputSupplierDetailsById?.inputSupplierDetails) {
      setTimeout(() => {
        updateInputSupplierType();
      });
    }
  }, [inputSupplierDetailsById]);

  useEffect(() => {
    const {
      inputSupplierPersonalDetails,
      inputSupplierCompanyDetails,
      inputSupplierAddressDetails,
    } = inputSupplierData;
    if (
      inputSupplierPersonalDetails &&
      inputSupplierCompanyDetails &&
      inputSupplierAddressDetails
    ) {
      handleSubmit(onSubmit)();
    }
  }, [inputSupplierData]);

  const inputSupplierDataRef = useRef(inputSupplierData);
  const isDoneRef = useRef(false);

  const updateInputSupplierType = () => {
    if (inputSupplierDetailsById?.inputSupplierDetails?.inputs) {
      const inputItems = [];
      inputSupplierDetailsById.inputSupplierDetails.inputs.map((item) => {
        inputItems.push(_.find(inputMasterList?.result, { id: item }).name);
      });
      setInputSupplierType(inputItems);
    }
  };

  const handleEdit = () => {
    setEdit(true);
    setCancel(false);
  };

  const handleCancel = () => {
    setEdit(false);
    setCancel(true);
    updateInputSupplierType();
  };

  const onChangeInputTypeChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setInputSupplierType(value);
  };

  const handleDeleteInputType = (value) => {
    setInputSupplierType(inputSupplierType.filter((name) => name !== value));
  };

  const adminInputSupplierSaveHandler = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
  };

  const updateState = (newState) => {
    inputSupplierDataRef.current = newState;
    setInputSupplierData(newState);
    setIsSubmit(false);
  };

  const getInputSupplierPersonalDetails = (data) => {
    updateState({
      ...inputSupplierDataRef.current,
      inputSupplierPersonalDetails: data,
    });
  };

  const getInputSupplierPassportDetails = (data) =>
    updateState({
      ...inputSupplierDataRef.current,
      passportInputSupplierDetails: data,
    });

  const getInputSupplierCACDetails = (data) =>
    updateState({
      ...inputSupplierDataRef.current,
      cacInputSupplierDetails: data,
    });

  const getInputSupplierAddressDetails = (data) =>
    updateState({
      ...inputSupplierDataRef.current,
      inputSupplierAddressDetails: data,
    });

  const getInputSupplierCompanyDetails = (data) =>
    updateState({
      ...inputSupplierDataRef.current,
      inputSupplierCompanyDetails: data,
    });

  const onSubmit = (data) => {
    if (!isDoneRef.current) {
      return;
    }
    isDoneRef.current = false;
    const {
      inputSupplierPersonalDetails,
      passportInputSupplierDetails,
      inputSupplierCompanyDetails,
      cacInputSupplierDetails,
      inputSupplierAddressDetails,
    } = inputSupplierData;
    if (
      !inputSupplierPersonalDetails ||
      !inputSupplierCompanyDetails ||
      !inputSupplierAddressDetails
    )
      return;

    const inputSupplierEditData = {
      firstName: inputSupplierPersonalDetails.firstName,
      lastName: inputSupplierPersonalDetails.lastName,
      gender: inputSupplierPersonalDetails.gender,
      dateOfBirth: moment(inputSupplierPersonalDetails.dateOfBirth),
      inputSupplierName: inputSupplierCompanyDetails.companyName,
      addressLine1: inputSupplierAddressDetails.addressLine1,
      addressLine2: inputSupplierAddressDetails.addressLine2,
      country: parseInt(inputSupplierAddressDetails.country),
      countryId: parseInt(
        inputSupplierDetailsById?.personalDetails?.country_id
      ),
      stateId: parseInt(inputSupplierAddressDetails.state),
      city: inputSupplierAddressDetails.city,
      zipCode: parseInt(inputSupplierAddressDetails.zipCode),
      inputs: data.inputSupplierType,
      registrationNumber: inputSupplierCompanyDetails.registrationNumber,
    };

    if (passportInputSupplierDetails.CACDocument)
      inputSupplierEditData["passportPhotoId"] = parseInt(
        passportInputSupplierDetails.CACDocument
      );

    if (cacInputSupplierDetails.CACDocument)
      inputSupplierEditData["cacDocumentId"] = parseInt(
        cacInputSupplierDetails.CACDocument
      );

    if (inputSupplierCompanyDetails.orgVerificationNumber)
      inputSupplierEditData["orgVerificationNumber"] =
        inputSupplierCompanyDetails.orgVerificationNumber;

    if (inputSupplierCompanyDetails.orgVerificationNumber)
      inputSupplierEditData["orgVerificationType"] =
        inputSupplierCompanyDetails.verificationTextRef.current;

    dispatch(editInputSupplierDetailsAction(id, inputSupplierEditData));
    setEdit(false);
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_INPUT_SUPPLIER}`);
  };

  const options = [
    {
      name: "Active",
      actionClickHandler: (userId) =>
        dispatch(editInputSupplierStatusAction(userId, "ACTIVE")),
    },
    {
      name: "Inactive",
      actionClickHandler: (userId) =>
        dispatch(editInputSupplierStatusAction(userId, "INACTIVE")),
    },
    {
      name: "On Hold",
      actionClickHandler: (userId) =>
        dispatch(editInputSupplierStatusAction(userId, "ONHOLD")),
    },
  ];

  return (
    <Grid
      container
      item
      sx={{
        ...commonStyles.whiteContainerBackgroundTabs,
        ...commonStyles.customSrollBar,
      }}
    >
      {inputSupplierDetailsById?.personalDetails && (
        <>
          <Box
            sx={{
              ...wareHouseStyles.statusEditContainer,
              ...qaCompanyStyles.adminQaEditContainer,
            }}
          >
            <Box
              sx={{
                ...qaCompanyStyles.qaCompanyEmailPhoneContainer,
                ...(!edit &&
                  ROLES.SUPER_ADMIN === roleId &&
                  qaCompanyStyles.shiftAdminContainer),
              }}
            >
              <Box sx={qaCompanyStyles.responsiveEmailPhone}>
                <AjTypography
                  align="center"
                  styleData={commonStyles.inputLabel}
                  displayText="Email"
                />
                <AjTypography
                  align="center"
                  styleData={{
                    ...commonStyles.subHeadingColor,
                    ...commonStyles.textEllipsis,
                  }}
                  inputTypeField
                  displayText={inputSupplierDetailsById?.personalDetails?.email}
                />
              </Box>
              <Box sx={qaCompanyStyles.responsiveEmailPhone}>
                <AjTypography
                  align="center"
                  styleData={commonStyles.inputLabel}
                  displayText="Phone Number"
                />
                <AjTypography
                  align="center"
                  styleData={{
                    ...commonStyles.subHeadingColor,
                    ...commonStyles.textEllipsis,
                  }}
                  displayText={`${getPhoneCodeSymbol(
                    inputSupplierDetailsById?.personalDetails?.phone_code
                  )} ${inputSupplierDetailsById?.personalDetails?.mobile_no}`}
                />
              </Box>
            </Box>
            <Box sx={!isDesktop && qaCompanyStyles.editQACompanyBtn}>
              {!edit && ROLES.SUPER_ADMIN === roleId && (
                <AjButton
                  styleData={{
                    ...wareHouseStyles.wareHouseDetailEditBtn,
                    ...qaCompanyStyles.adminEditBtn,
                  }}
                  onClick={handleEdit}
                  variant="outlined"
                  displayText="Edit Details"
                />
              )}
            </Box>
          </Box>
          <Box sx={wareHouseStyles.statusUpdate}>
            <AjTypography
              align="center"
              styleData={commonStyles.inputLabel}
              displayText="Status"
            />
            <TableActions
              isReadOnly={!edit}
              options={options}
              id={id}
              isActive={getStatus(
                inputSupplierDetailsById?.personalDetails?.status
              )}
            />
          </Box>
          <Box sx={isDesktop && qaCompanyStyles.editQACompanyBtn}>
            {!edit && ROLES.SUPER_ADMIN === roleId && (
              <AjButton
                onClick={handleEdit}
                styleData={wareHouseStyles.wareHouseDetailEditBtn}
                variant="outlined"
                displayText="Edit Details"
              />
            )}
          </Box>
        </>
      )}
      <Box
        sx={{
          ...commonStyles.signupContentContainer,
          ...commonStyles.marginTop0,
        }}
      >
        <Box component="form" sx={commonStyles.signupFormContainer}>
          {inputSupplierDetailsById?.personalDetails && (
            <>
              <AjPersonalDetails
                reset={cancel}
                submit={isSubmit}
                isDisable={!edit}
                data={getInputSupplierPersonalDetails}
                defaultFirstName={
                  inputSupplierDetailsById.personalDetails?.first_name
                }
                defaultLastName={
                  inputSupplierDetailsById.personalDetails?.last_name
                }
                defaultGender={inputSupplierDetailsById.personalDetails?.gender}
                defaultDateOfBirth={
                  inputSupplierDetailsById.personalDetails?.date_of_birth
                }
              />
              <AjUploadCACDocument
                reset={cancel}
                submit={isSubmit}
                edit={edit}
                data={getInputSupplierPassportDetails}
                label="Passport photo: (JPEG, PNG or PDF only)"
                error="Passport photo is required"
                docType="PASSPORT_PHOTO"
                defaultCACDocument={{
                  id: inputSupplierDetailsById.personalDetails
                    ?.passport_photo_id,
                  file_name:
                    inputSupplierDetailsById.personalDetails?.file_name,
                }}
                isDisable={!edit}
              />
            </>
          )}
          <Divider sx={commonStyles.dividerStyle} />
          {inputSupplierDetailsById?.inputSupplierDetails && (
            <>
              <AjCompanyDetails
                isDisable={!edit}
                reset={cancel}
                submit={isSubmit}
                data={getInputSupplierCompanyDetails}
                companyNameLabel="Input Supplier Name"
                registrationNumberLabel="Input Supplier Registration Number"
                companyNamePlaceholder="Enter input supplier company name"
                defaultCompanyName={
                  inputSupplierDetailsById?.inputSupplierDetails
                    ?.input_supplier_name
                }
                defaultRegistrationNumber={
                  inputSupplierDetailsById?.inputSupplierDetails
                    ?.registration_number
                }
                defaultOrgNumber={
                  inputSupplierDetailsById?.inputSupplierDetails
                    ?.org_verification_number
                }
                registrationRequired={false}
                tinRequired={false}
                type="Input supplier"
                countryId={
                  inputSupplierDetailsById?.personalDetails?.country_id
                }
              />
              <Box
                sx={{
                  ...commonStyles.signupFormFieldContainer,
                  ...commonStyles.fullWidth,
                  ...styles.inputTypeField,
                }}
              >
                <AjInputLabel
                  displayText="Type of Inputs"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <AjChipDropdown
                  value={inputSupplierType}
                  fullWidth
                  onChange={onChangeInputTypeChipHandler}
                  onDelete={handleDeleteInputType}
                  source="name"
                  options={inputMasterList?.result}
                  sx={{
                    ...commonStyles.multiSelectChipDropDown,
                    ...(!edit && commonStyles.disableInput),
                  }}
                  isReadOnly={!edit}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={edit && errors.inputSupplierType?.message}
                />
              </Box>
              <AjUploadCACDocument
                isDisable={!edit}
                reset={cancel}
                submit={isSubmit}
                docType="CAC_PHOTO"
                data={getInputSupplierCACDetails}
                defaultCACDocument={{
                  id: inputSupplierDetailsById?.inputSupplierDetails
                    ?.cac_document,
                  file_name:
                    inputSupplierDetailsById?.inputSupplierDetails?.file_name,
                }}
              />
              <Divider sx={commonStyles.dividerStyle} />
              <AjAdress
                isDisable={!edit}
                reset={cancel}
                submit={isSubmit}
                data={getInputSupplierAddressDetails}
                defaultAddressLine1={
                  inputSupplierDetailsById?.inputSupplierDetails?.address_1
                }
                defaultAddressLine2={
                  inputSupplierDetailsById?.inputSupplierDetails?.address_2
                }
                defaultCity={
                  inputSupplierDetailsById?.inputSupplierDetails?.city
                }
                defaultZipCode={
                  inputSupplierDetailsById?.inputSupplierDetails?.zip_code
                }
                defaultCountry={
                  inputSupplierDetailsById?.inputSupplierDetails?.country
                }
                defaultState={
                  inputSupplierDetailsById?.inputSupplierDetails?.state
                }
              />
            </>
          )}
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...commonStyles.fullWidth,
            }}
          >
            {edit && (
              <>
                <AjButton
                  onClick={handleCancel}
                  styleData={commonStyles.cancelBtnStyle}
                  variant="outlined"
                  displayText="Cancel"
                />
                <AjButton
                  onClick={adminInputSupplierSaveHandler}
                  variant="contained"
                  displayText="Save Changes"
                />
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};

export default InputSupplierDetailView;
