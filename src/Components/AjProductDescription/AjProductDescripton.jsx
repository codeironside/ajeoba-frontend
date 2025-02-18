import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import AjInputLabel from "../AjInputLabel";
import { commonStyles } from "../../Style/CommonStyle";

function AjProductDescripton({ handleProductDescription, submit, error }) {
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState("");

  const handleChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 250) {
      setDescription(inputValue);
    }
    handleProductDescription(inputValue);
  };

  useEffect(() => {
    if (submit) {
      if (!description) {
        setDescriptionError(error);
      } else {
        setDescriptionError("");
      }
    }
  }, [submit, description]);

  const characterCount = description.length;
  const maxCharacterLimit = 250;

  return (
    <Box>
      <AjInputLabel
        displayText="Description"
        required
        styleData={commonStyles.inputLabel}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <TextField
          id="product-description"
          label="Enter Description"
          multiline
          rows={4}
          value={description}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          margin="normal"
          error={descriptionError !== ""}
          helperText={descriptionError}
          sx={{
            "& .MuiOutlinedInput-root": {
              border: "1px solid #F2F2F2",
              boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.04)",
              "&:hover": {
                //   border: "1px solid #F2F2F2",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },

            "& .MuiInputLabel-outlined": {
              color: "#000000",
              opacity: "0.3",
            },
            "& .MuiInputLabel-outlined.Mui-focused": {
              color: "#000000",
              opacity: "0",
            },
            "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
              border: "1px solid transparent",
            },
          }}
          InputProps={{
            style: {
              boxShadow: "0px 4px 7px 0px rgba(0,0,0,0.04)",
              backgroundColor: "transparent",
            },
          }}
          // InputLabelProps={{
          //   color: "#A2A2A2",
          // }}
          inputProps={{
            maxLength: maxCharacterLimit,
          }}
        />
        <Typography
          variant="body2"
          sx={{
            color: characterCount > maxCharacterLimit - 20 ? "red" : "inherit",
          }}
        >
          {`${characterCount} / ${maxCharacterLimit}`}
        </Typography>
      </Box>
    </Box>
  );
}

export default AjProductDescripton;
