import { commonStyles } from "../../../Style/CommonStyle";

import {
  ACTIVE_GREEN,
  WHITE,
  BLACK,
} from "../../../Constant/ColorConstant";

export const styles = {
  subHeaderStyle: {
    display: "flex",
    margin: "1.25rem",
    alignItems: "center",
  },
  subContentBox: {
    backgroundColor: WHITE,
    minHeight: "67vh",
    marginTop: "1.25rem",
    padding: "1.25rem",
    borderRadius: "0.375rem",
    maxWidth: "100%",
    overflow: "auto",
    height: `calc(100vh - ${'14.7rem'})`,
    ...commonStyles.customSrollBar,
  },
  subContentBoxNew: {
    height: "calc(100vh - 25rem)",
  },
  headerBox: {
    display: "flex",
    justifyContent: "space-between",
    width: "13.75rem",
    alignItems: "center",
  },
  addButtonStyle: {
    width: "7.938rem",
    height: "3.5rem",
    bordrRadius: "0.5rem",
    backgroundColor: ACTIVE_GREEN,
    color: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
  },

  btn: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  tableText: {
    fontWeight: 500,
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: BLACK,
  },
};
