import explorebg from "../Images/Digitalinfrastructurebg.png";

export const exploreSection = {
  background: {
    backgroundImage: `url(${explorebg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100%",
    "@media(min-width: 1500px)": {
      aspectRatio: "15 / 4 ",
    },
  },
  textcontent: {
    paddingBottom: "2rem",
    "@media(max-width: 768px)": {
      padding: "1rem 0",
    },
  },
  topcontemttext: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: ".5vw",
    padding: "3rem 0",
    "@media(max-width: 600px)": {
      gap: ".3rem",
      padding: "1rem 0",
    },
  },

  header: {
    color: "#6D9E3F",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    "@media(max-width: 768px)": {
      textAlign: "center",
    },
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.75rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    "@media(max-width: 768px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
      textAlign: "center",
    },
  },

  bottomContent: {
    width: "90%",
    display: "flex",
    margin: "0 auto",
    gap: "5vw",
    "@media(max-width: 768px)": {
      flexDirection: "column",
    },
  },

  exploreImageLeft: {
    width: "100%",
    height: "100%",
  },
  exploreContentright: {
    flex: "65%",
    textAlign: "justify",
    display: "flex",
    flexDirection: "column",
    gap: "1.2rem",
    alignItems: "flex-start",
  },
  exploreImageLeftContainer: {
    flex: "35%",
  },
  exploreContentrightText: {
    fontFamily: "DM Sans",
    fontWeight: "400",
    color: "#585858",
    "@media(min-width: 1400px)": {
      fontSize: "1.2rem",
      lineHeight: "2rem",
    },
    "@media(max-width: 1399px)": {
      fontSize: "1rem",
      lineHeight: "1.67rem",
    },
    // "@media(max-width: 1100px)": {
    //   fontSize: ".9rem",
    //   lineHeight: "1rem",
    // },
  },
};
