import React, { useEffect, useState } from "react";
import { Button, Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styles } from "./AjCsvBulkUploaderStyles";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";

function AjCsvBulkUploader({ isRefresh, setParsedData, setParsedErrors }) {
  const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: {
      "text/csv": [".csv"],
    },
  });

  const [file, setFile] = useState(false);

  useEffect(() => {
    if (acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
      Papa.parse(acceptedFiles[0], {
        complete: function (results) {
          setParsedData(results);
          setParsedErrors(null);
        },
      });
    }
  }, [acceptedFiles]);

  useEffect(() => {
    setFile(false);
    setParsedErrors(null);
  }, [isRefresh]);

  return (
    <>
      <Box {...getRootProps({ className: "dropzone" })} sx={[styles.mainBox]}>
        <input {...getInputProps()} />
        <CloudUploadIcon sx={styles.cloudUploadIcon} />
        <Typography sx={styles.dragAndDropText}>
          Drag & drop CSV file
        </Typography>
        <Typography sx={styles.dragAndDropText}>Or</Typography>
        <Button
          variant="contained"
          component="label"
          sx={styles.uploadButton}
          onClick={open}
        >
          <Box sx={styles.uploadText}>
            {file ? "Change file" : "Select File"}
          </Box>
        </Button>
        {file && (
          <>
            <Typography sx={styles.dragAndDropText}>
              Selected file: {file.name}
            </Typography>
          </>
        )}
      </Box>
    </>
  );
}

export default AjCsvBulkUploader;
