import React from "react";
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import AJMenu from "./AJMenu";
import { Typography } from "@mui/material";
import { RED } from "../Constant/ColorConstant";
import { getUserData } from "../Services/localStorageService";
import { ROLES } from "../Constant/RoleConstant";

const drawerWidth = 17.5;

const styles = {
  appbar: {
    width: `calc(100% - ${drawerWidth}rem)`,
    minHeight: "4.438rem",
    boxShadow: "none",
    backgroundColor: "#ECECEC",
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  toolbar: {
    display: "flex",
    minHeight: "4.438rem",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 600px)": {
      justifyContent: "center",
      flexDirection: "column",
      textAlign: "center",
    },
  },
  subBox: {
    display: "flex",
    position: "absolute",
    top: 10,
    right: 0,
    "@media (max-width: 600px)": {
      justifyContent: "space-between",
      width: "100%",
    },
  },
  iconButton: {
    mr: 2,
    color: "#6d9e3f",
    marginLeft: "1rem",
    display: { sm: "none" },
  },
  headerText: {
    color: RED,
    fontSize: "0.75rem",
    maxWidth: "31.25rem",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
  headerMobileText: {
    "@media (min-width: 600px)": {
      display: "none",
    },
    "@media (max-width: 600px)": {
      color: RED,
      fontSize: "0.75rem",
      linHeight: "0.875rem",
      marginTop: "3.125rem",
    },
  },
};

const AjHeader = (props) => {
  const roleId = getUserData().role_id;
  const status = useSelector(
    (state) => state.setStatus.status || getUserData().status
  );

  return (
    <AppBar position="fixed" sx={styles.appbar}>
      <Box sx={styles.toolbar}>
        {roleId !== ROLES.ADMIN &&
          roleId !== ROLES.SUPER_ADMIN &&
          status === "ONHOLD" && (
            <>
              <Typography sx={styles.headerText}>
                Your application details are under review. Till then, you will
                have limited access
              </Typography>

              <Typography sx={styles.headerMobileText}>
                Your application details are under review.
              </Typography>
            </>
          )}
        <Box sx={styles.subBox}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={props.handleDrawerToggle}
            sx={styles.iconButton}
          >
            <MenuIcon />
          </IconButton>
          <AJMenu />
        </Box>
      </Box>
    </AppBar>
  );
};

export default AjHeader;
