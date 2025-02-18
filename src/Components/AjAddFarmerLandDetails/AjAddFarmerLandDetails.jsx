import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Box } from "@mui/material";
import AjTypography from "../AjTypography";
import AjButton from "../AjButton";
import AjAddFarmerLandListing from "../AjAddFarmerLandListing/AjAddFarmerLandListing";
import AjDialog from "../AjDialog/AjDialog";
import AddFarmerModalContent from "../AjAddFarmerModalContent/AddFarmerModalContent";
import { ADD_FARMER_PRODUCT } from "../../Routes/Routes";
import { commonStyles } from "../../Style/CommonStyle";
import { styles } from "./AjAddFarmerDetailsStyles";
import { showToast } from "../../Services/toast";

const AjAddFarmerLandDetails = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [addLand, setAddLand] = useState(false);
  const landData = useSelector((state) => state.farmers.landData);
  const navigate = useNavigate();
  const location = useLocation();
  const onAddLandClick = () => {
    if (landData?.landListing?.length >= 5) {
      showToast("Max 5 lands can be added", "error");
    } else {
      setOpenDialog(true);
      setAddLand(true);
    }
  };

  useEffect(() => {
    if (!openDialog) setAddLand(false);
  }, [openDialog]);

  const isFarmersDetailPage =
    location.pathname.includes("farmers/detail") ||
    location.pathname.includes("farmers/edit");

  return (
    <>
      <Grid sx={commonStyles.fullWidth}>
        {(landData?.landListing?.length > 0 ||
          typeof props.forView !== "undefined") && (
          <Box
            sx={{
              ...styles.mainContainer,
              ...(typeof forView === "undefined" && styles.customMargin),
            }}
          >
            {!isFarmersDetailPage && (
              <AjTypography
                displayText="Land Listing"
                styleData={props.customStyleData || commonStyles.headerText}
              />
            )}

            <AjButton
              variant="contained"
              displayText="Add Land"
              onClick={onAddLandClick}
              styleData={{
                ...commonStyles.marginTop0,
                ...(typeof props.forView !== "undefined" && styles.displayNone),
              }}
            />
          </Box>
        )}
        <AjAddFarmerLandListing
          openDialog={setOpenDialog}
          disableDelete={props.forView}
          forView={props.forView}
        />
        <Box
          sx={{
            ...commonStyles.buttonBox,
            ...styles.customButtonBox,
            ...(typeof props.forView !== "undefined" &&
              !props.forView &&
              landData?.landListing?.length &&
              styles.detailButtonBoxWithData),
            ...(typeof props.forView !== "undefined" &&
              !props.forView &&
              !landData?.landListing?.length &&
              (isFarmersDetailPage
                ? styles.detailButtonBoxeditfarmer
                : styles.detailButtonBox)),
          }}
        >
          {(!landData?.landListing?.length ||
            (typeof props.forView !== "undefined" && !props.forView)) && (
            <AjButton
              variant={
                typeof props.forView !== "undefined" && !props.forView
                  ? "text"
                  : "contained"
              }
              displayText="Add Land"
              styleData={{
                ...(typeof props.forView === "undefined" &&
                  commonStyles.buttonStyle),
                ...(typeof props.forView === "undefined" &&
                  commonStyles.applyFilterButton),
                ...(props.forView && styles.displayNone),
                ...(typeof props.forView !== "undefined" &&
                  !props.forView &&
                  styles.underLineStyle),
              }}
              onClick={onAddLandClick}
            />
          )}
          <AjButton
            variant="text"
            displayText="Next"
            styleData={{
              ...commonStyles.buttonStyle,
              ...commonStyles.applyFilterButton,
              ...(typeof props.forView !== "undefined" && styles.displayNone),
            }}
            onClick={() => navigate(ADD_FARMER_PRODUCT)}
          />
        </Box>
        <AjDialog
          open={openDialog}
          closeModal={setOpenDialog}
          title={addLand ? "Add land details" : "View land details"}
          styleData={styles.customDialogStyles}
        >
          <AddFarmerModalContent edit={addLand} closeModal={setOpenDialog} />
        </AjDialog>
      </Grid>
    </>
  );
};

export default AjAddFarmerLandDetails;
