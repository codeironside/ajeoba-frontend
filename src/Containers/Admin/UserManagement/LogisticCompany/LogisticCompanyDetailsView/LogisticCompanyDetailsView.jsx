import React from "react";
import { Grid, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { useNavigate, useSearchParams } from "react-router-dom";

import AjTab from "../../../../../Components/AjTab/AjTab";
import LogisticCompanyDetails from "./LogisticCompanyDetails/LogisticCompanyDetails";
import {
  ADMIN_USER_MANAGEMENT,
  ADMIN_LOGISTICS,
} from "../../../../../Routes/Routes";

import { commonStyles } from "../../../../../Style/CommonStyle";
import { useParams } from "react-router-dom";
import TruckListingView from "../TruckListingView/TruckListingView";

const LogisticCompanyDetailsView = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const activeTab = searchParams.get("activeTab");
  const { id } = params;

  const backArrowHandler = () => {
    navigate(`${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}`);
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
        <ArrowBackRoundedIcon sx={commonStyles.backButtonBlackFont} />
      </IconButton>
      <AjTab
        components={[
          {
            component: <LogisticCompanyDetails />,
            index: 0,
            label: "Logistic Company Details",
          },
          {
            component: <TruckListingView />,
            index: 1,
            label: "Truck listing",
          },
        ]}
        onChange={(currIndex) =>
          navigate(
            `${ADMIN_USER_MANAGEMENT}/${ADMIN_LOGISTICS}/detail/${id}?activeTab=${currIndex}`
          )
        }
        displayMyProfile={false}
        defaultIndex={Number.parseInt(activeTab || 0)}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default LogisticCompanyDetailsView;
