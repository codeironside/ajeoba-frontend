import React from "react";
import { getUserData } from "../Services/localStorageService"; // Import getUserData
import { Button, Box } from "@mui/material";
import uploadIcon from "../Assets/Images/upload.svg";
import { uploadImage } from "../Redux/common/Document/documentActions";
import { showToast } from "../Services/toast";
import { useDispatch } from "react-redux";

const styles = {
  uploadButton: {
    backgroundColor: "white",
    color: "black",
    width: "100%",
    height: "3.5rem",
    boxShadow: "none",
    textTransform: "none",
    border: "0.063rem solid #6d9e3f",
    marginTop: "0.5rem",
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "white",
      color: "black",
      boxShadow: "none",
    },
  },
  uploadGrid: {
    backgroundImage: `url(${uploadIcon})`,
    backgroundRepeat: "no-repeat",
    backgroundColor: "transparent",
    backgroundSize: "contain",
    width: "1rem",
    height: "1rem",
    marginRight: "0.5rem",
  },
  uploadText: {
    fontWeight: "400",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
  },
  disableStyle: {
    border: "none",
  },
};

const AjDocumentUploader = (props) => {
  const dispatch = useDispatch();

  let docType;
  switch (props.type) {
    case "image":
      docType = "image/png, image/jpg, image/jpeg, application/pdf";
      break;
    case "pdf":
      docType = "application/pdf";
      break;
    case "png":
      docType = "image/png";
      break;
    default:
      docType = "*";
  }

  const onFileChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    const fileData = e.target.files[0];
    if (fileData.size > 5242880) {
      showToast("File should be less than 5 MB", "info");
      return;
    }
    const formData = new FormData();
    const userId = getUserData()?.id; // Retrieve user ID
    formData.append("file", fileData);
    formData.append("loggedin_from", userId); // Attach user ID
        console.log(` we are here ${userId}`);
    uploadImage(formData, props.docType, dispatch).then((res) => {
  
      if (res.status === 200) {
        props.setIsUpload && props.setIsUpload(true);
        showToast("Image uploaded successfully", "success");
        props.onUpload(res.body.data);
      }
    });
    e.target.value = "";
  };

  return (
    <span>
      <Button
        disabled={props.readOnly}
        variant="contained"
        component="label"
        sx={{
          ...styles.uploadButton,
          ...(props.readOnly && styles.disableStyle),
          width:
            props.origin === "product_order_qa_report" ? props.width : "100%",
        }}
      >
        <Box sx={styles.uploadGrid}></Box>
        <Box sx={styles.uploadText}>
          {props.origin === "product_order_qa_report"
            ? "Upload Report"
            : "Upload"}
        </Box>
        <input type="file" accept={docType} hidden onChange={onFileChange} />
      </Button>
    </span>
  );
};

export default AjDocumentUploader;
