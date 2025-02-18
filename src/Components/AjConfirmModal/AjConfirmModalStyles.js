export const styles = {
  displayTextStyle: {
    margin: "3rem 1rem",
    padding: "0 .8rem 0 2rem",
    "@media (max-width: 600px)": {
      textAlign: "center",
      padding: "0 .75rem",
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
  modalContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
  },

  buttonContainer: {
    marginBottom: "3rem",
    marginTop: "3rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      marginBottom: "0rem",
      marginTop: "0rem",
    },
  },
};
