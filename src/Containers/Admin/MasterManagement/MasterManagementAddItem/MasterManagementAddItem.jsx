import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, Box, IconButton } from "@mui/material";
import AjAddProduct from "../../../../Components/AjAddProduct/AjAddProduct";
import AjTypography from "../../../../Components/AjTypography";
import AjRadioOptions from "../../../../Components/AjRadioOptions";
import AjCsvBulkComponent from "../../../../Components/AjCsvBulkUploader/AjCsvBulkComponent";
import { MASTER_MANAGEMENT } from "../../../../Routes/Routes";
import {
  addItemOptions,
  itemTypeOptions,
  itemBulkUploadNoteText,
} from "../../../../Constant/AppConstant";
import { AddItemSchema } from "../../../../validationSchema/addItemSchema";
import {
  addItems,
  editItems,
  getItemByIdAction,
} from "../../../../Redux/SuperAdmin/MasterManagement/masterManagementActions";
import {
  commonAddProductStyles,
  commonStyles,
} from "../../../../Style/CommonStyle";
import {styles} from "../MasterManagementStyles";

function MasterManagementAddItem() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { id } = params;
  const location = useLocation();

  const [itemType, setItemType] = useState(addItemOptions[0].value);
  const [editState, setEditState] = useState(false);
  const productSelectHandler = (option) => {
    setItemType(option);
  };

  const itemDetails = useSelector(
    (state) => state.masterManagement.itemDetails
  );

  useEffect(() => {
    if (location.pathname.includes("edit")) {
      setEditState(true);
      dispatch(getItemByIdAction(id));
    }
  }, [id]);

  const onSubmit = (data) => {
    const addItemData = {
      itemName: data.itemName,
      itemType: data?.measurementDropDown ? data?.measurementDropDown : itemTypeOptions[0].value,
    };
    if (editState) {
      dispatch(editItems(id, addItemData, navigate));
    } else dispatch(addItems(addItemData, navigate));
  };
  const backArrowHandler = () => {
    navigate(MASTER_MANAGEMENT);
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
          ...styles.addItemStyles,
        }}
      >
        <Box sx={commonStyles.signupContentContainer}>
          <AjTypography
            styleData={commonStyles.signupHeadingStyle}
            displayText={editState ? "Edit Items" : "Add Items"}
          />
          <Grid
            item
            sx={[
              commonAddProductStyles.gridBox,
              commonAddProductStyles.gridData,
            ]}
          >
            {editState ? (
              ""
            ) : (
              <Grid item sx={commonStyles.fullWidth}>
                <AjRadioOptions
                  styleData={commonAddProductStyles.radioOptions}
                  items={addItemOptions}
                  defaultValue={itemType}
                  onSelect={productSelectHandler}
                />
              </Grid>
            )}
            {itemType === "Single_Item" ? (
              <AjAddProduct
                schema={AddItemSchema}
                dropDownOptions={itemTypeOptions}
                inputLabelName="Item name"
                inputId="itemName"
                inputPlaceholder="Enter item name"
                searchInputLabelName="Item type"
                onSubmit={onSubmit}
                productName={itemDetails?.itemDetail[0]?.name}
                dropDownValue={itemDetails?.itemDetail[0]?.item_type}
                editableState={editState}
              />
            ) : (
              <AjCsvBulkComponent
                noteText={itemBulkUploadNoteText}
                apiCallFor="items"
              />
            )}
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MasterManagementAddItem;
