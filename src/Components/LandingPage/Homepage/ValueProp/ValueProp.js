import bgleftsm from "../Images/greenbgleftsm.svg";

export const greenleftbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/homepage/homepagevaluepropgreenbg.svg";

export const valueprop = {
  covercontainer: {
    width: "100%",
    display: "flex",
    alignItems: "stretch",
    flexDirection: "row",
    marginTop: "2rem",
    // aspectRatio: "10 / 5",
    "@media (max-width: 1500px)": {
      // aspectRatio: "10 / 5.5",
    },
    "@media (max-width: 1200px)": {
      // aspectRatio: "10 / 7",
    },
    "@media (max-width: 1100px)": {
      // aspectRatio: "10 / 7.5",
    },
    "@media (max-width: 900px)": {
      // aspectRatio: "10 / 9",
    },
    // "@media (max-width: 800px)": {
    //   aspectRatio: "10 / 4",
    // },
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
    },
  },
  leftsidebackground: (openIndex) => ({
    backgroundImage: `url(${greenleftbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    width: "55%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "@media (max-width: 768px)": {
      // backgroundImage: `url(${bgleftsm})`,
      width: "100%",
      // height: openIndex === -1 ? "62vh" : "68vh",
    },
    // "@media (max-width: 700px)": {
    //   height: "60vh",
    // },
    // "@media (max-width: 600px)": {
    //   height: openIndex === -1 ? "75vh" : "85vh",
    // },
    // "@media (max-width: 550px)": {
    //   height: openIndex === -1 ? "80vh" : "85vh",
    // },
    // "@media (max-width: 500px)": {
    //   height: openIndex === -1 ? "60vh" : "70vh",
    // },
    // // "@media (max-width: 400px)": {
    // //   height: openIndex === -1 ? "65vh" : "70vh",
    // // },
    // "@media (max-width: 400px)": {
    //   height: openIndex === -1 ? "65vh" : "75vh",
    // },
    // "@media (max-width: 380px)": {
    //   height: openIndex === -1 ? "75vh" : "85vh",
    // },
    // "@media (max-width: 300px)": {
    //   height: openIndex === -1 ? "80vh" : "90vh",
    // },
  }),

  rightsidebackground: {
    width: "45%",
    "@media (max-width: 768px)": {
      width: "100%",
      // aspectRatio: "10 / 5.5",
      objectFit: "contain",
    },
  },
  rightsidebackgroundimg: {
    width: "100%",
    // height: "100%",
  },
  leftsideContainer: {
    width: "85%",
    margin: "0 auto 0 auto",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flexDirection: "column",
    padding: "2rem 0",
    "@media (max-width: 768px)": {
      width: "90%",
      margin: "0 auto 0 auto",
    },
  },
  leftsideContainermapped: {
    width: "100%",
  },
  parentContainer: {
    cursor: "pointer",
    position: "relative",
    // transition: "padding 0.3s ease",
    fontFamily: "DM Sans",
    width: "100%",
  },
  iconstyle: {
    width: "20px",
    transition: "width 0.3s ease",
  },
  innertextContainer: {
    cursor: "pointer",
  },
  innerquestionstyle: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.34rem",
    color: "white",
    fontFamily: "DM Sans",
    "@media (max-width: 400px)": {
      fontSize: "0.8rem",
      lineHeight: "1rem",
    },
  },
  answerstyle: {
    fontWeight: "400",
    color: "white",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "1.9rem",
    "@media (max-width: 400px)": {
      fontSize: "0.8rem",
      lineHeight: "1.5rem",
    },
  },
  outterquestionContainer: {
    display: "flex",
    alignItems: "center",
    gap: "1vw",
    fontFamily: "DM Sans",
    margin: ".8vw 0",
  },
  valuepropheader: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    gap: ".5vw",
    padding: "0rem 0 .5rem 0",
    "@media(max-width: 768px)": {
      // gap: ".3rem",
      padding: "0",
    },
  },

  header: {
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "500",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    textTransform: "uppercase",
  },
  header2: {
    color: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.5rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    "@media(max-width: 768px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
    },
  },
  viemorebutton: {
    color: "#006D33",
    backgroundColor: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    width: "11.1rem",
    height: "3.3rem",
    lineHeight: "1.3rem",
    borderRadius: "4px",
    marginTop: "1rem",
    textTransform: "capitalize",
    transition: "background transform 1s ease",
    "&:hover": {
      background: "#f9f9f9",
    },
    "@media (max-width: 768px)": {
      width: "9rem",
      height: "2.8rem",
    },
  },

  parentContainer: {
    width: "100%",
    display: "flex",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  leftimg: {
    width: "50%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  imgleft: {
    width: "100%",
    height: "100%",
  },
  rightimg: {
    width: "60%",
  },
  rightText: {
    width: "80%",
    textAlign: "justify",
    margin: "0 auto",
    color: "white",
    fontWeight: "300",
    fontFamily: "DM Sans",
    fontSize: "1.2vw",
    lineHeight: "2vw",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media(max-width: 768px)": {
      fontSize: "2.5vw",
      lineHeight: "5vw",
    },
  },

  lowercontainerleft: {
    width: "40%",
  },

  lowercontainerrightsm: {
    width: "100%",
  },
  lowercontainertext: {
    fontSize: "1.2rem",
    fontWeight: "700",
    lineHeight: "3rem",
    fontFamily: "DM Sans",
    color: "white",
    textAlign: "justify",
    " @media (max-width: 1400px)": {
      lineHeight: "2.5rem",
      fontSize: "1rem",
    },
  },
  centerTextContainer: {
    textAlign: "center",
    position: "absolute",
    width: "80%",
  },
  textcontainer: {
    position: "absolute",
    top: "28%",
    left: "45%",
    width: "50%",
    display: "flex",
    gap: "1rem",
    flexDirection: "column",
    " @media (max-width: 1300px)": {
      top: "20%",
    },
    " @media (max-width: 1200px)": {
      top: "10%",
    },
  },

  valueropquote: {
    width: "5%",
  },
};
