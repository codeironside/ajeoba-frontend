import React from "react";
import { Typography, Box } from "@mui/material"; // Make sure to import Typography from your UI library

const DetailPair = ({ label, value, styles }) => (
  <Box sx={{ ...styles }}>
    <Typography sx={{ ...styles.key }}>{label}:</Typography>
    <Typography sx={{ ...styles.value }}>{value}</Typography>
  </Box>
);

export default DetailPair;
