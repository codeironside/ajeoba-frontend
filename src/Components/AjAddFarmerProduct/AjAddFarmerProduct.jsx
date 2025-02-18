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

  const onSubmit = (data) => {
    const productDataToSend = {
      productName: productName ? productName : productOptions[0].productName,
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
      if (productOptions?.length > 1) {
        setProductName(productOptions[0].productName);
      }
    } else {
      showToast("Max 10 products can be added", "error");
    }
  };

  const setProductsOptionFunc = () => {
    let optionsRes = [];
    optionsRes = products?.filter((el) => {
      return !productData?.productListing?.find((element) => {
        return element.productName === el.productName;
      });
    });
    setProductOptions(optionsRes);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (productData?.productListing?.length) {
      setProductsOptionFunc();
      setError(false);
    } else {
      setProductOptions(products);
    }
  }, [productData, products]);

  useEffect(() => {
    if (productOptions) {
      setProductName(productOptions[0]?.productName);
      setUnitOfMeasurement(productOptions[0]?.unit_of_measurement);
    }
  }, [productOptions]);

  useEffect(() => {
    if (productName && productOptions) {
      setUnitOfMeasurement(
        _.find(productOptions, { productName: productName })
          ?.unit_of_measurement
      );
    }
  }, [productName]);

  const productChangeHandler = (selectedValue) => {
    setProductName(selectedValue.target.value);
  };

  const nextHandler = () => {
    if (productData?.productListing?.length) {
      navigate(ADD_FARMER_REFEREE_SELECTION);
    } else {
      setError(true);
    }
  };
  const isFarmersDetaileditPage = location.pathname.includes("farmers/edit");
  const isFarmersDetailPage = location.pathname.includes("farmers/detail");

  return (
    <>
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
                  defaultValue={
                    products && productOptions && productOptions[0]?.productName
                  }
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
                    ...(typeof props.forView != "undefined" && {
                      width: "21.25rem",
                      "@media (max-width:600px)": {
                        width: "17rem",
                      },
                    }),
                  }}
                  {...register("yield")}
                  error={errors.yield ? true : false}
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

            <AjButton
              variant="text"
              styleData={{
                ...commonStyles.underlineStyle,
                ...(props.forView && farmerDetailStyles.displayNone),
              }}
              displayText={
                productData?.productListing?.length
                  ? "add another product"
                  : "add product"
              }
              onClick={handleSubmit(onSubmit)}
            />

            <AjButton
              variant="contained"
              displayText="Next"
              styleData={{
                ...styles.btnStyle,
                ...(productData?.productListing?.length &&
                  commonStyles.marginTopRoot),
                ...(typeof props.forView !== "undefined" &&
                  farmerDetailStyles.displayNone),
              }}
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
              styleData={{
                ...(props.customStyleData || commonStyles.textPrimaryGreen),
              }}
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
      </Box>

      {isFarmersDetaileditPage && (
        <>
          <Box sx={{ ...farmerDetailStyles.yieldStyles }}>
            <Box sx={{ ...farmerDetailStyles.yieldStyleschildren }}>
              {" "}
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
                defaultValue={
                  products && productOptions && productOptions[0]?.productName
                }
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
                sx={{
                  ...commonStyles.inputStyleproductyield,
                }}
                {...register("yield")}
                error={errors.yield ? true : false}
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
          <Box
            sx={{
              ...farmerDetailStyles.detailButtonBoxeditfarmer,
            }}
          >
            <AjButton
              variant="text"
              styleData={{
                ...commonStyles.underlineStyleyeild,
                ...(props.forView && farmerDetailStyles.displayNone),
              }}
              displayText={
                productData?.productListing?.length
                  ? "add another product"
                  : "add product"
              }
              onClick={handleSubmit(onSubmit)}
            />
          </Box>

          <AjButton
            variant="contained"
            displayText="Next"
            styleData={{
              ...styles.btnStyle,
              ...(productData?.productListing?.length &&
                commonStyles.marginTopRoot),
              ...(typeof props.forView !== "undefined" &&
                farmerDetailStyles.displayNone),
            }}
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
