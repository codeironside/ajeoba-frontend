import greybgsm from "../../Homepage/Images/ovpbgdetailssm.svg";
import greenbgpropinv from "../../Homepage/Images/ovppropinvgreenbg.png";

const titleframe =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/titleframe.svg";
const titleframedetails =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/whoneedssoftwarepage/whoneedssoftwaer/titledetailsgrayaquareshort.svg";
const flowerbgforintdatabse =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/valueprop/valuepropintdatbasebg.svg";
const squarebgforfinancialservices =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/valueprop/valuepropfinserviceblacksquarebg.svg";
const floweebginputsupply =
  "https://ajeoba-website.oss-eu-central-1.aliyuncs.com/websiteImagesNew/valueprop/valuepropinputsupplyflowebg.svg";





export const valueprop = {
  bannerContainer: {
    // aspectRatio: "14.5 / 5.2",
    overflow: "hidden",
  },
  bannerimg: {
    width: "100%",
    height: "100%",
  },
  titlebg: {
    display: "flex",
    alignItems: "center",
    backgroundImage: `url(${titleframe})`,
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
  titledetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundImage: `url(${titleframedetails})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    aspectRatio: "17 / 2.5 ",
    "@media (max-width: 768px)": {
      // aspectRatio: "17 / 4 ",
    },
    "@media (max-width: 500px)": {
      backgroundImage: `url(${greybgsm})`,
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
  titledetailstext: {
    fontWeight: "400",
    fontSize: "1.3rem",
    fontFamily: "DM Sans",
    lineHeight: "2.5rem",
    color: "#686868",
    width: "80%",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
      lineHeight: "1.94rem",
    },
    "@media (max-width: 1100px)": {
      padding: "3rem 0",
    },
    "@media (max-width: 500px)": {
      padding: "1.5rem 0",
    },
  },

  diginfParentContainer: {
    background: "white",
    width: "90%",
    margin: "3rem auto",
    // "@media(max-width: 1600px)": {
    //   aspectRatio: "15 / 4 ",
    // },
  },
  diginfContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "3rem",
    "@media (max-width: 1200px)": {
      flexDirection: "column",
    },
  },
  imgContainer: {
    width: "47%",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  textContainter: {
    width: "53%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  textheader: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    "@media (max-width: 16200px)": {
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
  bottomtextarb: {
    fontWeight: "400",
    fontSize: "1.2vw",
    fontFamily: "DM Sans",
    lineHeight: "2.2vw",
    color: "#686868",
    // "@media (max-width: 1600px)": {
    //   fontSize: "1rem",
    //   lineHeight: "1.94rem",
    // },
    // "@media (max-width: 1200px)": {
    //   fontSize: "0.6rem",
    //   lineHeight: "1.5rem",
    // },
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
  imgBottomText: {
    fontWeight: "700",
    fontSize: "1.1rem",
    fontFamily: "DM Sans",
    lineHeight: "1.94rem",
    color: "white",
    background: "black",
    width: "100%",
    borderRadius: "0px 0px 8px 8px",
    padding: "1.5rem",
    "@media (max-width: 1600px)": {
      fontSize: "1rem",
    },
    "@media (max-width: 1200px)": {
      fontSize: ".9rem",
    },
    "@media (max-width: 450px)": {
      fontSize: ".7rem",
      padding: ".8rem",
    },
  },

  // propinvparentcontainer: {
  //   aspectRatio: "15 / 4 ",
  // },
  propinvcontainer: {
    display: "flex",
    "@media (max-width: 1200px)": {
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
    "@media (max-width: 1200px)": {
      width: "100%",
      padding: "4rem 0",
    },
    "@media (max-width: 768px)": {
      padding: "3rem 0",
    },
  },
  leftcontainerinnercontent: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 1200px)": {
      width: "90%",
    },
  },
  rightcontainer: {
    width: "50%",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  databaseparentconteaniner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    backgroundImage: `url(${flowerbgforintdatabse})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    aspectRatio: "14 / 4.5",
    gap: "2rem",
    "@media (max-width: 1200px)": {
      gap: "1rem",
      padding: "3rem 0",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "@media (max-width: 500px)": {
      padding: "1.5rem 0",
    },
  },
  databasetoptextcontainer: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    "@media (max-width: 1200px)": {
      width: "90%",
      margin: "0 auto",
    },
  },
  textheaderdb: {
    fontWeight: "700",
    fontSize: "2.5rem",
    fontFamily: "DM Sans",
    lineHeight: "3rem",
    color: "#090909",
    textAlign: "center",
    "@media (max-width: 1600px)": {
      fontSize: "2rem",
      lineHeight: "2.67rem",
      width: "90%",
      margin: "0 auto",
    },
    "@media (max-width: 768px)": {
      fontSize: "1.5rem",
      textAlign: "left",
      lineHeight: "2rem",
    },
    "@media (max-width: 400px)": {
      fontSize: "1.2rem",
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
    "@media (max-width: 1200px)": {
      textAlign: "left",
    },
  },

  databasebottomcontent: {
    width: "100%",
  },

  finserviceparentcontainer: {
    // width: "100%",
    // height: "100%",
    backgroundImage: `url(${squarebgforfinancialservices})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    aspectRatio: "10 / 3.5",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  finservicecontainer: {
    width: "90%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
    gap: "3rem",
    "@media (max-width: 1200px)": {
      flexDirection: "column",
      padding: "3rem 0",
    },
    "@media (max-width: 500px)": {
      padding: "1.5rem 0",
    },
  },
  finservicelefttcontainer: {
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },
  finservicerightcontainer: {
    width: "50%",
    "@media (max-width: 1200px)": {
      width: "100%",
    },
  },

  marketarbparent: {
    position: "relative",
    aspectRatio: "15 / 5",
    // aspectRatio: "10 / 4",
    overflow: "hidden",
    "@media (max-width: 1500px)": {
      aspectRatio: "15 / 5",
    },
    "@media (max-width: 1100px)": {
      aspectRatio: "15 / 6",
    },
    "@media (max-width: 950px)": {
      aspectRatio: "15 / 7",
    },
    "@media (max-width: 900px)": {
      aspectRatio: "15 / 7.5",
    },
    "@media (max-width: 850px)": {
      aspectRatio: "14 / 8",
    },
  },

  marketarbbgimgbig: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "100%",
    // height: "100%",
  },
  marketarbittextcontent: {
    position: "absolute",
    width: "40%",
    top: "20%",
    right: "5%",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    // "@media (max-width: 1200px)": {
    //   top: "15%",
    // },
    "@media (max-width: 1100px)": {
      top: "10%",
    },
    // "@media (max-width: 900px)": {
    //   top: "8%",
    // },
  },

  marketarbittextcontentsm: {
    position: "absolute",
    width: "90%",
    top: "50%",
    right: "0",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    "@media (max-width: 1600px)": {
      // top: "10%",
    },
  },

  marketarbparemntlowercontent: {
    width: "90%",
    margin: "2rem auto",
    display: "flex",
    flexDirection: "column",
    gap: "3vw",
  },

  inputsuppliybg: {
    backgroundImage: `url(${floweebginputsupply})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    flexDirection: "column",
    aspectRatio: "10 / 4",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    "@media (max-width: 1200px)": {
      gap: "1rem",
      padding: "3rem 0",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
    "@media (max-width: 500px)": {
      padding: "1.5rem 0",
    },
  },
};

