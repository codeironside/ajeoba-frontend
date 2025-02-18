import { commonStyles } from "../../../../../../Style/CommonStyle";
import {
  BLACK,
  DARK_GREY,
  LIGHT_GREY,
} from "../../../../../../Constant/ColorConstant";
export const styles = {
  corporateDetailsContentContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    alignItems: "center",
    marginTop: "-4.375rem",
    borderRadius: "0.5rem",
    overflow: "auto",
    height: "calc(100vh - 13.125rem)",
    backgroundColor: "#fff",
    width: "calc(100% - 3.4rem)",
    margin: "-4.375rem auto 0 auto",
    position: "relative",
    ...commonStyles.customSrollBar,
    "@media (max-width: 600px)": {
      width: "90%",
    },
  },
  corporateDetailsBoxes: {
    flexDirection: "column",
    flex: "1",
  },
  corporateDetailsContainer: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-around",
    margin: "1.5rem 0 0 0",
    "@media (max-width: 1000px)": {
      flexDirection: "column",
      width: "100%",
      gap: "0.625rem",
    },
  },
  headingContentContainer: {
    display: "flex",
    flexDirection: "column",
    width: "43.75rem",
    marginBottom: "1.25rem",
    alignItems: "center",
    marginTop: "3.125rem",
    "@media (max-width: 1000px)": {
      width: "90%",
    },
  },
  marginTopZero: {
    marginTop: 0,
  },
  typoColor: {
    color: BLACK,
  },
  changeDownloadBtnStyle: {
    textDecoration: "underline",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginLeft: "0.5rem",
    color: DARK_GREY,
  },
  dividerStyles: {
    width: "100%",
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
    background: LIGHT_GREY,
    opacity: "0.4",
  },
  cacDocErrorText: {
    width: "100%",
    marginTop: "0.625rem",
    color: "red",
    height: "1.25rem",
    fontSize: "0.875rem",
  },
  cacDocument: {
    "@media(max-width:500px)": {
      marginBottom: "-1.25rem",
    },
  },
  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  editRespnsiveBtn: {
    "@media(max-width:900px)": {
      top: "34%",
      right: "40%",
    },
    "@media(max-width:500px)": {
      top: "24%",
      right: "36%",
    },
    "@media(max-width:390px)": {
      top: "26%",
      right: "35%",
    },
  },
  formMarginTop: {
    "@media(max-width:600px)": {
      marginTop: "5rem",
    },
  },
};

export default styles;
