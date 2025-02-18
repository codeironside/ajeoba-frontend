export const bannerStyle = {
  background: {
    position: "relative",
    overflow: "hidden",
    "@media only screen and (max-device-width: 899px) and (min-device-width: 769px)":
      {
        aspectRatio: "16 / 9",
      },
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  bannerTextContainer: {
    position: "absolute",
    top: 0,
    left: "5%",
    width: "50%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    gap: "2rem",
    "@media(max-width: 1200px)": {
      gap: "2rem",
    },
    "@media(max-width: 900px)": {
      width: "60%",
    },
    "@media(max-width: 800px)": {
      width: "60%",
      padding: "2rem 0", // gap: "1rem",
    },

  },
  bannerTextHeader: {
    color: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "3.5rem",
    lineHeight: "5rem",
    "@media(max-width: 1200px)": {
      fontSize: "2.2rem",
      lineHeight: "3.5rem",
    },
    "@media(max-width: 900px)": {
      fontSize: "2rem",
      lineHeight: "2.5rem",
    },
  },
  bannerTextSubtext: {
    color: "white",
    fontWeight: "400",
    fontFamily: "DM Sans",
    fontSize: "1.2rem",
    lineHeight: "2rem",
    "@media(max-width: 1100px)": {
      fontSize: "1rem",
      lineHeight: "2rem",
    },
  },
  bannerTextButton: {
    color: "#006D33",
    backgroundColor: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    width: "30%",
    height: "3.8rem",
    borderRadius: "4px",
    transition: "background transform 1s ease",
    textTransform: "capitalize",
    "&:hover": {
      background: "#f9f9f9",
    },
    "@media(max-width: 1100px)": {
      width: "35%",
    },
    // "@media(max-width: 360px)": {
    //   width: ".7rem",
    // },
  },
  bannerContentContainer: {
    display: "flex",
    "@media(max-width: 999px)": {
      flexDirection: "column",
    },
  },
  avatarBox: {
    position: "absolute",
    width: "fit-content",
    height: "auto",
    display: "flex",
    background: "black",
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: "40px",
    padding: ".6rem 0.5rem",
    gap: ".5rem",
    "@media(max-width: 900px)": {
      gap: "1rem",
    },
  },
  avatarBoxText: {
    color: "white",
    fontFamily: "DM Sans",
    fontSize: ".7rem",
    fontWeight: "700",
    lineHeight: "1.8rem",
    "@media(max-width: 900px)": {
      fontSize: "0.7rem",
    },
    "@media(max-width: 768px)": {
      fontSize: "0.4rem",
    },
  },
  parentContainersm: {
    // background:
    //   " linear-gradient(45deg, hsla(148, 100%, 12%, 1) 38%, hsla(148, 100%, 21%, 1) 58%)",
  },
  basecontainer: {
    position: "relative",
    // height: "90vh",
    // "@media (max-width: 600px)": {
    //   height: "100vh",
    // },
  },
  avatarContainer: {
    width: "15%",
    "@media (max-width: 600px)": {
      width: "10%",
    },
  },
  avatarContainersm: {
    width: "12%",
    "@media (max-width: 600px)": {
      width: "5%",
    },
  },
  bannerTextContainersm: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "4rem",
    position: "absolute",
    top: "10%",
    left: "5%",
    "@media(max-width: 600px)": {
      width: "90%",
    },
    "@media(max-width: 500px)": {
      gap: "2rem",
    },
    "@media(max-width: 300px)": {
      gap: "1.5rem",
    },
  },

  bannerTextHeadersm: {
    color: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "3rem",
    lineHeight: "5rem",
    "@media screen and (max-width: 600px)": {
      fontSize: "2.5rem",
      lineHeight: "4rem",
    },
    "@media screen and (max-width: 500px)": {
      fontSize: "2rem",
      lineHeight: "3rem",
    },
    "@media screen and (max-width: 300px)": {
      fontSize: "1rem",
      lineHeight: "2rem",
    },
  },
  bannerTextSubtextsm: {
    color: "rgba(255, 255, 255, 0.7)",
    fontWeight: "400",
    fontFamily: "DM Sans",
    fontSize: "2rem",
    lineHeight: "3rem",
    "@media screen and (max-width: 600px)": {
      fontSize: "1.5rem",
      lineHeight: "3rem",
    },
    "@media screen and (max-width: 500px)": {
      fontSize: "1rem",
      lineHeight: "2rem",
    },
    "@media screen and (max-width: 300px)": {
      lineHeight: "1.5rem",
    },
  },
  bannerTextButtonsm: {
    color: "#006D33",
    backgroundColor: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "1.3rem",
    height: "3.3rem",
    width: "45%",
    borderRadius: "3px",
    textAlign: "center",
    textTransform: "capitalize",
    transition: "background transform 1s ease",
    "&:hover": {
      background: "#f9f9f9",
    },
    "@media screen and (max-width: 300px)": {
      fontSize: "1rem",
    },
  },
  avatarBoxsm: {
    position: "absolute",
    width: "fit-content",
    display: "flex",
    background: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "40px",
    padding: "0.3rem",
    gap: "1rem",
    // "@media(max-width: 768px)": {
    //   padding: ".8vw 1vw",
    //   gap: "2vw",
    // },
  },

  navsubmenu: {
    position: "absolute",
    top: 0,
    right: "34%",
  },
  bannerImagesm: {
    width: "100%",
    height: "90vh",
    objectFit: "cover",
  },
};
