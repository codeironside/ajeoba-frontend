export const styles = {
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

  responsiveWidth: {
    "@media (max-width: 600px)": {
      marginTop: "1.5rem",
      width: "80%",
    },
  },

  btnPosition: {
    padding: 0,
    marginTop: "0.499rem",
  },
  boxMarginTop: {
    marginTop: "1.750rem",
  },
};
export default styles;
