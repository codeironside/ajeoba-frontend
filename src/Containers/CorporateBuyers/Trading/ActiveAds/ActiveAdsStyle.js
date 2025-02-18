import { commonStyles } from "../../../../Style/CommonStyle";
export const activeAdsStyles = {
  activeAdsContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    padding: "1rem",
    height: "calc(100vh - 21.2rem)",
    overflowY: "scroll",
    ...commonStyles.customSrollBar,
  },
  activeAdsContainerCorporate: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    padding: "1rem",
    height: "calc(100vh - 21.2rem)",
    overflowY: "scroll",
    ...commonStyles.customSrollBar,
    "@media(max-width:600px)": {
      flexWrap: "nowrap",
      flexDirection: "column",
      padding: "0",
      height: "fit-content",
    },
    "@media(max-width:1024px)": {
      flexWrap: "wrap",
    },
    "@media(max-width:768px)": {
      flexWrap: "wrap",
    },
    "@media(max-width:540px)": {
      flexWrap: "wrap",
    },
    "@media(max-width:414px)": {
      flexWrap: "nowrap",
      flexDirection: "column",
      padding: "0",
      height: "fit-content",
    },
    "@media(max-width:375px)": {
      flexWrap: "nowrap",
      flexDirection: "column",
      padding: "0",
      height: "fit-content",
    },
    "@media(max-width:390px)": {
      flexWrap: "nowrap",
      flexDirection: "column",
      padding: "0",
      height: "fit-content",
    },
  },
  activeAdsContainerOpenMarket: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    marginTop: "1rem",
    justifyContent: "center",
    height: "calc(100vh - 18.3rem)",
    overflowY: "scroll",
    ...commonStyles.customSrollBar,
    "@media(max-width:768px)": {
      width: "90%",
      height: "calc(100vh - 4rem)",
    },
  },
  heightContainer: {
    height: "calc(100vh - 10.8rem)",
  },

  heightContainerCorporate: {
    height: "calc(100vh - 9.5rem)",
  },

  customWidthStyle: {
    "@media(max-width:600px)": {
      width: "15rem",
    },
  },
  searchContainer: {
    "@media(max-width:600px)": {
      flexDirection: "row",
    },
  },
  dialogContainer: {
    height: "calc(100vh - 20rem)",
  },
};