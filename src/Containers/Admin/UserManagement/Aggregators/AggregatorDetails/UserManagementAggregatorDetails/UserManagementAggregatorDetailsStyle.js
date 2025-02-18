import {
  WHITE,
  ACTIVE_GREEN,
  BLACK,
} from "../../../../../../Constant/ColorConstant";
import { commonStyles } from "../../../../../../Style/CommonStyle";

export const styles = {
  editResponsiveBtn: {
    "@media(max-width:900px)": {
      top: "56%",
      right: "38%",
    },
    "@media(max-width:500px)": {
      top: "33%",
      right: "34%",
    },
    "@media(max-width:400px)": {
      right: "33%",
      top: "37%",
    },
    "@media(max-width:375px)": {
      top: "3rem",
      right: "2rem",
    },
  },
  customFormContainer: {
    display: "flex",
    width: "100%",
    padding: "0px",
    marginTop: "1.25rem",
    flexWrap: "wrap",
    justifyContent: "space-between",
    textAlign: "left",
    "@media (max-width: 600px)": {
      marginTop: "1.5rem",
      width: "80%",
    },
  },

  aggregatorDetailsContentContainer: {
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
  customResponsiveBox: {
    "@media (max-width: 600px)": {
      marginTop: "4.375rem",
    },
  },
  aggregatorDetailsBoxes: {
    flexDirection: "column",
    flex: "1",
  },
  customRatingStatus: {
    paddingTop: "2.5rem",
    textAlign: "center",
    "@media (max-width: 500px)": {
      paddingTop: 0,
    },
  },
  aggregatorDetailsContainer: {
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
  customResponsiveFields: {
    "@media(max-width: 600px)": {
      marginTop: "0",
    },
  },
  typoColor: {
    color: BLACK,
  },

  btnContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelBtnStyle: {
    marginTop: "1.875rem",
    marginRight: "1.25rem",
    fontSize: "0.875rem",
    color: ACTIVE_GREEN,
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    backgroundColor: WHITE,
    width: "13.188rem",
    height: "3.5rem",
    textTransform: "unset",
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
    "@media (max-width: 1000px)": {
      marginRight: "0px",
    },
  },
  marginTop10: {
    marginTop: "0px",
  },
};
