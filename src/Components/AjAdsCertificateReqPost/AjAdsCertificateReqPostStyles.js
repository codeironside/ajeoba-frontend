export const styles = {
  mainContainer: {
    marginBottom: "1rem",
    fontFamily: "Poppins",
  },
  insideMainContainer: {
    padding: "1rem",
    boxShadow: "0rem 0.5rem 1rem rgba(0, 0, 0, 0.04)",
    margin: "1rem",
    borderRadius: "0.5rem",
    border: "0.063rem solid #F2F2F2",
  },
  fieldContainer: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
  firstRow: {
    display: "flex",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
  fieldGap: {
    marginRight: "3rem",
  },
  requestedCertContainer: {
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
};
