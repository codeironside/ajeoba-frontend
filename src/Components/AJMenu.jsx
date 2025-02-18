import React, { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import Box from "@mui/material/Box";
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import { useNavigate } from "react-router-dom";
import {
  CHANGEPASSWORD,
  VIEWPROFILE,
  VIEWSUPPORT,
  TERMS_AND_CONDITIONS,
  PRIVACY_POLICY,
} from "../Routes/Routes";
import {
  getLoggedInFromAdmin,
  getUserData,
  getUserAccountData,
  getRoleName
} from "../Services/localStorageService";
import { logout } from "../Services/commonService/commonService";
import { ROLES } from "../Constant/RoleConstant";
import AjNotification from "./AjNotification/AjNotification";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import { logoutFromAdmin } from "../Redux/SignIn/signInPasswordActions";
import { useDispatch } from "react-redux";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const styles = {
  flex: {
    display: "flex",
    justifyContent: "flex-end",
    color: "#1F1F1F",
    fontSize: "0.875rem",
    height: "100%",
    marginRight: "0.75rem",
    alignItems: "center",
  },
  menuWidth: {
    width: "11.875rem",
    fontSize: "0.875rem",
    fontWeight: "400",
    color: "#1F1F1F",
  },
  logoutStyle: {
    marginTop: "0.75rem",
    borderTop: "0.063rem solid #F4F4F4",
    color: "red",
  },
  alignRight: {
    textAlign: "right",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  nameStyle: {
    fontFamily: "Poppins",
    fontWeight: "31.25rem",
    fontSize: "0.875rem",
    lineHeight: "1.313rem",
    color: "#1F1F1F",
  },
  roleStyle: {
    color: "#898B87",
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "31.25rem",
    lineHeight: "1.25rem",
    fontSize: "0.75rem",
  },
  arroeStyle: {
    fontSize: "2.5rem",
    color: "#6D9E3F",
  },
  popperStyle: {
    top: "4.063rem !important",
    "& li": {
      marginTop: "1rem",
      padding: "0 1rem",
      background: "none",
      "&:hover": {
        background: "none",
      },
    },
  },
  borderStyle: {
    borderRadius: "0 0 0.5rem 0.5rem",
  },
  marginTop16: {
    marginTop: "1rem",
  },
  contentWrapper: {
    maxWidth: "15.625rem",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
};

const AJMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData = getUserData();
  const accountData = getUserAccountData();
  const isLoggedInFromAdmin = getLoggedInFromAdmin();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [roleId, setRoleId] = React.useState(null);
  const [unreadCount, setUnreadCount] = useState(null);
  useEffect(() => {
    if (userData) {
      setRoleId(userData?.role_id);
    }
  }, [userData]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changePassword = () => {
    setAnchorEl(null);
    navigate(CHANGEPASSWORD);
  };
  const myProfile = () => {
    setAnchorEl(null);
    navigate(VIEWPROFILE);
  };

  const viewsupport = () => {
    setAnchorEl(null);
    navigate(VIEWSUPPORT);
  };

  const logoutHandler = () => {
    setAnchorEl(null);
    logout();
  };
  const logoutFromAdminHandler = () => {
    setAnchorEl(null);
    dispatch(logoutFromAdmin(navigate));
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const termsAndCondition = () => {
    setAnchorEl(null);
    window.open(TERMS_AND_CONDITIONS, "_blank");
  };
  const PrivacyPolicy = () => {
    setAnchorEl(null);
    window.open(PRIVACY_POLICY, "_blank");
  };

  useEffect(() => {
    const usersRef = ref(
      db,
      `${process.env.REACT_APP_FIREBASE_COLLECTION_NAME}` +
        userData?.id +
        "/unreadCount"
    );
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setUnreadCount(data);
    });
  }, []);

  const orgName = (role_id) => {
    let orgname;
    switch (role_id) {
      case ROLES.FARMING_ASSOCIATION:
        orgname = accountData?.association_name;
        break;
      case ROLES.CORPORATE_BUYER:
        orgname = accountData.corporate_name;
        break;
      case ROLES.LOGISTICS_COMPANY:
        orgname = accountData.company_name;
        break;
      default:
        orgname = `${userData?.first_name} ${userData?.last_name}`;
    }
    return orgname;
  };

  return (
    <div style={styles.flex}>
      <AjNotification unreadCount={unreadCount} />
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Box>
          <Box sx={[styles.nameStyle, styles.contentWrapper]}>
            {orgName(userData?.role_id)}
          </Box>
          <Box sx={styles.roleStyle}>{getRoleName(userData?.role_name)}</Box>
        </Box>
        <ArrowDropDownRoundedIcon sx={styles.arroeStyle} />
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ top: "-0.5rem" }}
        open={Boolean(anchorEl)}
      >
        {userData?.role_id !== ROLES.ADMIN && (
          <MenuItem sx={styles.menuWidth} onClick={myProfile}>
            My Profile
          </MenuItem>
        )}
        <MenuItem sx={styles.menuWidth} onClick={changePassword}>
          Change Password
        </MenuItem>
        {roleId !== ROLES.SUPER_ADMIN && (
          <div>
            <MenuItem sx={styles.menuWidth} onClick={PrivacyPolicy}>
              Privacy policy
            </MenuItem>
            <MenuItem sx={styles.menuWidth} onClick={termsAndCondition}>
              Terms & conditions
            </MenuItem>

            <MenuItem sx={styles.menuWidth} onClick={viewsupport}>
              Help & support
            </MenuItem>
          </div>
        )}
        {isLoggedInFromAdmin ? (
          <MenuItem
            sx={[styles.menuWidth, styles.logoutStyle]}
            onClick={logoutFromAdminHandler}
          >
            Back to Admin
          </MenuItem>
        ) : (
          <MenuItem
            sx={[styles.menuWidth, styles.logoutStyle]}
            onClick={logoutHandler}
          >
            Logout
          </MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default AJMenu;
