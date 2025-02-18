import { Button } from "@mui/material";

const AjImageUploader = (props) => {
  return (
    <Button
      variant="contained"
      component="label"
      sx={{
        backgroundColor: "white",
        color: "black",
        width: "100%",
        height: "3.5rem",
        boxShadow: "none",
        textTransform: "none",
        border: "0.063rem solid #6d9e3f",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
          boxShadow: "none",
        },
      }}
    >
      {props.displayText}
      <input type="file" hidden />
    </Button>
  );
};

export default AjImageUploader;
