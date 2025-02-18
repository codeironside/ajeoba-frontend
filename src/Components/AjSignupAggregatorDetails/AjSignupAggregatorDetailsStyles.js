import { BLACK } from "../../Constant/ColorConstant";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import React from "react";

export const styles = {
  signupFormContainer: {
    display: "flex",
    width: "100%",
    padding: "0px",
    marginTop: "1.25rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
    textAlign: "left",
    "@media (max-width: 600px)": {
      marginTop: "1.5rem",
      width: "90%",
      justifyContent: "center",
    },
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
  },
  nextBtnStyle: {
    marginTop: "3.625rem",
  },
  chipDropDown: {
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    marginTop: "0.5rem",
    "& fieldset": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: "3.5rem",
    },
    "& .MuiSelect-iconOpen": {
      borderRadius: "0.5rem 0px 0px 0.5rem",
    },
  },
  searchInput: {
    width: "100%",
    height: "3.5rem",
    marginTop: "0.5rem",
    background: "#FFFFFF",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  toolTipText: {
    color: BLACK,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.375rem",
  },
  inputBaseCustomStyle: {
    "@media (max-width:600px)": {
      maxWidth: "85%",
    },
  },
  signUpFormCustomStyle: {
    maxWidth: "95%",
  },
};

export const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} placement="right" />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#FFFFFF",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 350,
    border: "0.063rem solid #F2F2F2",
    borderRadius: "0.5rem",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
  },
}));
