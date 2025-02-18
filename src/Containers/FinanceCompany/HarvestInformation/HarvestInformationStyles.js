export const styles = {
  consistentLayoutHeight: {
    height: "3.5rem",
  },
  harvestInfoUpperContainer: {
    display: "flex",
    justifyContent: "space-between",
    "@media(max-width: 600px)": {
      flexDirection: "column",
    },
  },
  backButtonHarvesting: {
    position: "initial",
    width: "auto",
  },
  tableHeightHarvest:{
    height:"calc(100vh - 19.6rem)"
  }
};
