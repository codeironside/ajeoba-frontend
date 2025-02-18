import ajeobaLogo from "../../../Assets/Images/ajeoba-logo.png";

export const styles = {
  mainGridContainer: {
    background: "#e5e5e5",
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },

  mainImageContainer: {
    height: "16.8%",
    cursor: "pointer",
  },
  logoImageContainer: {
    marginTop: "3.125rem",
    marginLeft: "3.125rem",
    backgroundImage: `url(${ajeobaLogo})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "contain",
    height: "4.5rem",
    "@media (max-width: 600px)": {
      width: "5.75rem",
      height: "2.25rem",
      marginTop: "1.5rem",
      marginLeft: "1rem",
    },
  },
  mainContentTopContainer: {
    width: "100%",
    justifyContent: "center",
    minHeight: "calc(100vh - 9.375rem)",

    "@media (max-width: 600px)": {
      height: "auto",
      paddingTop: "1.25rem",
    },
  },
  differentBackgroundcontainer: {
    "@media (max-width: 600px)": {
      height: "auto",
      width: "90%",
      marginBottom: "1.25rem",
      paddingTop: "1.25rem",
      paddingBottom: "1.25rem",
    },

    width: "55.55%",
    boxSizing: "borderBox",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginBottom: "0.625rem",
    paddingBottom: "1.25rem",
  },
  actualContentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "34.5rem",
    alignItems: "center",
    marginTop: "1rem",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  headingsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  heading1: {
    color: "#006D33",
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
    fontWeight: "500",
  },
  heading2: {
    marginTop: "1.25rem",
    color: "#898B87",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    fontWeight: "500",
  },
  buttonsContainer: {
    display: "flex",
    width: "100%",
    height: "auto",
    flexWrap: "wrap",
    justifyContent: "center",
  },

  roleButton: {
    marginTop: "1.5rem",
    marginRight: "0.75rem",
    marginLeft: "0.75rem",
    fontSize: "0.75rem",
    lineHeight: "1.125rem",
    fontWeight: "400",
    width: "10rem",
    maxWidth: "10rem",
    padding: "1.375rem 3.125rem 1.375rem 3.125rem",
    height: "5rem",
    color: "#006d33",
    backgroundColor: "#ffffff",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.375rem 0.75rem rgba(0,0,0,0.04)",
    borderRadius: "0.5rem",
    textTransform: "unset",

    "&:hover": {
      color: "#ffffff",
      backgroundColor: "#6d9e3f",
      boxShadow: "0px 0.375rem 0.75rem rgba(0,0,0,0.04)",
    },
  },
  bgColor: {
    color: "#ffffff",
    backgroundColor: "#6d9e3f",
    boxShadow: "0px 0.375rem 0.75rem rgba(0,0,0,0.04)",
    marginTop: "1.5rem",
    maxWidth: "10rem",
    height: "5rem",
    marginRight: "0.75rem",
    marginLeft: "0.75rem",
  },
  nextButton: {
    marginTop: "2rem",
    color: "#ffffff",
    backgroundColor: "#6d9e3f",
    width: "12.25rem",
    height: "3.5rem",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    fontWeight: "700",
    textTransform: "unset",
    "&:hover": {
      backgroundColor: "#6d9e3f",
    },
  },
};
