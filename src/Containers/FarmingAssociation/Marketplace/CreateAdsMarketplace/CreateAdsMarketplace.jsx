import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, IconButton, InputBase } from "@mui/material";
import * as _ from "lodash";
import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import AjButton from "../../../../Components/AjButton";
import AjDropDown from "../../../../Components/AjDropdown/AjDropDown";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjTypography from "../../../../Components/AjTypography";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

import { productTypeOptions } from "../../../../Constant/AppConstant";
import { getProducts } from "../../../../Redux/common/Products/productsActions";
import {
  getBatchListAction,
  getBatchList,
  getbatchDetailAction,
  getBatchDetail,
} from "../../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import { createMarketplaceAdAction } from "../../../../Redux/FarmingAssociation/MarketPlace/marketplaceActions";
import {
  getUserAccountData,
  getUserData,
} from "../../../../Services/localStorageService";
import {
  commonStyles,
  customCommonStyles,
} from "../../../../Style/CommonStyle";
import { createAdsMarketplaceSchema } from "../../../../validationSchema/createAdsMarketplaceSchema";
import { styles } from "../../Inventory/Batches/CreateBatches/CreateBatchStyles";
import {
  getCurrencySymbol,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import AjUploadCACDocument from "../../../../Components/AjUploadCACDocument/AjUploadCACDocument";
import NumberFormat from "react-number-format";
import { getProfileDetails } from "../../../../Redux/Profile/profileActions";
import AjUploadMultipleImgs from "../../../../Components/AjUploadMultileImg/AjUploadMultipleImgs";
import AjProductDescripton from "../../../../Components/AjProductDescription/AjProductDescripton";

const CreateAdsMarketplace = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userAccountData = getUserAccountData();
  const userData = getUserData();

  const { id } = params;

  const [productsData, setProductsData] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [productType, setProductType] = useState(null);
  const [batch, setBatch] = useState(null);
  const [unitOfMeasurement, setUnitOfMeasurement] = useState(null);
  const [createAdsMarketplaceData, setCreateAdsMarketplaceData] =
    useState(null);
  const createAdsMarketplaceDataRef = useRef(createAdsMarketplaceData);
  const isDoneRef = useRef(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [productImageIDs, setProductImageIDs] = useState([]);
  const [defaultImageIDs, setDefaultImageIDs] = useState(null);
  const [productDescription, setProductDescription] = useState([]);

  const products = useSelector((state) => state.products.products);
  const batchList = useSelector((state) => state.inventory.batchList);
  const batchDetail = useSelector((state) => state.inventory.batchDetail);
  const userProfileDetails = useSelector(
    (state) => state.profile.userProfileDetails
  );

  useEffect(() => {
    if (id) {
      dispatch(getbatchDetailAction(id));
    }
    return () => {
      dispatch(getBatchDetail(null));
    };
  }, [id]);

  useEffect(() => {
    dispatch(getProfileDetails());
  }, []);

  useEffect(() => {
    if (batchDetail?.batchDetail[0]?.product_name) {
      let particularProduct = _.find(products, {
        id: batchDetail?.batchDetail[0]?.product_id,
      });
      setSelectedProductDetails(particularProduct);
      setValue("createAdsMarketplaceProductNameId", particularProduct?.id, {
        shouldValidate: true,
      });
    }
    if (batchDetail?.batchDetail[0]?.product_type) {
      let particularProductType = _.find(productTypeOptions, {
        value: batchDetail?.batchDetail[0]?.product_type,
      });
      setProductType(particularProductType);
      setValue(
        "createAdsMarketplaceProductType",
        particularProductType?.label,
        {
          shouldValidate: true,
        }
      );
    }
  }, [batchDetail]);

  const {
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createAdsMarketplaceSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    if (createAdsMarketplaceData?.cacDocumentDetails) {
      handleSubmit(onSubmit)();
    }
  }, [createAdsMarketplaceData]);

  useEffect(() => {
    if (!products || !userAccountData.products) return;
    const productItems = [];
    userAccountData.products.forEach((item) => {
      productItems.push(_.find(products, { productId: item }));
    });
    const productDetails = productItems.map((item) => {
      return {
        productName: item.productName,
        id: item.productId,
      };
    });
    setProductsData(productDetails);
  }, [products]);

  useEffect(() => {
    if (selectedProductDetails && productType) {
      const searchObject = {
        productId: selectedProductDetails?.id,
        productType: productType?.value,
      };
      if (batch?.id) {
        setBatch(null);
        setValue("createAdsMarketplaceBatch", "", {
          shouldValidate: true,
        });
      }
      dispatch(getBatchListAction(searchObject));
    }
  }, [selectedProductDetails, productType]);

  useEffect(() => {
    return () => dispatch(getBatchList({}));
  }, []);

  const onChangeProductHandler = (_e, selectedProduct) => {
    let selectedValue = products.find((item) => {
      if (item.id === selectedProduct.props.value.id) {
        return item;
      }
    });
    setValue("createAdsMarketplaceProductNameId", selectedValue.productId, {
      shouldValidate: true,
    });
    setSelectedProductDetails(selectedValue);
    setUnitOfMeasurement(textCapitalize(selectedValue?.unit_of_measurement));
  };

  const onPriceChange = (value) => {
    setValue("createAdsMarketplacePrice", value.value, {
      shouldValidate: true,
    });
  };

  const onChangeProductTypeHandler = (_e, selectedProductType) => {
    let selectedProductValue = selectedProductType.props.value;
    setValue("createAdsMarketplaceProductType", selectedProductValue.value, {
      shouldValidate: true,
    });
    setProductType(selectedProductValue);
  };

  const onChangeBatchHandler = (selectedBatch) => {
    let selectedValue = selectedBatch.target.value;
    setValue("createAdsMarketplaceBatch", selectedValue.id, {
      shouldValidate: true,
    });
    setBatch(selectedValue);
  };

  const updateState = (newState) => {
    createAdsMarketplaceDataRef.current = newState;
    setCreateAdsMarketplaceData(newState);
    setIsSubmit(false);
  };

  const createAdMarketplace = () => {
    setIsSubmit(true);
    isDoneRef.current = true;
    handleSubmit(onSubmit)();
  };

  const getCACDocumentDetails = (data) => {
    updateState({
      ...createAdsMarketplaceDataRef.current,
      cacDocumentDetails: data,
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
    // if (!productDescription && isSubmit) {
    //   setProductDescriptionError("Product Description is required");
    // } else {
    //   setProductDescriptionError("");
    // }
  };

  const onSubmit = (data) => {
    // console.log(data, "submit is clicked");
    // let cacDocumentDetails;
    // if (
    //   createAdsMarketplaceData &&
    //   createAdsMarketplaceData.cacDocumentDetails
    // ) {
    //   cacDocumentDetails = createAdsMarketplaceData.cacDocumentDetails;
    // }
    // if (!isDoneRef.current) {
    //   return;
    // }
    // isDoneRef.current = false;
    // if (!cacDocumentDetails) {
    //   return;
    // }
    if (!data) {
      return;
    }
    let createAdsDataToSend = {
      batchId: parseInt(data?.createAdsMarketplaceBatch),
      costPrice: parseFloat(getValues("createAdsMarketplacePrice")),
      otherImages: productImageIDs,
      defaultImageId: defaultImageIDs,
      desc: productDescription,
    };

    if (createAdsMarketplaceData?.cacDocumentDetails?.CACDocument) {
      createAdsDataToSend = {
        ...createAdsDataToSend,
        imageId: parseInt(
          createAdsMarketplaceData?.cacDocumentDetails?.CACDocument
        ),
      };
    }
    console.log(createAdsDataToSend);
    dispatch(createMarketplaceAdAction(createAdsDataToSend, navigate));
  };

  const backButtonHandler = () => {
    navigate("/marketplace?activeTab=0");
  };

  return (
    <>
      <Grid container sx={commonStyles.signupFormMainGridContainer}>
        <Box sx={commonStyles.relativePosition}>
          <IconButton
            disableRipple
            sx={commonStyles.backButtonPosition}
            onClick={backButtonHandler}
          >
            {" "}
            <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
          </IconButton>
        </Box>
        <Box sx={commonStyles.relativePosition}>
          {!userProfileDetails?.hasOwnProperty("bankDetails") && (
            <AjTypography
              displayText="Please add bank details to send ads to buyer"
              styleData={{
                ...commonStyles.warningTextPosition,
                ...commonStyles.subHeading,
                ...commonStyles.colorRed,
              }}
            />
          )}
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
              displayText="Create Ad"
            />
            <Box
              component="form"
              sx={{
                ...commonStyles.signupFormContainer,
                ...commonStyles.mobileScreenFormContainer,
              }}
            >
              <Box sx={styles.layoutHandle}>
                <Box sx={styles.batchFields}>
                  <Box
                    sx={{
                      ...commonStyles.signupFormFieldContainer,
                      ...commonStyles.fieldTopMargin,
                    }}
                  >
                    <AjInputLabel
                      displayText="Product name"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjDropDown
                      options={productsData}
                      value={selectedProductDetails}
                      onChange={onChangeProductHandler}
                      source="productName"
                      styleData={commonStyles.ajDropDownEllipsis}
                      placeHolder="Select product name"
                      disableSourceForValue
                      isPlaceholderCapiltalize={false}
                      defaultValue={selectedProductDetails?.productName}
                    />
                    <AjTypography
                      styleData={{
                        ...commonStyles.errorText,
                        ...styles.errorField,
                      }}
                      displayText={
                        errors.createAdsMarketplaceProductNameId?.message
                      }
                    />
                  </Box>
                  <Box
                    sx={{
                      ...commonStyles.signupFormFieldContainer,
                      ...commonStyles.fieldTopMargin,
                    }}
                  >
                    <AjInputLabel
                      displayText="Product type"
                      required
                      styleData={commonStyles.inputLabel}
                    />
                    <AjDropDown
                      options={productTypeOptions}
                      value={productType?.value}
                      placeholder="Enter product type"
                      onChange={onChangeProductTypeHandler}
                      source="label"
                      styleData={commonStyles.ajDropDownEllipsis}
                      placeHolder="Select product type"
                      disableSourceForValue
                      isPlaceholderCapiltalize={false}
                      defaultValue={productType?.label}
                    />
                    <AjTypography
                      styleData={{
                        ...commonStyles.errorText,
                        ...styles.errorField,
                      }}
                      displayText={
                        errors.createAdsMarketplaceProductType?.message
                      }
                    />
                  </Box>
                </Box>
                <Box sx={styles.batchFields}>
                  <Box
                    sx={{
                      ...commonStyles.signupFormFieldContainer,
                      ...commonStyles.fieldTopMargin,
                    }}
                  >
                    <AjInputLabel
                      displayText="Batch"
                      required
                      styleData={commonStyles.inputLabel}
                    />

                    <AjDropDown
                      options={batchList?.result}
                      value={batch}
                      onChange={onChangeBatchHandler}
                      source="batch_id"
                      styleData={{
                        ...commonStyles.ajDropDownEllipsis,
                        ...((!batchList || !batchList?.result?.length) &&
                          commonStyles.disableInput),
                      }}
                      placeHolder="Select batch"
                      disableSourceForValue
                      isPlaceholderCapiltalize={false}
                      readOnly={!batchList || !batchList?.result?.length}
                    />
                    <AjTypography
                      styleData={{
                        ...commonStyles.errorText,
                        ...styles.errorField,
                      }}
                      displayText={errors.createAdsMarketplaceBatch?.message}
                    />
                  </Box>
                  <Box
                    sx={{
                      ...commonStyles.signupFormFieldContainer,
                      ...commonStyles.fieldTopMargin,
                    }}
                  >
                    <AjInputLabel
                      displayText={`Price ${
                        unitOfMeasurement ? `(per ${unitOfMeasurement})` : ""
                      }`}
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
                      styleData={{
                        ...commonStyles.errorText,
                        fontSize: "0.813rem",
                      }}
                      displayText={errors?.createAdsMarketplacePrice?.message}
                    />
                  </Box>
                </Box>
                {/* <AjUploadCACDocument
                  submit={isSubmit}
                  data={getCACDocumentDetails}
                  docType="PRODUCT_PHOTO"
                  styleData={customCommonStyles.certificateContainer}
                  label="Image : (JPEG, PNG or PDF only)"
                  error="Image is required"
                  documentRequired={true}
                /> */}
                <Box>
                  <AjProductDescripton
                    handleProductDescription={handleProductDescription}
                  />
                  <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.aggregationDescription?.message}
                  />
                </Box>
                <Box>
                  <AjUploadMultipleImgs
                    handleProductImagesChange={handleProductImagesChange}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  ...styles.createBatchBtn,
                  ...commonStyles.paddingBottom0,
                }}
              >
                <AjButton
                  onClick={createAdMarketplace}
                  variant="contained"
                  displayText="Create Ad"
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default CreateAdsMarketplace;
