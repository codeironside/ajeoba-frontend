import { Box } from "@mui/material";
import React from "react";
import downloadIcon from "../Assets/Images/download.svg";
import { downloadImage } from "../Redux/common/Document/documentActions";
import AjButton from "./AjButton";
import defaultImage from "../Assets/Images/defaultPhoto.png";
import { useDispatch } from "react-redux";
import { commonStyles } from "../Style/CommonStyle";

const styles = {
  downloadWrapper: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: "0.5rem",
  },
  downloadSubWarpper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    border: "none",
    backgroundColor: "transparent",
    margin: "0px",
    padding: "0px",
  },
  downloadButton: {
    backgroundImage: `url(${downloadIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "contain",
    width: "1.5rem",
    height: "1.5rem",
    cursor: "pointer",
  },
  textStyle: {
    weight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginRight: "0.5rem",
  },
  changeBtnStyle: {
    textDecoration: "underline",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginLeft: "0.5rem",
  },
};

const AjDocumentDownloader = (props) => {
  const dispatch = useDispatch();
  const downloadDoc = (e) => {
    e.preventDefault();
    if (!props.docName || !props.docId) {
      return;
    }
    dispatch(downloadImage(props.docId, props.docName, true));
  };
  return (
    <Box sx={props.downloadWrapper || styles.downloadWrapper}>
      <Box
        component="button"
        onClick={downloadDoc}
        sx={{ ...styles.downloadSubWarpper, ...props?.iconGap }}
      >
        {props.showImage ? (
          <>
            <Box
              sx={{
                ...commonStyles.imageBox,
                backgroundImage: props?.docPath
                  ? `url('${process.env.REACT_APP_IMAGE_URL}/${props.docPath}')`
                  : `url('${defaultImage}')`,
              }}
            ></Box>
          </>
        ) : (
          <Box sx={props.docTextStyle || styles.textStyle}>{props.docName}</Box>
        )}
        {props.showIcon && <Box sx={styles.downloadButton} />}
      </Box>
      <AjButton
        isDisable={props.readOnly}
        styleData={props.changeBtnStyle || styles.changeBtnStyle}
        variant="text"
        onClick={props.changeDocument}
        displayText={props.displayText || "Change document"}
      />
    </Box>
  );
};

export default AjDocumentDownloader;
