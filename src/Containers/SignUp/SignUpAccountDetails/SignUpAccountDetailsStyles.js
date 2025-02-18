import { PRIMARY_GREEN } from "../../../Constant/ColorConstant";

export const styles = {
  root: {
    background: "#F4F4F4",
    paddingLeft: "3.47%",
    paddingRight: "3.47%",
    paddingBottom: "4rem",
  },
  parentContainer: {
    background: "#ffffff",
    borderRadius: "0.5rem",
  },
  logoContainer: {
    width: "11.438rem",
    height: "4.5rem",
    marginTop: "3.47%",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "1.25rem",
    fontWeight: 500,
    marginBottom: "2rem",
    color: PRIMARY_GREEN,
  },
  contentContainer: {
    margin: "0 auto",
    "@media (max-width: 900px)": {
      padding: "0.5rem",
    },
  },

  inputBase: {
    height: "3.5rem",
    padding: "1rem",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    marginBottom: "2.875rem",
    "& fieldset": {
      border: "none",
    },
    "& .MuiOutlinedInput-input": {
      padding: "0",
    },
  },
  stepper: {
    marginBottom: "3.813rem",
  },
  chipDropDown: {
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
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
  
  spanTerms: {
    color: PRIMARY_GREEN,
  },
  logoStyles:{
    marginLeft:"0"
  },
};
