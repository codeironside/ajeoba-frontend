import { createTheme } from "@mui/material";
import { PRIMARY_GREEN } from "../Constant/ColorConstant";

const theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "DM Sans", "sans-serif"].join(","),
  },
  palette: {
    primary: {
      main: PRIMARY_GREEN,
    },
  },
});

export default theme;
