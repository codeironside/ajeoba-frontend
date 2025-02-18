import * as React from "react";
import { useNavigate, useLocation } from "react-router";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoRedirection } from "../../../Services/commonService/commonService";
import "../css/style.css";
import { DASHBOARD } from "../../../Routes/Routes";
import { logout } from "../../../Services/commonService/commonService";
import menu from "../../../Assets/Images/Group 88.png";
// import rightarr from "../Images/navrightarrow.svg";
import navrigtarrow from "../Homepage/Images/navrightarrow.svg";
import navbarcancel from "../Homepage/Images/navbarcancel.svg";

const pagesLarge = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about-us" },
  {
    label: "Marketplace",
    link: "/view-marketplace",
  },
  {
    label: "Resources",
    innerLinks: [
      { label: "Recent Blogs", link: "/blog" },
      { label: "FAQs", link: "/faqs" },
    ],
  },
];
const pagessmall = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about-us" },
  { label: "Marketplace", link: "/view-marketplace" },
  { label: "FAQs", link: "/faqs" },
  { label: "Blogs", link: "/blog" },
  { label: "Log In", link: "/signin " },
  { label: "Sign Up", link: "/select-user-role" },
];

function ResourceNavItem({ label, innerLinks, setInnerResourceLink }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isHovering, setIsHovering] = React.useState(false);

  return (
    <Typography
      variant="h6"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      sx={{
        my: 2,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "1.3rem",
        fontFamily: "DM Sans",
        lineHeight: "1.3rem",
        cursor: "pointer",
        textTransform: "capitalize",
        color: location.pathname === innerLinks[0].link ? "#006d33" : "black",
        fontWeight: location.pathname === innerLinks[0].link ? "700" : "500",
        transition: "color 0.5s ease-in",
        margin: "0 2rem",
        "@media(max-width: 1400px)": {
          fontSize: "1rem",
        },
      }}
    >
      <span>
        {label} <img src={navrigtarrow} alt="arrow nav bar" />
      </span>
      {isHovering && (
        <Box
          sx={{
            display: "flex",
            position: "absolute",
            background: "white",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: "2rem",
            top: "60%",
            right: "30%",
            width: "15%",
            padding: "2.5rem 0 2rem 2rem",
            zIndex: 100,
            borderRadius: "4px",
            "@media(max-width: 1400px)": {
              right: "29%",
              padding: "2.5rem 0 2rem 1.5rem",
              gap: "1.5rem",
            },
          }}
        >
          {innerLinks.map((page, index) => (
            <Typography
              key={index}
              variant="body1"
              onClick={() => navigate(page.link)}
              sx={{
                cursor: "pointer",
                fontSize: "1.3rem",
                fontFamily: "DM Sans",
                lineHeight: "1.3rem",
                textTransform: "capitalize",
                color: location.pathname === page.link ? "#006d33" : "black",
                fontWeight: location.pathname === page.link ? "700" : "500",
                transition: "color 0.5s ease-in",
                "&:hover": {
                  color: "#6D9E3F",
                },
                "@media(max-width: 1400px)": {
                  fontSize: "1rem",
                },
              }}
            >
              {page.label}
            </Typography>
          ))}
        </Box>
      )}
    </Typography>
  );
}

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userToken = localStorage.getItem("token");
  const isSmallScreen = useMediaQuery("(max-width: 1149px)");

  const [openSideBar, setOpenSideBar] = React.useState(false);
  const [innerResourceLink, setInnerResourceLink] = React.useState(false);
  const [isBoxVisible, setBoxVisibility] = React.useState(false);


  const CustomDivider = () => (
    <Divider
      light
      sx={{
        position: "absolute",
        bottom: "-20%",
        right: 0,
        left: 0,
        background: "rgba(0, 0, 0, 0.25)",
        zIndex: 2000,
      }}
    />
  );

  const handleOpenNavMenu = () => {
    setOpenSideBar(!openSideBar);
    setBoxVisibility(!isBoxVisible);
  };
  const handleOpenUserMenu = (event) => {
    navigate(DASHBOARD);
  };

  return (
    <AppBar
      width="100%"
      position="sticky"
      sx={{
        boxShadow: "0px 2px 5px 0px rgba(0,0,0,0.2)",
        background: "white",
        "@media(max-width:1900px)": {
          padding: "1rem 0",
        },
      }}
    >
      <Toolbar>
        {!isSmallScreen ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="100%"
            gap="2rem"
          >
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              onClick={() => logoRedirection()}
              sx={{
                mr: 2,
                display: "flex",
              }}
            >
              <img
                src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/logo_ax0dgb.svg"
                alt="Logo"
              />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,

                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                // gap: "2rem",
              }}
            >
              {pagesLarge.map((page, index) => (
                <>
                  {page.label === "Resources" ? (
                    <ResourceNavItem
                      label={page.label}
                      innerLinks={page.innerLinks}
                      setInnerResourceLink={setInnerResourceLink}
                    />
                  ) : (
                    <Typography
                      variant
                      key={index}
                      onClick={() => navigate(page.link)}
                      sx={{
                        my: 2,
                        display: "block",
                        fontSize: "1.3rem",
                        fontFamily: "DM Sans",
                        lineHeight: "1.3rem",
                        cursor: "pointer",
                        textTransform: "capitalize",
                        "&:hover": {
                          color: "#6D9E3F",
                        },
                        color:
                          location.pathname === page.link ? "#006d33" : "black",
                        margin: "0 2rem",
                        fontWeight:
                          location.pathname === page.link ? "700" : "500",
                        transition: "color 0.5s ease-in",
                        "@media(max-width: 1400px)": {
                          fontSize: "1rem",
                        },
                      }}
                    >
                      {page.label}
                    </Typography>
                  )}
                </>
              ))}
            </Box>

            <Box
              sx={{
                flexGrow: 0,

                display: "flex",
                gap: "1rem",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  color: "#006d33",
                  borderColor: "#006d33",
                  borderRadius: "8px",
                  borderWidth: "1px",
                  borderStyle: "solid",
                  textAlign: "center",
                  width: "7.9rem",
                  height: "2.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  fontFamily: "DM Sans",
                  lineHeight: "1.3rem",
                  "@media(max-width: 1400px)": {
                    fontSize: "1rem",
                  },
                }}
                onClick={() => navigate("/signin")}
              >
                Log In
              </Box>

              <Box
                sx={{
                  color: "white",
                  backgroundColor: "#006d33",
                  borderRadius: "6px",
                  borderWidth: "1px",
                  textAlign: "center",
                  width: "7.9rem",
                  height: "2.8rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  fontSize: "1.3rem",
                  fontWeight: "500",
                  fontFamily: "DM Sans",
                  lineHeight: "1.3rem",
                  "@media(max-width: 1400px)": {
                    fontSize: "1rem",
                  },
                }}
                onClick={() => navigate("/select-user-role")}
              >
                Sign Up
              </Box>
            </Box>
          </Box>
        ) : (
          <>
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
              }}
            >
              {userToken ? (
                <Tooltip title="Open settings">
                  <IconButton
                    onClick={handleOpenUserMenu}
                    sx={{ p: 0, color: "#006d33", zIndex: 999 }}
                  >
                    <AccountCircleIcon color="#006D33" fontsize="large" />
                    {/* <img src="Assets/Images/user_daqfcq.svg" alt="Logo" /> */}
                  </IconButton>
                </Tooltip>
              ) : (
                <Typography
                  variant="h5"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  onClick={() => logoRedirection()}
                  sx={{
                    mr: 2,

                    display: "flex",
                    zIndex: 999,

                    flexGrow: 1,
                  }}
                >
                  <img
                    src="https://ajeoba-website.oss-eu-central-1.aliyuncs.com/compressed-images/compressed-images/logo_ax0dgb.svg"
                    alt="Logo"
                  />
                </Typography>
              )}
            </Box>

            <Box sx={{ flexGrow: 0, zIndex: 999 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <img src={openSideBar ? navbarcancel : menu} alt="menu" />
              </IconButton>
            </Box>
            {openSideBar && <CustomDivider />}
            {openSideBar && (
              <Box
                sx={{
                  background: "white",
                  width: "100%",
                  position: "absolute",
                  height: "100vh",
                  top: "0",
                  right: "0",
                  left: "0",
                  zIndex: 100,
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                  justifyContent: "flex-start",
                  padding: "6rem 0",
                  alignItems: "center",
                  opacity: isBoxVisible ? "1" : "0",
                  transition: "opacity 3s ease-in-out",
                  "@media (max-width: 768px)": {
                    gap: "2rem",
                  },
                  "@media (max-width: 500px)": {
                    gap: "1.5rem",
                  },
                  "@media (max-width: 450px)": {
                    gap: "1rem",
                  },
                }}
              >
                {pagessmall.map((page, index) => (
                  <>
                    {page.label === "Sign Up" ? (
                      <>
                        <Typography
                          onClick={() =>
                            navigate(!userToken ? page.link : logout())
                          }
                          sx={{
                            fontsize: "1rem",
                            lineHeight: "1.91rem",
                            fontWeight: 700,
                            color: "white",
                            fontFamily: "DM Sans",
                            background: "#006D33",
                            width: "70%",
                            height: "3rem",
                            textAlign: "center",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: "4px",
                          }}
                          key={index}
                        >
                          {!userToken ? page.label : "Sign out"}
                        </Typography>
                      </>
                    ) : (
                      <>
                        {page.label === "Log In" && userToken ? null : (
                          <Typography
                            onClick={() => navigate(page.link)}
                            sx={{
                              fontsize: "1rem",
                              lineHeight: "1.91rem",
                              fontWeight: 700,
                              color: "#2E2E2E",
                              fontFamily: "DM Sans",
                            }}
                            key={index}
                          >
                            {page.label}
                          </Typography>
                        )}
                      </>
                    )}
                  </>
                ))}
              </Box>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
export default ResponsiveAppBar;
