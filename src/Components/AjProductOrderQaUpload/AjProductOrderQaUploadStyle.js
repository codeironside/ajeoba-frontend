import { BLACK, WHITE, ACTIVE_GREEN, LIGHT_GREEN } from "../../Constant/ColorConstant";
import { commonStyles } from "../../Style/CommonStyle";

export const _styles = {
  boxFullWidth: {
    width: "100%",
  },

  marginLeftZero: {
    marginLeft: "0rem",
  },

  BackArrowSize: {
    fontSize: "1.75rem",
  },
  gridRadius: {
    borderRadius: "0.5rem",
  },
  textAreaStyle: {
    fontFamily: "Poppins",
    height: "7rem",
    padding: "0.7rem",
    marginTop: "0.5rem",
    outline: "none",
    width: "100%",
    border: "0.063rem solid #F2F2F2",
    background: "#FFFFFF",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",

    "& .MuiInput-root": {
      "&:before, :after, :hover:not(.Mui-disabled):before": {
        borderBottom: 0,
      },
    },
  },
  responsiveWidth: {
    "@media (max-width:600px)": {
      height: " calc(100vh - 15.5rem)",
    },
    "@media (max-width:1000px)": {
      height: " calc(100vh - 16.5rem)",
    },
  },

  uploadbtnstyle: {
    "@media (max-width:650px)": {
      width: "100%",
    },
  },

  MainHeadingTopMargin: {
    marginTop: "4rem",
    "@media(max-width:1000px)": {
      marginTop: "2rem",
    },
    "@media(max-width:600px)": {
      marginTop: "5rem",
    },
  },

  ViewSupportMainContainer: {
    borderRadius: "0.5rem",
    marginTop: "5rem",
    height: "calc(100vh - 12.5rem)",
    overflow: "auto",
    ...commonStyles.customSrollBar,
  },

  SubmitBtnMarginTop: {
    marginTop: "3.875rem",
  },
};

export const extraStyle = {
  toolTipText: {
    color: BLACK,
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: "1.375rem",
  },
  inputBaseCustomStyle: {
    "@media (max-width:600px)": {
      maxWidth: "85%",
    },
  },
  signUpFormCustomStyle: {
    maxWidth: "95%",
  },
  uploadStyle: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    margin: "5rem auto 0",
    gap: "32px",
  },
  formStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
  },
  customDropdownStyle: {
    width: "21.25rem",
    "@media (max-width:600px)": {
      marginBottom: "2rem",
    },
  },
  customDropdownStyleNew: {
    "@media (max-width:600px)": {
      marginBottom: "2rem",
      width: "15rem",
    },
  },
  btnStyle: { marginBottom: "0.938rem", marginTop: "0.625rem" },
  gridStyle: { flex: "1", width: "100%" },
  searchInput: {
    height: "3.5rem",
    marginTop: "0.5rem",
    background: WHITE,
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: ACTIVE_GREEN,
      },
    },
  },
  marginTopQaUpload: {
    marginBlock: "-2rem 1rem"
  },
  searchInputQa: {
    height: "3.5rem",
    marginBlock: "0.75rem",
    background: WHITE,
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
    "& .MuiAutocomplete-popupIndicator": {
      "& .MuiSvgIcon-root": {
        color: ACTIVE_GREEN,
      },
    },
  },
};

export const styles = {
  
  productOrderContainer: {
    position: "relative",
  },
  productOrderContentContainer: {
    minHeight: "calc(100vh - 18.75rem)",
    minWidth: "calc(100vw - 28.125rem)",
  },
  stepperAlignment: {
    "@media(max-width: 600px)": {
      marginRight: "0.625rem",
    },
  },

  qaContainer: { 
    height: "100px", 
    margin: '0 -32px', 
    padding: '0 3rem',
    background: ACTIVE_GREEN,
  },

  qaMarginTop: {
    marginTop: '-16px',
  },

  uploadMarginTop: {
    marginTop: "2.25rem",
  },
  downloadWrapper: {
    paddingTop: "0.938rem",
    display: "flex",
    height: "2.25rem",
  },
  responsiveField: {
    "@media(max-width: 600px)": {
      width: "100%",
    },
  },
  responsiveDropdown: {
    "@media(max-width: 600px)": {
      minWidth: "0",
    },
  },
};

export const styleModal = {
  style: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderWidth: "2px",
    borderStyle: "solid",
    borderColor: LIGHT_GREEN,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
  style_close: {
    position: "absolute",
    top: "15px",
    right: "15px",
    boxShadow: "0 2px 12px 0 rgba(0 0 0 / 0.2)",
    borderRadius: "50%",
    zIndex: 2000,
    padding: "8px 16px",
    bgcolor: "background.body",
    cursor: "pointer",
  },
};

