export const styles = {
  upperContainer: {
    width: "80%",
    marginTop: "1rem",
    "@media(max-width:900px)": {
      marginBottom: "3rem",
    },
  },
  handleEditResponsive: {
    "@media(max-width:900px)": {
      top: "38%",
      right: "33%",
    },
  },
  detailContainer: {
    marginTop: "2rem",
    display: "flex",
    width: "100%",
    "@media(max-width:600px)": { flexDirection: "column" },
  },

  detailContainerSub: {
    margin: "4rem 0",
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    "@media(max-width:600px)": { flexDirection: "column" },
  },
};
