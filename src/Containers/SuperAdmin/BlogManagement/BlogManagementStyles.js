import { ACTIVE_GREEN, WHITE, DARK_GREY } from "../../../Constant/ColorConstant";
import { commonAddProductStyles } from "../../../Style/CommonStyle";

export const styles = {
  blogFormBox: {
    width: "100%", 
  },
  blogFormTitle: {
    marginTop: "0.625rem",
    marginBottom: "-0.625rem",
    height: "auto",
    fontWeight: "600",
    fontSize: "1.5rem",
  },
  headerBoxHeight: { height: "3.063rem" },
  marginBottom20: { marginBottom: "1.25rem" },
  questionStyle: {
    whiteSpace: "normal",
    marginTop: "0.625rem",
    height: "auto",
    fontWeight: "600",
    fontSize: "1rem",
  },
  addButtonAlternativeBox: { width: "7.938rem", height: "3.5rem" },
  searchInput: {
    width: "20rem",
    height: "3.5rem",
    background: "#FFFFFF",
    marginRight: "1.25rem",
    border: "0.063rem solid #F2F2F2",
    boxSizing: "border-box",
    boxShadow: "0px 0.25rem 0.5rem rgba(0, 0, 0, 0.04)",
    borderRadius: "0.5rem",
    "@media (max-width:600px)": {
      marginRight: "0px",
      marginBottom: "0.625rem",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      border: "none",
    },
  },
  customHeight: {
    height: "3.5rem",
  },
  customHeightLandingPagesm: {
    height: "2.5rem",
  },

  customWidth: {
    "@media (max-width:600px)": {
      width: "20rem",
    },
  },
  customDropDown: {
    width: "90%",
    m: 1,
  },
  gridWrapper: {
    display: "flex",
    "@media (max-width:600px)": {
      flexDirection: "column",
      justifyContent: "center",
    },
  },
  displayText: {
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    fontWeight: 500,
    color: DARK_GREY,
  },
  addItemStyles: {
    alignItems: "",
  },
  paddingStyle: {
    marginTop: "0",
    paddingTop: "1rem",
  },
  answerStyle: {
    height: "auto",
    marginTop: "0.625rem",
    whiteSpace: "normal",
  },
  editButtonStyle: {
    marginTop: "0.625rem",
    color: ACTIVE_GREEN,
    lineHeight: "1.313rem",
    fontWeight: "600",
    borderRadius: "0.5rem",
    backgroundColor: WHITE,
    height: "1.875rem",
    width: "auto",
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
      color: WHITE,
    },
  },
  faqFormBox: {
    width: "43.75rem",
    marginBottom: "1.25rem",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  questionHeight: { height: "5.625rem" },
  marginTop10: { marginTop: "0.625rem" },
  answerHeight: { height: "10rem" },
  addFaqButton: {
    ...commonAddProductStyles.heading,
    marginTop: "0rem",
    "@media (max-width: 600px)": {
      marginTop: "2.5rem",
    },
  },
  marginTop40: { marginTop: "4.85rem" },
  faqAddEditWhiteBoxContainer: {
    marginTop: "6.4375rem",
    height: `calc(100vh - 12.5475rem)`,
  },
  backButtonAddEdit: { top: "2.375rem" },
  marginTopForAnswer: { marginTop: "1.125rem" },
  editButtonBox: { display: "flex", justifyContent: "flex-start" },
  marginTop0Responsive: {
    "@media (max-width: 600px)": {
      marginTop: "0rem",
    },
  },
  faqsBox: { width: "100%", height: "none" },
  displayTextEditorStyle: {
    fontFamily: "Poppins",
    wordWrap: "anywhere",
  },
};
