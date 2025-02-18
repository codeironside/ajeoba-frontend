export const styles = {
  responsiveWidth: {
    "@media (max-width: 600px)": {
      marginTop: "1.5rem",
      width: "80%",
    },
  },
  detailMainContainer: {
    display: "flex",
    margin: "1rem",
    width: "80%",
    justifyContent: "space-between",
    "@media (max-width:600px)": {
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};
