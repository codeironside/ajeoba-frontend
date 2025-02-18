import {
  WHITE,
  ACTIVE_GREEN,
  LIGHT_GREEN,
} from "../../../../Constant/ColorConstant";

export const styleModal = {
  style: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderWidth: '2px',
    borderStyle: 'solid',
    borderColor: LIGHT_GREEN,
    borderRadius: "10px",
    boxShadow: 24,
    p: 4,
  },
  style_close: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
    borderRadius: '50%',
    zIndex: 2000,
    padding: '8px 16px',
    bgcolor: 'background.body',
    cursor: 'pointer',
  },
}

export const withdrawalCommonStyles = {
  withdrawButtonStyle: {
    width: "100%",
    height: "3.8rem",
    bordrRadius: "0.5rem",
    margin: "0 auto",
    backgroundColor: ACTIVE_GREEN,
    color: WHITE,
    "&:hover": {
      backgroundColor: ACTIVE_GREEN,
    },
    "@media(max-width:600px)": {
      marginTop: "0",
    },
  },

  withdrawBox: {
    width: "100%",
    backgroundColor: WHITE,
    padding: "2rem",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    width: "100%",
    textAlign: "right",
    margin: "0 auto",
  },
};
