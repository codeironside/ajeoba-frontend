export const styles = {
  contentTopContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "1.5rem 0 1rem 0",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      flexWrap: "nowrap",
      width: "100%",
      gap: "0.313rem",
      marginBottom:'1rem'
    },
  },
  btnContainer: {
    "@media(max-width: 900px)": {
      flexDirection: "column",
    },
  },
  formMarginTop:{
    "@media(max-width:600px)": {
      marginTop: "5rem",
    },
  },
  editRespnsiveBtn: {
    "@media(max-width:600px)": {
      top: "39%",
      right: "34%",
    },
  },
};
