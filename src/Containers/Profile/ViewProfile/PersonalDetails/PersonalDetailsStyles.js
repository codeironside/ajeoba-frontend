export const styles = {
  upperParent: {
    position: "relative",
  },
  pcc_box: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    gap: "2rem",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      gap: "0rem",
      width: "90%",
      margin: "0 auto",
    },
  },
  pcc_box_inside: {
    flex: "1",
  },
  upperContainer: {
    position: "absolute",
    width: "100%",
    height: "12.5rem",
  },
  centerContentContainer: {
    marginTop: "-4.375rem",
    borderRadius: "0.5rem",
    height: "calc(100vh - 12.5rem)",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "start",
    overflow: "auto",
    padding: "1.5rem 1rem 0 1rem",
    flexWrap: "initial",
    "@media (max-width: 900px)": {
      paddingTop: "1rem",
      height: "calc(100vh - 12.5rem)",
      marginTop: "-4.5rem",
    },
  },
  bankingDetails: {
    width: "100%",
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  bankingDetailsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "43.75rem",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  personalDetailsContainer: {
    display: "flex",
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  bankingContent: {
    display: "flex",
    gap: "1.25rem",
    width: "100%",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      gap: "0px",
    },
  },
  widthContainer: {
    width: "50%",
    "@media (max-width: 1000px)": {
      width: "100%",
    },
  },
};
