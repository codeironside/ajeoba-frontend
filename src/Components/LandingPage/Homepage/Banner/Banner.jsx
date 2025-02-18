import React, { useEffect, useState } from "react";
import { Box, Typography, Button, useMediaQuery } from "@mui/material";
import { useNavigate, useLocation } from "react-router";

import bannerav1 from "../Images/bannerav1.png";
import bannerav2 from "../Images/qabanner.svg";
import bannerav3 from "../Images/qabanner.svg";

import { bannerStyle } from "./Banner.js";
import "../../css/style.css";
import { bannerimg, bannerimgsm } from "../../../../Constant/AppConstant.js";


function Banner() {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 767px)");
  const bannerAvData1 = [
    {
      image: bannerav1,
      text: "Farming Associations",
      class: "slide-banneravatar1",
      positionX: !isSmallScreen ? "right" : "left",
      positionY: !isSmallScreen ? "top" : "top",
      valueX: !isSmallScreen ? 10 : 5,
      valueY: !isSmallScreen ? 40 : 75,
    },
    {
      image: bannerav2,
      text: "Input Suppliers",
      class: "slide-banneravatar2",
      positionX: !isSmallScreen ? "right" : "right",
      positionY: !isSmallScreen ? "bottom" : "bottom",
      valueX: !isSmallScreen ? 41 : 7,
      valueY: !isSmallScreen ? 20 : 25,
    },
    {
      image: bannerav3,
      text: "Finance Companies",
      class: "slide-banneravatar3",
      positionX: !isSmallScreen ? "right" : "right",
      positionY: !isSmallScreen ? "bottom" : "bottom",
      valueX: !isSmallScreen ? 8 : 43,
      valueY: !isSmallScreen ? 12 : 5,
    },
  ];
  const bannerAvData2 = [
    {
      image: bannerav2,
      text: "Logistics Companies",
      class: "slide-banneravatar1",
      positionX: !isSmallScreen ? "right" : "right",
      positionY: !isSmallScreen ? "top" : "top",
      valueX: !isSmallScreen ? 10 : 4,
      valueY: !isSmallScreen ? 40 : 10,
    },
    {
      image: bannerav1,
      text: "Quality Assurance",
      class: "slide-banneravatar2",
      positionX: !isSmallScreen ? "right" : "right",
      positionY: !isSmallScreen ? "bottom" : "top",
      valueX: !isSmallScreen ? 41 : 4,
      valueY: !isSmallScreen ? 20 : 10,
    },
    {
      image: bannerav3,
      text: "Corporate Buyers",
      class: "slide-banneravatar3",
      positionX: !isSmallScreen ? "right" : "right",
      positionY: !isSmallScreen ? "bottom" : "top",
      valueX: !isSmallScreen ? 8 : 4,
      valueY: !isSmallScreen ? 12 : 10,
    },
  ];
  const [isVisible, setIsVisible] = useState(false);
  const [currentAvObject, setcurrentAvObject] = useState(bannerAvData1);

  useEffect(() => {
    const switchAvatars = () => {
      setIsVisible(false);
      setTimeout(() => {
        setcurrentAvObject(
          currentAvObject === bannerAvData1 ? bannerAvData2 : bannerAvData1
        );
        setIsVisible(true);
      }, 1000);
    };

    const timeoutId = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    const switchAvatarLoop = setInterval(switchAvatars, 5000);

    return () => {
      clearTimeout(timeoutId);
      clearInterval(switchAvatarLoop);
    };
  }, [currentAvObject]);

  return (
    <>
      {!isSmallScreen ? (
        <Box sx={bannerStyle.background}>
          <img src={bannerimg} alt="Banner" style={bannerStyle.bannerImage} />
          <Box sx={bannerStyle.bannerContentContainer}>
            <Box sx={bannerStyle.bannerTextContainer}>
              <Typography
                sx={bannerStyle.bannerTextHeader}
                className="slide-bannerTextHeader"
              >
                Agriculture Made Smarter With Digital Infrastructure.
              </Typography>
              <Typography
                sx={bannerStyle.bannerTextSubtext}
                className="slide-bannerTextSubtext"
              >
                We aim to revolutionize how agricultural products are grown,
                traded, financed, and delivered in Africa through innovative
                technology.{" "}
              </Typography>
              <Button
                sx={bannerStyle.bannerTextButton}
                className="slide-bannerTextButton"
                onClick={() => navigate("/select-user-role")}
              >
                {" "}
                Get Started
              </Button>
            </Box>
            <Box sx={bannerStyle.avatarContainer}>
              {currentAvObject?.map((item) => (
                <Box
                  sx={{
                    ...bannerStyle.avatarBox,
                    [item.positionX]: `${item.valueX}%`,
                    [item.positionY]: `${item.valueY}%`,
                  }}
                  className={`${item.class} ${isVisible ? "show" : ""}`}
                >
                  <img
                    src={item.image}
                    alt="avatar"
                    style={bannerStyle.avatarContainer}
                  />
                  <Typography sx={bannerStyle.avatarBoxText}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      ) : (
        <Box sx={bannerStyle.basecontainer}>

          <img src={bannerimgsm} alt="Banner" style={bannerStyle.bannerImage} />
          <Box sx={bannerStyle.parentContainersm}>
            <Box sx={bannerStyle.bannerTextContainersm}>
              <Typography
                sx={bannerStyle.bannerTextHeadersm}
                className="slide-bannerTextHeader"
              >
                Agriculture Made Smarter With Digital Infrastructure.
              </Typography>
              <Typography
                sx={bannerStyle.bannerTextSubtextsm}
                className="slide-bannerTextSubtext"
              >
                We aim to revolutionize how agricultural products are grown,
                traded, financed, and delivered in Africa through innovative
                technology.{" "}
              </Typography>
              <Button
                sx={bannerStyle.bannerTextButtonsm}
                className="slide-bannerTextButton"
                onClick={() => {
                  navigate("/select-user-role");
                }}
              >
                {" "}
                Get Started
              </Button>
            </Box>
          </Box>
          <Box sx={bannerStyle.avatarContainer}>
            {currentAvObject?.map((item) => (
              <Box
                sx={{
                  ...bannerStyle.avatarBoxsm,
                  [item.positionX]: `${item.valueX}%`,
                  [item.positionY]: `${item.valueY}%`,
                }}
                className={`${item.class} ${isVisible ? "show" : ""}`}
              >
                <img
                  src={item.image}
                  alt="avatar"
                  style={bannerStyle.avatarContainer}
                />
                <Typography sx={bannerStyle.avatarBoxText}>
                  {item.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}

export default Banner;
