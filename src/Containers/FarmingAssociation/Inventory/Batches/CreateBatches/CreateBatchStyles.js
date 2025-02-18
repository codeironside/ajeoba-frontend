import { commonStyles } from "../../../../../Style/CommonStyle";

export const styles = {
  
  batchFieldStyles: {
    marginTop: "1.25rem",
    width: "21.25rem",
  },
  createBatchContainer: {
    borderRadius: "0.5rem",
    height: "calc(100vh - 11.5rem)",
    marginTop: "5rem",
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  contentContainer: {
    "@media (max-width: 1000px)": {
      width: "100%",
    },
  },
  ellipsisWidth: {
    "& .MuiTypography-root": {
      overflow: "hidden",
      width: "19rem",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  createBatchBtn: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingBottom: "1.25rem",
  },
  chipDropDown: {
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",

    marginTop: "0.5rem",
    "& fieldset": {
      border: "none",
    },
    "& .MuiOutlinedInput-root": {
      minHeight: "3.5rem",
    },
    "& .MuiSelect-iconOpen": {
      borderRadius: "0.5rem 0px 0px 0.5rem",
    },
  },
  batchFields: {
    display: "flex",
    flexDirection: "row",
    gap: "1rem",
    alignItems: "flex-end",
    "@media(max-width: 600px)": {
      flexDirection: "column",
      alignItems: "center",
    },
  },
  layoutHandle: {
    minHeight: "16.172rem",
    "@media(max-width: 600px)": {
      minHeight: "30.688rem",
    },
  },
  fieldInputResponsive: {
    marginTop: "0.938rem",
    "@media(max-width: 600px)": {
      marginTop: "0",
    },
  },
};
