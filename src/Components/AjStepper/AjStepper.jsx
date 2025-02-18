import * as React from "react";
import { Step, StepLabel, Stepper } from "@mui/material";
import { QontoConnector, ColorlibStepIconRoot } from "./AjStepperStyles";

const styles = {
  width: "100%",
  "& .MuiStepLabel-label": {
    marginTop: "0.75rem !important",
    color: "#898B87 !important",
    fontSize: "0.875rem",
  },
  "& .Mui-active": {
    color: "#006D33 !important",
  },
  "& .Mui-completed": {
    color: "#006D33 !important",
  },
  stepperAlignment: {
    padding: "0px",
  },
  scrollableStepper: {
    "@media(max-width: 600px)": {
      overflowX: "scroll",
      height: "5.938rem",
    },
  },
};

const AjStepper = ({ stepOptions, styleData, ...restProps }) => {
  function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    return (
      <ColorlibStepIconRoot
        ownerState={{ completed, active }}
        className={className}
      >
        {stepOptions[icon - 1].icon}
      </ColorlibStepIconRoot>
    );
  }

  return (
    <Stepper
      sx={[styles, styles.scrollableStepper]}
      alternativeLabel
      connector={<QontoConnector />}
      {...restProps}
    >
      {stepOptions.map((option, index) => (
        <Step sx={styleData || styles.stepperAlignment} key={index}>
          <StepLabel StepIconComponent={ColorlibStepIcon}>
            {option.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default AjStepper;
