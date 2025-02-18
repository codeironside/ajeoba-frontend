import { BLACK } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const styles = {
  mainBox: {
    height: "calc(100% - 11.25rem)",
    position: "relative",
    overflow: "auto",
    ...commonStyles.customSrollBar,
    "@media (max-width: 600px)": {
      height: "calc(100% - 14.375rem)",
    },
  },
  filterScrollWrapper: {
    overflow: "auto",
    padding: "1.5rem 2.5rem",
    "@media (max-width: 600px)": {},
  },
  filterScrollWrappersm: {
    // overflow: "auto",
    // padding: "1.5rem 2.5rem",
    marginTop: "2rem",
    "@media (max-width: 600px)": {},
  },
  filterChildrenStyle: {
    minWidth: "48.438rem",
    marginBottom: "1.25rem",
    "@media (max-width:600px)": {
      width: "auto",
      marginBottom: "0.625rem",
      minWidth: "21.563rem",
    },
  },
  filterChildrenStylesm: {
    // minWidth: "58.438rem",
    marginBottom: "1.25rem",
    "@media (max-width:600px)": {
      width: "auto",
      marginBottom: "0.625rem",
      minWidth: "21.563rem",
    },
  },
  headingLabel: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    fontWeight: "400",
    color: BLACK,
  },
  datesBox: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    marginBottom: "0.75rem",
    "@media (max-width: 600px)": {
      display: "block",
    },
  },
  dateWrapper: {
    width: "21.375rem",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  dropdownStyle: {
    "@media (max-width:37.5rem)": { maxWidth: "21.25rem" },
  },
  ratingText: {
    marginRight: "1rem",
    marginBottom: "0.5rem",
  },
  fieldMargin: {
    marginTop: "-3.125rem",
  },
  ratingStar: {
    fontSize: "3rem",
  },
};
