import React, { useEffect, useState, useRef } from "react";
import * as _ from "lodash";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputBase } from "@mui/material";
import NumberFormat from "react-number-format";
import moment from "moment";

import { customCommonStyles } from "../../../../../Style/CommonStyle";
import AjButton from "../../../../../Components/AjButton";
import AjCountry from "../../../../../Components/AjCountry/AjCountry";
import AjDatePicker from "../../../../../Components/AjDatePicker";
import AjDropDown from "../../../../../Components/AjDropdown/AjDropDown";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjState from "../../../../../Components/AjState/AjState";
import AjTypography from "../../../../../Components/AjTypography";
import AjTimePicker from "../../../../../Components/AjTimePicker";
import AjUploadCACDocument from "../../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import AjUploadMultipleCertificate from "../../../../../Components/AjUploadMultipleCertificate/AjUploadMultipleCertificate";
import AjUploadMultipleImgs from "../../../../../Components/AjUploadMultileImg/AjUploadMultipleImgs";
import { getProducts } from "../../../../../Redux/common/Products/productsActions";
import {
  addAggregationAction,
  addAggregationInputAction,
} from "../../../../../Redux/FarmingAssociation/Aggregation/aggregationActions";
import { getFarmerListAction } from "../../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import { getWareHousesListAction } from "../../../../../Redux/WareHouses/wareHouseActions";

import {
  productTypeOptions,
  qualityOptions,
} from "../../../../../Constant/AppConstant";
import {
  mergeDateTime,
  getPreviousYearDate,
  getCurrencySymbol,
  getNextYearDate,
  getTodaysDate,
  textCapitalize,
} from "../../../../../Services/commonService/commonService";
import {
  getUserAccountData,
  getUserData,
} from "../../../../../Services/localStorageService";
import { addAggregationSchema } from "../../../../../validationSchema/addAggregationSchema";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { styles as wareHouseStyles } from "../../../WareHouses/AddWareHouse/AddWareHouseStyles";
import { styles } from "../AddAggregationStyles";
import { getInputListAction } from "../../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { addInputAggregationSchema } from "../../../../../validationSchema/addInputAggregationSchema";
import { ROLES } from "../../../../../Constant/RoleConstant";
import AjProductDescripton from "../../../../../Components/AjProductDescription/AjProductDescripton";

const AddAggregationForm = () => {
  const dispatch = useDispatch();
  const userData = getUserData();
  const userAccountData = getUserAccountData();
  const navigate = useNavigate();

  const [aggregationDate, setAggregationDate] = useState(null);
  const [aggregationExpiryDate, setAggregationExpiryDate] = useState(null);
  const [time, setTime] = useState(null);
  const [associationProducts, setAssciationProducts] = useState([]);
  const [inputSupplierInputs, setInputSupplierInputs] = useState([]);
  const [aggregatedProductValue, setAggregatedProductValue] = useState();
  const [aggregatedInputValue, setAggregatedInputValue] = useState();
  const [productType, setProductType] = useState();
  const [qualityType, setQualityType] = useState();
  const [
    aggregationSelectedCodeOfCountry,
    setAggregationSelectedCodeOfCountry,
  ] = useState(null);
  const [aggregationStateReset, setAggregationStateReset] = useState(null);
  const [activeFarmerData, setActiveFarmerData] = useState(null);
  const [activeWareHouseData, setActiveWareHouseData] = useState();
  const [farmerData, setFarmerData] = useState(null);
  const [wareHouse, setWareHouse] = useState();
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [productImageIDs, setProductImageIDs] = useState([]);
  const [defaultImageIDs, setDefaultImageIDs] = useState(null);
  const [productDescription, setProductDescription] = useState([]);

  const products = useSelector((state) => state.products.products);

  const farmerList = useSelector((state) => state.farmers.farmerList);

  const wareHouseList = useSelector((state) => state.wareHouse.wareHousesList);

  const inputs = useSelector((state) => state.inputMaster.inputList).result;

  useEffect(() => {
    dispatch(getWareHousesListAction());
    if (userData.role_id === ROLES.FARMING_ASSOCIATION) {
      dispatch(getProducts());
      dispatch(getFarmerListAction({ type: "FARMER" }));
    } else if (userData.role_id === ROLES.PRODUCT_AGGREGATOR) {
      dispatch(getProducts());
    } else if (userData.role_id === ROLES.INPUT_SUPPLIER) {
      dispatch(getInputListAction({}));
    }
    setValue("option", userData.role_id);
  }, []);

  useEffect(() => {
    if (userData.role_id === ROLES.INPUT_SUPPLIER) {
      if (!inputs) return;
      const inputItems = [];
      if (userAccountData?.inputs)
        userAccountData.inputs.forEach((item) => {
          inputItems.push(_.find(inputs, { id: item }));
        });
      setInputSupplierInputs(inputItems);
    } else {
      if (!products) return;
      const productItems = [];
      if (userAccountData?.products) {
        userAccountData.products.forEach((item) => {
          productItems.push(_.find(products, { productId: item }));
        });
        setAssciationProducts(productItems);
      }
    }
  }, [products, inputs]);

  useEffect(() => {
    if (farmerList) {
      const activeFarmers = farmerList?.result
        ?.filter((item) => item.is_active)
        .map((item) => {
          return {
            farmerName: `${item.first_name} ${item.last_name}`,
            id: item.id,
          };
        });
      setActiveFarmerData(activeFarmers);
    }
    if (wareHouseList) {
      const activeWarHouse = wareHouseList?.result
        ?.filter((item) => item.is_active)
        .map((item) => {
          return {
            wareHouseName: item.warehouse_name,
            id: item.id,
          };
        });
      setActiveWareHouseData(activeWarHouse);
    }
  }, [farmerList, wareHouseList]);

  const productAggregatedChangeHandler = (_e, selectedProduct) => {
    let selectedValue;
    if (userData.role_id === ROLES.INPUT_SUPPLIER) {
      selectedValue = inputs?.find((item) => {
        if (item.name === selectedProduct.props.value) {
          return item;
        }
      });
      setAggregatedInputValue(selectedValue);
      setValue("aggregationInputValue", selectedValue.id, {
        shouldValidate: true,
      });
    } else {
      selectedValue = products.find((item) => {
        if (item.productName === selectedProduct.props.value) {
          return item;
        }
      });
      setAggregatedProductValue(selectedValue);
      setValue("aggregationProductValue", selectedValue.productId, {
        shouldValidate: true,
      });
    }
  };

  const productTypeChangeHandler = (_e, selectedProductType) => {
    let selectedValue = productTypeOptions.find((item) => {
      if (item.label === selectedProductType.props.value) {
        return item.value;
      }
    });
    setValue("aggregationProductType", selectedValue.value, {
      shouldValidate: true,
    });
    setProductType(selectedValue.label);
  };

  const qualityTypeChangeHandler = (_e, selectedQualityType) => {
    let selectedValue = qualityOptions.find((item) => {
      if (item.label === selectedQualityType.props.value) {
        return item.value;
      }
    });
    setValue("aggregationQuality", selectedValue.value, {
      shouldValidate: true,
    });
    setQualityType(selectedValue.label);
  };

  const farmerNameChangeHandler = (_e, selectedFarmer) => {
    let selectedValue = activeFarmerData.find(
      (item) => item.id === selectedFarmer.props.value.id
    );
    setValue("aggregationFarmerValue", selectedValue.id, {
      shouldValidate: true,
    });
    setFarmerData(selectedValue);
  };

  const wareHouseNameChangeHandler = (_e, selectedWareHouse) => {
    let selectedValue = activeWareHouseData.find(
      (item) => item.id === selectedWareHouse.props.value.id
    );
    setValue("aggregationWareHouse", selectedValue.id, {
      shouldValidate: true,
    });
    setWareHouse(selectedValue);
  };

  const aggregationCountryNameHandler = (selectedCountry) => {
    setValue("aggregationCountry", selectedCountry.countryId, {
      shouldValidate: true,
    });
    setValue("aggregationState", null);
    setAggregationStateReset(true);
    setAggregationSelectedCodeOfCountry(selectedCountry.codeOfCountry);
  };

  const aggregationCountryStateIdHandler = (selectedState) => {
    setValue("aggregationState", selectedState.stateId, {
      shouldValidate: true,
    });
    setAggregationStateReset(false);
  };

  const dateSelectionHandler = (date) => {
    if (date === null) {
      setAggregationDate("");
    } else {
      setAggregationDate(date);
    }
    setValue("aggregationSelectedDate", date, { shouldValidate: true });
  };

  const expiryDateSelectionHandler = (date) => {
    if (date === null) {
      setAggregationExpiryDate("");
    } else {
      setAggregationExpiryDate(date);
    }
    setValue("aggregationSelectedExpiryDate", date, { shouldValidate: true });
  };

  const timeSelectionHandler = (selectedTime) => {
    if (selectedTime === null) {
      setTime("");
    } else {
      setTime(selectedTime);
    }
    setValue("aggregationTime", selectedTime, { shouldValidate: true });
  };

  const onPriceChange = (value) => {
    setValue("aggregationCostPrice", value.value, {
      shouldValidate: true,
    });
  };

  const onSellingPriceChange = (value) => {
    setValue("aggregationSellingPrice", value.value, {
      shouldValidate: true,
    });
  };

  const handleProductImagesChange = (defaultImgIDs, ...productImgsIDs) => {
    setProductImageIDs(productImgsIDs);
    setDefaultImageIDs(defaultImgIDs);
  };

  const handleProductDescription = (data) => {
    setProductDescription(data);
    setValue("aggregationDescription", data, {
      shouldValidate: true,
    });
  };

  const schemaDecider =
    userData.role_id === ROLES.INPUT_SUPPLIER
      ? addInputAggregationSchema
      : addAggregationSchema;

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaDecider),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    if (
      userData.role_id === ROLES.FARMING_ASSOCIATION ||
      userData.role_id === ROLES.PRODUCT_AGGREGATOR
    ) {
      const addAggregationData = {
        productType: data.aggregationProductType,
        productId: parseInt(data.aggregationProductValue),
        quantity: parseFloat(data.aggregationQuantity),
        costPrice: parseFloat(data.aggregationCostPrice),
        warehouseId: parseInt(data.aggregationWareHouse),
        country: parseInt(data.aggregationCountry),
        state: parseInt(data.aggregationState),
        quality: parseInt(data.aggregationQuality),
        dateTime: mergeDateTime(
          data.aggregationSelectedDate,
          data.aggregationTime
        ),
      };
      if (data.aggregationFarmerValue) {
        addAggregationData["farmerId"] = parseInt(data.aggregationFarmerValue);
      }
      if (data.aggregationTransportReimbursement) {
        addAggregationData["transportReimbursement"] = parseFloat(
          data.aggregationTransportReimbursement
        );
      }
      dispatch(addAggregationAction(addAggregationData, navigate));
    } else {
      const addAggregationInputData = {
        inputId: parseInt(data.aggregationInputValue),
        inputSubType: data.inputSubtype,
        quantity: parseFloat(data.aggregationQuantity),
        costPrice: parseFloat(data.aggregationCostPrice),
        sellingPrice: parseFloat(data.aggregationSellingPrice),
        warehouseId: parseInt(data.aggregationWareHouse),
        country: parseInt(data.aggregationCountry),
        state: parseInt(data.aggregationState),
        expiryDate: moment(data.aggregationSelectedExpiryDate),
        dateTime: mergeDateTime(
          data.aggregationSelectedDate,
          data.aggregationTime
        ),
        otherImages: productImageIDs,
        defaultImageId: defaultImageIDs,
        desc: productDescription,
      };
      dispatch(addAggregationInputAction(addAggregationInputData, navigate));
    }
  };

  return (
    <Box sx={commonStyles.signupContentContainer}>
      <AjTypography
        styleData={commonStyles.mainHeading}
        displayText="Add Aggregation"
      />
      <Grid sx={wareHouseStyles.addWareHouseContainer}>
        <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={styles.aggregationResponsiveFields}
          >
            <AjInputLabel
              displayText={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? "Input to be aggregated"
                  : "Product to be aggregated"
              }
              required
              styleData={commonStyles.inputLabel}
            />
            <AjDropDown
              options={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? inputSupplierInputs
                  : associationProducts
              }
              value={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? aggregatedInputValue?.name
                  : aggregatedProductValue?.productName
              }
              onChange={productAggregatedChangeHandler}
              source={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? "name"
                  : "productName"
              }
              placeHolder={
                userData.role_id === ROLES.INPUT_SUPPLIER
                  ? "Select input to be aggregated"
                  : "Select product to be aggregated"
              }
              isPlaceholderCapiltalize={false}
              styleData={commonStyles.ajDropDownEllipsis}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={
                userData?.role_id === 9
                  ? errors.aggregationInputValue?.message
                  : errors.aggregationProductValue?.message
              }
            />
          </Grid>
          {(userData.role_id === ROLES.FARMING_ASSOCIATION ||
            userData.role_id === ROLES.PRODUCT_AGGREGATOR) && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText="Product Type"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={productTypeOptions}
                value={productType}
                onChange={productTypeChangeHandler}
                source="label"
                placeHolder="Select product type"
                isPlaceholderCapiltalize={false}
                styleData={commonStyles.ajDropDownEllipsis}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationProductType?.message}
              />
            </Grid>
          )}
          {userData.role_id === ROLES.INPUT_SUPPLIER && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText={"Input subtype"}
                required
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                placeholder="Enter subtype"
                fullWidth
                id="inputSubtype"
                name="inputSubtype"
                sx={commonStyles.inputStyle}
                {...register("inputSubtype")}
                error={errors.inputSubtype ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.inputSubtype?.message}
              />
            </Grid>
          )}
        </Grid>

        <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
          {userData.role_id === ROLES.FARMING_ASSOCIATION && (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={styles.aggregationResponsiveFields}
            >
              <AjInputLabel
                displayText="Farmer"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={activeFarmerData}
                value={farmerData?.farmerName}
                onChange={farmerNameChangeHandler}
                source="farmerName"
                placeHolder="Select farmer"
                disableSourceForValue
                isPlaceholderCapiltalize={false}
                styleData={commonStyles.ajDropDownEllipsis}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationFarmerValue?.message}
              />
            </Grid>
          )}

          <Grid
            item
            xs={12}
            sm={12}
            md={userData.role_id === ROLES.PRODUCT_AGGREGATOR ? 12 : 6}
            lg={userData.role_id === ROLES.PRODUCT_AGGREGATOR ? 12 : 6}
            sx={styles.aggregationResponsiveFields}
          >
            <AjInputLabel
              displayText={`Quantity ${
                aggregatedProductValue
                  ? `(${
                      textCapitalize(
                        aggregatedProductValue?.unit_of_measurement
                      ) || "Kg"
                    })`
                  : `(${
                      textCapitalize(
                        aggregatedInputValue?.unit_of_measurement
                      ) || "Kg"
                    })`
              }`}
              required
              styleData={commonStyles.inputLabel}
            />
            <InputBase
              required
              placeholder="Enter quantity"
              fullWidth={userData.role_id === ROLES.PRODUCT_AGGREGATOR}
              id="aggregationQuantity"
              name="aggregationQuantity"
              sx={commonStyles.inputStyle}
              {...register("aggregationQuantity")}
              error={errors.addWareHouseName ? true : false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationQuantity?.message}
            />
          </Grid>
          {userData.role_id === ROLES.INPUT_SUPPLIER && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText={`Selling Price ${getCurrencySymbol(
                  userData?.currency
                )}  (${userData?.currency})`}
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
                onValueChange={(value) => onSellingPriceChange(value)}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationSellingPrice?.message}
              />
            </Grid>
          )}
        </Grid>

        <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={styles.aggregationResponsiveFields}
          >
            <AjInputLabel
              displayText={`Cost Price ${getCurrencySymbol(
                userData?.currency
              )}  (${userData?.currency})`}
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
              onValueChange={(value) => onPriceChange(value)}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationCostPrice?.message}
            />
          </Grid>

          {userData.role_id !== ROLES.INPUT_SUPPLIER && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText={`Transport Reimbursement ${getCurrencySymbol(
                  userData?.currency
                )}(${userData?.currency})`}
                styleData={commonStyles.inputLabel}
              />
              <NumberFormat
                customInput={InputBase}
                thousandSeparator={true}
                prefix={`${getCurrencySymbol(userData?.currency)} `}
                style={{
                  ...commonStyles.inputStyle,
                }}
                placeholder="Enter transport reimbursement"
                decimalScale={2}
                onValueChange={(value) =>
                  setValue("aggregationTransportReimbursement", value.value, {
                    shouldValidate: true,
                  })
                }
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationTransportReimbursement?.message}
              />
            </Grid>
          )}
          {userData.role_id === ROLES.INPUT_SUPPLIER && (
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText="Warehouse"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={activeWareHouseData}
                value={wareHouse?.wareHouseName}
                onChange={wareHouseNameChangeHandler}
                source="wareHouseName"
                placeHolder="Select warehouse"
                disableSourceForValue
                isPlaceholderCapiltalize={false}
                styleData={commonStyles.ajDropDownEllipsis}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationWareHouse?.message}
              />
            </Grid>
          )}
        </Grid>

        {userData.role_id !== ROLES.INPUT_SUPPLIER && (
          <Grid
            container
            columnSpacing={"1.25rem"}
            sx={commonStyles.marginTop20}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={styles.aggregationResponsiveFields}
            >
              <AjInputLabel
                displayText="Warehouse"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={activeWareHouseData}
                value={wareHouse?.wareHouseName}
                onChange={wareHouseNameChangeHandler}
                source="wareHouseName"
                placeHolder="Select warehouse"
                disableSourceForValue
                isPlaceholderCapiltalize={false}
                styleData={commonStyles.ajDropDownEllipsis}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationWareHouse?.message}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText="Quality"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDropDown
                options={qualityOptions}
                value={qualityType}
                onChange={qualityTypeChangeHandler}
                source="label"
                placeHolder="Select quality"
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationQuality?.message}
              />
            </Grid>
          </Grid>
        )}
        <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={styles.aggregationResponsiveFields}
          >
            <AjCountry
              displayText="Country"
              defaultValue={userData?.country_id}
              onCountrySelect={aggregationCountryNameHandler}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationCountry?.message}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <AjState
              displayText="State"
              onStateSelect={aggregationCountryStateIdHandler}
              codeOfCountry={aggregationSelectedCodeOfCountry}
              reset={aggregationStateReset}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationState?.message}
            />
          </Grid>
        </Grid>
        <Grid container columnSpacing={"1.25rem"} sx={commonStyles.marginTop20}>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={6}
            sx={styles.aggregationResponsiveFields}
          >
            <AjInputLabel
              displayText="Date"
              required
              styleData={commonStyles.inputLabel}
            />
            <AjDatePicker
              value={aggregationDate ? aggregationDate : null}
              dateSelectHandler={dateSelectionHandler}
              minDate={getPreviousYearDate()}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationSelectedDate?.message}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6}>
            <AjInputLabel
              displayText="Time"
              required
              styleData={commonStyles.inputLabel}
            />
            <AjTimePicker
              value={time ? time : null}
              timeSelectionHandler={timeSelectionHandler}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationTime?.message}
            />
          </Grid>
        </Grid>
        {userData.role_id === ROLES.INPUT_SUPPLIER && (
          <Grid
            container
            columnSpacing={"1.25rem"}
            sx={commonStyles.marginTop20}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={6}
              sx={styles.aggregationResponsiveFields}
            >
              <AjInputLabel
                displayText="Expiry Date"
                required
                styleData={commonStyles.inputLabel}
              />
              <AjDatePicker
                value={aggregationExpiryDate ? aggregationExpiryDate : null}
                dateSelectHandler={expiryDateSelectionHandler}
                minDate={getTodaysDate()}
                maxDate={getNextYearDate()}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.aggregationSelectedExpiryDate?.message}
              />
            </Grid>
          </Grid>
        )}
        {userData.role_id === ROLES.INPUT_SUPPLIER && (
          <Box>
            <AjProductDescripton
              handleProductDescription={handleProductDescription}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.aggregationDescription?.message}
            />
          </Box>
        )}
        {userData.role_id === ROLES.INPUT_SUPPLIER && (
          <AjUploadMultipleImgs
            handleProductImagesChange={handleProductImagesChange}
          />
        )}

        <Grid sx={wareHouseStyles.addWareHouseSaveBtnContainer}>
          <AjButton
            onClick={handleSubmit(onSubmit)}
            variant="contained"
            displayText="Add Aggregation"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddAggregationForm;
