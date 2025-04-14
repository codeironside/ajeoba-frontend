import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, InputBase, Box, Typography } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import AjInputLabel from "../AjInputLabel";
import AjDropDown from "../AjDropdown/AjDropDown";
import AjTypography from "../AjTypography";
import AjButton from "../AjButton";
import * as _ from "lodash";
import { AddFarmerProductSchema } from "../../validationSchema/addFarmerSchema";
import { getProducts } from "../../Redux/common/Products/productsActions";
import { commonStyles } from "../../Style/CommonStyle";
import { addProduct } from "../../Redux/FarmingAssociation/Farmers/farmersActions";
import { showToast } from "../../Services/toast";
import AjAddFarmerProductListing from "../AjAddFarmerProductListing/AjAddFarmerProductListing";
import { ADD_FARMER_REFEREE_SELECTION } from "../../Routes/Routes";
import { styles } from "./AjAddProductStyle";
import { styles as farmerDetailStyles } from "../AjAddFarmerLandDetails/AjAddFarmerDetailsStyles";
import { textCapitalize } from "../../Services/commonService/commonService";

const AjAddFarmerProduct = (props) => {
  const products = useSelector((state) => state.products.products);
  const productData = useSelector((state) => state.farmers.productData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [productName, setProductName] = useState(null);
  const [productOptions, setProductOptions] = useState(products);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(null);
  const [error, setError] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddFarmerProductSchema),
    mode: "onChange",
  });

  // Debug: Log product listing and product options
  useEffect(() => {
    console.log("Product listing updated:", productData?.productListing);
    console.log(
      "Number of products in listing:",
      productData?.productListing?.length
    );
  }, [productData]);

  const onSubmit = (data) => {
    console.log("onSubmit data:", data);
    // Fallback to first product option if productName not set
    const productDataToSend = {
      productName: productName ? productName : productOptions[0]?.productName,
      yield: data.yield,
      unit_of_measurement: unitOfMeasurement,
    };

    if (productData?.productListing?.length < 10) {
      dispatch(
        addProduct({
          singleProduct: productDataToSend,
          productListing: [...productData.productListing, productDataToSend],
        })
      );
      showToast("Product added successfully", "success");
      setValue("yield", null);
      // Reset productName if there are other options available
      if (productOptions?.length > 1) {
        setProductName(productOptions[0].productName);
      }
    } else {
      showToast("Max 10 products can be added", "error");
    }
  };

  // Filter products that are not already added to the listing.
  const setProductsOptionFunc = () => {
    const optionsRes = products?.filter((el) => {
      return !productData?.productListing?.find(
        (element) => element.productName === el.productName
      );
    });
    console.log("Filtered product options:", optionsRes);
    setProductOptions(optionsRes);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    // Update available product options when productData or products change.
    if (productData?.productListing?.length) {
      setProductsOptionFunc();
      setError(false);
    } else {
      setProductOptions(products);
    }
  }, [productData, products]);

  useEffect(() => {
    if (productOptions && productOptions.length) {
      setProductName(productOptions[0]?.productName);
      setUnitOfMeasurement(productOptions[0]?.unit_of_measurement);
      console.log(
        "Product options updated. Selected product:",
        productOptions[0]
      );
    } else {
      console.log("No more available product options.");
      // Optional: Clear productName/unit if none are available
      setProductName(null);
      setUnitOfMeasurement(null);
    }
  }, [productOptions]);

  useEffect(() => {
    if (productName && productOptions) {
      const selectedProduct = _.find(productOptions, { productName });
      setUnitOfMeasurement(selectedProduct?.unit_of_measurement);
      console.log(
        "Product changed to:",
        productName,
        "Unit:",
        selectedProduct?.unit_of_measurement
      );
    }
  }, [productName, productOptions]);

  const productChangeHandler = (selectedValue) => {
    console.log("Dropdown changed:", selectedValue.target.value);
    setProductName(selectedValue.target.value);
  };

  const nextHandler = () => {
    console.log(
      "Next button clicked, current product listing length:",
      productData?.productListing?.length
    );
    if (productData?.productListing?.length) {
      navigate(ADD_FARMER_REFEREE_SELECTION);
    } else {
      setError(true);
    }
  };

  const isFarmersDetaileditPage = location.pathname.includes("farmers/edit");
  const isFarmersDetailPage = location.pathname.includes("farmers/detail");

  // Use conditional text based on whether any product exists in the listing.
  const addButtonText = productData?.productListing?.length
    ? "add another product"
    : "add product";

  return (
    <>
      {/* Render product selection form only if there are product options available */}
      {productOptions?.length >= 1 &&
        !isFarmersDetailPage &&
        !isFarmersDetaileditPage && (
          <>
            <Grid
              container
              columnSpacing={2}
              sx={{
                ...commonStyles.maxWidth,
                ...commonStyles.marginTopRoot,
                ...(props.forView && farmerDetailStyles.displayNone),
                ...(typeof props.forView !== "undefined" &&
                  !props.forView &&
                  commonStyles.marginTop0),
              }}
            >
              <Grid item xs={12} sm={6}>
                <AjInputLabel
                  required={true}
                  styleData={commonStyles.inputLabel}
                  displayText="Product"
                />
                <AjDropDown
                  options={productOptions}
                  value={productName}
                  onChange={productChangeHandler}
                  source="productName"
                  styleData={{
                    ...styles.customDropdownStyle,
                    ...(typeof props.forView !== "undefined" &&
                      styles.customDropdownStyleNew),
                  }}
                  defaultValue={productOptions[0]?.productName}
                  placeHolder="Select Product"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <AjInputLabel
                  displayText="Yield"
                  required
                  styleData={commonStyles.inputLabel}
                />
                <InputBase
                  required
                  fullWidth
                  id="Yield"
                  type="number"
                  name="Yeild"
                  placeholder="Enter yield"
                  sx={{
                    ...commonStyles.inputStyle,
                    ...(typeof props.forView !== "undefined" && {
                      width: "21.25rem",
                      "@media (max-width:600px)": { width: "17rem" },
                    }),
                  }}
                  {...register("yield")}
                  error={!!errors.yield}
                  endAdornment={
                    <Typography sx={commonStyles.adornmentStyle}>
                      {textCapitalize(unitOfMeasurement)}
                    </Typography>
                  }
                />
                <AjTypography
                  styleData={{
                    ...commonStyles.errorText,
                    fontSize: "0.813rem",
                  }}
                  displayText={errors.yield?.message}
                />
              </Grid>
            </Grid>

            {/* Button to add a product. Render only if there are available product options. */}
            <AjButton
              variant="text"
              styleData={{
                ...commonStyles.underlineStyle,
                ...(props.forView && farmerDetailStyles.displayNone),
              }}
              displayText={addButtonText}
              onClick={handleSubmit(onSubmit)}
            />
          </>
        )}

      {/* Render product listing regardless of product options */}
      <Box
        sx={{
          ...(productOptions?.length < 1 && { marginTop: "2rem" }),
          width: "100%",
        }}
      >
        {productData?.productListing?.length > 0 &&
          !isFarmersDetaileditPage &&
          !isFarmersDetailPage && (
            <AjInputLabel
              styleData={props.customStyleData || commonStyles.textPrimaryGreen}
              displayText="Product Listing"
              required={props.isRequired}
            />
          )}
        <Box sx={{ ...commonStyles.marginTop20 }}>
          <AjAddFarmerProductListing
            onDelete={setProductOptions}
            disableDelete={props.forView}
          />
        </Box>

        {/* Next Button: Show this if there is at least one product in the listing */}
        {productData?.productListing?.length > 0 &&
          !isFarmersDetaileditPage &&
          !isFarmersDetailPage && (
            <AjButton
              variant="contained"
              displayText="Next"
              styleData={{
                ...styles.btnStyle,
                ...commonStyles.marginTopRoot,
                ...(typeof props.forView !== "undefined" &&
                  farmerDetailStyles.displayNone),
              }}
              onClick={nextHandler}
            />
          )}
        {error && (
          <AjTypography
            styleData={commonStyles.colorRed}
            displayText="Please add product"
          />
        )}
      </Box>

      {/* Render for Edit Farmer Details page */}
      {isFarmersDetaileditPage && (
        <>
          <Box sx={{ ...farmerDetailStyles.yieldStyles }}>
            <Box sx={{ ...farmerDetailStyles.yieldStyleschildren }}>
              <AjInputLabel
                required={true}
                styleData={commonStyles.inputLabel}
                displayText="Product"
              />
              <AjDropDown
                options={productOptions}
                value={productName}
                onChange={productChangeHandler}
                source="productName"
                styleData={commonStyles.inputStyleproductyield}
                defaultValue={productOptions[0]?.productName}
                placeHolder="Select Product"
              />
            </Box>
            <Box sx={{ ...farmerDetailStyles.yieldStyleschildren }}>
              <AjInputLabel
                displayText="Yield"
                required
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                fullWidth
                id="Yield"
                type="number"
                name="Yeild"
                placeholder="Enter yield"
                sx={{ ...commonStyles.inputStyleproductyield }}
                {...register("yield")}
                error={!!errors.yield}
                endAdornment={
                  <Typography sx={commonStyles.adornmentStyle}>
                    {textCapitalize(unitOfMeasurement)}
                  </Typography>
                }
              />
              <AjTypography
                styleData={{ ...commonStyles.errorText, fontSize: "0.813rem" }}
                displayText={errors.yield?.message}
              />
            </Box>
          </Box>
          <Box sx={{ ...farmerDetailStyles.detailButtonBoxeditfarmer }}>
            <AjButton
              variant="text"
              styleData={{
                ...commonStyles.underlineStyleyeild,
                ...(props.forView),
              }}
              displayText={addButtonText}
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
          <AjButton
            variant="contained"
            displayText="Next"
            styleData={{ ...styles.btnStyle }}
            aria-label="Continue to next step"
            onClick={nextHandler}
          />
          {error && (
            <AjTypography
              styleData={commonStyles.colorRed}
              displayText="Please add product"
            />
          )}
        </>
      )}
    </>
  );
};

export default AjAddFarmerProduct;
