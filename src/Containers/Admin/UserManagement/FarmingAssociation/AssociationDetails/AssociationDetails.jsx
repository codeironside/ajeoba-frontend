import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

import AjTab from "../../../../../Components/AjTab/AjTab";
import FarmingAssociationDetails from "./FarmingAssociationDetails/FarmingAssociationDetails";
import FarmingRefereeListingManagement from "./FarmingRefereeListingManagement/FarmingRefereeListingManagement";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_FARMING_ASSOCIATION,
} from "../../../../../Routes/Routes";

import { commonStyles } from "../../../../../Style/CommonStyle";

const AssociationDetails = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const activeTab = searchParams.get("activeTab");
  const { id } = params;

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}`);
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
        onClick={backArrowHandler}
      >
        <ArrowBackRoundedIcon
          sx={commonStyles.backButtonBlackFont}
          onClick={backArrowHandler}
        />
      </IconButton>
      <AjTab
        components={[
          {
            component: <FarmingAssociationDetails />,
            index: 0,
            label: "Association Details",
          },
          {
            component: <FarmingRefereeListingManagement />,
            index: 1,
            label: "Farmer & Referee listing",
          },
        ]}
        onChange={(currIndex) =>
          navigate(
            `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/detail/${id}?activeTab=${currIndex}`
          )
        }
        displayMyProfile={false}
        defaultIndex={Number.parseInt(activeTab || 0)}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default AssociationDetails;
