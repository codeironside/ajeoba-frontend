export const styles = {
  refereeContainerMargin: {
    marginTop: "0",
  },
  refereeDetailUpperContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "1.5rem 0 0 0",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "100%",
      gap: "0.313rem",
    },
  },
  refereeDetailsBoxes: {
    flexDirection: "column",
    flex: "1",
  },
  handleEditRespnsive: {
    "@media(max-width:900px)": {
      top: "24%",
      right: "35%",
    },
    "@media(max-width:353px)": {
      top: "28%",
      right: "31%",
    },
  },
  formMarginTop: {
    "@media(max-width:600px)": {
      marginTop: "5rem",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btnContainereditpage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width:768px)": {
      gap: ".5rem",
    },
  },
  refereeFieldContainer: {
    margin: "1.875rem 0 0.625rem 0",
    display: "flex",
    flexDirection: "column",
    width: "21.25rem",
    "@media(max-width:600px)": {
      margin: "0.625rem 0",
    },
  },
};
