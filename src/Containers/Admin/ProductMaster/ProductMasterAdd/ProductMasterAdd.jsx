import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";

import AjAddProduct from "../../../../Components/AjAddProduct/AjAddProduct";
import AjTypography from "../../../../Components/AjTypography";
import AjRadioOptions from "../../../../Components/AjRadioOptions";
import AjCsvBulkComponent from "../../../../Components/AjCsvBulkUploader/AjCsvBulkComponent";

import { PRODUCT_MASTER } from "../../../../Routes/Routes";
import {
  productOptions,
  measurementOptions,
  productBulkUploadNoteText,
  isEnabledOption,
} from "../../../../Constant/AppConstant";
import { AddProductSchema } from "../../../../validationSchema/addProductSchema";
import {
  addProducts,
  editProduct,
  getProductByIdAction,
} from "../../../../Redux/SuperAdmin/ProductMaster/productMasterActions";
import {
  commonAddProductStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import { ROLES } from "../../../../Constant/RoleConstant";
import { getUserData } from "../../../../Services/localStorageService";
import {styles} from "../../MasterManagement/MasterManagementStyles";

function ProductMasterAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const location = useLocation();

  const roleId = getUserData()?.role_id;

  const [productType, setProductType] = useState(productOptions[0].value);
  const [editstate, setEditState] = useState(false);

  const productDetails = useSelector(
    (state) => state.productMaster.productDetails
  );
  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEditState(true);
      dispatch(getProductByIdAction(id));
    }
  }, [id]);
  const productSelectHandler = (option) => {
    setProductType(option);
  };

  const onSubmit = (data) => {
    const addProductData = {
      productName: data.productName,
      unitOfMeasurement: data?.measurementDropDown
        ? data?.measurementDropDown
        : measurementOptions[0].value,
      minimumQuantityForCommission:
        ROLES.SUPER_ADMIN === roleId
          ? parseInt(data?.quantity)
          : editstate === false
          ? undefined
          : parseInt(data?.quantity),
      commission:
        ROLES.SUPER_ADMIN === roleId
          ? parseInt(data?.Commission)
          : editstate === false
          ? undefined
          : parseInt(data?.Commission),
      isCommissionActive:
        data?.isCommissionEnabledDropDown === false ||
        data?.isCommissionEnabledDropDown === undefined
          ? data?.isCommissionEnabledDropDown
          : isEnabledOption[0].value,
    };
    if (editstate) {
      dispatch(editProduct(id, addProductData, navigate));
    } else dispatch(addProducts(addProductData, navigate));
  };

  const backArrowHandler = () => {
    navigate(PRODUCT_MASTER);
  };
  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          disableRipple
          onClick={backArrowHandler}
          sx={commonStyles.backButtonPosition}
        >
          <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
        </IconButton>
      </Box>
      <Grid
        container
        item
        sx={{
          ...commonStyles.signupFormMainContentContainer,
          ...commonStyles.customSrollBar,
          ...styles.addItemStyles,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText={editstate ? "Edit Product" : "Add Product"}
            styleData={commonStyles.mainHeading}
          />

        <Grid
          item
          sx={[commonAddProductStyles.gridBox, commonAddProductStyles.gridData]}
        >
          <Grid item sx={commonStyles.fullWidth}>
            {editstate ? (
              ""
            ) : (
              <AjRadioOptions
                styleData={commonAddProductStyles.radioOptions}
                items={productOptions}
                defaultValue={productType}
                onSelect={productSelectHandler}
              />
            )}
          </Grid>
          {productType === "single_product" ? (
            <AjAddProduct
              schema={AddProductSchema}
              inputLabelName="Product Name"
              inputId="productName"
              inputPlaceholder="Enter product name"
              productName={productDetails?.productDetail[0]?.name}
              searchInputLabelName="Unit of Measurement"
              dropDownOptions={measurementOptions}
              dropDownValue={
                productDetails?.productDetail[0]?.unit_of_measurement
              }
              quantityInputLabel="Minimum quantity (for commission)"
              quantityInputId="quantity"
              quantityInputPlaceholder="Enter quantity"
              quantityInputName={
                productDetails?.productDetail[0]?.min_quantity_for_commission
              }
              commissionInputLabel="Commission (%)"
              commissionInputId="Commission"
              commissionInputPlaceholder="Enter commission in %"
              commissionInputName={productDetails?.productDetail[0]?.commission}
              fourthInputLabel="Is commission enabled"
              isEnabledOption={isEnabledOption}
              commissionDropDownValue={
                productDetails?.productDetail[0]?.is_commission_active
              }
              onSubmit={onSubmit}
              editableState={editstate}
            />
          ) : (
            <AjCsvBulkComponent
              noteText={productBulkUploadNoteText}
              apiCallFor="products"
            />
          )}
        </Grid>
        </Box>

      </Grid>
    </Grid>
  );
}

export default ProductMasterAdd;
