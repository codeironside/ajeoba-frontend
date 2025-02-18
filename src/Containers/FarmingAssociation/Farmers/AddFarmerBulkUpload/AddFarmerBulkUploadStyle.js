export const styles = {
  mainContainer: {
    alignItems: "flex-start",
    "@media (max-width: 1000px)": {
      padding: "0% 10%",
      alignItems: "center",
    },
  },
  subContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    "@media (max-width: 600px)": {
      alignItems: "center",
    },
  },
  anchorBtnMobile: {
    marginTop: "-2rem",
    marginBottom: "1.25rem",
    "@media (min-width: 600px)": {
      display: "none",
    },
  },
  anchorBtnDesktop: {
    display: "flex",
    justifyContent: "center",
    marginTop: "3.125rem",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
