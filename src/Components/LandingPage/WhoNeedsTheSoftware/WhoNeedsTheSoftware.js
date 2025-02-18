const titlebgblackbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/titleframe.svg";

const farmingassgragyflowerbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/grayflowerbigbackground.svg";

const greenbgpropinv =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/qagreenbackrud.svg";
const blackflowerbg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/blackbgcorporatebuyer.svg";

const lightgraybg =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/Frame%201000002426.svg";

const logcompanybdekstop =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/logomp.svg";

export const whoneeds = {
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
  farmingassheader: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    textAlign: "center",
    "@media (max-width: 1200px)": {
      fontSize: "2rem",
      lineHeight: "2.67rem",
      // margin: "0 auto",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.2rem",
    },
  },
  databasetoptextcontainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",

    "@media (max-width: 768px)": {
      // margin: "2rem auto",
      width: "90%",
      gap: "1rem",
    },
  },
  databasetoptextcontainerextention: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    textAlign: "center",
    "@media (max-width: 900px)": {
      padding: "2rem 0",
    },
    "@media (max-width: 768px)": {
      width: "90%",
      gap: "1rem",
      justifyContent: "left",
      padding: "1rem 0",
    },
  },

  databasetoptext: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "#686868",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
  },
  databasetoptextextention: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "#686868",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
    "@media (max-width: 768px)": {
      textAlign: "left",
    },
  },

  farminassbg: {
    backgroundImage: `url(${farmingassgragyflowerbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flexDirection: "column",
    aspectRatio: "10 / 4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    "@media (max-width: 1100px)": {
      padding: "2rem 0",
    },
    "@media (max-width: 768px)": {
      aspectRatio: "10 / 2",
    },
  },

  qacontainer: {
    display: "flex",
    "@media (max-width: 768px)": {
      flexDirection: "column-reverse",
    },
  },
  corpbuyercontainer: {
    display: "flex",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },

  leftcontainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${greenbgpropinv})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    objectFit: "cover",
    "@media (max-width: 768px)": {
      width: "100%",
      padding: "3rem 0",
    },
  },
  leftcontainercorpbuyer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${blackflowerbg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    "@media (max-width: 768px)": {
      width: "100%",
      padding: "3rem 0",
    },
  },

  rightcontainer: {
    width: "50%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },

  leftcontainerinnercontent: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 1200px)": {
      padding: "2rem 0",
    },
    "@media (max-width: 768px)": {
      padding: "0",
      width: "90%",
    },
  },

  textheader: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    "@media (max-width: 1200px)": {
      fontSize: "2rem",
      lineHeight: "2.67rem",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "2rem",
      // width: "90%",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.2rem",
    },
  },
  textheaderfinancecomp: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    textAlign: "center",
    "@media (max-width: 1200px)": {
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
  textheaderwhite: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "white",
    "@media (max-width: 1200px)": {
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
  bottomtextwhite: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "white",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
  },

  bottomtext: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "#686868",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
  },

  marketarbparent: {
    backgroundImage: `url(${logcompanybdekstop})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    aspectRatio: "18 / 5",
    display: "flex",
    position: "relative",
    "@media(max-width: 1100px)": {
      aspectRatio: "16 / 5",
    },
    "@media(max-width: 900px)": {
      aspectRatio: "12 / 5",
    },
  },

  marketarbittextcontent: {
    position: "absolute",
    width: "40%",
    left: "5%",
    transform: "translateX(-5%)",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    "@media(max-width: 1100px)": {
      width: "50%",
    },
  },
  diginfParentContainer: {
    background: "white",
    width: "90%",
    margin: " 2rem auto",
    aspectRatio: "18 / 5",
    "@media(max-width: 1100px)": {
      aspectRatio: "16 / 5",
    },
    "@media(max-width: 900px)": {
      aspectRatio: "12 / 5",
    },
    "@media(max-width: 768px)": {
      margin: "1.5rem auto",
    },
  },

  diginfContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  inputsupplycontainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  },
  imgContainer: {
    width: "50%",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },
  textContainter: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 768px)": {
      width: "100%",
    },
  },

  databaseparentconteaniner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundImage: `url(${lightgraybg})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    aspectRatio: "14 / 3",
    gap: "2rem",
    "@media (max-width: 768px)": {
      gap: "1rem",
      padding: "3rem 0",
    },
    "@media (max-width: 500px)": {
      padding: "1.5rem 0",
    },
  },

  databasebottomcontent: {
    width: "100%",
  },

  marketarbparentsm: {
    position: "relative",
    // width: "50%",
    height: "100%",
  },

  logisticscompanytextcontentsm: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "3vw",
    position: "absolute",
    top: "10%",
    left: "5%",
  },
};
