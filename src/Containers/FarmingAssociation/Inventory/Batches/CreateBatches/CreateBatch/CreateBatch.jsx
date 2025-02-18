import { yupResolver } from "@hookform/resolvers/yup";
import { Box } from "@mui/system";
import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import AjButton from "../../../../../../Components/AjButton";
import AjDropDown from "../../../../../../Components/AjDropdown/AjDropDown";
import AjInputLabel from "../../../../../../Components/AjInputLabel";
import { AjMultipleWareHouse } from "../../../../../../Components/AjMultipleWarehouse/AjMultipleWareHouse";
import AjTypography from "../../../../../../Components/AjTypography";
import AjChipDropdown from "../../../../../../Components/AjChipDropdown";
import {
  qualityOptions,
  productTypeOptions,
} from "../../../../../../Constant/AppConstant";
import { getProducts } from "../../../../../../Redux/common/Products/productsActions";
import { getFarmerListAction } from "../../../../../../Redux/FarmingAssociation/Farmers/farmersActions";
import { createBatchAction } from "../../../../../../Redux/FarmingAssociation/Inventory/inventoryActions";
import { textCapitalize } from "../../../../../../Services/commonService/commonService";
import {
  getUserAccountData,
  getUserData,
} from "../../../../../../Services/localStorageService";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import {
  createBatchSchema,
  createBatchFarmerSchema,
} from "../../../../../../validationSchema/createBatchSchema";
import { styles } from "../CreateBatchStyles";
import { ROLES } from "../../../../../../Constant/RoleConstant";

const CreateBatch = ({ batchType }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAccountData = getUserAccountData();
  const userData = getUserData();
  const [chipValue, setChipValue] = useState([]);

  const [productsData, setProductsData] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);
  const [qualityType, setQualityType] = useState(null);
  const [productType, setProductType] = useState(null);

  const [activeFarmerData, setActiveFarmerData] = useState(null);
  const [farmerData, setFarmerData] = useState(null);

  const [isSubmit, setIsSubmit] = useState(false);

  const products = useSelector((state) => state.products.products);
  const farmerList = useSelector((state) => state.farmers.farmerList);

  let wareHouseQuantityData = null;

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
  }, [farmerList]);

  const {
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      userData.role_id === ROLES.FARMING_ASSOCIATION
        ? createBatchFarmerSchema
        : createBatchSchema
    ),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getProducts());
    if (userData.role_id === ROLES.FARMING_ASSOCIATION) {
      dispatch(getFarmerListAction({ type: "FARMER" }));
    }
  }, []);

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

  const onChangeProductHandler = (_e, selectedProduct) => {
    let selectedValue = products.find((item) => {
      if (item.id === selectedProduct.props.value.id) {
        return item;
      }
    });
    setValue("createBatchProductNameId", selectedValue.productId, {
      shouldValidate: true,
    });
    setSelectedProductDetails(selectedValue);
  };

  const onChangeProductTypeHandler = (_e, selectedProductType) => {
    let selectedProductValue = selectedProductType.props.value;
    setValue("createBatchProductType", selectedProductValue.value, {
      shouldValidate: true,
    });
    setProductType(selectedProductValue);
  };

  const qualityTypeChangeHandler = (_e, selectedQualityType) => {
    let selectedValue = qualityOptions.find((item) => {
      if (item.label === selectedQualityType.props.value) {
        return item.value;
      }
    });
    setValue("createBatchQuality", selectedValue.value, {
      shouldValidate: true,
    });
    setQualityType(selectedValue);
  };

  const createBatch = () => {
    if (!selectedProductDetails || !qualityType || !productType) {
      handleSubmit(onSubmit)();
    } else {
      setIsSubmit(true);
    }
  };

  const getWarehouseDetails = (data, quantityValid) => {
    wareHouseQuantityData = data;
    setIsSubmit(false);
    if (quantityValid > 0) {
      if (wareHouseQuantityData) {
        let flag = true;
        if (wareHouseQuantityData)
          wareHouseQuantityData.forEach((element) => {
            if (
              parseFloat(element.quantity) < 0.01 ||
              parseFloat(element.quantity) > 1000000
            ) {
              flag = false;
            }
          });
        if (flag) handleSubmit(onSubmit)();
      }
    }
  };

  const onChangeDropdownChipHandler = (event) => {
    const {
      target: { value },
    } = event;
    setChipValue(value);
  };
  const handleDelete = (value) => {
    setChipValue(chipValue.filter((name) => name.id !== value.id));
  };

  useEffect(() => {
    const farmersContributorsInfo = chipValue.map((item) => ({
      farmerId: item.id,
    }));
    if (farmersContributorsInfo.length > 0) {
      setValue("createBatchFarmerIds", farmersContributorsInfo, {
        shouldValidate: true,
      });
    }
  }, [chipValue]);

  const onSubmit = (data) => {
    if (!wareHouseQuantityData) return;
    const wareHouseDataFormatted = wareHouseQuantityData.map((item, index) => {
      return {
        warehouseId: item.warehouseData.id,
        quantity: parseFloat(item.quantity),
      };
    });

    const createBatchData = {
      farmers: data.createBatchFarmerIds,
      batchType: batchType,
      productId: data.createBatchProductNameId,
      quality: data.createBatchQuality,
      productType: data.createBatchProductType,
      warehouses: wareHouseDataFormatted,
    };
    dispatch(createBatchAction(createBatchData, navigate));
  };

  return (
    <>
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
              value={selectedProductDetails?.productName}
              onChange={onChangeProductHandler}
              source="productName"
              styleData={commonStyles.ajDropDownEllipsis}
              placeHolder="Select product name"
              disableSourceForValue
              isPlaceholderCapiltalize={false}
            />
            <AjTypography
              styleData={{ ...commonStyles.errorText, ...styles.errorField }}
              displayText={errors.createBatchProductNameId?.message}
            />
          </Box>
          <Box
            sx={{
              ...commonStyles.signupFormFieldContainer,
              ...styles.fieldInputResponsive,
            }}
          >
            <AjInputLabel
              displayText="Quality"
              required
              styleData={commonStyles.inputLabel}
            />
            <AjDropDown
              options={qualityOptions}
              value={qualityType?.label}
              onChange={qualityTypeChangeHandler}
              source="label"
              placeHolder="Select quality"
              isPlaceholderCapiltalize={false}
            />
            <AjTypography
              styleData={commonStyles.errorText}
              displayText={errors.createBatchQuality?.message}
            />
          </Box>
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
            onChange={onChangeProductTypeHandler}
            source="label"
            styleData={commonStyles.ajDropDownEllipsis}
            placeHolder="Select product type"
            disableSourceForValue
            isPlaceholderCapiltalize={false}
          />
          <AjTypography
            styleData={{ ...commonStyles.errorText, ...styles.errorField }}
            displayText={errors.createBatchProductType?.message}
          />
        </Box>

        {userData.role_id === ROLES.FARMING_ASSOCIATION && (
          <Box>
            <AjInputLabel
              displayText="Batch Contributor(s)"
              required
              styleData={commonStyles.inputLabel}
            />
            <AjChipDropdown
              id="farmersContributorsInfo"
              name="farmersContributorsInfo"
              value={chipValue}
              onChange={onChangeDropdownChipHandler}
              fullWidth
              source="farmerName"
              onDelete={handleDelete}
              options={activeFarmerData}
              styleData={styles.chipDropDown}
              isReadOnly={false}
              isObjectValue={true}
            />
            <AjTypography
              styleData={{ ...commonStyles.errorText, ...styles.errorField }}
              displayText={errors.createBatchFarmerIds?.message}
            />
          </Box>
        )}

        <AjMultipleWareHouse
          submit={isSubmit}
          data={getWarehouseDetails}
          selectedProductDetails={selectedProductDetails}
          selectedQualityType={qualityType}
          selectedProductType={productType}
          selectedBatchType={batchType}
          selectedProductUnit={textCapitalize(
            selectedProductDetails?.unit_of_measurement
          )}
        />
      </Box>
      <Box sx={styles.createBatchBtn}>
        <AjButton
          onClick={createBatch}
          variant="contained"
          displayText="Create Batch"
        />
      </Box>
    </>
  );
};

export default CreateBatch;
