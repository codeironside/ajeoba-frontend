import { DARK_GREY } from "../../../Constant/ColorConstant";

export const styles = {
  searchInput: {
    width: "20rem",
    height: "3.5rem",
    background: "#FFFFFF",
    marginRight: "1.25rem",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "@media (max-width:600px)": {
      marginRight: "0px",
      marginBottom: "0.625rem",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  customHeight: {
    height: "3.5rem",
  },
  customHeightLandingPagesm: {
    height: "2.5rem",
  },

  customWidth: {
    "@media (max-width:600px)": {
      width: "20rem",
    },
  },
  customDropDown: {
    width: "90%",
    m: 1,
  },
  gridWrapper: {
    display: "flex",
    "@media (max-width:600px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  displayText: {
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    fontWeight: 500,
    color: DARK_GREY,
  },
  addItemStyles: {
    alignItems: "",
  },
  paddingStyle: {
    marginTop: "0",
    paddingTop: "1rem",
  },
};
