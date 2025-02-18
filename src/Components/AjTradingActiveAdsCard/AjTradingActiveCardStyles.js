import { PRIMARY_GREEN } from "../../Constant/ColorConstant";
export const styles = {
  cardMainContainer: {
    width: "350px",
    margin: "1rem",
    border: "1px solid rgb(23 34 45 / 5%)",
    boxShadow: "0 0.375rem 0.75rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    maxHeight: "35rem",
    background: "rgb(23 34 45 / 5%)",
    "@media(max-width:600px)": {
      // maxWidth: "20rem",
      width: "90%",
      margin: ".75rem auto",
    },
  },
  listcontainer: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "space-between",
    margin: "1.8rem 0 1rem 0",
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
  cardMainContainer2: {
    margin: "1rem",
    border: "1px solid rgb(23 34 45 / 5%)",
    flex: "0 0 24%",
    marginLeft: "auto",
    marginRight: "auto",
    boxShadow: "0 0.375rem 0.75rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    height: "22rem",
    contain: "content",
    background: "rgb(23 34 45 / 5%)",
    "@media(max-width:600px)": {
      width: "89%",
    },
  },
  detailsContainer: {
    marginTop: "0.75rem",
  },
  detailsContainerLandingPage: {
    margin: "0 1rem",
    
  },
  // buyButtonStyle: {
  //   marginTop: "0rem",
  //   maxWidth: "10rem",
  // },

  priceStyle: {
    fontWeight: "500",
    fontSize: "1rem",
    lineHeight: "1.313rem",
    color: PRIMARY_GREEN,
    margin: "0.5rem 0rem",
  },
  productListStyle: {
    fontWeight: "600",
    fontSize: "1.1rem",
    color: PRIMARY_GREEN,
    textAlign: "center",
    margin: ".8rem 0",
  },
  imageContainer: {
    width: "15rem",
    height: "11rem",
    "@media(max-width:600px)": {
      maxWidth: "20rem",
    },
  },
  // imageContainerTrading: {
  //   width: "296",
  //   border: "4px solid purple",
  //   height: "150px",
  //   "@media(max-width:600px)": {
  //     maxWidth: "20rem",
  //   },
  // },
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    gap: ".75rem",
    justifyContent: "space-between",
  },
  buttonContainerLandingPage: {

  },

  productNameHeadingWidth: {
    maxWidth: "18.5rem",
  },
  productNameTextWidth: {
    maxWidth: "9.5rem",
  },
  cardContainer: {
    display: "flex",
    padding: ".5rem",
    flexDirection: "column",
    justifyContent: "space-between",
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
};
