import React, { useEffect } from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton, InputBase } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import AjTypography from "../../../../Components/AjTypography";
import AjInputLabel from "../../../../Components/AjInputLabel";
import AjButton from "../../../../Components/AjButton";

import { editInventorySchema } from "../../../../validationSchema/editInventorySchema";
import { commonStyles } from "../../../../Style/CommonStyle";
import {
  getCurrencySymbol,
  textCapitalize,
} from "../../../../Services/commonService/commonService";
import NumberFormat from "react-number-format";
import { getUserData } from "../../../../Services/localStorageService";
import styles from "./EditInventoryStyle";
import { INPUT_INVENTROY } from "../../../../Routes/Routes";
import {
  getInputInventoryDetailByIdAction,
  getInputInventoryDetail,
  editInputInventoryAction,
} from "../../../../Redux/InputSupplier/InputInventory/InputInventoryActions";

function EditInventory() {
  const userData = getUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;

  const inputInventoryDetail = useSelector(
    (state) => state.inputInventory.inputInventoryDetail
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(editInventorySchema),
    mode: "onChange",
  });

  useEffect(() => {
    dispatch(getInputInventoryDetailByIdAction(id));

    return () => {
      dispatch(getInputInventoryDetail({}));
    };
  }, [id]);

  useEffect(() => {
    if (inputInventoryDetail?.inputInventoryDetail?.available_quantity)
      setValue(
        "inputQuantity",
        inputInventoryDetail.inputInventoryDetail.available_quantity,
        {
          shouldValidate: true,
        }
      );
    if (inputInventoryDetail?.inputInventoryDetail?.selling_price) {
      setValue(
        "inputSellingPrice",
        inputInventoryDetail?.inputInventoryDetail?.selling_price,
        {
          shouldValidate: true,
        }
      );
    }
  }, [inputInventoryDetail?.inputInventoryDetail]);

  const onSellingPriceChange = (value) => {
    setValue("inputSellingPrice", value.value, {
      shouldValidate: true,
    });
  };
  const onSubmit = (data) => {
    dispatch(
      editInputInventoryAction(id, {
        availableQuantity: parseFloat(data.inputQuantity),
        sellingPrice: parseFloat(data.inputSellingPrice),
      })
    );
    navigate(INPUT_INVENTROY);
  };

  const backArrowHandler = () => {
    navigate(INPUT_INVENTROY);
  };
  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          sx={commonStyles.backButtonPosition}
          onClick={backArrowHandler}
          disableRipple
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
          ...styles.editInventoryStyles,
        }}
      >
        <Box
          sx={{
            ...commonStyles.signupContentContainer,
            ...styles.responsiveWidth,
          }}
        >
          <AjTypography
            styleData={{
              ...commonStyles.signupHeadingStyle,
              ...styles.headingMarginBottom,
            }}
            displayText="Edit Inventory"
          />
          <Grid
            container
            columnSpacing={"1.25rem"}
            rowSpacing={"1.25rem"}
            sx={commonStyles.marginTop20}
          >
            <Grid item xs={12} sm={12} md={6} lg={6}>
              <AjInputLabel
                displayText={`Quantity (${textCapitalize(
                  inputInventoryDetail?.inputInventoryDetail
                    ?.unit_of_measurement
                )})`}
                required
                styleData={commonStyles.inputLabel}
              />
              <InputBase
                required
                placeholder="Enter quantity"
                id="inputQuantity"
                name="inputQuantity"
                sx={commonStyles.inputStyle}
                {...register("inputQuantity")}
                error={errors.inputQuantity ? true : false}
              />
              <AjTypography
                styleData={commonStyles.errorText}
                displayText={errors.inputQuantity?.message}
              />
            </Grid>
            {inputInventoryDetail?.inputInventoryDetail?.selling_price && (
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
                  defaultValue={
                    inputInventoryDetail?.inputInventoryDetail?.selling_price
                  }
                  decimalScale={2}
                  onValueChange={(value) => onSellingPriceChange(value)}
                />
                <AjTypography
                  styleData={commonStyles.errorText}
                  displayText={errors.inputSellingPrice?.message}
                />
              </Grid>
            )}
          </Grid>
          <Grid
            sx={{
              ...commonStyles.centerContainerContent,
              ...commonStyles.fullWidth,
            }}
          >
            <AjButton
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              displayText="Save Changes"
              btnStyle={styles.buttonStyle}
            />
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default EditInventory;
