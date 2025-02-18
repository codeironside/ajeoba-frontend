import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";
import AjAddProduct from "../../../../Components/AjAddProduct/AjAddProduct";
import AjTypography from "../../../../Components/AjTypography";
import AjRadioOptions from "../../../../Components/AjRadioOptions";
import AjCsvBulkComponent from "../../../../Components/AjCsvBulkUploader/AjCsvBulkComponent";
import { INPUT_MASTER } from "../../../../Routes/Routes";
import {
  inputOptions,
  measurementOptions,
  inputBulkUploadNoteText,
  isEnabledOption,
} from "../../../../Constant/AppConstant";
import { AddInputSchema } from "../../../../validationSchema/addInputSchema";
import {
  commonAddProductStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import { ROLES } from "../../../../Constant/RoleConstant";
import {
  addInput,
  editInput,
  getInputByIdAction,
} from "../../../../Redux/SuperAdmin/InputMaster/inputMasterActions";
import { getUserData } from "../../../../Services/localStorageService";
import {styles} from "../../MasterManagement/MasterManagementStyles";

function InputMasterAdd() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const location = useLocation();

  const roleId = getUserData()?.role_id;

  const [inputType, setInputType] = useState(inputOptions[0].value);
  const [editState, setEditState] = useState(false);
  const inputSelectHandler = (option) => {
    setInputType(option);
  };

  const inputDetails = useSelector((state) => state.inputMaster.inputDetails);

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEditState(true);
      dispatch(getInputByIdAction(id));
    }
  }, [id]);

  const onSubmit = (data) => {
    const addInputData = {
      inputName: data.inputName,
      unitOfMeasurement: data?.measurementDropDown
        ? data?.measurementDropDown
        : measurementOptions[0].value,
      minimumQuantityForCommission:
        ROLES.SUPER_ADMIN === roleId
          ? parseInt(data?.inputQuantity)
          : editState === false
          ? undefined
          : parseInt(data?.inputQuantity),
      commission:
        ROLES.SUPER_ADMIN === roleId
          ? parseInt(data?.inputCommission)
          : editState === false
          ? undefined
          : parseInt(data?.inputCommission),
      isCommissionActive:
        data?.isCommissionEnabledDropDown === false ||
        data?.isCommissionEnabledDropDown === undefined
          ? data?.isCommissionEnabledDropDown
          : isEnabledOption[0].value,
    };
    if (editState) {
      dispatch(editInput(id, addInputData, navigate));
    } else dispatch(addInput(addInputData, navigate));
  };

  const backHandler = () => {
    navigate(INPUT_MASTER);
  };
  return (
    <Grid container sx={commonStyles.signupFormMainGridContainer}>
      <Box sx={commonStyles.relativePosition}>
        <IconButton
          onClick={backHandler}
          sx={commonStyles.backButtonPosition}
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
          ...styles.addItemStyles,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            displayText={editState ? "Edit Input" : "Add Input"}
            styleData={commonStyles.signupHeadingStyle}
          />
        <Grid
          item
          sx={[commonAddProductStyles.gridBox, commonAddProductStyles.gridData]}
        >
          {editState ? (
            ""
          ) : (
            <Grid item sx={commonStyles.fullWidth}>
              <AjRadioOptions
                styleData={commonAddProductStyles.radioOptions}
                items={inputOptions}
                defaultValue={inputType}
                onSelect={inputSelectHandler}
              />
            </Grid>
          )}
          {inputType === "single_input" ? (
            <AjAddProduct
              schema={AddInputSchema}
              dropDownOptions={measurementOptions}
              inputLabelName="Input Name"
              inputId="inputName"
              inputPlaceholder="Enter input name"
              searchInputLabelName="Unit of Measurement"
              onSubmit={onSubmit}
              productName={inputDetails?.inputDetail[0]?.name}
              dropDownValue={inputDetails?.inputDetail[0]?.unit_of_measurement}
              quantityInputLabel="Minimum quantity (for commission)"
              quantityInputId="inputQuantity"
              quantityInputPlaceholder="Enter quantity"
              quantityInputName={
                inputDetails?.inputDetail[0]?.min_quantity_for_commission
              }
              commissionInputLabel="Commission (%)"
              commissionInputId="inputCommission"
              commissionInputPlaceholder="Enter commission in %"
              commissionInputName={inputDetails?.inputDetail[0]?.commission}
              fourthInputLabel="Is commission enabled"
              isEnabledOption={isEnabledOption}
              commissionDropDownValue={
                inputDetails?.inputDetail[0]?.is_commission_active
              }
              editableState={editState}
            />
          ) : (
            <AjCsvBulkComponent
              noteText={inputBulkUploadNoteText}
              apiCallFor="inputs"
            />
          )}
        </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default InputMasterAdd;
