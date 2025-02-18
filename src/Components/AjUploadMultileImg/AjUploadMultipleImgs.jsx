import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import upload from "../../Assets/Images/uploadicon.png";
import crown from "../../Assets/Images/crown.png";
import deleteicon from "../../Assets/Images/deleteicon.png";
import { styles } from "./AjUploadMultImg";
import { uploadImage } from "../../Redux/common/Document/documentActions";
import { showToast } from "../../Services/toast";
import { useDispatch } from "react-redux";

function AjUploadMultipleImgs({ handleProductImagesChange }) {
  const [productImgs, setProductImgs] = useState(Array(9).fill(null));
  const [defaultImg, setDefaultImg] = useState(null);
  const [defaultImgID, setDefaultImgID] = useState(null);
  const [productImgsIDs, setProductImgsIDs] = useState(Array().fill());

  const dispatch = useDispatch();
  const type = "file";
  const docType = "PRODUCT_PHOTO";

  const handleUploadMultipleImgs = (e, index) => {
    if (!e.target.files[0]) {
      return;
    }
    const fileData = e.target.files[0];
    if (fileData.size > 5242880) {
      showToast("File should be less than 5 MB", "info");
      return;
    }
    const formData = new FormData();
    formData.append("file", fileData);
    uploadImage(formData, docType, dispatch).then((res) => {
      if (res?.status === 200) {
        showToast("Image uploaded successfully", "success");
        if (index === 0) {
          setDefaultImg(
            `${process.env.REACT_APP_IMAGE_URL}/${res.body.data.url}`
          );
          setDefaultImgID(res.body.data.id);
        } else {
          const newProductImgs = [...productImgs];
          const newProductImgsIDs = [...productImgsIDs];
          newProductImgs[
            index - 1
          ] = `${process.env.REACT_APP_IMAGE_URL}/${res.body.data.url}`;
          newProductImgsIDs[index - 1] = res.body.data.id;
          setProductImgs(newProductImgs);
          setProductImgsIDs(newProductImgsIDs);
        }
      }
    });
    e.target.value = "";
  };

  useEffect(() => {
    handleProductImagesChange(defaultImgID, ...productImgsIDs);
  }, [productImgsIDs, defaultImgID]);

  const handleDeleteFile = (e, i) => {
    if (i === 0) {
      setDefaultImg(null);
      setDefaultImgID(null);
    } else {
      const newProductImgs = [...productImgs];
      const newProductImgsIDs = [...productImgsIDs];
      newProductImgs.splice(i - 1, 1);
      newProductImgsIDs.splice(i - 1, 1);
      setProductImgs(newProductImgs);
      setProductImgsIDs(newProductImgsIDs);
    }
  };

  const UploadContainers = [];
  for (let i = 0; i < 10; i++) {
    UploadContainers.push(
      <>
        <Box
          key={i}
          sx={styles.uploadImgContainer(
            i === 0 ? defaultImg : productImgs[i - 1]
          )}
        >
          {(i === 0 && defaultImg) || (i !== 0 && productImgs[i - 1]) ? (
            <Typography sx={styles.uploadedImg}>
              <img
                src={i === 0 && defaultImg ? defaultImg : productImgs[i - 1]}
                alt="uploaded image"
                style={styles.uploadedImg}
              />
            </Typography>
          ) : (
            <label htmlFor={`file-upload-${i}`}>
              <Typography sx={styles.uploadImg}>
                <img src={upload} alt="upload icon" />
                <span style={styles.uploadText}>Upload</span>
              </Typography>
            </label>
          )}
          <input
            id={`file-upload-${i}`}
            type={type}
            accept={"image/png, image/jpg, image/jpeg, application/pdf"}
            hidden
            onChange={(e) => handleUploadMultipleImgs(e, i)}
          />
        </Box>
        <div
          style={styles.deleteIconContainer}
          onClick={(e) => handleDeleteFile(e, i)}
        >
          {(i === 0 && defaultImg) || (i !== 0 && productImgs[i - 1]) ? (
            <img src={deleteicon} alt="delete icon" style={styles.deleteIcon} />
          ) : null}
        </div>
        <Typography sx={styles.primaryImgContainer}>
          {i === 0 && (
            <img src={crown} alt="upload icon" style={{ width: ".8rem" }} />
          )}
          <span
            style={{
              ...styles.primaryImgText,
              color:
                i === 0 ? (defaultImg ? "#898B87" : "#898B87") : "transparent",
            }}
          >
            Primary
          </span>
        </Typography>
      </>
    );
  }

  return (
    <div>
      <Box>
        {/* <AjInputLabel
          displayText="Description"
          required
          styleData={commonStyles.inputLabel}
        /> */}
        <Box sx={styles.headerTextContainer}>
          <Typography required sx={styles.headerText}>
            Upload Images (up to 10)<sup>*</sup>
          </Typography>
          <Typography sx={styles.subHeaderText}>
            (JPEG, PNG or PDF only)
          </Typography>
        </Box>
        <Box sx={styles.uploadParentContainer}>
          {UploadContainers.map((Container, index) => (
            <div key={index} style={{ position: "relative" }}>
              {Container}
            </div>
          ))}
        </Box>
      </Box>
    </div>
  );
}

export default AjUploadMultipleImgs;
