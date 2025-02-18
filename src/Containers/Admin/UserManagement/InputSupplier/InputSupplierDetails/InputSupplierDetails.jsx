import React from "react";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Grid, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AjTab from "../../../../../Components/AjTab/AjTab";
import InputSupplierDetailView from "./InputSupplierDetailView/InputSupplierDetailView";
import {
  ADMIN_INPUT_SUPPLIER,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import AjOrderTrackerContainer from "../../../../../Components/AjOrderTracker/AjOrderTracker";
import { commonStyles } from "../../../../../Style/CommonStyle";

const InputSupplierDetails = () => {
  const navigate = useNavigate();

  const backButtonHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_INPUT_SUPPLIER}`);
  };

  return (
    <Grid
      container
      sx={{
        ...commonStyles.signupFormMainGridContainer,
        ...commonStyles.relativePosition,
        ...commonStyles.containerpadding,
      }}
    >
      <IconButton
        sx={commonStyles.whiteBackButtonPosition}
        onClick={backButtonHandler}
      >
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <InputSupplierDetailView />,
            index: 0,
            label: "Input Supplier Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default InputSupplierDetails;
