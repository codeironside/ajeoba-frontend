import React, { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import AjStepper from "../AjStepper/AjStepper";
import { orderTracker } from "../../Constant/AppConstant";
import { commonStyles } from "../../Style/CommonStyle";
import { styles } from "./AjOrderTrackerStyle";


const AjOrderTrackerContainer = (props) => {

  const [activeStepNumber, setActiveStepNumber] = useState(null);

   useEffect(() => {

     switch (props.status) {
       case "Order Placed":
         setActiveStepNumber(0);
         break;
       case "Ongoing":
        setActiveStepNumber(1);
        break;
      case "In-transit":
         setActiveStepNumber(2);
         break;
       case "Completed":
         setActiveStepNumber(3);
         break;
       default:
         setActiveStepNumber(0);         
     }

  }, []);

  return (
    <>
      <Grid container sx={commonStyles.signupFormMainGridContainer}>
        <Grid
          container
          item
          sx={[
            commonStyles.signupFormMainContentContainer,
            commonStyles.customSrollBar,
            styles.boxMarginTop,
          ]}
        >
          <Box
            sx={[
              commonStyles.signupContentContainer,
              styles.orderTrackerContentContainer,
            ]}
          >
            <AjStepper
              stepOptions={orderTracker}
              activeStep={activeStepNumber}
              styleData={styles.stepperAlignment}
            />
            {props.children}
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
export default AjOrderTrackerContainer;
