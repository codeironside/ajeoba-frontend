const greenbgimgsm =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/homepage/homepagewhoneedssoftwaregreenbakgroundmobile.svg";

const dashboardsoftwarewhoneedssoftware =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/homepage/softwaredashboaedwhoneedwssoftware.svg";

export const whoneedssoftware = {
  pagecontainer: {
    background: "#EEF0F2",
    aspectRatio: "14 / 6",
    overflow: "hidden",
    position: "relative",
  },
  greenbgimage: {
    backgroundImage: `url(${dashboardsoftwarewhoneedssoftware})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  pagecontainersm: {
    background: "#EEF0F2",
    padding: "3vw 0",
  },
  greenimaagecontainer: {
    margin: "2vw auto",
    width: "90%",
    // aspectRatio: "16 / 4",
    // position: "relative",
    // "@media (max-width: 768px)": {
    //   width: "100%",
    // },
  },
  leftContainerTopcontent: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    paddingRight: ".8rem",
    "@media (max-width: 1100px)": {
      gap: ".5rem",
    },
    "@media (min-width: 1600px)": {
      gap: "2rem",
    },
  },
  greenimage: {
    width: "100%",
    height: "100%",
  },

  topContainer: {
    position: "absolute",
    right: "5%",
    top: "12%",
    width: "40%",
    fontFamily: "DM Sans",
    color: "white",
  },

  bottomContainerLeft: {
    position: "absolute",
    left: "8%",
    bottom: "4.5%",
    width: "43.3%",
    height: "auto",
  },
  bottomContainerLeftimage: {
    width: "100%",
  },
  bottomContainerLeftimagesm: {
    width: "100%",
  },
  bottomContainerRight: {
    position: "absolute",
    right: "5%",
    bottom: "5%",
    aspectRatio: "16.5 / 8.45",
    width: "40%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(15vw, 1fr))",
    background: "rgba(0, 0, 0, 0.55)",
    borderRadius: ".5rem 0 1rem 0",
    border: "1px thin transparent",
    paddingLeft: "2vw ",
  },

  leftContainerTopcontentTopText: {
    fontFamily: "DM Sans",
    fontWeight: "700",
    color: "white",
    "@media (min-width: 1499px)": {
      fontSize: "3rem",
      lineHeight: "3.5rem",
    },
    "@media (max-width: 1500px)": {
      fontSize: "2.5rem",
      lineHeight: "3.25rem",
    },
    "@media (max-width: 1200px)": {
      fontSize: "1.8rem",
      lineHeight: "2.3rem",
    },
  },
  leftContainerTopcontentBottomText: {
    fontFamily: "DM Sans",
    color: "white",
    "@media (min-width: 1699px)": {
      fontSize: "1.2rem",
      lineHeight: "3rem",
    },
    "@media (max-width: 1500px)": {
      fontSize: "1rem",
      lineHeight: "3rem",
    },
    "@media (max-width: 1400px)": {
      fontSize: "0.875rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 1200px)": {
      lineHeight: "1.5rem",
    },
    "@media (max-width: 1100px)": {
      lineHeight: "1.2rem",
      fontSize: "0.8rem",
    },
  },
  leftContainerbottomParentcontent: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
  },
  leftContainerbottomParentcontentviewMoreBox: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    cursor: "pointer",
    flexDirection: "row",
  },
  leftContainerbottomParentcontentviewMo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "left",
    gap: "1rem",
    cursor: "pointer",
    flexDirection: "row-reverse",
  },
  leftContainerbottomcontenticon: {
    padding: ".3rem",
    background: "#F0F5EC",
    border: "1px solid transparent",
    borderRadius: ".5rem",
  },
  leftContainerbottomcontenttext: {
    fontSize: "0.875rem",
    lineHeight: "1.75rem",
    color: "white",
    fontWeight: "600",
    textTransform: "capitalize",
    fontFamily: "DM Sans",
    "@media (max-width: 1100px)": {
      fontSize: "0.7rem",
    },
  },
  viewMoreBox: {
    fontSize: "1vw",
    lineHeight: "2vw",
    color: "white",
    fontWeight: "400",
    textTransform: "capitalize",
    fontFamily: "DM Sans",
  },
  smallscreenflex: {
    display: "flex",
    flexDirection: "column",
  },
  topContainersm: {
    position: "absolute",
    width: "90%",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    color: "white",
    margin: "0 auto",
  },
  bottomContainerLeftsm: {
    position: "absolute",
    width: "50%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },

  bgcontainer: {
    width: "90%",
    height: "100%",
    margin: "0 auto",
    background: `url(${greenbgimgsm})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    borderRadius: "1rem",
  },
  allcontent: {
    width: "90%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "5vw",
    margin: "0 auto",
    padding: "6vw 0",
  },
  topheadersm: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: "4vw",
  },
  header: {
    color: "white",
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    textTransform: "uppercase",
    textAlign: "left",
  },
  header2: {
    color: "white",
    fontWeight: "400",
    fontFamily: "DM Sans",
    fontSize: "0.8rem",
    lineHeight: "1.6rem",
    textTransform: "capitalize",
    textAlign: "left",
  },
  dashboardimgsm: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  greenimagesm: {
    width: "100%",
    height: "auto",
    objectFit: "cover",
  },
  bottomContainersm: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    background: "rgba(0, 0, 0, 0.55)",
    borderRadius: "1rem",
    border: "1px thin transparent",
    padding: "5vw ",
    gap: "4vw",
  },
  valueppropoptions: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    flexDirection: "row-reverse",
    justifyContent: "left",
  },
  leftContainerbottomcontenttextsm: {
    fontSize: "1rem",
    lineHeight: "2rem",
    color: "white",
    fontWeight: "400",
    textTransform: "capitalize",
    fontFamily: "DM Sans",
    "@media (max-width: 1100px)": {
      lineHeight: "1.2rem",
      fontSize: "0.8rem",
    },
  },
  viewMoreBoxsm: {
    fontSize: "1rem",
    lineHeight: "2rem",
    color: "white",
    fontWeight: "400",
    textTransform: "capitalize",
    fontFamily: "DM Sans",
    "@media (max-width: 1100px)": {
      lineHeight: "1.2rem",
      fontSize: "0.8rem",
    },
  },
};
