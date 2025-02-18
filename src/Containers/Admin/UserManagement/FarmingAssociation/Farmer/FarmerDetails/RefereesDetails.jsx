import React, { useEffect, useState} from "react";
import { useSelector } from "react-redux";
import * as _ from "lodash";
import { useParams } from "react-router-dom";
import { showToast } from "../../../../../../Services/toast";
import AjCompleteFarmerRefereeKYC from "./AjCompleteFarmerRefereeKYC";
import { commonStyles } from "../../../../../../Style/CommonStyle";
import { Grid } from "@mui/material";
import AjRefereesDetailsElement from "./AjRefereesDetailsElement";


const RefereesDetails = () => {

  const { farmerId } = useParams();
  const [displayComponent, setDisplayComponent] = useState("")

  const farmersDetailsData = useSelector((state) => {
    if (farmerId) return state.financeCompanyRequests.farmerInfoDetail;
    else return state.userManagementAssociationDetails.farmerDetails;
  });

  useEffect(() => {
    if (farmersDetailsData?.refereeName?.length) {
      setDisplayComponent(<AjRefereesDetailsElement referees={farmersDetailsData?.refereeName} />)
    } else {
      showToast("You haven't added referees yet")
      setDisplayComponent(<AjCompleteFarmerRefereeKYC />)
    }
  }, [farmersDetailsData?.refereeName]);


   return (

      <Grid
        container
        item
        sx={{
          ...commonStyles.whiteContainerBackgroundTabs,
          ...commonStyles.marginTop5rem,
          ...commonStyles.customSrollBar,
        }}
      >
         {displayComponent}
      </Grid>

  );
};

export default RefereesDetails;
