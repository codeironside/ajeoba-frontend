import graysquarebg from "../Homepage/Images/Digitalinfrastructurebg.png";
const titlebgblackbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/titleframe.svg";

const corevaluebgblackbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/aboutus/corevalueblacksquarebg.svg";


export const aboutUs = {
  bannerContainer: {
    overflow: "hidden",
  },
  bannerimg: {
    width: "100%",
    height: "100%",
  },

  titlebg: {
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${titlebgblackbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "7rem",
    "@media (max-width: 768px)": {
      height: "6.2rem",
    },
    "@media (max-width: 500px)": {
      height: "4.2rem",
    },
  },
  title: {
    fontWeight: "700",
    fontSize: "2.1rem",
    fontFamily: "DM Sans",
    lineHeight: "3.63rem",
    color: "white",
    width: "90%",
    margin: "0 auto",
    textAlign: "left",
    textTransform: "uppercase",
    // padding: " 2rem 0",
    "@media (max-width: 1600px)": {
      fontSize: "2rem",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1rem",
      lineHeight: "1.5rem",
    },
  },
  firstSectionparentcontainer: {
    background: "white",
    width: "90%",
    margin: "3rem auto",
    "@media (max-width: 1200px)": {
      margin: "2rem auto",
    },
  },
  firstSection: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    "@media (max-width: 900px)": {
      flexDirection: "column",
    },
  },
  leftSection: {
    width: "50%",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  rightSection: {
    width: "50%",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  leftSectiontext: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "#585858",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
  },
  textheader: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    "@media (max-width: 1600px)": {
      fontSize: "2rem",
      lineHeight: "2.67rem",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.2rem",
    },
  },
  missionvisionparenctcontainer: {
    backgroundImage: `url(${graysquarebg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom right",
    aspectRatio: "10 / 4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  missionvisioncontainer: {
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    gap: "3rem",
    "@media (max-width: 1200px)": {
      padding: "3rem 0",
    },
    "@media (max-width: 900px)": {
      flexDirection: "column",
      // gap: "1rem",
      padding: "2rem 0",
    },
  },
  mission: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "1.5rem",
    "@media (max-width: 900px)": {
      width: "100%",
    },
  },
  vission: {
    width: "50%",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    gap: "1.5rem",
    "@media (max-width: 900px)": {
      width: "100%",
      flexDirection: "column-reverse",
    },
  },

  parentContainer: {
    backgroundImage: `url(${corevaluebgblackbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    // aspectRatio: "16 / 7",
  },
  innerContainer: {
    width: "90%",
    margin: "0 auto",
    padding: "3rem 0",
    "@media (max-width: 768px)": {
      padding: "1.5rem 0",
    },
  },
  toptext: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
    "@media (max-width: 600px)": {
      gap: "1rem",
    },
  },

  header: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "white",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "2rem",
      lineHeight: "2.75rem",
      margin: "0 auto",
    },
    "@media (max-width: 1200px)": {
      // textAlign: "left",
      margin: "0 auto",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.2rem",
    },
  },
  bottomtextdd: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2rem",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.9rem",
    },
    "@media (max-width: 1200px)": {
      // textAlign: "left",
    },
  },

  corevaluebottom: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: "5rem",
    "@media (max-width: 1200px)": {
      marginTop: "3rem",
    },
    "@media (max-width: 600px)": {
      marginTop: "1rem",
    },
  },

  corevalueimgs: (isMobile, isLast) => ({
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    width: isMobile ? "100%" : isLast ? "35%" : "35%",
    marginBottom: "3rem",
    ...(isLast && !isMobile ? { margin: "0 auto" } : { margin: "1rem auto" }),
  }),

  corvalname: {
    fontWeight: "700",
    fontSize: "1.6rem",
    fontFamily: "DM Sans",
    lineHeight: "2.1rem",
    color: "white",
    textAlign: "left",
    "@media (max-width: 1600px)": {
      fontSize: "1.3rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.1rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1rem",
    },
  },
  corvaltext: {
    fontWeight: "400",
    fontSize: "1.1rem",
    fontFamily: "DM Sans",
    lineHeight: "2rem",
    color: "rgba(255, 255, 255, 0.8)",
    "@media (max-width: 1600px)": {
      fontSize: "0.8rem",
      lineHeight: "1.9rem",
    },
  },

  parentcontainer: {
    width: "70%",
    margin: "0 auto",
  },

  boardname: {
    fontWeight: "700",
    fontSize: "1rem",
    fontFamily: "DM Sans",
    lineHeight: "2rem",
    color: "#003C1C",
    textAlign: "center",
  },
  boardrole: {
    fontWeight: "700",
    fontSize: "0.8rem",
    fontFamily: "DM Sans",
    lineHeight: "1.5rem",
    color: "#585858",
    textAlign: "center",
  },

  container: {
    width: "80%",
    margin: " auto",
  },
  sections: {
    margin: "3rem auto",
    "@media (max-width: 768px)": {
      margin: "1.5rem auto",
    },
  },
  board1: {
    display: "flex",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
  },
  memembers: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "26%",
    margin: "3rem 0",
    "@media (max-width: 768px)": {
      width: "50%",
    },
    "@media (max-width: 500px)": {
      width: "100%",
    },
  },
};
