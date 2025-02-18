import * as React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Typography,
  Grid,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import CircleRoundedIcon from "@mui/icons-material/CircleRounded";
import AjHeader from "../../Components/AjHeader";
import getPrivateRoutes from "../../Routes/GetPrivateRoutes";
import { getUserData } from "../../Services/localStorageService";
import { ROLES } from "../../Constant/RoleConstant";
import { styles } from "./LayoutStyle";
import {
  getDisabledPath,
  logoRedirection,
} from "../../Services/commonService/commonService";
import { VIEWPROFILE } from "../../Routes/Routes";

function Layout(props) {
  const navigate = useNavigate();
  const location = useLocation();

  const { window } = props;

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mainMenuSelectedIndex, setMainMenuSelectedIndex] = useState(0);
  const [subMenuSelectedIndex, setSubMenuSelectedIndex] = useState(null);
  const [isOpenIndex, setIsOpenIndex] = useState(null);
  const [restrictedRoute, setRestrictedRoute] = useState([]);

  const userData = getUserData();
  const privateRoutes = getPrivateRoutes();

  const status = useSelector(
    (state) => state.setStatus.status || getUserData().status
  );
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    setMainMenuSelectedIndex();
    if (location.pathname === VIEWPROFILE) {
      setIsOpenIndex(null);
      setSubMenuSelectedIndex();
    }
  }, [location.pathname]);

  const optionClicked = (item, index) => {
    if (
      item.children &&
      item.children.some((element) => element.renderChildrenOnSidebar === true)
    ) {
      if (isOpenIndex === index) {
        setIsOpenIndex(null);
      } else {
        setIsOpenIndex(index);
      }
    } else {
      handleDrawerToggle();
      setIsOpenIndex(null);
      setSubMenuSelectedIndex(null);
      navigate(item.path);
    }
  };

  React.useEffect(() => {
    setRestrictedRoute([]);
    let newRestrictedRoute = [];
    privateRoutes.map((item, index) => {
      if (
        getDisabledPath(
          userData.role_id,
          item.path,
          status,
          userData?.subscription_expiry_date
        )
      ) {
        newRestrictedRoute.push(index);
      }
    });
    setRestrictedRoute(newRestrictedRoute);
  }, [status]);

  const drawer = (
    <Box sx={styles.navTopcontainer}>
      <Box sx={styles.navContainer}>
        {privateRoutes.map((item, index) => {
          if (item.renderOnSidebar) {
            return (
              <div key={index}>
                <Button
                  sx={{
                    ...styles.navButton,
                    ...(location.pathname.includes(item.path) &&
                      styles.navButtonSelected),
                    ...(mainMenuSelectedIndex === index &&
                      styles.navButtonSelected),
                    ...(restrictedRoute.includes(index) &&
                      styles.restrictedRouteStyle),
                  }}
                  onClick={() => {
                    optionClicked(item, index);
                    setMainMenuSelectedIndex(index);
                  }}
                  disableTouchRipple={true}
                  disableFocusRipple={true}
                >
                  {userData.role_id === ROLES.SUPER_ADMIN ||
                  userData.role_id === ROLES.ADMIN ? (
                    ""
                  ) : (
                    <Typography
                      component="img"
                      src={
                        location.pathname.includes(item.path)
                          ? item.activeIcon
                          : item.icon
                      }
                      sx={styles.icon}
                    />
                  )}
                  <Typography
                    sx={
                      location.pathname.includes(item.path) ||
                      mainMenuSelectedIndex === index
                        ? [styles.buttonText, styles.buttonTextSelected]
                        : styles.buttonText
                    }
                    src={
                      location.pathname.includes(item.path)
                        ? item.activeIcon
                        : item.icon
                    }
                  >
                    {item.name}{" "}
                  </Typography>
                  {item.children &&
                  item.children.some(
                    (element) => element.renderChildrenOnSidebar === true
                  ) ? (
                    isOpenIndex && isOpenIndex === index ? (
                      <ArrowDropUp
                        sx={{
                          ...styles.sidebarMenuIcon,
                          ...(isOpenIndex === index && styles.whiteIcon),
                        }}
                      />
                    ) : (
                      <ArrowDropDown
                        sx={{
                          ...styles.sidebarMenuIcon,
                          ...((mainMenuSelectedIndex === index ||
                            location.pathname.includes(item.path)) &&
                            styles.whiteIcon),
                        }}
                      />
                    )
                  ) : (
                    ""
                  )}
                </Button>
                {isOpenIndex && isOpenIndex === index ? (
                  <List sx={styles.navSubMenu}>
                    {item.children &&
                      item.children
                        .filter(
                          (value) => value.renderChildrenOnSidebar === true
                        )
                        .map((item1, ind) => (
                          <ListItem
                            key={ind}
                            onClick={() => {
                              navigate(item.path + "/" + item1.path);
                              setSubMenuSelectedIndex(ind);
                              handleDrawerToggle();
                            }}
                          >
                            {" "}
                            <CircleRoundedIcon
                              sx={
                                ind === subMenuSelectedIndex
                                  ? styles.subMenuIconSelected
                                  : styles.submenuIcon
                              }
                            />{" "}
                            <Typography
                              sx={
                                ind === subMenuSelectedIndex ||
                                location.pathname.includes(item1.path)
                                  ? styles.subMenuTextSelected
                                  : styles.subMenuText
                              }
                            >
                              {item1.name}
                            </Typography>
                          </ListItem>
                        ))}
                  </List>
                ) : (
                  ""
                )}
              </div>
            );
          }
        })}
      </Box>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={styles.parentBox}>
      <AjHeader handleDrawerToggle={handleDrawerToggle} />
      <Box component="nav" sx={styles.navBox} aria-label="mailbox folders">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={styles.tempDrawerContainer}
        >
          <Grid>
            <Grid
              sx={styles.logoImageContainer}
              onClick={() => logoRedirection()}
            ></Grid>
          </Grid>
          {drawer}
        </Drawer>
        <Drawer variant="permanent" sx={styles.permDrawerContainer} open>
          {" "}
          <Grid
            sx={styles.logoImageContainer}
            onClick={() => logoRedirection()}
          ></Grid>
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={styles.mainContentBox}>
        {props.children}
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func,
};

export default Layout;
