import React from 'react'
import { Grid, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import AjTab from '../../../../Components/AjTab/AjTab';
import { WAREHOUSES } from '../../../../Routes/Routes';
import WareHouseDetail from './WareHouseDetail/WareHouseDetail';

import { commonStyles } from '../../../../Style/CommonStyle';

const WareHousesDetails = () => {

    const navigate = useNavigate();

    const backArrowHandler = () => {
      navigate(WAREHOUSES);
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
      <IconButton sx={commonStyles.whiteBackButtonPosition} onClick={backArrowHandler}>
        <ArrowBackRoundedIcon
          sx={commonStyles.backButtonBlackFont}
        />
      </IconButton>
      <AjTab
        components={[
          { component: <WareHouseDetail />, index: 0, label: "Warehouse Details" },
        ]}
        displayMyProfile={false}
        isTabPanelDisplay={true}
      />
    </Grid>
  )
}

export default WareHousesDetails;