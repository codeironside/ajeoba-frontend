export const styles = {
  orderMainContainer: {
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
      marginTop: "0rem",
      width: "80%",
    },
  },

  
  boxMarginTop: {
    marginTop: "1.750rem",
  },
  certificateResponsiveStyle: {
    "@media (max-width:600px)": { marginBottom: "0.15rem" },
  },
};
export default styles;