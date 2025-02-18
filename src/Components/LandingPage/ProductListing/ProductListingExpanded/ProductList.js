export const styles = {
  productListcontainer: {
    fontFamily: "DM Sans",
    backgroundPosition: "right center",
    backgroundRepeat: "no-repeat",
    backgroundImage:
      "url(https://res.cloudinary.com/dpnyywwjb/image/upload/v1699968700/image_6_yspj5o.svg)",
    "@media(min-width: 2000px)": {
      boxShadow: "inset 1280px 0 100px 0 #FFF",
    },
    "@media(max-width: 1900px)": {
      boxShadow: "inset 1280px 0 100px 0 #FFF",
    },
    "@media(max-width: 1600px)": {
      boxShadow: "inset 1050px 0 100px 0 #FFF",
    },
    "@media(max-width: 1500px)": {
      boxShadow: "inset 1000px 0 100px 0 #FFF",
    },
    "@media(max-width: 1400px)": {
      boxShadow: "inset 900px 0 100px 0 #FFF",
    },
    "@media(max-width: 1200px)": {
      boxShadow: "inset 800px 0 100px 0 #FFF",
    },
    "@media(max-width: 1100px)": {
      boxShadow: "inset 680px 0 120px 0 #FFF",
    },
    "@media(max-width: 950px)": {
      boxShadow: "inset 620px 0 120px 0 #FFF",
    },
    "@media(max-width: 900px)": {
      boxShadow: "inset 530px 0 120px 0 #FFF",
    },
    "@media(max-width: 800px)": {
      boxShadow: "inset 480px 0 120px 0 #FFF",
    },
    "@media(max-width: 727px)": {
      background: "none",
    },
  },

  textContainer: {
    flex: 1,
    zIndex: 5,
    "@media(max-width: 2000px)": {
      width: "62%",
      marginLeft: "3.5rem",
    },
    "@media(max-width: 1900px)": {
      width: "62%",
      padding: "3.2rem 0",
    },
    "@media(max-width: 1700px)": {
      width: "58%",
      padding: "3rem 0",
    },
    "@media(max-width: 1550px)": {
      width: "58%",
      padding: "1.5rem 0",
    },
    "@media(max-width: 1450px)": {
      width: "58%",
      padding: "2rem 0",
    },
    "@media(max-width: 1100px)": {
      width: "55%",
    },
    "@media(max-width: 900px)": {
      marginLeft: "2.2rem",
    },
    "@media(max-width: 800px)": {
      width: "50%",
    },
    "@media(max-width: 727px)": {
      width: "90%",
      margin: "0 auto",
      padding: "2rem 0",
    },
  },
  header: {
    fontWeight: "700",
    lineHeight: "50px",
    fontSize: "32px",
    color: "#006d33",
    textAlign: "left",
    fontFamily: "DM Sans",
    "@media(max-width: 1200px)": {
      lineHeight: "3rem",
      fontSize: "1.6rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "3rem",
      fontSize: "1.6rem",
    },
    "@media(max-width: 468px)": {
      lineHeight: "1.5rem",
      fontSize: "1.2rem",
    },
  },
  texts: {
    textAlign: "justify",
    color: "#686868",
    marginTop: "1rem",
    "@media(max-width: 2000px)": {
      lineHeight: "3.2rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 1500px)": {
      lineHeight: "2.5rem",
      fontSize: "1.2rem",
    },
    "@media(max-width: 1200px)": {
      lineHeight: "1.7rem",
      fontSize: "1.1rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "1.4rem",
      fontSize: "1rem",
    },
    "@media(max-width: 468px)": {
      lineHeight: "1.5rem",
      fontSize: ".9rem",
    },
  },
  topcrop: {
    position: "absolute",
    width: "0px",
    display: "none",
    "@media (max-width: 767px)": {
      top: "0",
      right: "0",
      width: "18.84rem",
      height: "auto",
    },
    "@media (max-width: 468px)": {
      width: "16.84rem",
      height: "14.65rem",
      top: "0",
      right: "0",
    },
  },

  rect: {
    width: "100%",
    position: "absolute",
    bottom: "0",
    left: "0",
    right: "0",
  },
  container: {
    width: "90%",
    margin: "2rem auto",
    display: "flex",
    gap: "2rem",
    "@media(max-width: 900px)": {
      margin: "2rem auto",
    },
    "@media(max-width: 768px)": {
      margin: "1rem auto",
      gap: "0",
    },
  },
  filterlg: {
    flexBasis: "15%",
    "@media(max-width: 1250px)": {
      flexBasis: "20%",
    },
    "@media(max-width: 1000px)": {
      flexBasis: "25%",
    },
    "@media(max-width: 850px)": {
      flexBasis: "30%",
    },
    "@media(max-width: 768px)": {
      display: "none",
    },
  },
  filter: {
    border: "1px solid rgba(0, 109, 51, 1)",
    borderRadius: "8px",
    display: "flex",
    width: "9rem",
    height: "3rem",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "2rem",
    gap: "1rem",
    "@media(max-width: 1500px)": {
      fontSize: "1rem",
      width: "7rem",
      height: "3rem",
    },
  },
  filterHeader: {
    fontSize: "1rem",
    fontWeight: "600",
    lineHeight: "2rem",
    color: "rgba(9, 9, 9, 1)",
  },
  filtertab: {
    boxShadow: "none",
    "@media(max-width: 768px)": {
      padding: "0 2rem",
    },
    "@media(max-width: 500px)": {
      padding: "0",
    },
  },
  filtericonsm: {
    background: "rgba(245, 245, 245, 1)",
    border: "0",
    borderRadius: "8px",
    display: "none",
    width: "9rem",
    height: "3rem",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "2.2rem",
    gap: "1rem",
    "@media(max-width: 768px)": {
      display: "flex",
    },
    "@media(max-width: 500px)": {
      display: "flex",
      fontSize: ".8rem",
      width: "7rem",
      height: "2.5rem",
    },
  },
  searchbox: {
    width: "100%",
    height: "4rem",
    padding: "0 1rem",
    border: "1px solid transparent",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    background: "rgba(245, 245, 245, 1)",
    "@media(max-width: 1400px)": {
      height: "3rem",
    },
  },
  input: {
    flex: "1",
    border: "none",
    outline: "none",
    fontSize: "12px",
  },
  searchIcon: {
    // marginLeft: "8px",
    color: "#555",
  },
  searchContainer: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    "@media(max-width: 768px)": {
      display: "none",
    },
  },
  searchContainersm: {
    display: "none",
    "@media(max-width: 768px)": {
      display: "block",
      width: "100%",
      // margin: "2rem 0",
    },
  },
  filterContainersm: {
    "@media(max-width: 768px)": {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
      margin: "1.4rem 0 1.8rem 0",
    },
  },

  searchCount: {
    fontSize: "1.3rem",
    lineHeight: "2.2rem",
    fontWeight: "500",
    "@media(max-width: 1400px)": {
      fontSize: ".9rem",
      lineHeight: "2.2rem",
    },
  },
  searchCountsm: {
    display: "none",
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "2.2rem",
    "@media(max-width: 768px)": {
      display: "block",
    },
    "@media(max-width: 500px)": {
      fontSize: ".8rem",
    },
  },

  listcontainerdetailspage: {
    display: "flex",
    gap: "2rem",
    padding: "3rem 2rem",
    fontFamily: "DM Sans",
    background: "white",
    overflowX: "auto",
    flexWrap: "nowrap",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    "@media(max-width: 1400px)": {
      gap: "2rem",
    },
    "@media(max-width: 1000px)": {
      gap: "2rem",
      margin: "0 0 1rem 0",
    },
  },
  productContainer: {
    display: "flex",
    width: "85%",
    flexDirection: "column",
    border: "1px solid rgba(234, 234, 234, 1)",
    padding: "1rem",
    borderRadius: "8px",
    // minWidth: "76vw",
    "@media(max-width: 768px)": {
      width: "100%",
      border: "0",
      padding: "0",
    },
  },
  productname: {
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "2rem",
    color: "black",
    textTransform: "capitalize",
    textDecoration: "none",
    fontFamily: "DM Sans",
    "@media(max-width: 1400px)": {
      fontSize: ".8rem",
    },
  },
  ratecount: {
    fontWeight: "400",
    fontSize: ".8rem",
    fontFamily: "DM Sans",
    lineHeight: ".9rem",
    color: "#686868",
    textTransform: "capitalize",
    textDecoration: "none",
    fontFamily: "DM Sans",
    marginTop: "5px",
    "@media(max-width: 1100px)": {
      fontSize: ".7rem",
    },
  },
  productunit: {
    fontSize: ".75rem",
    fontFamily: "DM Sans",
    lineHeight: "2rem",
    textTransform: "capitalize",
    textDecoration: "none",
    fontStyle: "italic",
    fontWeight: "500",
    marginLeft: 1,
    color: "#090909",
    // "@media(max-width: 1400px)": {
    //   fontSize: ".8rem",
    // },
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: ".4rem",
    background: "white",
    "@media(max-width: 1400px)": {
      gap: "0",
      margin: "-.5rem 0",
      fontSize: ".7rem",
    },
  },
  card: {
    width: "32%",
    // width: "calc(33.4% - 2rem)",
    boxShadow: "0",
    borderRadius: "8px",
    border: "1px solid rgba(210, 210, 210, 1)",
    "@media(max-width: 1200px)": {
      width: "31.5%",
    },
    "@media(max-width: 1000px)": {
      width: "48%",
    },
    "@media(max-width: 768px)": {
      // width: "50%",
      margin: "0 auto",
    },
    "@media(max-width: 500px)": {
      width: "100%",
    },
  },
  listcontainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "1.5rem",
    margin: "1.8rem 0 1rem 0",
    width: "100%",
    fontFamily: "DM Sans",
    "@media(max-width: 1660px)": {
      gap: "1rem",
    },
    "@media(max-width: 500px)": {
      gap: "2rem",
    },
  },
  cardDetailspage: {
    background: "white",
    flex: "0 0 auto",
    flexBasis: "24%",
    boxShadow: "0",
    borderRadius: "8px",
    border: "1px solid rgba(234, 234, 234, 1)",
    "@media(max-width: 1400px)": {
      flexBasis: "23.75%",
    },
    "@media(max-width: 1300px)": {
      flexBasis: "23.75%",
    },
    "@media(max-width: 1100px)": {
      flexBasis: "23.75%",
    },
    "@media(max-width: 900px)": {
      flexBasis: "32%",
    },
    "@media(max-width: 600px)": {
      flexBasis: "40%",
      margin: "0 auto",
    },
    "@media(max-width: 500px)": {
      flexBasis: "80%",
      margin: "0 auto",
    },
    "@media(max-width: 400px)": {
      flexBasis: "90%",
      margin: "0 auto",
    },
  },
  flowerimg: {
    position: "absolute",
    top: "0",
    right: "0",
  },
  proddetailbg: {
    width: "90%",
    margin: "0 auto",
    padding: "4rem 0",
    "@media(max-width:768px)": {
      padding: "0",
      width: "100%",
    },
  },
  proddetailstop: {
    display: "flex",
    width: "100%",
    gap: "5rem",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    background: "white",
    position: "relative",
    top: "0",
    right: "0",
    borderRadius: "8px",
    zIndex: 999,
    "@media(max-width: 1500px)": {
      gap: "3rem",
    },
    "@media(max-width: 768px)": {
      flexDirection: "column",
      padding: "0",
      gap: "0",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      zIndex: 0,
    },
  },
  productimgContainer: {
    flex: "1",
    width: "50%",
    height: "24.75rem",
    "@media(max-width: 1100px)": {
      height: "auto",
      objectFit: "cover",
      width: "100%",
    },
  },
  imgsm: {
    width: "100%",
    height: "auto",
  },
  imglg: {
    width: "100%",
    height: "100%",
    borderRadius: "8px",

    // "@media(max-width: 1400px)": {
    //   height: "30rem",
    // },
  },
  proddetailtext: {
    flex: "1",
    width: "50%",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    paddingRight: "2rem",
    justifyContent: "flex-start",
    "@media(max-width: 1400px)": {
      gap: "1.3rem",
    },
    "@media(max-width: 1100px)": {
      gap: "1rem",
      paddingRight: "0",
      width: "40%",
    },
    "@media(max-width: 768px)": {
      width: "90%",
      margin: "0 auto",
      padding: "2rem 0",
      gap: "2rem",
    },
  },
  proddetailseller: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    fontFamily: "DM Sans",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      gap: "1rem",
      justifyContent: "left",
    },
  },
  proddetailsellernamecontainer: {
    display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    fontFamily: "DM Sans",
    "@media(max-width: 1000px)": {
      // flexDirection: "column",
      // gap: "1rem",
    },
  },
  proddetailname: {
    fontFamily: "DM Sans",
    fontSize: "2rem",
    fontWeight: "500",
    lineHeight: "2rem",
    color: "#090909",
    "@media(max-width: 1400px)": {
      fontSize: "1.8rem",
    },
    "@media(max-width: 1200px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "1.5rem",
      fontSize: "1.2rem",
    },
  },
  proddetailnameandrating: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  proddetaildescription: {
    fontFamily: "DM Sans",
    fontSize: "1rem",
    color: "#686868",
    lineHeight: "1.5rem",
    fontWeight: "400",
    fontFamily: "DM Sans",
    "@media(max-width: 1100px)": {
      lineHeight: "1.5rem",
      fontSize: "1rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "2rem",
      fontSize: "1.2rem",
    },
  },
  proddetailsellername: {
    fontSize: "1rem",
    color: "#686868",
    lineHeight: "1.4rem",
    fontWeight: "700",
    fontFamily: "DM Sans",
    "@media(max-width: 1100px)": {
      lineHeight: "1rem",
      fontSize: ".8rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "1.5rem",
      fontSize: "1.2rem",
    },
  },
  proddetailseller1: {
    fontSize: "1rem",
    fontFamily: "DM Sans",
    lineHeight: "1.4rem",
    fontWeight: "500",
    color: "#090909",
    marginLeft: "5px",
    "@media(max-width: 1100px)": {
      lineHeight: "1rem",
      fontSize: ".8rem",
    },
    "@media(max-width: 768px)": {
      lineHeight: "1.5rem",
      fontSize: "1.2rem",
    },
  },
  proddetaildivider: {
    color: "rgba(241, 241, 241, 1)",
  },
  ratingContainer: {
    display: "flex",
    alignItems: "center",
    gap: ".4rem",
    "@media(max-width: 1000px)": {
      marginTop: "1rem",
    },
  },
  rating: {
    fontSize: "1.2rem",
    fontFamily: "DM Sans",
    lineHeight: "1.4rem",
    fontWeight: "500",
    color: "black",
    marginLeft: "5px",
    "@media(max-width: 1400px)": {
      lineHeight: "1rem",
      fontSize: ".8rem",
    },
    "@media(max-width: 1400px)": {
      lineHeight: "1rem",
      fontSize: "1.3rem",
    },
  },
  ratingdetails: {
    fontSize: "1rem",
    fontFamily: "DM Sans",
    lineHeight: "0.8rem",
    fontWeight: "700",
    color: "#006D33",
    marginTop: "5px",
    "@media(max-width: 1100px)": {
      fontSize: ".8rem",
    },
  },
  proddetailcost: {
    fontFamily: "DM Sans",
    fontSize: "1.5rem",
    fontWeight: "700",
    lineHeight: "1.5rem",
    color: "#090909",
    "@media(max-width: 1100px)": {
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    "@media(max-width: 768px)": {
      fontSize: "1.5rem",
      lineHeight: "1.5rem",
    },
  },
  proddetailcostcontainer: {
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
  },
  proddetailamt: {},
  proddetailsellerqty: {
    fontFamily: "DM Sans",
    fontStyle: "italic",
    marginLeft: "2px",
    color: "#686868",
    lineHeight: ".7rem",
    textTransform: "capitalize",
    fontSize: "1rem",
    fontWeight: "400",
    "@media(max-width: 1100px)": {
      fontSize: ".8rem",
      lineHeight: "1.2rem",
    },
    "@media(max-width: 768px)": {
      fontSize: "1.2rem",
      lineHeight: "1.5rem",
    },
  },
  proddetailbuy: {
    fontFamily: "DM Sans",
    width: "100%",
    height: "3.5rem",
    background: "#006D33",
    color: "white",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "1.2rem",
    borderRadius: "8px",
    "&:hover": {
      background: "#006D33",
    },
  },
  viewMoreContainer: {
    border: "1px solid #EAEAEA",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    background: "#D2E1C3",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1rem",
    "@media(max-width: 768px)": {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
  },
  viewMoreContainerfarmerdetailstableheader: {
    // width: "90%",
    padding: "2rem 1rem",
    "@media(max-width: 600px)": {
      padding: "1rem",
    },
    "@media(max-width: 300px)": {
      padding: ".8rem",
    },
  },
  viewMoreContainerfarmerdetails: {
    border: "1px solid transparent",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    background: "#D6E5C7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.2rem",
    "@media(max-width: 1000px)": {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
    "@media(max-width: 300px)": {
      padding: "0.8rem",
    },
  },
  viewMoreContainerfarmerdetailscontainer: {
    width: "100%",
    marginTop: "3rem",
    background: "#E7E7E7",
    "@media(max-width: 300px)": {
      marginTop: "1rem",
    },
  },
  viewMoreContainerfarmerdetailscontainerNowallet: {
    width: "100%",
    // marginTop: "10rem",
    background: "#E7E7E7",
    "@media(max-width: 300px)": {
      marginTop: "1rem",
    },
  },
  viewMoreContainerfarmerdetailstable: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "1.5rem",
    flexDirection: "row",
    "@media(max-width: 768px)": {
      flexDirection: "column",
      gap: ".8rem",
    },
  },
  viewMoreheader: {
    fontWeight: "700",
    fontFamily: "DM Sans",
    fontSize: "16px",
    lineHeight: "1.5rem",
    "@media(max-width: 768px)": {
      lineHeight: "1rem",
      fontSize: "1.1rem",
    },
  },
  farmerdetailsheaderleft: {
    fontWeight: "600",
    fontFamily: "DM Sans",
    fontSize: "1.1rem",
    lineHeight: "1.5rem",
    color: "rgba(25, 25, 25, 1)",
    "@media(max-width: 768px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
      fontWeight: "500",
    },
    "@media(max-width: 600px)": {
      fontWeight: "500",
    },
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
    },
  },
  farmerdetailsheaderright: {
    display: "flex",
    gap: ".6rem",
    justifyContent: "center",
    alignItems: "center",
    color: "#006D33",
    "@media(max-width: 768px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
      gap: ".4rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
      lineHeight: "0",
    },
  },
  farmerdetailsheaderrightdatekey: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    color: "#737373",
    "@media(max-width: 600px)": {
      fontSize: "1rem",
      fontWeight: "400",
      lineHeight: ".8rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
      lineHeight: "0",
    },
  },
  farmerdetailsheaderrightdateval: {
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.3rem",
    color: "#191919",
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
    },
  },
  farmerdetailsheadetablecontainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "1.5rem 0",
    "@media(max-width: 1100px)": {
      gap: "2rem",
    },
  },

  farmerdetailsheadetablecontainerdetailpair: {
    display: "flex",
    width: "95%",
    // justifyContent: "space-between",
    gap: "2rem",
    margin: " auto",
    "@media(max-width: 1100px)": {
      flexDirection: "column",
      gap: "2rem",
      // padding: "0 1rem",
      alignItems: "center",
      justifyContent: "center",
    },
  },
  farmerdetailsheadetableproductsection: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "@media(max-width: 768px)": {
      gap: "1rem",
      // padding: "0 1.5rem",
      alignItems: "center",
      // justifyContent: "center",
      alignItems: "center",
      // background: "green",
      minWidth: "300px",
      width: "100%",
    },
  },
  farmerdetailsheadetableproductlist: {
    display: "flex",
    width: "95%",
    justifyContent: "space-between",
    // padding: "1rem 1.5rem",
    // flex: "1",
    "@media(max-width: 768px)": {
      gap: "1rem",
      padding: "0 1rem",
      alignItems: "center",
      // justifyContent: "center",
      alignItems: "center",
    },
  },
  farmerdetailsheadetableproductlistdelete: {
    display: "flex",
    alignItems: "center",
    padding: "1rem 3rem",
    "@media(max-width: 768px)": {
      padding: "1rem 1rem",
    },
  },
  farmerdetailsheadetableproductlistsDeletebutton: {
    color: "rgba(231, 0, 0, .45)",
    textDecoration: "underline",
    fontWeight: "400",
    fontSize: "1rem",
    lineHeight: "1.5rem",
  },
  farmerdetailsheadetabledetailpair: {
    width: "50%",
    height: "3.5rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#FCFCFC",
    padding: "0 1rem",
    border: "1px solid rgba(109, 158, 63, 0.15)",
    borderRadius: "8px",
    "@media(max-width: 1100px)": {
      width: "100%",
    },
    "@media(max-width: 600px)": {
      padding: "0.5rem",
    },
  },
  farmerdetailsheadetabledetailpairedit: {
    width: "50%",
    "@media(max-width: 1100px)": {
      width: "100%",
    },
  },
  farmerdetailsheadetablecontainerdetailkey: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    color: "#737373",
    width: "40%",
    "@media(max-width: 768px)": {
      fontSize: ".8rem",
      lineHeight: ".8rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".6rem",
      lineHeight: "0",
    },
  },
  farmerdetailsheadetablecontainerdetailvalue: {
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.3rem",
    color: "#191919",
    "@media(max-width: 768px)": {
      fontSize: ".8rem",
      lineHeight: ".8rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".6rem",
      lineHeight: "0",
    },
  },
  farmerdetailsheadetablecontainerprodList: {
    overflowX: "auto",
    "@media(max-width: 768px)": {
      padding: "1.5rem 1rem 0 1rem",
    },
  },
  editfarmerdetails: {
    color: "#6D9E3F",
    cursor: "pointer",
    fontWeight: "500",
    fontSize: "1.2rem",
    background: "white",
    lineHeight: "1.5rem",
    border: "2px solid transparent",
    borderRadius: "8px",
    padding: "1.3rem",
    transition: "background 0.3s ease, transform 0.3s ease",
    "&:hover": {
      transform: "scaleX(1.1)",
    },
    "@media(max-width: 768px)": {
      lineHeight: ".8rem",
      fontSize: "1rem",
      padding: "1rem",
    },
    "@media(max-width: 600px)": {
      lineHeight: ".8rem",
      fontSize: "1rem",
      padding: "1rem",
    },
    "@media(max-width: 300px)": {
      fontSize: ".8rem",
      padding: ".5rem",
    },
  },
  viewMorelink: {
    textTransform: "capitalize",
    textDecoration: "underline",
    color: "#006D33",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: "DM Sans",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    "&:hover": {
      color: "white",
    },
  },
  viewmorecard: {
    background: "white",
  },
  arrowscrollnext: {
    position: "absolute",
    right: "0",
    top: "50%",
    transform: "translateY(-50%)",
    display: "block",
    "@media(max-width: 600px)": {
      display: "none",
    },
  },
  arrowscrollprev: {
    position: "absolute",
    left: "0",
    top: "50%",
    transform: "translateY(-50%)",
    display: "none",
    "@media(max-width: 600px)": {
      display: "none",
    },
  },
};
