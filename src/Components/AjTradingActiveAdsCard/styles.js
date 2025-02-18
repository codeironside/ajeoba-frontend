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
    width: "94.5%",
    margin: "3rem auto",
    display: "flex",
    gap: "3rem",
    "@media(max-width: 1500px)": {
      width: "93%",
      // width: "50%",
    },
    "@media(max-width: 900px)": {
      width: "93%",
      margin: "2rem auto",
      // overflow: "hidden"
    },
    "@media(max-width: 768px)": {
      margin: "1rem auto",
    },
  },
  filterlg: {
    flexBasis: "30%",
    "@media(max-width: 900px)": {
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
    fontSize: "1.3rem",
    fontWeight: "500",
    lineHeight: "3rem",
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
    "@media(max-width: 1500px)": {
      fontSize: ".8rem",
    },
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
    "@media(max-width: 900px)": {
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
    "@media(max-width: 900px)": {
      display: "none",
    },
  },
  searchContainersm: {
    display: "none",
    "@media(max-width: 900px)": {
      display: "block",
      width: "100%",
      // margin: "2rem 0",
    },
  },
  filterContainersm: {
    "@media(max-width: 900px)": {
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
    "@media(max-width: 900px)": {
      display: "block",
    },
    "@media(max-width: 500px)": {
      fontSize: ".8rem",
    },
  },
  listcontainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "left",
    margin: "0",
    width: "100%",
    fontFamily: "DM Sans",
    "@media(max-width: 1400px)": {
      gap: "2rem",
    },
    "@media(max-width: 900px)": {
      gap: "2rem",
      margin: "0 0 1rem 0",
    },
  },
  listcontainer2: {
    flexWrap: "wrap",
    justifyContent: "left",
    margin: "0",
    width: "100%",
    height: "100%!important",
    fontFamily: "DM Sans",
    "@media(max-width: 1400px)": {
      gap: "2rem",
    },
    "@media(max-width: 900px)": {
      gap: "2rem",
      margin: "0 0 1rem 0",
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
    flexBasis: "100%",
    flexDirection: "column",
    border: "1px solid rgba(234, 234, 234, 1)",
    padding: "2rem",
    borderRadius: "8px",
    minWidth: "76vw",
    "@media(max-width: 768px)": {
      minWidth: "95vw",
      border: "0",
      padding: "1rem",
    },
  },
  productname: {
    // color: "#cccccc",
    textTransform: "capitalize",
    textDecoration: "none",
    fontFamily: "Poppins",
    fontSize: "18px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#090909",
    "@media(max-width: 1400px)": {
      fontSize: "1rem",
    },
  },
  productPrice: {
    textTransform: "capitalize",
    textDecoration: "none",
    fontFamily: "Poppins",
    fontSize: "16px",
    fontWeight: "500",
    lineHeight: "24px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#090909",
    "@media(max-width: 1400px)": {
      fontSize: "1rem",
    },
  },
  ratingBlock: {
    display: "flex", 
    gap: "8px", 
    alignItems: "bottom",
    justifyContent: "start",
    fontWeight: "500",
    fontSize: "14px",
    color: "#006D33",
    padding: "0",
    height: "20px",
  },
  unit: {
    fontFamily: "Poppins",
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "14px",
    marginTop: "3px",
    letterSpacing: "0em",
    textAlign: "left",
    color: "#686868",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    gap: ".8rem",

    "@media(max-width: 1400px)": {
      gap: ".3rem",
      margin: "-.5rem 0",
      fontSize: ".7rem",
    },
  },
  no_underline: {
    textDecoration: "none",
  },
  product_link: {
    width: "100%!important",
  },
  card: {
    flexGrow: 0,
    flexBasis: "31.85%",
    boxShadow: "0",
    height: "100%",
    borderRadius: "8px",
    border: "1px solid rgba(234, 234, 234, 1)",
    "@media(max-width: 1400px)": {
      flexBasis: "31.3%",
    },
    "@media(max-width: 1300px)": {
      flexBasis: "31%",
    },
    "@media(max-width: 1100px)": {
      flexBasis: "48%",
    },
    "@media(max-width: 600px)": {
      flexBasis: "100%",
      margin: "0 auto",
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
    "@media(max-width: 1000px)": {
      flexBasis: "60%",
      margin: "0 auto",
    },
    "@media(max-width: 600px)": {
      flexBasis: "80%",
      margin: "0 auto",
    },
  },
  proddetailbg: {
    "@media(max-width:3000px)": {
      padding: "3.5rem ",
    },
    "@media(max-width:1000px)": {
      padding: "0",
    },
  },
  proddetailstop: {
    display: "flex",
    width: "100%",
    gap: "5rem",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    background: "white",
    "@media(max-width: 1500px)": {
      gap: "3rem",
    },
    "@media(max-width: 1000px)": {
      flexDirection: "column",
      padding: "0",
      gap: "0",
    },
  },
  productimgContainer: {
    flex: "1",
    width: "50%",
    height: "auto",
    "@media(max-width: 1000px)": {
      width: "100%",
    },
  },
  imgsm: {
    width: "100%",
    "@media(max-width: 600px)": {
      height: "6rem",
    },
  },
  imglg: {
    width: "100%",
    borderRadius: "8px",
  },
  proddetailtext: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    gap: "3rem",
    paddingRight: "2rem",
    "@media(max-width: 1400px)": {
      gap: "1.3rem",
    },
    "@media(max-width: 1100px)": {
      gap: ".8rem",
    },
    "@media(max-width: 1000px)": {
      gap: "2rem",
      padding: "2rem 2rem",
    },
  },
  proddetailseller: {
    display: "flex",
    justifyContent: "space-between",
    // alignItems: "center",
    fontFamily: "DM Sans",
    "@media(max-width: 1000px)": {
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
    fontWeight: "600",
    lineHeight: "2rem",
    "@media(max-width: 1400px)": {
      lineHeight: "1.8rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 1200px)": {
      lineHeight: "1.8rem",
      fontSize: "1.2rem",
    },
    "@media(max-width: 1000px)": {
      lineHeight: "1.8rem",
      fontSize: "1.5rem",
    },
  },
  proddetaildescription: {
    fontSize: "1.3rem",
    color: "#686868",
    lineHeight: "2.5rem",
    fontWeight: "400",
    fontFamily: "DM Sans",
    "@media(max-width: 1400px)": {
      lineHeight: "2.2rem",
      fontSize: "1.2rem",
    },
    "@media(max-width: 1200px)": {
      lineHeight: "1.7rem",
      fontSize: "1.1rem",
    },
    "@media(max-width: 1000px)": {
      lineHeight: "2rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 600px)": {
      lineHeight: "2rem",
      fontSize: "1.3rem",
    },
  },
  proddetailsellername: {
    fontSize: "1.2rem",
    color: "rgba(104, 104, 104, 1)",
    lineHeight: "1.4rem",
    fontWeight: "400",
    fontFamily: "DM Sans",
    "@media(max-width: 1400px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
    },
    "@media(max-width: 1100px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
    },
    "@media(max-width: 1000px)": {
      lineHeight: "1.4rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 600px)": {
      // lineHeight: "2rem",
      fontSize: "1.2rem",
    },
  },
  proddetailseller1: {
    fontSize: "1.2rem",
    fontFamily: "DM Sans",
    lineHeight: "1.4rem",
    fontWeight: "500",
    color: "black",
    marginLeft: "5px",
    "@media(max-width: 1400px)": {
      lineHeight: "1rem",
      fontSize: "1rem",
    },
    "@media(max-width: 1000px)": {
      lineHeight: "1.4rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 600px)": {
      // lineHeight: "2rem",
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
  proddetailcost: {
    fontFamily: "DM Sans",
    fontSize: "2rem",
    fontWeight: "600",
    lineHeight: "2rem",
    "@media(max-width: 1400px)": {
      lineHeight: "1.8rem",
      fontSize: "1.5rem",
    },
    "@media(max-width: 1100px)": {
      lineHeight: "1.4rem",
      fontSize: "1.2rem",
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
    lineHeight: "2rem",
    textTransform: "capitalize",
    fontSize: "1.1rem",
    fontWeight: "400",
    "@media(max-width: 1400px)": {
      fontSize: ".8rem",
    },
  },
  proddetailbuy: {
    fontFamily: "DM Sans",
    width: "100%",
    height: "5rem",
    background: "#006D33",
    color: "white",
    fontWeight: "700",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    borderRadius: "8px",
    "&:hover": {
      background: "#006D33",
    },
    "@media(max-width: 1400px)": {
      height: "4rem",
    },
  },
  viewMoreContainer: {
    border: "1px solid transparent",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    background: "#EAEAEA",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "2rem",
    "@media(max-width: 1000px)": {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
  },
  viewMoreContainerfarmerdetailstableheader: {
    padding: "2rem",
    "@media(max-width: 600px)": {
      padding: "1rem",
    },
    // border: "1px solid transparent",
    // borderTopLeftRadius: "8px",
    // borderTopRightRadius: "8px",
    // background: "#EAEAEA",
    // display: "flex",
    // justifyContent: "space-between",
    // alignItems: "center",
    // padding: "2rem",
    // "@media(max-width: 1000px)": {
    //   borderTopLeftRadius: "0",
    //   borderTopRightRadius: "0",
    // },
  },
  viewMoreContainerfarmerdetails: {
    border: "1px solid transparent",
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    background: "#D6E5C7",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.5rem",
    "@media(max-width: 1000px)": {
      borderTopLeftRadius: "0",
      borderTopRightRadius: "0",
    },
  },
  viewMoreContainerfarmerdetailstable: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    padding: "1.5rem 1.5rem",
    flexDirection: "row",
    "@media(max-width: 768px)": {
      flexDirection: "column",
      gap: "1rem",
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
    },
  },
  farmerdetailsheaderrightdatekey: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    color: "#737373",
  },
  farmerdetailsheaderrightdateval: {
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.3rem",
    color: "#191919",
  },
  farmerdetailsheadetablecontainer: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    padding: "1.5rem 0",
  },

  farmerdetailsheadetablecontainerdetailpair: {
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "0 1.5rem",
    "@media(max-width: 1100px)": {
      flexDirection: "column",
      gap: "1rem",
      padding: "0 1rem",
      alignItems: "center",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  farmerdetailsheadetableproductsection: {
    display: "flex",
    width: "95%",
    justifyContent: "space-between",
    "@media(max-width: 768px)": {
      gap: "1rem",
      // padding: "0 1.5rem",
      alignItems: "center",
      // justifyContent: "center",
      alignItems: "center",
      background: "green",
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
    // justifyContent: "space-between",
    alignItems: "center",
    // width: "80%",
    // justifyContent: "space-between",
    padding: "1rem 3rem",
    // "@media(max-width: 1100px)": {
    //   flexDirection: "column",
    //   gap: "1rem",
    //   padding: "0 1.5rem",
    //   alignItems: "center",
    //   justifyContent: "center",
    //   alignItems: "center",
    // },
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
    width: "45%",
    display: "flex",
    justifyContent: "space-between",
    background: "#FCFCFC",
    padding: "1rem",
    border: "1px solid rgba(109, 158, 63, 0.15)",
    borderRadius: "8px",
    "@media(max-width: 1100px)": {
      width: "100%",
    },
  },
  farmerdetailsheadetablecontainerdetailkey: {
    fontSize: "1rem",
    fontWeight: "400",
    lineHeight: "1.5rem",
    color: "#737373",
    "@media(max-width: 768px)": {
      fontSize: ".3rem",
      color: "yellow",
    },
  },
  farmerdetailsheadetableproductlistingheaders: {
    fontSize: ".9rem",
    fontWeight: "500",
    lineHeight: "1.3rem",
    color: "rgba(25, 25, 25, 1)",
    flex: "1",
  },
  farmerdetailsheadetableproductlists: {
    fontSize: ".8rem",
    fontWeight: "500",
    lineHeight: "1.2rem",
    color: "rgba(25, 25, 25, 1)",
    flex: "1",
  },
  farmerdetailsheadetablecontainerdetailvalue: {
    fontSize: "1rem",
    fontWeight: "500",
    lineHeight: "1.3rem",
    color: "#191919",
    "@media(max-width: 768px)": {
      color: "blue",
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
    fontWeight: "700",
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
      fontSize: "1.1rem",
    },
  },
  viewMorelink: {
    textTransform: "capitalize",
    textDecoration: "underline",
    color: "#006D33",
    cursor: "pointer",
    fontWeight: "500",
    fontFamily: "DM Sans",
    fontSize: "1.2rem",
    lineHeight: "1.8rem",
    "&:hover": {
      color: "white",
    },
    "@media(max-width: 600px)": {
      lineHeight: ".8rem",
      fontSize: "1.1rem",
    },
  },
  viewmorecard: {
    background: "white",
  },
  cardMainContainer2: {
    margin: "1rem",
    border: "1px solid #BEBEBE",
    flex: "0 0 24%",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0",  
    borderRadius: "8px",
    height: "285px",
    contain: "content",
    background: "rgb(30 30 30 / 2%)",
    "@media(max-width:600px)": {
      width: "89%",
      height: "fit-content",
    },
    "@media(max-width:1024px)": {
      flex: "0 0 45%",
    },
    "@media(max-width:768px)": {
      flex: "0 0 45%",
    },
  },
  cardDetailStyle: {
    width: "180.61px",
    height: "94px",
    display: "flex",
    gap: "8px",
    margin: "16px 0 0 16px",
    flexDirection: "column",
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
