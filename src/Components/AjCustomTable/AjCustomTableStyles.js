import { commonStyles } from "../../Style/CommonStyle";

import { makeStyles } from "@mui/styles";
import {
  ACTIVE_GREEN,
  BLACK,
  RED,
  WHITE,
  DARK_GREY,
  YELLOW,
} from "../../Constant/ColorConstant";
import {
  TABLE_HEIGHT,
  TABLE_HEIGHT_NO_PAGINATION,
} from "../../Constant/LayoutConstant";

export const useStyles = makeStyles(
  () => ({
    pagination: {
      "& .MuiPaginationItem-root": {
        color: BLACK,
        border: `0.063rem solid ${ACTIVE_GREEN}`,
      },
      "& .MuiButtonBase-root.Mui-selected": {
        backgroundColor: ACTIVE_GREEN,
        color: WHITE,
      },
      "& .MuiPaginationItem-ellipsis": {
        border: 0,
      },
      "& .MuiPaginationItem-root button": {
        margin: 0,
      },
    },
  }),
  { name: "MuiLoginViewStyles" }
);

export const styles = {
  tableWrapper: {
    height: `calc(100vh - ${TABLE_HEIGHT})`,
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  tableWrapperHeight: {
    height: `calc(100vh - 19.6rem)`,
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  customTableWrapper: {
    height: `calc(100vh - ${TABLE_HEIGHT_NO_PAGINATION})`,
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },
  tableContainer: {
    boxShadow: "none",
    marginBottom: "-1.25rem",
  },
  deleteBtnStyle: {
    color: RED,
    textDecoration: "underline",
    textTransform: "capitalize",
  },
  btnStyle: {
    backgroundColor: ACTIVE_GREEN,
    borderRadius: "0.25rem",
    "&:hover": {
      backgroundColor: "#6d9e3f",
    },
  },
  disabledButton: {
    backgroundColor: DARK_GREY,
    "&:hover": {
      backgroundColor: DARK_GREY,
    },
  },
  columnStyle: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    whiteSpace: "nowrap",
    fontWeight: 400,
  },
  normalText: {
    textTransform: "none",
  },
  maxWidth: {
    maxWidth: "0px",
  },
  colorText: {
    color: WHITE,
    fontWeight: 400,
    fontSize: "0.75rem",
    lineHeight: "1.25rem",
    textTransform: "none",
  },
  intransitStyle: {
    backgroundColor: YELLOW,
  },
};
