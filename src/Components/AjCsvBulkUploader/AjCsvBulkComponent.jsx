import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import { Box, Typography, Grid } from "@mui/material";
import AjButton from "../AjButton";
import AjCsvBulkUploader from "./AjCsvBulkUploader";
import AjCsvBulkUploaderApiResponse from "./AjCsvBulkUploaderApiResponse";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";
import {
  employmentOption,
  genderOptions,
  itemTypeOptions,
  keyLabelForErros,
} from "../../Constant/AppConstant";
import {
  uploadCsv,
  setBulkUploadCsvApiResponse,
} from "../../Redux/common/Document/documentActions";
import { commonAddProductStyles, commonStyles } from "../../Style/CommonStyle";
import { styles } from "../AjAddProduct/AjAddProductStyle";
import { bulkCompStyles } from "./AjCsvBulkComponentStyles";
import { showToast } from "../../Services/toast";
import { getCountries } from "../../Redux/common/Countries/getCountriesActions";
import { isDateValid } from "../../Services/commonService/commonService";
import { getStates } from "../../Redux/common/States/getStateActions";
import * as moment from "moment";

const AjCsvBulkComponent = ({ noteText, apiCallFor }) => {
  const dispatch = useDispatch();

  const [parsedData, setParsedData] = useState(null);
  const [parsedErrors, setParsedErrors] = useState(null);

  const [isBulkCsvFileMissing, setIsBulkCsvFileMissing] = useState(false);

  const [isRefresh, setIsRefresh] = useState(false);

  const bulkCsvUploadApiResponse = useSelector(
    (state) => state.docReducer.bulkCsvUploadApiResponse
  );

  const countryMenuOptions = useSelector(
    (state) => state.countries.countryMenuOptions || null
  );

  const [dropDown, setDropDown] = useState();

  useEffect(() => {
    setIsBulkCsvFileMissing(false);
    dispatch(setBulkUploadCsvApiResponse(null));
  }, [parsedData]);

  useEffect(() => {
    if (apiCallFor === "farmers") {
      dispatch(getCountries());
    }
  }, []);

  const doneClickHandler = () => {
    setParsedData(null);
    setIsRefresh((prev) => !prev);
  };

  const isFarmerValid = (farmerData) => {
    const errorArray = [];
    for (let key in farmerData) {
      if (!farmerData[key] && !!_.find(keyLabelForErros, { key: key })?.label) {
        errorArray.push(
          `${_.find(keyLabelForErros, { key: key })?.label} is required`
        );
      }
    }

    if (farmerData?.gender) {
      const validGender = [];
      if (genderOptions) {
        genderOptions.forEach((item) => {
          validGender.push(item.value);
        });
        if (!validGender.includes(farmerData.gender.toUpperCase())) {
          errorArray.push(
            `${_.find(keyLabelForErros, { key: "gender" })?.label} is not valid`
          );
        }
      }
    }

    if (farmerData?.employmentType) {
      const validEmpType = [];
      if (employmentOption) {
        employmentOption.forEach((item) => {
          validEmpType.push(item.value);
        });
        if (!validEmpType.includes(farmerData?.employmentType?.toUpperCase())) {
          errorArray.push(
            `${
              _.find(keyLabelForErros, { key: "employmentType" })?.label
            } is not valid`
          );
        }
      }
    }

    if (farmerData?.countryCode) {
      if (
        !_.find(countryMenuOptions, {
          countryCode: farmerData?.countryCode,
        }) ||
        farmerData?.countryCode === "Invalid"
      )
        errorArray.push(
          `${
            _.find(keyLabelForErros, { key: "countryCode" })?.label
          } is not valid`
        );
    }

    if (farmerData?.country === "Invalid") {
      errorArray.push(
        `${_.find(keyLabelForErros, { key: "country" })?.label} is not valid`
      );
    }

    if (farmerData?.state === "Invalid") {
      errorArray.push(
        `${_.find(keyLabelForErros, { key: "state" })?.label} is not valid`
      );
    }

    if (farmerData?.dateOfBirth) {
      if (!isDateValid(farmerData?.dateOfBirth)) {
        errorArray.push(
          `${
            _.find(keyLabelForErros, { key: "dateOfBirth" })?.label
          } is not valid`
        );
      }
    }

    if (farmerData?.experienceYears) {
      if (!_.isNumber(+farmerData?.experienceYears)) {
        errorArray.push(
          `${
            _.find(keyLabelForErros, { key: "experienceYears" })?.label
          } should be a number`
        );
      }
    }

    if (farmerData?.taxId) {
      if (
        !_.isNumber(+farmerData?.taxId) ||
        +farmerData?.taxId < 0 ||
        +farmerData?.taxId.length > 20 ||
        +farmerData?.taxId.length < 2
      ) {
        errorArray.push(
          `Tax id should be a positive integer of length 2 to 20`
        );
      }
    }

    if (farmerData?.zipCode) {
      if (
        !_.isNumber(farmerData?.zipCode) ||
        farmerData?.zipCode?.toString().length > 10 ||
        farmerData?.zipCode?.toString().length < 5
      ) {
        errorArray.push("Zipcode should be positive integer of length 5 to 10");
      }
    }
    return { isValid: !errorArray.length, errors: errorArray };
  };

  const dataForApi = async (bulkCallFor) => {
    let obj = {};
    if (bulkCallFor === "products") {
      obj = { products: [] };
      parsedData.data.forEach((item) =>
        item[0]
          ? obj.products.push({
              productName: item[0],
              unitOfMeasurement: item[1],
            })
          : ""
      );
    } else if (bulkCallFor === "items") {
      obj = {
        items: [],
        itemType: dropDown ? dropDown : itemTypeOptions[0].value,
      };
      parsedData.data.forEach((item) =>
        item[0]
          ? obj.items.push({
              itemName: item[0],
            })
          : ""
      );
    } else if (bulkCallFor === "inputs") {
      obj = { inputs: [] };
      parsedData.data.forEach((item) =>
        item[0]
          ? obj.inputs.push({
              inputName: item[0],
              unitOfMeasurement: item[1],
            })
          : ""
      );
    } else if (bulkCallFor === "farmers") {
      const getFarmerSlicedData = async (slicedData) => {
        obj = { farmers: [], errors: [] };
        for (let item of slicedData) {
          const countryFromCountryCode = _.find(countryMenuOptions, {
            countryCode: `+${item[0]}` || "+234",
          })?.countryId;
          const countryId = _.find(countryMenuOptions, {
            countryName: item[11] || "Nigeria",
          })?.countryId;
          const codeOfCountry = _.find(countryMenuOptions, {
            countryName: item[11] || "Nigeria",
          })?.codeOfCountry;

          const stateOptions = await dispatch(getStates(codeOfCountry || "NG"));
          const stateIdFromStateName = _.find(stateOptions, {
            stateName: item[12],
          })?.stateId;
          let newFarmer = {
            countryCode: countryFromCountryCode ? `+${item[0]}` : "Invalid",
            mobileNumber: +item[1],
            firstName: item[2],
            lastName: item[3],
            gender: item[4]?.toUpperCase(),
            dateOfBirth: moment(item[5]).toISOString(true),
            employmentType: item[6],
            experienceYears: item[7],
            taxId: item[8],
            address1: item[9],
            address2: item[10],
            country: +countryId || "Invalid",
            state: +stateIdFromStateName || "Invalid",
            city: item[13],
            zipCode: +item[14],
            taxCountry: countryFromCountryCode,
            birthCountry: countryFromCountryCode,
            citizenship: countryFromCountryCode,
            countryId: countryFromCountryCode,
            accountHolderName: "",
            bankName: "",
            accountNumber: "",
          };
          if (item[15] && item[16] && item[17]) {
            newFarmer = {
              ...newFarmer,
              accountHolderName: item[15],
              bankName: item[16],
              accountNumber: item[17],
            };
          }
          const { isValid, errors } = isFarmerValid(newFarmer);
          if (isValid) {
            obj.farmers.push(newFarmer);
            obj.errors.push(false);
          } else {
            obj.farmers.push(false);
            obj.errors.push(errors);
          }
        }
        setParsedErrors(obj.errors);
        return obj;
      };
      obj = await getFarmerSlicedData(parsedData.data.slice(1, -1));
    }
    return obj;
  };

  const addClickHandler = async () => {
    if (parsedData !== null) {
      if (apiCallFor !== "farmers") {
        if (
          parsedData.data.length === 0 ||
          (parsedData.data[0][0] === "" && parsedData.data[1][0] === "")
        ) {
          showToast("No value was found in the CSV", "error");
        } else {
          const data = await dataForApi(apiCallFor);
          dispatch(uploadCsv(data, apiCallFor));
          setIsBulkCsvFileMissing(false);
        }
      } else {
        if (
          parsedData.data.length === 1 ||
          parsedData.data.length === 2 ||
          parsedData.data[1].length === 1 ||
          parsedData.data[1][0] === ""
        ) {
          showToast("No value was found in the CSV", "error");
        } else {
          const data = await dataForApi(apiCallFor);
          let dataToSend = data?.farmers?.filter((item) => !!item);
          if (!!dataToSend?.length)
            dispatch(uploadCsv({ farmers: dataToSend }, apiCallFor));
          setIsBulkCsvFileMissing(false);
        }
      }
    } else {
      setIsBulkCsvFileMissing(true);
      setParsedErrors(null);
    }
  };

  const dropDownChangeHandler = (e, selectedDropDown) => {
    const selectedValue = _.find(itemTypeOptions, {
      label: selectedDropDown.props.value,
    }).value;
    setDropDown(selectedValue);
  };

  const getInvalidFarmers = (errArr) => {
    let count = 0;
    errArr.map((item) => {
      if (item !== false) count++;
    });
    return count;
  };

  return (
    <Box
      sx={{
        ...commonStyles.fullWidth,
        ...commonAddProductStyles.bulkUploadMainBox,
        ...(apiCallFor === "items" && commonAddProductStyles.marginTopMinus10),
      }}
    >
      {apiCallFor === "items" && (
        <Grid
          item
          sx={[
            bulkCompStyles.gridStyle,
            bulkCompStyles.gridContainer,
            bulkCompStyles.marginBtm20,
          ]}
        >
          <AjInputLabel
            required={true}
            styleData={commonStyles.inputLabel}
            displayText="Item type"
          />
          <AjDropDown
            options={itemTypeOptions}
            value={dropDown}
            onChange={dropDownChangeHandler}
            source="label"
            defaultValue={itemTypeOptions[0].label}
            styleData={[styles.dropDownResponsive]}
            productTypeStyle={commonStyles.productTypeStyle}
          />
        </Grid>
      )}
      <AjCsvBulkUploader
        isRefresh={isRefresh}
        setParsedData={setParsedData}
        setParsedErrors={setParsedErrors}
      />{" "}
      <Box sx={commonAddProductStyles.noteBox}>
        {isBulkCsvFileMissing && (
          <Typography
            sx={[
              commonStyles.inputLabel,
              commonAddProductStyles.apiResponseError,
            ]}
          >
            Bulk upload file missing
          </Typography>
        )}
        <Typography
          sx={[commonStyles.inputLabel, commonAddProductStyles.marginTop12]}
        >
          Note *
        </Typography>
        {noteText.map((item) => (
          <Typography
            sx={[commonStyles.inputLabel, commonAddProductStyles.notePoints]}
          >
            {item}
          </Typography>
        ))}
        {apiCallFor === "farmers" &&
          parsedErrors &&
          !!getInvalidFarmers(parsedErrors) &&
          !isBulkCsvFileMissing && (
            <Typography
              sx={{
                ...commonStyles.inputLabel,
                ...commonStyles.marginTop20,
                ...commonStyles.colorRed,
              }}
            >{`Data Invalid for ${getInvalidFarmers(
              parsedErrors
            )} farmers`}</Typography>
          )}
        {apiCallFor === "farmers" &&
          !isBulkCsvFileMissing &&
          parsedErrors?.map(
            (item, index) =>
              item !== false && (
                <>
                  <Box>
                    <Typography
                      sx={{
                        ...commonStyles.inputLabel,
                        ...commonStyles.marginTop20,
                        ...commonStyles.subHeading,
                        ...commonStyles.colorRed,
                      }}
                    >
                      Farmer {index + 1}:
                    </Typography>
                    {item.map((errorItem) => {
                      return (
                        <Typography
                          sx={{
                            ...commonStyles.inputLabel,
                            ...styles.errorItemStyle,
                          }}
                        >
                          {errorItem}
                        </Typography>
                      );
                    })}
                  </Box>
                </>
              )
          )}
      </Box>
      <Box sx={commonAddProductStyles.apiResponseBox}>
        <AjCsvBulkUploaderApiResponse
          bulkCsvUploadApiResponse={bulkCsvUploadApiResponse}
        />
      </Box>
      <AjButton
        type="submit"
        variant="contained"
        styleData={commonAddProductStyles.bulkAddButton}
        displayText={bulkCsvUploadApiResponse ? "Done" : "Add"}
        onClick={bulkCsvUploadApiResponse ? doneClickHandler : addClickHandler}
      />
    </Box>
  );
};

export default AjCsvBulkComponent;
