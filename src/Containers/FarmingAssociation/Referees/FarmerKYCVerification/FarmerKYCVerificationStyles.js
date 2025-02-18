import { BLACK } from "../../../../Constant/ColorConstant";

export const styles = {
  backArrow: {
    position: "absolute",
    top: "1.875rem",
    marginLeft: "2.4rem",
    width: "3.125rem",
    padding: 0,
    color: BLACK,
    zIndex: 5,
    "@media(max-width: 600px)": {
      marginLeft: "0.5rem",
    },
  },
  kycVerficationResponsiveHeight:{

    "@media(max-width: 600px)":{
      height:"calc(100vh - 18.5rem)"
    }
  }
};
