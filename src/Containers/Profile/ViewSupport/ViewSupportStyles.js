import { commonStyles } from "../../../Style/CommonStyle";
export const styles = {
  boxFullWidth: {
    width: "100%",
  },

  marginLeftZero: {
    marginLeft: "0rem",
  },

  BackArrowSize: {
    fontSize: "1.75rem",
  },
  gridRadius: {
    borderRadius: "0.5rem",
  },
  textAreaStyle: {
    fontFamily: "Poppins",
    height: "7rem",
    padding: "0.7rem",
    marginTop: "0.5rem",
    outline: "none",
    width: "100%",
    border: "0.063rem solid #F2F2F2",
    background: "#FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",

    "& .MuiInput-root": {
      "&:before, :after, :hover:not(.Mui-disabled):before": {
        borderBottom: 0,
      },
    },
  },
  responsiveWidth: {
    "@media (max-width:600px)": {
      height: " calc(100vh - 15.5rem)",
    },
    "@media (max-width:1000px)": {
      height: " calc(100vh - 16.5rem)",
    },
  },

  uploadbtnstyle: {
    "@media (max-width:650px)": {
      width: "100%",
    },
  },

  MainHeadingTopMargin: {
    marginTop: "4rem",
    "@media(max-width:1000px)": {
      marginTop: "2rem",
    },
    "@media(max-width:600px)": {
      marginTop: "5rem",
    },
  },

  ViewSupportMainContainer: {
    borderRadius: "0.5rem",
    marginTop: "5rem",
    height: "calc(100vh - 12.5rem)",
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },

  SubmitBtnMarginTop: {
    marginTop: "3.875rem",
  },
};
