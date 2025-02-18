import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { styled } from "@mui/material/styles";

export const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: "0.5rem",
    left: "calc(-50% + 0.5rem)",
    right: "calc(50% + 0.5rem)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#6D9E3F",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "#6D9E3F",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: "#F4F4F4",
    borderWidth: "0.063rem",
  },
}));

export const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor: "#898B87",
  zIndex: 1,
  color: "#ffffff",
  width: "1rem",
  height: "1rem",
  display: "flex",
  borderRadius: "0.25rem",
  justifyContent: "center",
  alignItems: "center",
  ...((ownerState.active || ownerState.completed) && {
    background: "#6D9E3F",
  }),
}));
