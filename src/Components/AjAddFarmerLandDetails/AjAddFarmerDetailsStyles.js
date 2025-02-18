export const styles = {
  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1.25rem",
    alignItems: "center",
    marginBottom: "1.25rem",
  },
  customMargin: {
    marginTop: "1.8rem",
  },
  displayNone: { display: "none" },
  underLineStyle: {
    textDecoration: "underline",
  },
  yieldStyles: {
    marginTop: "3rem",
    display: "flex",
    flexDirection: "row",
    // minWidth: "100%",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    "@media(max-width: 1100px)": {
      flexDirection: "column",
      gap: "1.5rem",
      padding: "0 1.5rem",
      justifyContent: "center",
      alignItems: "center",
    },
    "@media(max-width: 768px)": {
      marginTop: "2rem",
      flexDirection: "column",
      gap: "1rem",
      padding: "0",
      alignItems: "flex-start",
      justifyContent: "center",
    },
  },
  yieldStyleschildren: {
    width: "40%",
    "@media(max-width: 1100px)": {
      width: "100%",
    },
  },

  customDialogStyles: { height: "calc(100vh - 3.125rem)", width: "90%" },
  customButtonBox: {
    position: "relative",
    marginTop: "3.125rem",
    "@media (max-width:600px)": {
      position: "relative",
    },
  },
  detailButtonBoxWithData: {
    textAlign: "start",
  },
  detailButtonBox: {
    textAlign: "start",
    marginTop: "0rem",
  },
  detailButtonBoxeditfarmer: {
    textAlign: "center",
    marginTop: "0rem",
  },
};
