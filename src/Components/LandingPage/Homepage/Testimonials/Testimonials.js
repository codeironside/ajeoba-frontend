const testimonialsdesktopbackground =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/homepage/testimonaialbg.svg";

export const testimonials = {
  parentbg: {
    position: "relative",
    backgroundImage: `url(${testimonialsdesktopbackground})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom left",
    aspectRatio: "10 / 5",
    "@media(max-width: 900px)": {
      aspectRatio: "6 / 3.5",
    },
  },

  leftcontent: {
    position: "absolute",
    top: "5%",
    left: "5%",
    width: "45%",
    // height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "2rem",
    zIndex: 15,
    "@media(max-width: 1200px)": {
      gap: "1.5rem",
    },
    "@media(max-width: 900px)": {
      gap: "1rem",
    },
  },

  topcontemttext: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "left",
    alignItems: "left",
    gap: ".5vw",
    "@media(max-width: 768px)": {
      gap: ".5rem",
      padding: "1rem 0",
    },
  },
  header: {
    color: "#6D9E3F",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    "@media(max-width: 768px)": {},
  },
  header2: {
    color: "black",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1.75rem",
    lineHeight: "3rem",
    textTransform: "capitalize",
    "@media(max-width: 900px)": {
      lineHeight: "2.5rem",
      fontSize: "1.5rem",
    },
  },
  testuserparentcontentsm: {
    display: "flex",
    flexDirection: "column",
    gap: "2vw",
  },
  usercontent: {
    display: "flex",
    justifyContent: "left",
    alignItems: "flex-end",
    gap: "1rem",
    marginTop: "1.5rem",
    "@media (max-width: 768px)": {
      gap: "0.5rem",
    },
  },
  usernameAv: {
    background: "#006d33",
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    textAlign: "center",
    lineHeight: "3rem",
    color: "white",
    fontSize: "1rem",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 500px)": {
      height: "2.8rem",
    },
  },
  username: {
    color: "#2E2E2E",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontFamily: "DM Sans",
    textTransform: "uppercase",
  },
  userrole: {
    color: "#737373",
    fontWeight: "400",
    fontSize: "1rem",
    fontFamily: "DM Sans",
    lineHeight: "1.5rem",
  },
  usercontrol: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  testtext: {
    color: "#585858",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "2rem",
    fontFamily: "DM Sans",
  },
  usercontrol: {
    display: "flex",
    gap: "1rem",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  arrows: {
    "@media (min-width: 1100px)": {
      width: "30%",
    },
    "@media (max-width: 600px)": {
      width: "20%",
    },
    cursor: "pointer",
    // transition: "transform .2s ease-out",
    // "&:hover": {
    //   transform: "scaleX(1.1)",
    // },
  },
  arrowssm: {
    width: "10%",
    cursor: "pointer",
  },

  paremntlowercontent: {
    width: "90%",
    margin: "0 auto",
  },
  lowercontent: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "3vw",
    aspectRatio: "14 / 9",
  },
  quote: {
    // width: "3.44rem",
    // height: "2.6rem",
    width: "15%",
  },

  testtextsm: {
    color: "#585858",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "2rem",
    fontFamily: "DM Sans",
    // "@media (max-width: 768px)": {
    //   fontSize: "2vw",
    //   lineHeight: "3vw",
    // },
  },

  usernamesm: {
    color: "#2E2E2E",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "1.7rem",
    fontFamily: "DM Sans",
    textTransform: "uppercase",
    "@media (max-width: 768px)": {
      fontSize: "0.8rem",
      lineHeight: "1.2rem",
    },
  },
  userrolesm: {
    color: "#737373",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.7rem",
    fontFamily: "DM Sans",
    "@media (max-width: 500px)": {
      fontSize: "0.8rem",
      lineHeight: "1.2rem",
    },
  },
  avatar: {
    width: "20%",
  },
  avatarsm: {
    width: "20%",
  },
  testimonialpg: {
    marginBottom: "2rem",
  },

  bgimage: {
    width: "100%",
    height: "100%",
  },
};
