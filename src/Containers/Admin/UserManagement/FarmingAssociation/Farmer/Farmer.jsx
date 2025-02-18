import React from "react";
import { Grid, IconButton } from "@mui/material";
import {
  FINANCE_REQUESTS,
  FARMERS,
  ADMIN_FARMING_ASSOCIATION,
  ADMIN_USER_MANAGEMENT,
} from "../../../../../Routes/Routes";
import {
  useNavigate,
  useParams,
  useSearchParams,
  useLocation,
} from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AjTab from "../../../../../Components/AjTab/AjTab";
import FarmerDetails from "./FarmerDetails/FarmerDetails";
import RefereesDetails from "./FarmerDetails/RefereesDetails";
import { commonStyles } from "../../../../../Style/CommonStyle";
import { ROLES } from "../../../../../Constant/RoleConstant";
import { getUserData } from "../../../../../Services/localStorageService";

const Farmer = () => {
  const navigate = useNavigate();
  const userData = getUserData();
  const params = useParams();
  const location = useLocation();
  const { id, associationId } = params;
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("activeTab");
  const editMode = location.pathname.includes("farmers/edit");

  const backArrowHandler = () => {
    if (
      ROLES.SUPER_ADMIN === userData.role_id ||
      ROLES.ADMIN === userData.role_id
    ) {
      navigate(
        `${ADMIN_USER_MANAGEMENT}/${ADMIN_FARMING_ASSOCIATION}/detail/${associationId}?activeTab=${activeTab}`
      );
    } else if (ROLES.FINANCE_COMPANY === userData.role_id) {
      navigate(
        `${FINANCE_REQUESTS}/additional-detail/${id}/?activeTab=${activeTab}`
      );
    } else {
      if (editMode) {
        navigate(`${FARMERS}/detail/${id}`);
      } else {
        navigate(`${FARMERS}`);
      }
    }
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
            //activeTab
            component: <FarmerDetails activeTab={0} />,
            index: 0,
            label: "Farmer Details",
          },
          {
            component: <RefereesDetails activeTab={1} />,
            index: 1,
            label: "Referee Details",
          },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  );
};

export default Farmer;
