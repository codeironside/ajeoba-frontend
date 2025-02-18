import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Grid, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import * as _ from "lodash";
import { yupResolver } from "@hookform/resolvers/yup";

import AjDropDown from "../../../../../Components/AjDropdown/AjDropDown";
import AjInputLabel from "../../../../../Components/AjInputLabel";
import AjTypography from "../../../../../Components/AjTypography";
import AjButton from "../../../../../Components/AjButton";

import { createFinanaceRequestAction } from "../../../../../Redux/FarmingAssociation/Finance/FinanceActions";
import { getFinanceCompanyListAction } from "../../../../../Redux/SuperAdmin/UserManagement/FinanceCompany/financeCompanyAction";
import { getInputListAction } from "../../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import {
  productTypeOptions,
  typeOfRequestOptions,
} from "../../../../../Constant/AppConstant";
import { getProducts } from "../../../../../Redux/common/Products/productsActions";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { createRequestSchema } from "../../../../../validationSchema/createRequestSchema";
import { styles as viewSupportStyles } from "../../../../Profile/ViewSupport/ViewSupportStyles";
import { styles } from "./CreateRequestsStyles";

const CreateRequest = (props) => {
  const { requestType } = props;
  const [selectedInputDetails, setSelectedInputDetails] = useState(null);

  const [productType, setProductType] = useState(null);
  const [requestTypeNew, setRequestTypeNew] = useState(requestType);

  const [financeCompany, setFinanceCompany] = useState(null);
  const [selectedProductDetails, setSelectedProductDetails] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const financeCompanyList = useSelector(
    (state) => state.financeCompany.financeCompanyList
  ).result;
  const inputs = useSelector((state) => state.inputMaster.inputList).result;

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createRequestSchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getInputListAction());
    dispatch(getFinanceCompanyListAction(false));
  }, []);

  useEffect(() => {
    if (requestType) {
      setValue("requestType", requestType, { shouldValidate: true });
      setRequestTypeNew(requestType);
    }
  }, [requestType]);

  const onChangeProductHandler = (_e, selectedProduct) => {
    let selectedValue = products.find((item) => {
      if (item.id === selectedProduct.props.value.id) {
        return item;
      }
    });
    setValue("productId", selectedValue?.productId, {
      shouldValidate: true,
    });
    setSelectedProductDetails(selectedValue);
  };

  const onChangeInputHandler = (_e, selectedInput) => {
    let selectedValue = inputs.find((item) => {
      if (item.id === selectedInput.props.value.id) {
        return item;
      }
    });
    setValue("inputId", selectedValue.id, {
      shouldValidate: true,
    });
    setSelectedInputDetails(selectedValue);
  };

  const onChangeFinanceCompanyHandler = (_e, selectedValue) => {
    let selectedCompany = financeCompanyList.find((item) => {
      if (item.id === selectedValue.props.value.id) {
        return item;
      }
    });
    setValue("requestToCompany", selectedCompany?.user_id, {
      shouldValidate: true,
    });
    setFinanceCompany(selectedCompany);
  };

  const onChangeStorageTypeHandler = (_e, selectedProductType) => {
    let selectedProductValue = selectedProductType.props.value;
    setValue("storageType", selectedProductValue.value, {
      shouldValidate: true,
    });
    setProductType(selectedProductValue);
  };

  const onSubmit = (data) => {
    let dataToSend = {
      itemId: parseInt(
        requestType === "PRODUCT" ? data?.productId : data?.inputId
      ),
      itemType: requestType,
      requestedTo: parseInt(data?.requestToCompany),
      subject: data?.subject,
      description: data?.description,
    };
    if (requestType === "PRODUCT") {
      dataToSend = {
        ...dataToSend,
        productType: data?.storageType,
      };
    }
    dispatch(createFinanaceRequestAction(dataToSend, navigate,requestType==='PRODUCT'?0:1));
  };
  const createRequest = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <Grid container>
      <Box
        sx={{
          ...commonStyles.signupFormContainer,
          ...styles.customMainBox,
        }}
      >
        <Box
          sx={{
            ...commonStyles.signupFormFieldContainer,
            ...commonStyles.fieldTopMargin,
          }}
        >
          <AjInputLabel
            displayText={`${
              _.find(typeOfRequestOptions, { value: requestType }).label
            } name`}
            required
            styleData={commonStyles.inputLabel}
          />
          {requestType === "PRODUCT" && (
            <>
              <AjDropDown
                options={products}
                placeHolder="Select Product Name"
                defaultValue={selectedProductDetails?.productName}
                onChange={onChangeProductHandler}
                source="productName"
                styleData={commonStyles.ajDropDownEllipsis}
                disableSourceForValue
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={{ ...commonStyles.errorText }}
                displayText={errors.productId?.message}
              />
            </>
          )}
          {requestType === "INPUT" && (
            <>
              <AjDropDown
                options={inputs}
                placeHolder="Select Input name"
                defaultValue={selectedInputDetails?.name}
                onChange={onChangeInputHandler}
                source="name"
                styleData={commonStyles.ajDropDownEllipsis}
                disableSourceForValue
                isPlaceholderCapiltalize={false}
              />
              <AjTypography
                styleData={{ ...commonStyles.errorText }}
                displayText={errors.inputId?.message}
              />
            </>
          )}
        </Box>

        <Box
          sx={{
            ...commonStyles.signupFormFieldContainer,
            ...commonStyles.fieldTopMargin,
          }}
        >
          <AjInputLabel
            displayText="Request To"
            required
            styleData={commonStyles.inputLabel}
          />
          <AjDropDown
            options={financeCompanyList}
            value={financeCompany?.finance_company_name}
            placeHolder="Select Finance Company"
            onChange={onChangeFinanceCompanyHandler}
            source="finance_company_name"
            styleData={commonStyles.ajDropDownEllipsis}
            disableSourceForValue
            isPlaceholderCapiltalize={false}
          />
          <AjTypography
            styleData={{ ...commonStyles.errorText }}
            displayText={errors.requestToCompany?.message}
          />
        </Box>
      </Box>
      {requestTypeNew === "PRODUCT" && (
        <Box
          sx={{
            ...commonStyles.signupFormFieldContainer,
            ...commonStyles.fieldTopMargin,
          }}
        >
          <AjInputLabel
            displayText="Product Storage type"
            required
            styleData={commonStyles.inputLabel}
          />
          <AjDropDown
            options={productTypeOptions}
            defaultValue={productType?.label}
            onChange={onChangeStorageTypeHandler}
            source="label"
            styleData={commonStyles.ajDropDownEllipsis}
            placeHolder="Select product type"
            disableSourceForValue
            isPlaceholderCapiltalize={false}
          />
          <AjTypography
            styleData={{ ...commonStyles.errorText }}
            displayText={errors.storageType?.message}
          />
        </Box>
      )}
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fullWidth,
        }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Subject "
        />

        <InputBase
          required
          id="subject"
          name="subject"
          sx={commonStyles.inputStyle}
          placeholder="Enter Subject"
          {...register("subject")}
          error={errors.subject ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.subject?.message}
        />
      </Box>
      <Box
        sx={{
          ...commonStyles.signupFormFieldContainer,
          ...commonStyles.fullWidth,
        }}
      >
        <AjInputLabel
          required={true}
          styleData={commonStyles.inputLabel}
          displayText="Description"
        />
        <InputBase
          required
          id="description"
          multiline
          rows={4}
          name="description"
          sx={{ ...viewSupportStyles.textAreaStyle }}
          placeholder="Enter Description"
          {...register("description")}
          error={errors.description ? true : false}
        />
        <AjTypography
          styleData={commonStyles.errorText}
          displayText={errors.description?.message}
        />
      </Box>
      <Box
        sx={{
          ...commonStyles.centerContainerContent,
          ...commonStyles.fullWidth,
          ...commonStyles.marginBottomRoot,
          ...(requestTypeNew==='INPUT' && styles.buttonBottom)
        }}
      >
        <AjButton
          onClick={createRequest}
          variant="contained"
          displayText="Create Request"
        />
      </Box>
    </Grid>
  );
};

export default CreateRequest;
